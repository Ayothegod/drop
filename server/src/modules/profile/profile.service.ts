import { ApiError } from "../../core/errors/ApiError.js";
import { Request } from "express";
import { prisma } from "../../core/database/prisma.js";
import { comparePassword, hashPassword } from "../../shared/utils/services.js";
import { httpStatus } from "../../shared/utils/constants.js";

class ProfileService {
  // NOTE: update profile
  static async update(
    username: string,
    userCategoryPreference: string[],
    req: Request,
    bio?: string,
    experience?: string
  ) {
    // check if user exists
    // const checkUser = await prisma.user.findUnique({
    //   where: { id: req.user.id },
    //   include: { profile: true },
    // });
    // if (!checkUser) {
    //   throw new ApiError(400, "This user does not exist.");
    // }

    // // check if username exists
    // const checkProfile = await prisma.profile.findUnique({
    //   where: { userId: req.user.id },
    // });

    // if (!checkProfile) {
    //   throw new ApiError(400, "This profile does not exist.");
    // }

    // // create profile
    // const updatedProfile = await prisma.profile.update({
    //   where: { userId: req.user.id },
    //   data: {
    //     bio: bio ?? undefined,
    //     experience: experience ?? undefined,
    //     userCategoryPreference: {
    //       createMany: {
    //         data: userCategoryPreference.map((category) => ({
    //           value: category,
    //         })),
    //       },
    //     },
    //   },
    //   include: { userCategoryPreference: true },
    // });

    // if (!updatedProfile) {
    //   throw new ApiError(400, "Unable to update user profile");
    // }

    return { profile: "updatedProfile", msg: "User profile updated." };
  }

  //  User sends: currentPassword, newPassword
  // Backend: verify current password
  // If correct → hash & update newPassword
  // Return success message

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
