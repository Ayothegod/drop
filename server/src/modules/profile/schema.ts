import { z } from "zod";

export const profileSchema = z.object({
  username: z
    .string({ required_error: "username is required" })
    .min(3, "Username must be at least 3 characters"),
  bio: z
    .string({ required_error: "bio is required" })
    .min(3, "bio must be at least 3 characters")
    .optional(),
  experience: z.enum(["beginner", "intermediate", "expert"]).optional(),
  userCategoryPreference: z.array(z.string()).optional(),
});

export const updateProfileSchema = z.object({
  fullname: z
    .string()
    .min(3, "fullname must be at least 3 characters")
    .optional(),
  email: z.string().email("Invalid email address").optional(),
  avatar: z.string().optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z
    .string({ required_error: "current password is required" })
    .min(8, "Password must be at least 8 characters"),
  newPassword: z
    .string({ required_error: "new password is required" })
    .min(8, "Password must be at least 8 characters"),
});
