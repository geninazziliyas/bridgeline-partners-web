'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin';

/**
 * Approuver crée directement le compte investisseur à partir des informations
 * déjà fournies dans la demande — sans mot de passe, connexion par lien
 * magique. Si un compte existe déjà pour cet email (demande en double, ou
 * compte créé entre-temps depuis "Comptes"), la demande passe quand même à
 * APPROVED sans erreur ni doublon.
 */
export async function approveAccessRequest(id: string) {
  await requireAdmin();

  const request = await prisma.accessRequest.findUnique({ where: { id } });
  if (!request) return;

  await prisma.user.upsert({
    where: { email: request.email.toLowerCase() },
    update: {},
    create: {
      name: `${request.firstName} ${request.lastName}`.trim(),
      email: request.email.toLowerCase(),
      company: request.organisation,
      role: 'INVESTOR',
      emailVerified: new Date(),
    },
  });

  await prisma.accessRequest.update({
    where: { id },
    data: { status: 'APPROVED' },
  });

  revalidatePath('/room/admin/access-requests');
  revalidatePath('/room/admin/investors');
}

export async function rejectAccessRequest(id: string) {
  await requireAdmin();
  await prisma.accessRequest.update({
    where: { id },
    data: { status: 'REJECTED' },
  });
  revalidatePath('/room/admin/access-requests');
}
