import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.string(),
  CORS_ORIGIN: z.string().url(),
  DATABASE_URL: z.string().url(),
  SESSION_SECRET: z.string().min(1, "Session secret is required"),
  // JWT_ACCESS_SECRET: z.string().min(12),
  // JWT_REFRESH_SECRET: z.string().min(12),
  // CLOUDINARY_NAME: z.string(),
  // CLOUDINARY_APIKEY: z.string(),
  // CLOUDINARY_APISECRET: z.string(),
  // API_URL: z.string()
});

const serverEnv = envSchema.parse(process.env);

export default serverEnv;
