'use server';

import { prisma } from '@/lib/prisma';
import { sendContactNotification } from '@/lib/email';
import { buildSchemas, type FormState } from '@/lib/validations';
import { getDictionary } from '@/lib/i18n';

/**
 * Formulaire de contact du site public.
 *
 * Le message est archivé en base puis notifié par email à la boîte interne.
 * L'archivage précède l'envoi : si le service d'email est indisponible, la
 * demande n'est pas perdue.
 *
 * La langue arrive par un champ caché du formulaire : une server action n'a pas
 * accès à l'URL de la page qui l'appelle.
 */
export async function submitContact(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const dict = getDictionary(String(formData.get('locale') ?? 'fr'));

  const parsed = buildSchemas(dict).contact.safeParse({
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
    return { status: 'error', message: dict.forms.feedback.contactFailure };
  }

  return { status: 'success', message: dict.forms.feedback.contactSuccess };
}
