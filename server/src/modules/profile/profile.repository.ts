import { Prisma, Profile } from "@prisma/client";
import { prisma } from "../../core/database/prisma.js";

class ProfileRepository {
  static async findUniqueProfile(
    filter: Prisma.ProfileWhereUniqueInput
  ): Promise<Profile | null> {
    return prisma.profile.findUnique({ where: filter });
  }

  static async createProfile(
    data: Prisma.ProfileCreateInput
  ): Promise<Profile> {
    return prisma.profile.create({ data });
  }

  static async updateProfile(
    userId: string,
    data: Prisma.ProfileUpdateInput
  ): Promise<Profile> {
    return prisma.profile.update({ where: { userId }, data });
  }

  static async deleteProfile(userId: string): Promise<Profile> {
    return prisma.profile.delete({ where: { userId } });
  }
}

export default ProfileRepository;
