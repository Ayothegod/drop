// validation/authSchema.ts
import { z } from "zod";

export const bookSchema = z.object({
  title: z
    .string({ required_error: "book title is required" })
    .min(3, "book title must be at least 3 characters"),
  caption: z
    .string({ required_error: "caption is required" })
    .min(3, "caption must be at least 3 characters"),
  rating: z
    .number({ required_error: "rating is required" })
    .min(1, "it must be atleast 1 star")
    .max(5, "it cannot be more than 5 stars ")
    .optional(),
  image: z
    .string({ required_error: "image url is required" })
    .min(6, "image url is too short."),
});

export type BookInput = z.infer<typeof bookSchema>;
