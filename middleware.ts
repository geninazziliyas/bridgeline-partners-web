import { NextResponse, type NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { defaultLocale, isLocale, locales } from '@/lib/i18n/config';

/**
 * Un seul middleware pour deux responsabilités, dans cet ordre :
 *
 * 1. Langue. Toute URL sans préfixe de langue est redirigée vers la version
 *    correspondante, choisie d'après le cookie de préférence puis d'après
 *    l'en-tête Accept-Language du navigateur.
 * 2. Authentification. Les pages de la Room situées derrière la connexion sont
 *    refusées sans jeton de session valide, avec retour vers /[locale]/room/login
 *    et la destination d'origine en callbackUrl.
 *
 * La vérification de session est refaite côté serveur dans le layout du segment
 * protégé : le middleware filtre, le layout garantit.
 */

const LOCALE_COOKIE = 'bridgeline_locale';

/** Segments protégés, exprimés sans le préfixe de langue. */
const protectedSegments = ['/room/dashboard', '/room/opportunities', '/room/portfolio', '/room/documents'];

/**
 * Langue à servir pour une URL sans préfixe.
 *
 * Seul le choix explicite du visiteur, mémorisé en cookie, écarte l'anglais.
 * La langue du navigateur n'est volontairement pas consultée : l'anglais est la
 * version d'arrivée du site. Pour revenir à une détection automatique, il
 * suffirait de lire l'en-tête Accept-Language avant ce repli.
 */
function resolveLocale(request: NextRequest) {
  const fromCookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (fromCookie && isLocale(fromCookie)) return fromCookie;

  return defaultLocale;
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  // 1. Aucune langue dans l'URL : on redirige vers la version adéquate.
  if (!hasLocale) {
    const locale = resolveLocale(request);
    const target = new URL(
      `/${locale}${pathname === '/' ? '' : pathname}${search}`,
      request.url,
    );
    return NextResponse.redirect(target);
  }

  // 2. Page protégée : il faut un jeton de session.
  const locale = pathname.split('/')[1];
  const withoutLocale = pathname.slice(locale.length + 1) || '/';

  if (protectedSegments.some((segment) => withoutLocale.startsWith(segment))) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      const login = new URL(`/${locale}/room/login`, request.url);
      login.searchParams.set('callbackUrl', `${pathname}${search}`);
      return NextResponse.redirect(login);
    }
  }

  return NextResponse.next();
}

/**
 * Exclut les routes techniques : API (dont NextAuth), fichiers internes de
 * Next, et tout chemin comportant une extension de fichier (images, PDF...).
 */
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
