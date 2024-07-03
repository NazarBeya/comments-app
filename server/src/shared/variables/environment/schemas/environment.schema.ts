import { z } from 'zod';

export const EnvironmentSchema = z
  .object(
    {
      NODE_ENV: z.enum(['PROD', 'DEV', 'TYPEORM']),
      PORT: z.coerce.number().positive(),
      API_PREFIX: z.string().startsWith('/'),
      ALLOWED_ORIGINS: z.string(),
      DATABASE: z.string(),
      JWT_SECRET: z.string(),
      FIREBASE_TYPE: z.string(),
      FIREBASE_PROJECT_ID: z.string(),
      FIREBASE_PRIVATE_KEY_ID: z.string(),
      FIREBASE_PRIVATE_KEY: z.string(),
      FIREBASE_CLIENT_EMAIL: z.string(),
      FIREBASE_CLIENT_ID: z.string(),
      FIREBASE_AUTH_URI: z.string(),
      FIREBASE_TOKEN_URI: z.string(),
      FIREBASE_AUTH_PROVIDER_X509_CERT_URL: z.string(),
      FIREBASE_CLIENT_X509_CERT_URL: z.string(),
      FIREBASE_STORAGE_BUCKET: z.string(),
    },
    { required_error: '.env file is required' },
  )
  .superRefine((environment, ctx) => {
    environment.ALLOWED_ORIGINS.split(';').forEach((origin) => {
      const result = z
        .string()
        .url(`Invalid origin url(${origin})`)
        .safeParse(origin);

      if (result.success === false) {
        ctx.addIssue({ ...result.error.errors[0], path: ['ALLOWED_ORIGINS'] });
      }
    });
  });
