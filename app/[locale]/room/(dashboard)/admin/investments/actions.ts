'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin';
import { investmentSchema } from '@/lib/admin-validations';
import { localizedPath, isLocale, defaultLocale } from '@/lib/i18n/config';
import type { FormState } from '@/lib/validations';

function backPath(formData: FormData) {
  const locale = String(formData.get('locale') ?? '');
  return localizedPath(
    isLocale(locale) ? locale : defaultLocale,
    '/room/admin/investments',
  );
}

function parse(formData: FormData) {
  return investmentSchema.safeParse({
    userId: formData.get('userId'),
    dealId: formData.get('dealId'),
    amountInvested: formData.get('amountInvested'),
    currentValue: formData.get('currentValue'),
    investedAt: formData.get('investedAt'),
  });
}

export async function createInvestment(
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
    await prisma.investment.create({
      data: {
        ...parsed.data,
        investedAt: new Date(parsed.data.investedAt),
      },
    });
  } catch (error) {
    console.error('[admin] création de la participation impossible', error);
    return {
      status: 'error',
      message:
        'Enregistrement impossible — cet investisseur a peut-être déjà une participation sur cette opération.',
    };
  }

  revalidatePath('/room/admin/investments');
  redirect(backPath(formData));
}

export async function updateInvestment(
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
    await prisma.investment.update({
      where: { id },
      data: {
        ...parsed.data,
        investedAt: new Date(parsed.data.investedAt),
      },
    });
  } catch (error) {
    console.error('[admin] mise à jour de la participation impossible', error);
    return {
      status: 'error',
      message: 'Enregistrement impossible.',
    };
  }

  revalidatePath('/room/admin/investments');
  redirect(backPath(formData));
}

export async function deleteInvestment(id: string) {
  await requireAdmin();
  await prisma.investment.delete({ where: { id } });
  revalidatePath('/room/admin/investments');
}
