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

export type ProfileInput = z.infer<typeof profileSchema>;
