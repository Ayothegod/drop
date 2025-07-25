import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors/ApiError.js";
import { asyncHandler } from "./asyncHandler.js";
import { verifyAccessToken } from "../../shared/utils/services.js";
import { prisma } from "../database/prisma.js";

export const verifyToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Unauthorized: No token provided.");
    }

    const token = authHeader.split(" ")[1];

    // if (!req.cookies) {
    //   throw new ApiError(401, "Unauthorized: No token provided.");
    // }

    // if (!req.cookies["better-auth.session_token"]) {
    //   throw new ApiError(401, "No authentication token, access denied.");
    // }

    // const betterAuthCookie: string = req.cookies["better-auth.session_token"];
    // const token = betterAuthCookie.split(".")[0];

    if (!token) {
      throw new ApiError(401, "No authentication token, access denied.");
    }

    try {
      const decoded = verifyAccessToken(token);

      // get user details with token id
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
          email: true,
          username: true,
          id: true,
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
