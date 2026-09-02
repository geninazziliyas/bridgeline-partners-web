import { fr, type Dictionary } from '@/lib/i18n/dictionaries/fr';
import { en } from '@/lib/i18n/dictionaries/en';
import { defaultLocale, isLocale, type Locale } from '@/lib/i18n/config';

const dictionaries: Record<Locale, Dictionary> = { fr, en };

/**
 * Dictionnaire d'une langue. Les deux sont importés statiquement : ils pèsent
 * quelques kilo-octets et sont rendus côté serveur, un chargement dynamique
 * n'apporterait ici qu'une latence supplémentaire.
 */
export function getDictionary(locale: string): Dictionary {
  return dictionaries[isLocale(locale) ? locale : defaultLocale];
}

export type { Dictionary };
export * from '@/lib/i18n/config';
