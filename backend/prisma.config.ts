import { config as loadEnv } from 'dotenv';
import { defineConfig } from 'prisma/config';

loadEnv({ path: '.env.local' });

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // An empty fallback allows `prisma generate` before the Neon URL is added.
    // Migration commands require DATABASE_URL_UNPOOLED to be set.
    url: process.env.DATABASE_URL_UNPOOLED ?? '',
  },
});
