import { NextResponse, type NextRequest } from 'next/server';

import { defaultLocale, isLocale, locales } from '@/lib/i18n/config';

/**
 * Langue uniquement. Toute URL sans préfixe de langue est redirigée vers la
 * version adéquate, choisie d'après le cookie de préférence puis repliée sur
 * l'anglais.
 *
 * L'authentification des pages de la Room n'est PAS vérifiée ici : elle l'est
 * exclusivement côté serveur dans le layout du segment protégé (Node.js, via
 * `auth()`). Le middleware tournant en edge runtime, son verdict sur le jeton
 * de session peut diverger de celui du layout — observé concrètement sur
 * Vercel sous la forme d'une boucle de redirection (middleware renvoie vers
 * /login, dont le rendu détecte une session valide et renvoie vers le
 * dashboard, que le middleware refuse à nouveau, etc.). Netlify n'a jamais
 * montré ce symptôme, mais autant ne dépendre que d'un seul verdict fiable.
 */

const LOCALE_COOKIE = 'bridgeline_locale';

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

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  // Aucune langue dans l'URL : on redirige vers la version adéquate.
  if (!hasLocale) {
    const locale = resolveLocale(request);
    const target = new URL(
      `/${locale}${pathname === '/' ? '' : pathname}${search}`,
      request.url,
    );
    return NextResponse.redirect(target);
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
