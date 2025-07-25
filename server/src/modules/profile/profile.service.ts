import ProfileRepository from "./profile.repository.js";
import { ApiError } from "../../core/errors/ApiError.js";
import { Request } from "express";
import { prisma } from "../../core/database/prisma.js";

class ProfileService {
  static async create(
    username: string,
    userCategoryPreference: string[],
    req: Request,
    bio?: string,
    experience?: string
  ) {
    // check if user exists
    const checkUser = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { profile: true },
    });
    if (!checkUser) {
      throw new ApiError(400, "This user does not exist");
    }

    // check if user profile exists -> update username
    if (checkUser?.profile?.id) {
      // check if username exists
      const checkUsername = await ProfileRepository.findUniqueProfile({
        username,
      });

      if (checkUsername) {
        throw new ApiError(400, "This username is already taken");
      }

      const updatedProfile = await prisma.profile.update({
        where: { userId: req.user.id },
        data: {
          username: username.toLowerCase(),
        },
      });

      if (!updatedProfile) {
        throw new ApiError(400, "Unable to update profile");
      }

      return { profile: updatedProfile, msg: "Username updated." };
    }

    // check if username exists
    const checkUsername = await ProfileRepository.findUniqueProfile({
      username,
    });

    if (checkUsername) {
      throw new ApiError(400, "This username is already taken");
    }

    // create profile
    const profile = await prisma.profile.create({
      data: {
        username: username.toLowerCase(),
        bio: bio ?? undefined,
        experience: experience ?? undefined,
        userCategoryPreference: {
          createMany: {
            data: userCategoryPreference.map((category) => ({
              value: category,
            })),
          },
        },
        user: {
          connect: {
            id: req.user.id,
          },
        },
      },
      include: { userCategoryPreference: true },
    });

    if (!profile) {
      throw new ApiError(400, "Unable to create user profile");
    }

    return { profile, msg: "Username created." };
  }

  // NOTE: update profile
  static async update(
    username: string,
    userCategoryPreference: string[],
    req: Request,
    bio?: string,
    experience?: string
  ) {
    // check if user exists
    const checkUser = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { profile: true },
    });
    if (!checkUser) {
      throw new ApiError(400, "This user does not exist.");
    }

    // check if username exists
    const checkProfile = await prisma.profile.findUnique({
      where: { userId: req.user.id },
    });

    if (!checkProfile) {
      throw new ApiError(400, "This profile does not exist.");
    }

    // create profile
    const updatedProfile = await prisma.profile.update({
      where: { userId: req.user.id },
      data: {
        bio: bio ?? undefined,
        experience: experience ?? undefined,
        userCategoryPreference: {
          createMany: {
            data: userCategoryPreference.map((category) => ({
              value: category,
            })),
          },
        },
      },
      include: { userCategoryPreference: true },
    });

    if (!updatedProfile) {
      throw new ApiError(400, "Unable to update user profile");
    }

    return { profile: updatedProfile, msg: "User profile updated." };
  }
}

export default ProfileService;
