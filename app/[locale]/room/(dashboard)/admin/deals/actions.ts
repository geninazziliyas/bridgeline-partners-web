'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin';
import { dealSchema } from '@/lib/admin-validations';
import { localizedPath, isLocale, defaultLocale } from '@/lib/i18n/config';
import type { FormState } from '@/lib/validations';

/** Chemin de retour après enregistrement, dans la langue du formulaire. */
function backPath(formData: FormData) {
  const locale = String(formData.get('locale') ?? '');
  return localizedPath(isLocale(locale) ? locale : defaultLocale, '/room/admin/deals');
}

function parse(formData: FormData) {
  return dealSchema.safeParse({
    name: formData.get('name'),
    slug: formData.get('slug'),
    summary: formData.get('summary'),
    description: formData.get('description'),
    sector: formData.get('sector'),
    geography: formData.get('geography'),
    summaryEn: formData.get('summaryEn'),
    descriptionEn: formData.get('descriptionEn'),
    sectorEn: formData.get('sectorEn'),
    geographyEn: formData.get('geographyEn'),
    currency: formData.get('currency') || 'EUR',
    status: formData.get('status'),
    targetAmount: formData.get('targetAmount'),
    raisedAmount: formData.get('raisedAmount'),
    minTicket: formData.get('minTicket'),
    closingDate: formData.get('closingDate'),
    featured: formData.get('featured') ?? undefined,
    newsletterUrl: formData.get('newsletterUrl'),
  });
}

export async function createDeal(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();

  const parsed = parse(formData);
  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Vérifiez les champs en rouge.',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await prisma.deal.create({
      data: {
        ...parsed.data,
        closingDate: new Date(parsed.data.closingDate),
      },
    });
  } catch (error) {
    console.error('[admin] création du deal impossible', error);
    return {
      status: 'error',
      message:
        'Enregistrement impossible — le slug est peut-être déjà utilisé par une autre opération.',
    };
  }

  revalidatePath('/room/admin/deals');
  redirect(backPath(formData));
}

export async function updateDeal(
  id: string,
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();

  const parsed = parse(formData);
  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Vérifiez les champs en rouge.',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await prisma.deal.update({
      where: { id },
      data: {
        ...parsed.data,
        closingDate: new Date(parsed.data.closingDate),
      },
    });
  } catch (error) {
    console.error('[admin] mise à jour du deal impossible', error);
    return {
      status: 'error',
      message:
        'Enregistrement impossible — le slug est peut-être déjà utilisé par une autre opération.',
    };
  }

  revalidatePath('/room/admin/deals');
  redirect(backPath(formData));
}

export async function deleteDeal(id: string) {
  await requireAdmin();
  await prisma.deal.delete({ where: { id } });
  revalidatePath('/room/admin/deals');
}
