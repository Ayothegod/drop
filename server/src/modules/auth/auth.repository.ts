import { prisma } from "../../core/database/prisma.js";
import { Prisma, User } from "@prisma/client";

class AuthRepository {
  static async findUser(filter: Partial<User>): Promise<User | null> {
    return await prisma.user.findFirst({ where: filter });
  }

  static async findUniqueUser(filter: Prisma.UserWhereUniqueInput) {
    return prisma.user.findUnique({ where: filter });
  }

  static async findUsers(filter: Partial<User>): Promise<User[]> {
    return await prisma.user.findMany({ where: filter });
  }

  static async createUser(userData: Prisma.UserCreateInput) {
    return await prisma.user.create({ data: userData });
  }
}

export default AuthRepository;

