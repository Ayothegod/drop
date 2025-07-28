import argon2 from "argon2";
import jwt from "jsonwebtoken";
import serverEnv from "../../core/config/env.js";
import { ApiError } from "../../core/errors/ApiError.js";
import { httpStatus } from "./constants.js";
import { token } from "morgan";

// export const generateAccountVerificationToken = (email: string) => {
//   return jwt.sign({ email }, serverEnv.VERIFICATION_SECRET, {
//     expiresIn: "30m",
//   });
// };

// export const verifyAccountVerificationToken = (token: string) => {
//   try {
//     return jwt.verify(token, serverEnv.VERIFICATION_SECRET);
//   } catch (error) {
//     throw new ApiError(400, "Unable to verify access token.");
//   }
// };

export const hashString = async (
  input: string,
  errorMsg = "Hashing failed"
) => {
  try {
    return await argon2.hash(input);
  } catch (err) {
    throw new ApiError(httpStatus.internalServerError, errorMsg);
  }
};

export const compareString = async (
  token: string,
  hashedToken: string,
  errorMsg = "Comparison failed"
) => {
  try {
    return await argon2.verify(hashedToken, token);
  } catch (err) {
    throw new ApiError(httpStatus.badRequest, errorMsg);
  }
};

// Password
export const hashPassword = async (password: string) =>
  hashString(password, "Password hashing failed");

export const comparePassword = (password: string, hashedPassword: string) =>
  compareString(password, hashedPassword, "Password comparison failed");

// Account verification token
export const hashAccountVerificationToken = async (token: string) =>
  hashString(token, "Token hash failed");

export const verifyAccountVerificationToken = (
  token: string,
  hashedToken: string
) => compareString(token, hashedToken, "wrong token provided");

// Forget password token
export const hashForgetPasswordToken = (token: string) =>
  hashString(token, "Token hash failed");

export const verifyForgetPasswordToken = (token: string, hashedToken: string) =>
  compareString(token, hashedToken, "wrong token provided");
