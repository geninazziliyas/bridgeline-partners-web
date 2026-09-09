'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin';
import { documentSchema } from '@/lib/admin-validations';
import { localizedPath, isLocale, defaultLocale } from '@/lib/i18n/config';
import type { FormState } from '@/lib/validations';

function backPath(formData: FormData) {
  const locale = String(formData.get('locale') ?? '');
  return localizedPath(
    isLocale(locale) ? locale : defaultLocale,
    '/room/admin/documents',
  );
}

export async function createDocument(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();

  const parsed = documentSchema.safeParse({
    title: formData.get('title'),
    type: formData.get('type'),
    fileUrl: formData.get('fileUrl'),
    sizeBytes: formData.get('sizeBytes'),
    dealId: formData.get('dealId'),
    userId: formData.get('userId'),
  });

  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Vérifiez les champs en rouge.',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await prisma.document.create({ data: parsed.data });
  } catch (error) {
    console.error('[admin] création du document impossible', error);
    return { status: 'error', message: 'Enregistrement impossible.' };
  }

  revalidatePath('/room/admin/documents');
  redirect(backPath(formData));
}

export async function deleteDocument(id: string) {
  await requireAdmin();
  await prisma.document.delete({ where: { id } });
  revalidatePath('/room/admin/documents');
}
