import type { DealStatus, DocumentType } from '@prisma/client';

import { prisma } from '@/lib/prisma';

/**
 * Lectures propres a un investisseur connecte.
 *
 * Toutes les fonctions prennent l'identifiant en argument et filtrent dessus :
 * aucune requete de ce module ne peut renvoyer les donnees d'un autre compte.
 */

export type PositionView = {
  id: string;
  dealId: string;
  dealName: string;
  dealSlug: string;
  sector: string;
  status: DealStatus;
  amountInvested: number;
  currentValue: number;
  /** Performance en pourcentage depuis la souscription. */
  performance: number;
  investedAt: Date;
};

/** Participations de l'investisseur, de la plus recente a la plus ancienne. */
export async function getPositions(userId: string): Promise<PositionView[]> {
  const investments = await prisma.investment.findMany({
    where: { userId },
    include: {
      deal: {
        select: { id: true, name: true, slug: true, sector: true, status: true },
      },
    },
    orderBy: { investedAt: 'desc' },
  });

  return investments.map((investment) => {
    const amountInvested = Number(investment.amountInvested);
    const currentValue = Number(investment.currentValue);

    return {
      id: investment.id,
      dealId: investment.deal.id,
      dealName: investment.deal.name,
      dealSlug: investment.deal.slug,
      sector: investment.deal.sector,
      status: investment.deal.status,
      amountInvested,
      currentValue,
      performance:
        amountInvested > 0
          ? ((currentValue - amountInvested) / amountInvested) * 100
          : 0,
      investedAt: investment.investedAt,
    };
  });
}

export type PortfolioSummary = {
  /** Somme des montants souscrits. */
  committed: number;
  /** Somme des dernieres valorisations connues. */
  currentValue: number;
  /** Performance agregee, en pourcentage. */
  performance: number;
  positionCount: number;
  /** Prochaine cloture parmi les operations ouvertes, toutes operations confondues. */
  nextClosing: { name: string; closingDate: Date } | null;
};

/** Chiffres de la vue d'ensemble. */
export async function getPortfolioSummary(
  userId: string,
): Promise<PortfolioSummary> {
  const [positions, nextClosing] = await Promise.all([
    getPositions(userId),
    prisma.deal.findFirst({
      where: { status: { in: ['OPEN', 'CLOSING_SOON'] }, closingDate: { gte: new Date() } },
      orderBy: { closingDate: 'asc' },
      select: { name: true, closingDate: true },
    }),
  ]);

  const committed = positions.reduce((total, p) => total + p.amountInvested, 0);
  const currentValue = positions.reduce((total, p) => total + p.currentValue, 0);

  return {
    committed,
    currentValue,
    performance:
      committed > 0 ? ((currentValue - committed) / committed) * 100 : 0,
    positionCount: positions.length,
    nextClosing,
  };
}

export type DocumentView = {
  id: string;
  title: string;
  type: DocumentType;
  fileUrl: string;
  sizeBytes: number | null;
  createdAt: Date;
  /** Nom de l'operation concernee, ou null pour un document de compte. */
  dealName: string | null;
};

/**
 * Documents visibles par l'investisseur : ceux rattaches a son compte, plus
 * ceux des operations auxquelles il a souscrit.
 */
export async function getDocuments(userId: string): Promise<DocumentView[]> {
  const investments = await prisma.investment.findMany({
    where: { userId },
    select: { dealId: true },
  });

  const dealIds = investments.map((investment) => investment.dealId);

  const documents = await prisma.document.findMany({
    where: {
      OR: [{ userId }, ...(dealIds.length ? [{ dealId: { in: dealIds } }] : [])],
    },
    include: { deal: { select: { name: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return documents.map((document) => ({
    id: document.id,
    title: document.title,
    type: document.type,
    fileUrl: document.fileUrl,
    sizeBytes: document.sizeBytes,
    createdAt: document.createdAt,
    dealName: document.deal?.name ?? null,
  }));
}
