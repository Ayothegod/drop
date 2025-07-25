import { z } from "zod";

const envSchema = z.object({
  // NODE_ENV: z.enum(["development", "production", "test"]),
  VITE_API_URL: z.string().url(),
  VITE_CLIENT_URL: z.string().url(),
});

const clientEnv = envSchema.parse(import.meta.env);

export default clientEnv;
