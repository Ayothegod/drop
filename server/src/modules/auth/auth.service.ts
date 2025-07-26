import { transporter } from "../../core/config/nodemailer.js";
import { prisma } from "../../core/database/prisma.js";
import { renderVerifyAccount } from "../../shared/emails/auth/VerifyAccount.js";
import { ApiError } from "../../core/errors/ApiError.js";
import {
  hashAccountVerificationToken,
  hashPassword,
} from "../../shared/utils/services.js";
import { nanoid } from "nanoid";
import serverEnv from "../../core/config/serverEnv.js";
import logger from "../../core/logger/winston.logger.js";

class AuthService {
  static async register(email: string, password: string, fullname: string) {
    // check if email exists
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      throw new ApiError(409, "This user already exists");
    }

    // hash user password
    const hashedPassword = await hashPassword(password);

    const image = `https://api.dicebear.com/7.x/avataaars/svg?seed=${fullname}`;

    let user;
    user = await prisma.user.create({
      data: {
        fullname,
        email,
        password: hashedPassword,
        image,
      },
    });

    if (!user) {
      throw new ApiError(409, "Unable to create user");
    }

    logger.info(`user done`)

    // hash verification token
    const token = nanoid(24);
    const hashedToken = await hashAccountVerificationToken(token);
    logger.info(`hash token done`)


    const dbToken = await prisma.emailVerification.create({
      data: {
        token: hashedToken,
        expiresAt: new Date(Date.now() + 1000 * 60 * 30),
        userId: user.id,
      },
    });

    if (!dbToken) {
      throw new ApiError(409, "Unable to save verification token");
    }
    logger.info(`save token to db done`, dbToken)


    // send verify account email
    let emailSent = false;

    try {
      let verificationUrl = `${serverEnv.SERVER_URL}/auth/verify?token=${token}`;
      const html = await renderVerifyAccount(fullname, verificationUrl);

      await transporter.sendMail({
        from: '"Droplane — For creators, by creators" <heyayomideadebisi@gmail.com>',
        to: `${email}`,
        subject: "Verify your drop account",
        html: html,
      });

      emailSent = true;
      console.log("Email sent:");
    } catch (error) {
      console.error("Email failed:", error);
      emailSent = false;

      // if no verify account email, delete the user account
      await prisma.user.delete({ where: { email } });
      user = null;
    }

    let msg = emailSent
      ? "User created successfully, check your email to verify your account."
      : "Verification email not sent, try to create an account again.";
    return { user, msg, emailSent };
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

  // static async getUserProfile(userId: number) {
  //   return AuthRepository.findUniqueUser({ id: userId });
  // }
}

export default AuthService;
