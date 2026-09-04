'use server';

import { prisma } from '@/lib/prisma';
import { sendContactConfirmation, sendContactNotification } from '@/lib/email';
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

  // L'enregistrement fait foi : lui seul décide de ce que voit le visiteur.
  try {
    await prisma.contactMessage.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email.toLowerCase(),
        company: parsed.data.company ?? null,
        message: parsed.data.message,
      },
    });
  } catch (error) {
    console.error('[contact] message non enregistré', error);
    return { status: 'error', message: dict.forms.feedback.contactFailure };
  }

  /**
   * Notification hors du bloc précédent : le message est déjà archivé, et
   * annoncer un échec pousserait le visiteur à le renvoyer alors que l'équipe
   * le possède déjà. L'incident est journalisé, pas reporté sur le visiteur.
   */
  try {
    await sendContactNotification(parsed.data);
  } catch (error) {
    console.error('[contact] message archivé mais notification non envoyée', error);
  }

  try {
    await sendContactConfirmation(parsed.data);
  } catch (error) {
    console.error('[contact] message archivé mais accusé de réception non envoyé', error);
  }

  return { status: 'success', message: dict.forms.feedback.contactSuccess };
}
