import type { Deal, DealStatus, Prisma } from '@prisma/client';

import { prisma } from '@/lib/prisma';
import type { Locale } from '@/lib/i18n/config';

/**
 * Accès aux opérations.
 *
 * Deux conversions sont faites ici, une fois pour toutes :
 * les Decimal de Prisma deviennent des nombres (un Decimal n'est pas
 * sérialisable vers un Client Component), et les champs traduisibles sont
 * résolus dans la langue demandée, avec repli sur le français.
 */
export type DealView = {
  id: string;
  name: string;
  slug: string;
  summary: string;
  description: string;
  sector: string;
  geography: string;
  currency: string;
  status: DealStatus;
  targetAmount: number;
  raisedAmount: number;
  minTicket: number;
  closingDate: Date;
  featured: boolean;
  /** Avancement de la levée, en pourcentage. */
  progress: number;
};

/** Renvoie la traduction si elle existe, sinon le texte de référence. */
function translate(base: string, translation: string | null, locale: Locale) {
  if (locale === 'fr') return base;
  return translation?.trim() ? translation : base;
}

function toView(deal: Deal, locale: Locale): DealView {
  const targetAmount = Number(deal.targetAmount);
  const raisedAmount = Number(deal.raisedAmount);

  return {
    id: deal.id,
    name: deal.name,
    slug: deal.slug,
    summary: translate(deal.summary, deal.summaryEn, locale),
    description: translate(deal.description, deal.descriptionEn, locale),
    sector: translate(deal.sector, deal.sectorEn, locale),
    geography: translate(deal.geography, deal.geographyEn, locale),
    currency: deal.currency,
    status: deal.status,
    targetAmount,
    raisedAmount,
    minTicket: Number(deal.minTicket),
    closingDate: deal.closingDate,
    featured: deal.featured,
    progress: targetAmount > 0 ? (raisedAmount / targetAmount) * 100 : 0,
  };
}

/**
 * Opérations affichées sur le site public.
 *
 * Le site vitrine doit rester consultable même si la base est injoignable :
 * l'erreur est journalisée et la section bascule sur son état vide plutôt que
 * de faire échouer le rendu de la page d'accueil.
 */
export async function getPublicDeals(
  locale: Locale,
  limit = 4,
): Promise<DealView[]> {
  try {
    const deals = await prisma.deal.findMany({
      where: { status: { not: 'CLOSED' } },
      orderBy: [{ featured: 'desc' }, { closingDate: 'asc' }],
      take: limit,
    });
    return deals.map((deal) => toView(deal, locale));
  } catch (error) {
    console.error('[deals] lecture impossible sur le site public', error);
    return [];
  }
}

/** Opérations mises en avant sur la vue d'ensemble de la Room. */
export async function getFeaturedDeals(
  locale: Locale,
  limit = 3,
): Promise<DealView[]> {
  const deals = await prisma.deal.findMany({
    where: { featured: true, status: { not: 'CLOSED' } },
    orderBy: { closingDate: 'asc' },
    take: limit,
  });
  return deals.map((deal) => toView(deal, locale));
}

export type DealFilters = {
  /** Recherche plein texte sur le nom, l'accroche et le secteur. */
  query?: string;
  status?: DealStatus;
};

/**
 * Liste filtrée des opérations de la Room. Le filtrage est fait en base : la
 * page reste un Server Component, l'état vit dans l'URL et reste partageable.
 * La recherche porte sur les deux langues, pour qu'un mot-clé anglais trouve
 * une opération dont seule la version française est renseignée.
 */
export async function getDeals(
  locale: Locale,
  filters: DealFilters = {},
): Promise<DealView[]> {
  const where: Prisma.DealWhereInput = {};

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.query) {
    const contains = { contains: filters.query, mode: 'insensitive' } as const;
    where.OR = [
      { name: contains },
      { summary: contains },
      { sector: contains },
      { summaryEn: contains },
      { sectorEn: contains },
    ];
  }

  const deals = await prisma.deal.findMany({
    where,
    orderBy: [{ status: 'asc' }, { closingDate: 'asc' }],
  });

  return deals.map((deal) => toView(deal, locale));
}
