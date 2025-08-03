import { z } from "zod";

export const productSchema = z.object({
  title: z
    .string({ required_error: "title is required" })
    .min(3, "title must be at least 3 characters"),
  description: z
    .string({ required_error: "description is required" })
    .min(3, "description is too short"),
  price: z
    .number({ required_error: "price is required" })
    .min(0, "price cannot be less than 0 naira"),
  fileUrl: z.string({ required_error: "file url is required" }).url(),
  previewImageUrl: z
    .string({ required_error: "preview image url is required" })
    .url(),
  category: z.enum([""]),
  tags: z.array(z.string()),
  isPublished: z.enum(["true", "false"]).optional(),
});
