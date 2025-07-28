import { Request, Response } from "express";
import { nanoid } from "nanoid";
import serverEnv from "../../core/config/env.js";
import { transporter } from "../../core/config/nodemailer.js";
import { prisma } from "../../core/database/prisma.js";
import { ApiError } from "../../core/errors/ApiError.js";
import { renderVerifyAccount } from "../../shared/emails/auth/VerifyAccount.js";
import { httpStatus } from "../../shared/utils/constants.js";
import {
  comparePassword,
  hashAccountVerificationToken,
  hashForgetPasswordToken,
  hashPassword,
  verifyAccountVerificationToken,
} from "../../shared/utils/services.js";
import { tokenSchema } from "./schema.js";
import { EmailVerification } from "@prisma/client";
import { renderWelcomeEmail } from "../../shared/emails/auth/WelcomeUser.js";
import { renderPasswordReset } from "../../shared/emails/auth/PasswordReset.js";

class AuthService {
  static async register(email: string, password: string, fullname: string) {
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail)
      throw new ApiError(httpStatus.conflict, "This user already exists");

    const hashedPassword = await hashPassword(password);
    const image = `https://api.dicebear.com/7.x/avataaars/svg?seed=${fullname}`;
    const token = nanoid(24);
    const hashedToken = await hashAccountVerificationToken(token);

    let user;
    await prisma.$transaction(async (tx) => {
      user = await tx.user.create({
        data: { fullname, email, password: hashedPassword, image },
      });
      if (!user)
        throw new ApiError(
          httpStatus.internalServerError,
          "Unable to create user, please try again."
        );

      const dbToken = await tx.emailVerification.create({
        data: {
          token: hashedToken,
          expiresAt: new Date(Date.now() + 1000 * 60 * 30),
          userId: user.id,
        },
      });
      if (!dbToken)
        throw new ApiError(
          httpStatus.internalServerError,
          "Unable to create verification token, please try again."
        );

      let verificationUrl = `${serverEnv.SERVER_URL}/auth/verify?token=${token}`;
      const html = await renderVerifyAccount(fullname, verificationUrl);

      const info = await transporter.sendMail({
        from: `"Droplane — For creators, by creators" <${serverEnv.SENDGRID_EMAIL_FROM}>`,
        to: `${email}`,
        subject: "Verify your Drop account",
        html: html,
      });
      if (!info.messageId)
        throw new ApiError(
          httpStatus.internalServerError,
          "Verification email not sent, please try again."
        );
    });

    return { user, msg: "user created." };
  }

  static async login(email: string, password: string, req: Request) {
    // check if email exists
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) throw new ApiError(httpStatus.notFound, "Invalid credentials");

    const isMatch = await comparePassword(password, user.password as string);
    if (!isMatch)
      throw new ApiError(httpStatus.notFound, "Invalid credentials");

    // create session ccokie
    req.session.userId = user.id;

    const html = await renderWelcomeEmail(user.fullname);

    const info = await transporter.sendMail({
      from: `"Start creating, start earning 💼" <${serverEnv.SENDGRID_EMAIL_FROM}>`,
      to: `${email}`,
      subject: "Welcome to Drop 🚀",
      html: html,
    });
    if (!info.messageId)
      throw new ApiError(
        httpStatus.internalServerError,
        "welcome email not sent."
      );

    return { user, msg: "User logged-in successfully" };
  }

  static async verify(token: Request["query"]["token"]) {
    const _parsedToken = tokenSchema.safeParse(token);
    if (!_parsedToken.success) {
      const message = _parsedToken.error.errors[0].message;
      return { error: message };
    }
    const rawToken = _parsedToken.data;

    try {
      const dbTokens = await prisma.emailVerification.findMany({
        where: {
          expiresAt: {
            gt: new Date(), // not expired
          },
        },
      });
      if (!dbTokens[0]) {
        return { error: "No valid tokens found" };
      }

      let matchedToken: null | EmailVerification = null;
      for (const record of dbTokens) {
        const isMatch = await verifyAccountVerificationToken(
          rawToken,
          record.token
        );
        if (isMatch) {
          matchedToken = record;
          break;
        }
      }
      if (matchedToken == null) {
        return { error: "Token is invalid or has expired." };
      }

      await prisma.$transaction(async (tx) => {
        await tx.user.update({
          where: { id: matchedToken.userId as string },
          data: { emailVerified: true },
        });

        await tx.emailVerification.deleteMany({
          where: { userId: matchedToken.userId },
        });
      });

      return { success: true };
    } catch (error) {
      return { error: "Unknown error, try again later." };
    }
  }

  static async verification(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      throw new ApiError(
        httpStatus.notFound,
        "Invalid credentials, please sign in instead."
      );

    const isVerified = await prisma.user.findUnique({
      where: { email, emailVerified: true },
    });
    if (isVerified)
      throw new ApiError(httpStatus.conflict, "This user is already verified.");

    const token = nanoid(24);
    const hashedToken = await hashAccountVerificationToken(token);

    await prisma.$transaction(async (tx) => {
      const dbToken = await tx.emailVerification.create({
        data: {
          token: hashedToken,
          expiresAt: new Date(Date.now() + 1000 * 60 * 30),
          userId: user.id,
        },
      });
      if (!dbToken)
        throw new ApiError(
          httpStatus.internalServerError,
          "Unable to create verification token, please try again."
        );

      let verificationUrl = `${serverEnv.SERVER_URL}/auth/verify?token=${token}`;
      const html = await renderVerifyAccount(user.fullname, verificationUrl);

      const info = await transporter.sendMail({
        from: `"Drop - Verification" <${serverEnv.SENDGRID_EMAIL_FROM}>`,
        to: `${email}`,
        subject: "Verify your Drop account",
        html: html,
      });
      if (!info.messageId)
        throw new ApiError(
          httpStatus.internalServerError,
          "Verification email not sent, please try again."
        );
    });

    return { msg: "verification email sent." };
  }

  static async forgetPassword(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new ApiError(httpStatus.notFound, "Invalid credentials.");

    const token = nanoid(6);
    const hashedToken = await hashForgetPasswordToken(token);
    console.log(token, hashedToken);

    await prisma.$transaction(async (tx) => {
      await tx.passwordReset.create({
        data: {
          token: hashedToken,
          expiresAt: new Date(Date.now() + 1000 * 60 * 30),
          userId: user.id,
        },
      });

      let resetPasswordUrl = `${serverEnv.CLIENT_URL}/auth/reset-password?token=${token}`;
      const html = await renderPasswordReset(user.fullname, resetPasswordUrl);

      const info = await transporter.sendMail({
        from: `"Drop - Forget password" <${serverEnv.SENDGRID_EMAIL_FROM}>`,
        to: `${email}`,
        subject: "Reset your Drop password",
        html: html,
      });
      if (!info.messageId)
        throw new ApiError(
          httpStatus.internalServerError,
          "Forget password email not sent, please try again."
        );
    });

    return { msg: "Check your email for more info." };
  }
}

export default AuthService;
