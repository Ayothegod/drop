import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors/ApiError.js";
import { asyncHandler } from "./asyncHandler.js";
import { prisma } from "../database/prisma.js";

export const verifyToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {

    if (!req.cookies) {
      throw new ApiError(401, "Unauthorized: No token provided.");
    }

    if (!req.cookies["connect.sid"]) {
      throw new ApiError(401, "No authentication token, access denied.");
    }
    // logger.info(`Cookie: ${req.cookies["connect.sid"]}`);

    try {
      const decoded = req.session.userId

      // get user details with session.userId
      const user = await prisma.user.findUnique({
        where: { id: decoded },
        select: {
          email: true,
          fullname: true,
        },
      });

      if (!user) {
        throw new ApiError(401, "No user with this token exists.");
      }

      req.user = user;
      next();
    } catch (error) {
      throw new ApiError(403, "Forbidden: Invalid access token");
    }
  }
);
