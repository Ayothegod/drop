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
    });

    // TODO: send verify account email

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
    const user  = "Hello"

    return { user };
  }

  // static async getUserProfile(userId: number) {
  //   return AuthRepository.findUniqueUser({ id: userId });
  // }
}

export default AuthService;
