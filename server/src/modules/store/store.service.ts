import { Request } from "express";
import { prisma } from "../../core/database/prisma.js";
import { ApiError } from "../../core/errors/ApiError.js";
import { httpStatus } from "../../shared/utils/constants.js";
import { comparePassword, hashPassword } from "../../shared/utils/services.js";

class StoreService {
  static async create(req: Request) {
    const user = await prisma.user.findUnique({
      where: { id: req.session.userId },
    });
    if (!user)
      throw new ApiError(httpStatus.notFound, "This user does not exist.");

    return { msg: "User data updated." };
  }
}

export default StoreService;
