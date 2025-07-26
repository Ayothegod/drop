import argon2 from "argon2";
import jwt from "jsonwebtoken";
import serverEnv from "../../core/config/serverEnv.js";
import { ApiError } from "../../core/errors/ApiError.js";

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

// hash verificationToken
export const hashAccountVerificationToken = async (token: string) => {
  try {
    return await argon2.hash(token);
  } catch (err) {
    throw new ApiError(400, "Token hash failed");
  }
};

// Compare password using Argon2
export const clearAccountVerificationToken = async (
  token: string,
  hashedToken: string
) => {
  try {
    return await argon2.verify(hashedToken, token);
  } catch (err) {
    throw new ApiError(400, "Token comparison failed");
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
