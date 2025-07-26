import { z } from "zod";
import dotenv from "dotenv";
import logger from "../logger/winston.logger";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.coerce.number().default(3000),
  CORS_ORIGIN: z.string().url(),
  SESSION_SECRET: z.string().min(1, "Session secret is required"),
  SENDGRID_API_KEY: z.string().min(1, "Sendgrid API key is required"),
  SENDGRID_EMAIL_FROM: z.string().email("Invalid email format for Resend"),
  GOOGLE_APP_PASSWORD: z.string().min(1, "Google app password is required"),
  VERIFICATION_SECRET: z.string().min(1, "Verification secret is required"),

  DATABASE_URL: z.string().url(),
  CLIENT_URL: z.string().url().min(1, "Client app url is required"),
  SERVER_URL: z.string().url().min(1, "server url is required"),
});

const _parsed = envSchema.safeParse(process.env);

if (!_parsed.success) {
  logger.error("❌ Invalid environment variables:");
  _parsed.error.errors.forEach((err) => {
    logger.error(`• ${err.path.join(".")}: ${err.message}`);
  });
  process.exit(1);
}

const serverEnv = _parsed.data;
export default serverEnv;

