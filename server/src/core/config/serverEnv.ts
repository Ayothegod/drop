import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.string(),
  CORS_ORIGIN: z.string().url(),
  DATABASE_URL: z.string().url(),
  SESSION_SECRET: z.string().min(1, "Session secret is required"),
  SENDGRID_API_KEY: z.string().min(1, "Sendgrid API key is required"),
  SENDGRID_EMAIL_FROM: z.string().email("Invalid email format for Resend"),
  GOOGLE_APP_PASSWORD: z.string().min(1, "Google app password is required"),
  CLIENT_URL: z.string().min(1, "Client app url is required")
  // JWT_ACCESS_SECRET: z.string().min(12),
  // JWT_REFRESH_SECRET: z.string().min(12),
  // CLOUDINARY_NAME: z.string(),
  // CLOUDINARY_APIKEY: z.string(),
  // CLOUDINARY_APISECRET: z.string(),
  // API_URL: z.string()
});

const serverEnv = envSchema.parse(process.env);

export default serverEnv;
