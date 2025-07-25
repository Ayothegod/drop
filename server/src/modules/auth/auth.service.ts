import { resend, sendEmail } from "../../core/config/sendgrid.js";
import serverEnv from "../../core/config/serverEnv.js";
import { prisma } from "../../core/database/prisma.js";
import { ApiError } from "../../core/errors/ApiError.js";
import {
  comparePassword,
  generateAccessToken,
  hashPassword,
} from "../../shared/utils/services.js";

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

    const user = await prisma.user.create({
      data: {
        fullname,
        email,
        password: hashedPassword,
        image,
      },
      select: {
        fullname: true,
        email: true,
        image: true,
      },
    });

    if (!user) {
      throw new ApiError(409, "Unable to create user");
    }

    // TODO: send verify account email
    const msg = {
      to: `${email}`,
      from: serverEnv.SENDGRID_EMAIL_FROM,
      subject: "Welcome to Droplane",
      text: "sendgrids data easy to do anywhere, even with Node.js",
      html: "<strong>But first, you need to verify your account!</strong>",
    };

    const res = await sendEmail({
      ...msg,
    });

    console.log("Sent email response: ",res);
    

    // sgMail
    //   .send(msg)
    //   .then(() => {
    //     console.log("Email sent");
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    // if (error) {
    //   // TODO: return error response
    //   throw new ApiError(500, "Failed to send verification email");
    // }

    return { user };
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
