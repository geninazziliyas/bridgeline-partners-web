import type { UserRole } from '@prisma/client';
import type { DefaultSession } from 'next-auth';

/**
 * Extension des types NextAuth : la session porte l'identifiant, le role et la
 * societe de l'investisseur, exploites par la Room.
 */
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      company: string | null;
    } & DefaultSession['user'];
  }

  interface User {
    role?: UserRole;
    company?: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    uid?: string;
    role?: UserRole;
    company?: string | null;
  }
}
