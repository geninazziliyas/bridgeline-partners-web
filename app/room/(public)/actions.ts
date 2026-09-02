'use server';

import { prisma } from '@/lib/prisma';
import { sendAccessRequestEmails } from '@/lib/email';
import { accessRequestSchema, type FormState } from '@/lib/validations';

/**
 * Demande d'acces a la Bridgeline Room.
 *
 * La demande est enregistree avec le statut PENDING et notifiee a l'equipe.
 * Aucun compte n'est cree ici : le provisionnement reste manuel, apres
 * verification de l'eligibilite du demandeur.
 */
export async function submitAccessRequest(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = accessRequestSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company'),
    message: formData.get('message'),
  });

  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Verifiez les champs signales.',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await prisma.accessRequest.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email.toLowerCase(),
        company: parsed.data.company ?? null,
        message: parsed.data.message ?? null,
      },
    });

    await sendAccessRequestEmails(parsed.data);
  } catch (error) {
    console.error('[room] demande d’acces non traitee', error);
    return {
      status: 'error',
      message:
        'Votre demande n’a pas pu etre enregistree. Reessayez dans quelques instants.',
    };
  }

  return {
    status: 'success',
    message:
      'Demande enregistree. Nous revenons vers vous apres verification de votre eligibilite.',
  };
}
