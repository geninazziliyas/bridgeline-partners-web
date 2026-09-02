'use server';

import { prisma } from '@/lib/prisma';
import { sendAccessRequestEmails } from '@/lib/email';
import { buildSchemas, type FormState } from '@/lib/validations';
import { getDictionary } from '@/lib/i18n';

/**
 * Demande d'accès à la Bridgeline Room.
 *
 * La demande est enregistrée avec le statut PENDING et notifiée à l'équipe.
 * Aucun compte n'est créé ici : le provisionnement reste manuel, après
 * vérification de l'éligibilité du demandeur.
 */
export async function submitAccessRequest(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const dict = getDictionary(String(formData.get('locale') ?? 'fr'));

  const parsed = buildSchemas(dict).accessRequest.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company'),
    message: formData.get('message'),
  });

  if (!parsed.success) {
    return {
      status: 'error',
      message: dict.forms.feedback.checkFields,
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
    console.error('[room] demande d’accès non traitée', error);
    return { status: 'error', message: dict.forms.feedback.accessFailure };
  }

  return { status: 'success', message: dict.forms.feedback.accessSuccess };
}
