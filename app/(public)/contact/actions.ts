'use server';

import { prisma } from '@/lib/prisma';
import { sendContactNotification } from '@/lib/email';
import { contactSchema, type FormState } from '@/lib/validations';

/**
 * Formulaire de contact du site public.
 *
 * Le message est archive en base puis notifie par email a la boite interne.
 * L'archivage precede l'envoi : si le service d'email est indisponible, la
 * demande n'est pas perdue.
 */
export async function submitContact(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = contactSchema.safeParse({
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
    await prisma.contactMessage.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email.toLowerCase(),
        company: parsed.data.company ?? null,
        message: parsed.data.message,
      },
    });

    await sendContactNotification(parsed.data);
  } catch (error) {
    console.error('[contact] traitement du formulaire impossible', error);
    return {
      status: 'error',
      message:
        'Votre message n’a pas pu etre transmis. Reessayez ou ecrivez-nous directement.',
    };
  }

  return {
    status: 'success',
    message: 'Message transmis. Nous revenons vers vous sous deux jours ouvres.',
  };
}
