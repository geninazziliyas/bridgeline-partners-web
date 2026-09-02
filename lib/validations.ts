import { z } from 'zod';

import type { Dictionary } from '@/lib/i18n/dictionaries/fr';

/**
 * Schémas de validation, construits à partir du dictionnaire de la langue
 * courante : les messages d'erreur s'affichent dans la langue de la page.
 *
 * La validation côté serveur fait foi : le navigateur peut toujours contourner
 * les attributs HTML.
 */
export function buildSchemas(dict: Dictionary) {
  const errors = dict.forms.errors;

  const name = z
    .string()
    .trim()
    .min(2, errors.nameRequired)
    .max(120, errors.nameTooLong);

  const email = z
    .string()
    .trim()
    .min(1, errors.emailRequired)
    .email(errors.emailInvalid)
    .max(200, errors.emailTooLong);

  const company = z
    .string()
    .trim()
    .max(160, errors.companyTooLong)
    .optional()
    .transform((value) => (value ? value : undefined));

  return {
    contact: z.object({
      name,
      email,
      company,
      message: z
        .string()
        .trim()
        .min(20, errors.messageTooShort)
        .max(4000, errors.messageTooLong),
    }),

    accessRequest: z.object({
      firstName: z
        .string()
        .trim()
        .min(1, errors.firstNameRequired)
        .max(80, errors.nameTooLong),
      lastName: z
        .string()
        .trim()
        .min(1, errors.lastNameRequired)
        .max(80, errors.nameTooLong),
      email,
      organisation: company,
      /**
       * Le select est facultatif, mais une valeur envoyée doit appartenir à
       * l'énumération : un champ trafiqué ne doit pas atteindre la base.
       */
      investorType: z
        .enum(['FAMILY_OFFICE', 'WEALTH_MANAGER', 'INSTITUTIONAL', 'PRIVATE_INVESTOR', 'OTHER'])
        .optional(),
      message: z
        .string()
        .trim()
        .max(4000, errors.messageTooLong)
        .optional()
        .transform((value) => (value ? value : undefined)),
      /** Les deux cases sont obligatoires : littéral true, pas un booléen libre. */
      privacy: z.literal(true, {
        errorMap: () => ({ message: errors.privacyRequired }),
      }),
      professional: z.literal(true, {
        errorMap: () => ({ message: errors.professionalRequired }),
      }),
    }),
  };
}

/**
 * Schéma de connexion. Indépendant du dictionnaire : ses messages ne sont
 * jamais affichés, NextAuth se contente de rejeter la tentative.
 */
export const loginSchema = z.object({
  email: z.string().trim().email().max(200),
  password: z.string().min(1),
});

export type ContactInput = z.infer<ReturnType<typeof buildSchemas>['contact']>;
export type AccessRequestInput = z.infer<
  ReturnType<typeof buildSchemas>['accessRequest']
>;

/** État renvoyé par les server actions de formulaire vers le client. */
export type FormState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  /** Erreurs par champ, telles que produites par zod. */
  fieldErrors?: Record<string, string[]>;
};

export const initialFormState: FormState = { status: 'idle' };
