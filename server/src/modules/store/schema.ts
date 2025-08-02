import { z } from "zod";

export const storeSchema = z.object({
  name: z
    .string({ required_error: "username is required" })
    .min(3, "Username must be at least 3 characters"),
  bio: z.string().min(6, "store bio is too short ").optional(),
  logo: z.string().url().optional(),
});

export const updateStoreSchema = z.object({
  name: z.string().min(3, "store name must be at least 3 characters").optional(),
  bio: z.string().min(6, "store bio is too short ").optional(),
  logo: z.string().url().optional(),
});
