'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { hash } from 'bcryptjs';

import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin';
import { userSchema } from '@/lib/admin-validations';
import { localizedPath, isLocale, defaultLocale } from '@/lib/i18n/config';
import type { FormState } from '@/lib/validations';

function backPath(formData: FormData) {
  const locale = String(formData.get('locale') ?? '');
  return localizedPath(isLocale(locale) ? locale : defaultLocale, '/room/admin/investors');
}

function parse(formData: FormData) {
  return userSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company'),
    jurisdiction: formData.get('jurisdiction'),
    role: formData.get('role'),
    password: formData.get('password'),
  });
}

export async function createUser(
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

  const { password, ...data } = parsed.data;

  try {
    await prisma.user.create({
      data: {
        ...data,
        email: data.email.toLowerCase(),
        // Sans mot de passe, le compte se connecte uniquement par lien
        // magique — c'est un choix valide, pas un oubli.
        passwordHash: password ? await hash(password, 12) : null,
        emailVerified: new Date(),
      },
    });
  } catch (error) {
    console.error('[admin] création de l’investisseur impossible', error);
    return {
      status: 'error',
      message: 'Enregistrement impossible — cet email est peut-être déjà utilisé.',
    };
  }

  revalidatePath('/room/admin/investors');
  redirect(backPath(formData));
}

export async function updateUser(
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

  const { password, ...data } = parsed.data;

  try {
    await prisma.user.update({
      where: { id },
      data: {
        ...data,
        email: data.email.toLowerCase(),
        // Champ laissé vide : le mot de passe existant n'est pas touché.
        ...(password ? { passwordHash: await hash(password, 12) } : {}),
      },
    });
  } catch (error) {
    console.error('[admin] mise à jour de l’investisseur impossible', error);
    return {
      status: 'error',
      message: 'Enregistrement impossible — cet email est peut-être déjà utilisé.',
    };
  }

  revalidatePath('/room/admin/investors');
  redirect(backPath(formData));
}

export async function deleteUser(id: string) {
  const session = await requireAdmin();
  // Empêche de se supprimer soi-même : un admin qui se retire par erreur
  // perdrait aussitôt l'accès à cette page pour se rattraper.
  if (session.user.id === id) return;

  await prisma.user.delete({ where: { id } });
  revalidatePath('/room/admin/investors');
}
