import { withAuth } from 'next-auth/middleware';

/**
 * Premiere barriere d'authentification : toute requete vers une route de la
 * Room sans jeton de session valide est redirigee vers /room/login, avec la
 * destination initiale en callbackUrl.
 *
 * La verification de session est refaite cote serveur dans le layout du
 * segment protege : le middleware filtre, le layout garantit.
 */
export default withAuth({
  pages: {
    signIn: '/room/login',
  },
});

/**
 * Les pages publiques de la Room (/room et /room/login) sont volontairement
 * absentes de ce matcher.
 */
export const config = {
  matcher: [
    '/room/dashboard/:path*',
    '/room/opportunities/:path*',
    '/room/portfolio/:path*',
    '/room/documents/:path*',
  ],
};
