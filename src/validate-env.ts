import { z } from 'zod';

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends z.infer<typeof ZodEnvironmentVariables> {}
  }
}

const ZodEnvironmentVariables = z.object({
  TOKEN: z.string(),
  CLIENT_ID: z.string(),
  MONGODB_URL: z.string(),

  DEV_GUILD_ID: z.string().optional(),
  PORT: z.string().optional(),

  SENTRY_DSN: z.string().optional(),
});

ZodEnvironmentVariables.parse(process.env);

console.log('✅ Environment variables verified!');
