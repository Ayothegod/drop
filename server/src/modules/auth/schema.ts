// validation/authSchema.ts
import { z } from "zod";

export const registerSchema = z.object({
  fullname: z
    .string({ required_error: "fullname is required" })
    .min(3, "fullname must be at least 3 characters"),
  email: z
    .string({ required_error: "email is required" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "password is required" })
    .min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "password is required" })
    .min(6, "Password must be at least 6 characters"),
});

export const tokenSchema = z
  .string({ required_error: "token is required" })
  .min(24, "Invalid token length")
  .max(24, "Invalid token length");

export const emailSchema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email("Invalid email address"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
