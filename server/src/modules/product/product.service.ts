import { Request } from "express";
import { prisma } from "../../core/database/prisma.js";
import { ApiError } from "../../core/errors/ApiError.js";
import { httpStatus } from "../../shared/utils/constants.js";

class StoreService {
  static async create(req: Request, name: string, bio: string, logo: string) {
    const store = await prisma.store.findUnique({
      where: { userId: req.session.userId },
    });
    if (store)
      throw new ApiError(
        httpStatus.internalServerError,
        "You already have a store. Please update your store details."
      );

    const nameIsAssigned = await prisma.store.findUnique({
      where: { name },
    });
    if (nameIsAssigned)
      throw new ApiError(
        httpStatus.conflict,
        "This name is not available, please try another one."
      );

    const userStore = await prisma.store.create({
      data: {
        name,
        bio,
        logo,
        userId: req.session.userId,
      },
    });

    return { userStore, msg: "Store created successfully." };
  }

  static async update(req: Request, name: string, bio: string, logo: string) {
    const store = await prisma.store.findUnique({
      where: { userId: req.session.userId },
    });
    if (!store)
      throw new ApiError(
        httpStatus.badRequest,
        "Forbidden: you don't have a store yet!"
      );

    await prisma.store.update({
      where: { userId: req.session.userId },
      data: {
        ...(name && { name }),
        ...(bio && { bio }),
        ...(logo && { logo }),
      },
    });

    return { msg: "Store updated successfully." };
  }

  static async delete(req: Request) {
    try {
      await prisma.store.delete({
        where: { userId: req.session.userId },
      });

      // TODO: create store deleted email
      return { msg: "Store deleted successfully." };
    } catch {
      throw new ApiError(
        httpStatus.notFound,
        "This user does not have a store."
      );
    }
  }
}

export default StoreService;
