'use client';

import { SessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';

/**
 * Le SessionProvider de NextAuth s'appuie sur le contexte React : il doit donc
 * vivre dans un Client Component. C'est le seul role de ce fichier, pour que le
 * layout racine reste un Server Component.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
