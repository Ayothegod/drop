import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { ApiError } from "../../core/errors/ApiError.js";
import { User } from "@prisma/client";
import serverEnv from "../../core/config/serverEnv.js";
import { Decoded } from "../types/lib.js";

const JWT_ACCESS_SECRET = serverEnv.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = serverEnv.JWT_REFRESH_SECRET;

// Generate access token
export const generateAccessToken = (user: User) => {
  return jwt.sign({ id: user?.id, email: user?.email }, JWT_ACCESS_SECRET, {
    expiresIn: "7d",
  });
};

// Generate refresh token
export const generateRefreshToken = (user: any) => {
  return jwt.sign({ id: user?.id }, JWT_REFRESH_SECRET, { expiresIn: "30d" });
};

// Verify access token
export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_ACCESS_SECRET) as Decoded;
  } catch (error) {
    throw new ApiError(400, "Unable to verify access token.");
  }
};

// Verify refresh token
export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET);
  } catch (error) {
    return null;
  }
};

// Hash password using Argon2
export const hashPassword = async (password: string) => {
  try {
    return await argon2.hash(password);
  } catch (err) {
    throw new ApiError(400, "Password hashing failed");
  }
};

// Compare password using Argon2
export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  try {
    return await argon2.verify(hashedPassword, password);
  } catch (err) {
    throw new ApiError(400, "Password comparison failed");
  }
};
