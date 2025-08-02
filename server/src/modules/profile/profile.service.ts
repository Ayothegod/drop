import { Request } from "express";
import { prisma } from "../../core/database/prisma.js";
import { ApiError } from "../../core/errors/ApiError.js";
import { httpStatus } from "../../shared/utils/constants.js";
import { comparePassword, hashPassword } from "../../shared/utils/services.js";

class ProfileService {
  // NOTE: update profile
  static async update(
    req: Request,
    fullname: string,
    email: string,
    avatar?: string
  ) {
    const user = await prisma.user.findUnique({
      where: { id: req.session.userId },
    });
    if (!user)
      throw new ApiError(httpStatus.notFound, "This user does not exist.");

    let newEmail: string | undefined = undefined;

    if (email && email != user.email) {
      const checkEmail = await prisma.user.findUnique({ where: { email } });
      if (checkEmail)
        throw new ApiError(
          httpStatus.internalServerError,
          "This email is not available, please try another one."
        );

      newEmail = email;
    }

    await prisma.user.update({
      where: { id: req.session.userId },
      data: {
        ...(fullname && { fullname }),
        ...(newEmail && { email: newEmail }),
      },
    });

    return { msg: "User data updated." };
  }

  static async changePassword(
    currentPassword: string,
    newPassword: string,
    req: Request
  ) {
    const user = await prisma.user.findUnique({
      where: { id: req.session.userId },
    });
    if (!user) throw new ApiError(httpStatus.notFound, "Please log in.");

    const isMatch = await comparePassword(
      currentPassword,
      user.password as string
    );
    if (!isMatch)
      throw new ApiError(httpStatus.notFound, "Invalid credentials");

    const hashedPassword = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: req.session.userId },
      data: { password: hashedPassword },
    });

    // TODO: send password changed email after email job

    return { msg: "Password change successful." };
  }
}

export default ProfileService;
