import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  MONGODB_URI: z.string().optional().default(''),
  JWT_SECRET: z
    .string()
    .min(32, 'JWT_SECRET must be at least 32 characters long')
    .default('zora_super_secret_enterprise_jwt_key_2026_change_in_prod_998877'),
  SMTP_HOST: z.string().default('smtp.gmail.com'),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_USER: z.string().default('zorasolution.official@gmail.com'),
  SMTP_PASS: z.string().optional().default(''),
  NOTIFICATION_EMAIL: z.string().email().default('zorasolution.official@gmail.com'),
  ADMIN_INITIAL_EMAIL: z.string().email().default('zorasolution.official@gmail.com'),
  ADMIN_INITIAL_PASSWORD: z.string().min(8).default('ZoraAdmin!2026#Secure'),
  TURNSTILE_SECRET_KEY: z.string().optional().default(''),
  NEXT_PUBLIC_SITE_URL: z.string().default('http://localhost:3000'),
});

const parsed = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  NOTIFICATION_EMAIL: process.env.NOTIFICATION_EMAIL,
  ADMIN_INITIAL_EMAIL: process.env.ADMIN_INITIAL_EMAIL,
  ADMIN_INITIAL_PASSWORD: process.env.ADMIN_INITIAL_PASSWORD,
  TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});

if (!parsed.success) {
  console.warn(
    '[Zora Security] Environment validation warning, using hardened defaults:',
    parsed.error.flatten().fieldErrors
  );
}

export const env = parsed.success
  ? parsed.data
  : envSchema.parse({});

