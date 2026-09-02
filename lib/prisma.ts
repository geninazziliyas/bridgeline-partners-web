import { PrismaClient } from '@prisma/client';

/**
 * Client Prisma en singleton.
 *
 * En developpement, le hot reload de Next.js re-evalue les modules a chaque
 * modification : sans ce cache global, chaque rechargement ouvrirait un nouveau
 * pool de connexions jusqu'a saturer la base.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
