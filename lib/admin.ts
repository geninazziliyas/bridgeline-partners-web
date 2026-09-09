import { redirect } from 'next/navigation';

import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { defaultLocale } from '@/lib/i18n/config';

/**
 * Accès aux données de l'administration (équipe Bridgeline uniquement).
 *
 * Contrairement à lib/deals.ts, ces fonctions renvoient les enregistrements
 * bruts (pas de traduction, pas de conversion Decimal -> number) : ces pages
 * sont des Server Components qui n'ont pas besoin de passer les données à un
 * Client Component, la conversion se fait donc directement dans le JSX.
 */

/**
 * Vérifie la session côté server action, en plus du layout : une action reste
 * appelable indépendamment de la page qui l'a rendue.
 */
export async function requireAdmin() {
  const session = await auth();
  if (session?.user.role !== 'ADMIN') {
    redirect(`/${defaultLocale}/room/login`);
  }
  return session;
}

export function listDealsAdmin() {
  return prisma.deal.findMany({ orderBy: { createdAt: 'desc' } });
}

export function getDealAdmin(id: string) {
  return prisma.deal.findUnique({ where: { id } });
}

export function listUsersAdmin() {
  return prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { investments: true } } },
  });
}

export function getUserAdmin(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

/** Pour les select d'investisseur dans le formulaire de participation. */
export function listInvestorOptions() {
  return prisma.user.findMany({
    orderBy: { name: 'asc' },
    select: { id: true, name: true, email: true },
  });
}

/** Pour les select de deal dans les formulaires de participation et de document. */
export function listDealOptions() {
  return prisma.deal.findMany({
    orderBy: { name: 'asc' },
    select: { id: true, name: true },
  });
}

export function listInvestmentsAdmin() {
  return prisma.investment.findMany({
    orderBy: { investedAt: 'desc' },
    include: {
      user: { select: { name: true, email: true } },
      deal: { select: { name: true } },
    },
  });
}

export function getInvestmentAdmin(id: string) {
  return prisma.investment.findUnique({ where: { id } });
}

export function listAccessRequestsAdmin() {
  return prisma.accessRequest.findMany({
    orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
  });
}

/**
 * Filet de sécurité pour le formulaire de contact public : ces messages sont
 * toujours enregistrés en base même si la notification email échoue (clé
 * Resend absente, domaine d'envoi non vérifié...). Cette liste reste donc la
 * source fiable, indépendante de la messagerie.
 */
export function listContactMessagesAdmin() {
  return prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
}

export function listDocumentsAdmin() {
  return prisma.document.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: { select: { name: true } },
      deal: { select: { name: true } },
    },
  });
}

/** Compteurs affichés sur la vue d'ensemble de l'administration. */
export async function getAdminOverviewCounts() {
  const [deals, investors, pendingRequests, contactMessages] = await Promise.all([
    prisma.deal.count(),
    prisma.user.count({ where: { role: 'INVESTOR' } }),
    prisma.accessRequest.count({ where: { status: 'PENDING' } }),
    prisma.contactMessage.count(),
  ]);
  return { deals, investors, pendingRequests, contactMessages };
}
