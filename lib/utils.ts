import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { localeTags, type Locale } from '@/lib/i18n/config';

/** Fusionne des classes Tailwind en résolvant les conflits. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formatage des montants, dates et pourcentages.
 *
 * Toutes ces fonctions prennent la langue courante : le français écrit
 * « 1 200 000 € » et « 28/11/2026 », l'anglais « €1,200,000 » et « 28/11/2026 »
 * avec des séparateurs différents. Un formatage figé trahirait la traduction.
 */

export function formatCurrency(value: number, locale: Locale) {
  return new Intl.NumberFormat(localeTags[locale], {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}

/** Montant abrégé pour les tuiles de synthèse. Exemple : 27,4 M EUR. */
export function formatCompactCurrency(value: number, locale: Locale) {
  const tag = localeTags[locale];

  if (Math.abs(value) >= 1_000_000) {
    return `${(value / 1_000_000).toLocaleString(tag, {
      maximumFractionDigits: 1,
    })} M EUR`;
  }
  if (Math.abs(value) >= 1_000) {
    return `${(value / 1_000).toLocaleString(tag, {
      maximumFractionDigits: 0,
    })} k EUR`;
  }
  return formatCurrency(value, locale);
}

/** Performance signée, en pourcentage. Exemple : +8,3 %. */
export function formatPercent(value: number, locale: Locale) {
  const formatted = value.toLocaleString(localeTags[locale], {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  return `${value > 0 ? '+' : ''}${formatted} %`;
}

/** Date longue. Exemple : 28 novembre 2026 / 28 November 2026. */
export function formatDate(date: Date | string, locale: Locale) {
  return new Date(date).toLocaleDateString(localeTags[locale], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** Date courte. Exemple : 28/11/2026. */
export function formatShortDate(date: Date | string, locale: Locale) {
  return new Date(date).toLocaleDateString(localeTags[locale]);
}

/** Taille de fichier lisible. Exemple : 1,2 Mo / 1.2 MB. */
export function formatBytes(bytes: number | null | undefined, locale: Locale) {
  if (!bytes) return null;
  const tag = localeTags[locale];
  const unit = locale === 'fr' ? { mega: 'Mo', kilo: 'ko' } : { mega: 'MB', kilo: 'kB' };

  if (bytes >= 1_000_000) {
    return `${(bytes / 1_000_000).toLocaleString(tag, {
      maximumFractionDigits: 1,
    })} ${unit.mega}`;
  }
  return `${Math.round(bytes / 1000)} ${unit.kilo}`;
}

/** Performance d'une participation, en pourcentage. */
export function performance(invested: number, current: number) {
  if (invested === 0) return 0;
  return ((current - invested) / invested) * 100;
}

/** Nombre de jours restants avant une date. Négatif si la date est passée. */
export function daysUntil(date: Date | string) {
  const diff = new Date(date).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/** Initiales d'un nom complet, pour les pastilles de compte. */
export function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}
