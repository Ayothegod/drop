import { nanoid } from "nanoid";
import { transporter } from "../../core/config/nodemailer.js";
import serverEnv from "../../core/config/env.js";
import { prisma } from "../../core/database/prisma.js";
import { ApiError } from "../../core/errors/ApiError.js";
import { renderVerifyAccount } from "../../shared/emails/auth/VerifyAccount.js";
import { httpStatus } from "../../shared/utils/constants.js";
import {
  hashAccountVerificationToken,
  hashPassword,
} from "../../shared/utils/services.js";

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

  static async login(email: string, password: string) {
    // check if email exists
    // const user = await AuthRepository.findUniqueUser({
    //   email,
    // });

    // if (!user) {
    //   throw new ApiError(409, "Invalid credentials");
    // }

    // // hash user password
    // const isMatch = await comparePassword(password, user.password);
    // if (!isMatch) throw new ApiError(400, "Invalid credentials")

    // generate token and send to the client
    // const user = await prisma.user.findUnique({ where: { email: req.body.email } });
    // if (!user) return res.status(401).send("Invalid credentials");

    // // Store userId in session data
    // req.session.userId = user.id;
    // req.session.userId = user.id;
    // logger.info(`Cookie: ${req.cookies["connect.sid"]}`);

    // // After session is created and userId is set in req.session
    // await prisma.session.update({
    //   where: { sid: req.session.id },
    //   data: { userId: user.id },
    // });
    const user = "Hello";

    return { user };
  }
}

export default AuthService;
