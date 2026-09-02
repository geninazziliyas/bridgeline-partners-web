import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Fusionne des classes Tailwind en resolvant les conflits. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const currencyFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

/** Montant en euros, sans decimales. Exemple : 27 350 000 EUR. */
export function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

/**
 * Montant abrege pour les tuiles de synthese.
 * Exemple : 27,4 M EUR / 750 k EUR.
 */
export function formatCompactCurrency(value: number) {
  if (Math.abs(value) >= 1_000_000) {
    return `${(value / 1_000_000).toLocaleString('fr-FR', {
      maximumFractionDigits: 1,
    })} M EUR`;
  }
  if (Math.abs(value) >= 1_000) {
    return `${(value / 1_000).toLocaleString('fr-FR', {
      maximumFractionDigits: 0,
    })} k EUR`;
  }
  return formatCurrency(value);
}

/** Performance signee, en pourcentage. Exemple : +8,3 %. */
export function formatPercent(value: number) {
  const formatted = value.toLocaleString('fr-FR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  return `${value > 0 ? '+' : ''}${formatted} %`;
}

/** Performance d'une participation, en pourcentage. */
export function performance(invested: number, current: number) {
  if (invested === 0) return 0;
  return ((current - invested) / invested) * 100;
}

/** Date longue en francais. Exemple : 28 novembre 2026. */
export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** Date courte en francais. Exemple : 28/11/2026. */
export function formatShortDate(date: Date | string) {
  return new Date(date).toLocaleDateString('fr-FR');
}

/** Taille de fichier lisible. Exemple : 1,2 Mo. */
export function formatBytes(bytes: number | null | undefined) {
  if (!bytes) return null;
  if (bytes >= 1_000_000) {
    return `${(bytes / 1_000_000).toLocaleString('fr-FR', {
      maximumFractionDigits: 1,
    })} Mo`;
  }
  return `${Math.round(bytes / 1000)} ko`;
}

/** Nombre de jours restants avant une date. Negatif si la date est passee. */
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
