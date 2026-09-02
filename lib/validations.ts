import { z } from 'zod';

/**
 * Schemas de validation partages entre les server actions et l'affichage des
 * erreurs de formulaire. La validation cote serveur fait foi : le navigateur
 * peut toujours contourner les attributs HTML.
 */

const name = z
  .string()
  .trim()
  .min(2, 'Indiquez votre nom.')
  .max(120, 'Nom trop long.');

const email = z
  .string()
  .trim()
  .min(1, 'Indiquez votre adresse email.')
  .email('Adresse email invalide.')
  .max(200, 'Adresse email trop longue.');

const company = z
  .string()
  .trim()
  .max(160, 'Nom de societe trop long.')
  .optional()
  .transform((value) => (value ? value : undefined));

export const contactSchema = z.object({
  name,
  email,
  company,
  message: z
    .string()
    .trim()
    .min(20, 'Detaillez votre demande en 20 caracteres au minimum.')
    .max(4000, 'Message trop long.'),
});

export const accessRequestSchema = z.object({
  name,
  email,
  company,
  message: z
    .string()
    .trim()
    .max(4000, 'Message trop long.')
    .optional()
    .transform((value) => (value ? value : undefined)),
});

export const loginSchema = z.object({
  email,
  password: z.string().min(1, 'Indiquez votre mot de passe.'),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type AccessRequestInput = z.infer<typeof accessRequestSchema>;

/** Etat renvoye par les server actions de formulaire vers le client. */
export type FormState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  /** Erreurs par champ, telles que produites par zod. */
  fieldErrors?: Record<string, string[]>;
};

export const initialFormState: FormState = { status: 'idle' };
