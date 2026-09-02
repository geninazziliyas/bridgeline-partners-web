import type { Deal, DealStatus, Prisma } from '@prisma/client';

import { prisma } from '@/lib/prisma';

/**
 * Acces aux operations.
 *
 * Les montants sont stockes en Decimal par Prisma. Un Decimal n'est pas
 * serialisable vers un Client Component : ces fonctions renvoient donc des
 * objets deja convertis en nombres.
 */
export type DealView = Omit<
  Deal,
  'targetAmount' | 'raisedAmount' | 'minTicket'
> & {
  targetAmount: number;
  raisedAmount: number;
  minTicket: number;
  /** Avancement de la levee, en pourcentage. */
  progress: number;
};

function toView(deal: Deal): DealView {
  const targetAmount = Number(deal.targetAmount);
  const raisedAmount = Number(deal.raisedAmount);

  return {
    ...deal,
    targetAmount,
    raisedAmount,
    minTicket: Number(deal.minTicket),
    progress: targetAmount > 0 ? (raisedAmount / targetAmount) * 100 : 0,
  };
}

/**
 * Operations affichees sur le site public.
 *
 * Le site vitrine doit rester consultable meme si la base est injoignable :
 * l'erreur est journalisee et la section bascule sur son etat vide plutot que
 * de faire echouer le rendu de la page d'accueil.
 */
export async function getPublicDeals(limit = 4): Promise<DealView[]> {
  try {
    const deals = await prisma.deal.findMany({
      where: { status: { not: 'CLOSED' } },
      orderBy: [{ featured: 'desc' }, { closingDate: 'asc' }],
      take: limit,
    });
    return deals.map(toView);
  } catch (error) {
    console.error('[deals] lecture impossible sur le site public', error);
    return [];
  }
}

/** Operations mises en avant sur la vue d'ensemble de la Room. */
export async function getFeaturedDeals(limit = 3): Promise<DealView[]> {
  const deals = await prisma.deal.findMany({
    where: { featured: true, status: { not: 'CLOSED' } },
    orderBy: { closingDate: 'asc' },
    take: limit,
  });
  return deals.map(toView);
}

export type DealFilters = {
  /** Recherche plein texte sur le nom, l'accroche et le secteur. */
  query?: string;
  status?: DealStatus;
};

/**
 * Liste filtree des operations de la Room. Le filtrage est fait en base : la
 * page reste un Server Component, l'etat vit dans l'URL et reste partageable.
 */
export async function getDeals(filters: DealFilters = {}): Promise<DealView[]> {
  const where: Prisma.DealWhereInput = {};

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.query) {
    where.OR = [
      { name: { contains: filters.query, mode: 'insensitive' } },
      { summary: { contains: filters.query, mode: 'insensitive' } },
      { sector: { contains: filters.query, mode: 'insensitive' } },
    ];
  }

  const deals = await prisma.deal.findMany({
    where,
    orderBy: [{ status: 'asc' }, { closingDate: 'asc' }],
  });

  return deals.map(toView);
}
