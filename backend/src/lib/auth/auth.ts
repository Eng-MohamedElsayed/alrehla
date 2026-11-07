import type { ConfigService } from '@nestjs/config';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import type { PrismaService } from '../database/prisma.service.js';
import { authOptions } from './auth-options.js';

export function createAuth(
  prisma: PrismaService,
  configService: ConfigService,
) {
  const trustedOrigins = configService
    .get<string>('BETTER_AUTH_TRUSTED_ORIGINS')
    ?.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  return betterAuth({
    ...authOptions,
    database: prismaAdapter(prisma, { provider: 'postgresql' }),
    secret: configService.getOrThrow<string>('BETTER_AUTH_SECRET'),
    baseURL: configService.getOrThrow<string>('BETTER_AUTH_URL'),
    ...(trustedOrigins?.length ? { trustedOrigins } : {}),
  });
}
