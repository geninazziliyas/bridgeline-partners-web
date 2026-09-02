/**
 * Configuration des langues du site.
 *
 * Chaque langue a ses propres URLs (/fr/..., /en/...) : c'est la seule forme
 * qui permette aux moteurs de recherche d'indexer les deux versions et de
 * servir la bonne selon la requete.
 */

export const locales = ['fr', 'en'] as const;

export type Locale = (typeof locales)[number];

/** Langue servie a la racine du site et quand aucune preference n'est lisible. */
export const defaultLocale: Locale = 'fr';

/** Libelles du selecteur de langue, dans leur propre langue. */
export const localeNames: Record<Locale, string> = {
  fr: 'Francais',
  en: 'English',
};

/** Code de langue complet, pour l'attribut lang et le formatage des nombres. */
export const localeTags: Record<Locale, string> = {
  fr: 'fr-FR',
  en: 'en-GB',
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Prefixe un chemin interne de la langue courante.
 * `path` commence toujours par une barre oblique, ou vaut '/' pour l'accueil.
 */
export function localizedPath(locale: Locale, path: string): string {
  if (path === '/') return `/${locale}`;
  return `/${locale}${path}`;
}

/**
 * Retire le prefixe de langue d'un chemin, pour reconstruire la meme page dans
 * l'autre langue. `/fr/team` devient `/team`, `/fr` devient `/`.
 */
export function stripLocale(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length && isLocale(segments[0])) {
    const rest = segments.slice(1).join('/');
    return rest ? `/${rest}` : '/';
  }
  return pathname;
}
