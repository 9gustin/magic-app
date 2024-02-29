import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    WEBAPP_URL: z.string().url(),
    RESEND_API_KEY: z.string(),
    NODEMAILER_LOCAL_USER: z.string().optional(),
    NODEMAILER_LOCAL_PASS: z.string().optional(),
  },
  client: {
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    WEBAPP_URL: process.env.WEBAPP_URL,
    NODEMAILER_LOCAL_USER: process.env.NODEMAILER_LOCAL_USER,
    NODEMAILER_LOCAL_PASS: process.env.NODEMAILER_LOCAL_PASS,
  },
});
