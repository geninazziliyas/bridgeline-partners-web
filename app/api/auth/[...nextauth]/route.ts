import NextAuth from 'next-auth';

import { authOptions } from '@/lib/auth';

/**
 * Point d'entree unique de NextAuth : connexion, deconnexion, callbacks des
 * providers et verification des liens magiques.
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
