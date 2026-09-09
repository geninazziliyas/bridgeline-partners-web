import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import ws from 'ws';

/**
 * Pilote Neon plutôt que le moteur binaire par défaut de Prisma : le moteur
 * binaire ouvre des sockets TCP, indisponibles à l'exécution sur Cloudflare
 * Workers. Le pilote Neon parle à la base en WebSocket/HTTP, ce qui fonctionne
 * aussi bien en Node (avec le polyfill `ws`) que sur Workers.
 */
neonConfig.webSocketConstructor = ws;

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

function createPrismaClient() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaNeon(pool);
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
