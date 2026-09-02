'use server';

import { prisma } from '@/lib/prisma';
import { sendAccessRequestEmails } from '@/lib/email';
import { buildSchemas, type FormState } from '@/lib/validations';
import { getDictionary } from '@/lib/i18n';

/**
 * Demande d'accès à l'espace investisseur.
 *
 * La demande est enregistrée avec le statut PENDING et notifiée à l'équipe.
 * Aucun compte n'est créé ici : le provisionnement reste manuel, après
 * vérification de l'éligibilité du demandeur.
 */
export async function submitAccessRequest(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const dict = getDictionary(String(formData.get('locale') ?? 'en'));

  const parsed = buildSchemas(dict).accessRequest.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    organisation: formData.get('organisation'),
    // Un select vide envoie une chaîne vide, que zod doit voir comme absente.
    investorType: formData.get('investorType') || undefined,
    message: formData.get('message'),
    // Une case non cochée n'est pas envoyée du tout : absente vaut false.
    privacy: formData.get('privacy') === 'true',
    professional: formData.get('professional') === 'true',
  });

  if (!parsed.success) {
    return {
      status: 'error',
      message: dict.forms.feedback.checkFields,
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const now = new Date();

  // L'enregistrement fait foi : lui seul décide de ce que voit le demandeur.
  try {
    await prisma.accessRequest.create({
      data: {
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        email: parsed.data.email.toLowerCase(),
        organisation: parsed.data.organisation ?? null,
        investorType: parsed.data.investorType ?? null,
        message: parsed.data.message ?? null,
        privacyAcceptedAt: now,
        professionalConfirmedAt: now,
      },
    });
  } catch (error) {
    console.error('[room] demande d’accès non enregistrée', error);
    return { status: 'error', message: dict.forms.feedback.accessFailure };
  }

  /**
   * L'envoi des emails est volontairement hors du bloc précédent.
   *
   * La demande est déjà en base : annoncer un échec au demandeur le pousserait
   * à renvoyer le formulaire, créant des doublons pour une demande que
   * l'équipe possède déjà. L'incident est journalisé pour être traité côté
   * exploitation, pas reporté sur le visiteur.
   */
  try {
    await sendAccessRequestEmails({
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      email: parsed.data.email,
      organisation: parsed.data.organisation ?? null,
      investorType: parsed.data.investorType
        ? dict.investorType[parsed.data.investorType]
        : null,
      message: parsed.data.message ?? null,
    });
  } catch (error) {
    console.error(
      '[room] demande enregistrée mais notification email non envoyée',
      error,
    );
  }

  return { status: 'success', message: dict.forms.feedback.accessSuccess };
}
