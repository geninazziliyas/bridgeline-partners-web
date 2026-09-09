import { z } from 'zod';

/**
 * Validation des formulaires d'administration. Outil interne, en français
 * uniquement : contrairement aux formulaires publics, ces messages ne sont
 * jamais traduits.
 */

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `${max} caractères maximum.`)
    .optional()
    .transform((value) => (value ? value : undefined));

/** Un input type="number" arrive en chaîne, potentiellement vide. */
const decimalField = z
  .string()
  .trim()
  .min(1, 'Champ requis.')
  .refine((value) => !Number.isNaN(Number(value)) && Number(value) >= 0, {
    message: 'Doit être un nombre positif.',
  })
  .transform(Number);

export const dealSchema = z.object({
  name: z.string().trim().min(2, 'Nom requis.').max(160),
  slug: z
    .string()
    .trim()
    .min(2, 'Slug requis.')
    .max(160)
    .regex(/^[a-z0-9-]+$/, 'Lettres minuscules, chiffres et tirets uniquement.'),
  summary: z.string().trim().min(2, 'Accroche requise.').max(400),
  description: z.string().trim().min(2, 'Description requise.').max(8000),
  sector: z.string().trim().min(1, 'Secteur requis.').max(120),
  geography: z.string().trim().min(1, 'Géographie requise.').max(120),
  summaryEn: optionalText(400),
  descriptionEn: optionalText(8000),
  sectorEn: optionalText(120),
  geographyEn: optionalText(120),
  currency: z.string().trim().min(1).max(10).default('EUR'),
  status: z.enum(['OPEN', 'CLOSING_SOON', 'INVITE_ONLY', 'CLOSED']),
  targetAmount: decimalField,
  raisedAmount: decimalField,
  minTicket: decimalField,
  closingDate: z.string().trim().min(1, 'Date requise.'),
  featured: z
    .union([z.literal('on'), z.literal(undefined)])
    .transform((value) => value === 'on'),
  newsletterUrl: z
    .string()
    .trim()
    .url('URL invalide.')
    .max(2000)
    .optional()
    .or(z.literal(''))
    .transform((value) => (value ? value : undefined)),
});

export const userSchema = z.object({
  name: z.string().trim().min(2, 'Nom requis.').max(160),
  email: z.string().trim().email('Email invalide.').max(200),
  company: optionalText(160),
  jurisdiction: optionalText(120),
  role: z.enum(['INVESTOR', 'ADMIN']),
  /** Vide = compte par lien magique uniquement (pas de mot de passe). */
  password: z
    .string()
    .max(200)
    .optional()
    .transform((value) => (value ? value : undefined))
    .refine((value) => !value || value.length >= 10, {
      message: '10 caractères minimum.',
    }),
});

export const investmentSchema = z.object({
  userId: z.string().trim().min(1, 'Investisseur requis.'),
  dealId: z.string().trim().min(1, 'Opération requise.'),
  amountInvested: decimalField,
  currentValue: decimalField,
  investedAt: z.string().trim().min(1, 'Date requise.'),
});

export const documentSchema = z
  .object({
    title: z.string().trim().min(2, 'Titre requis.').max(200),
    type: z.enum(['REPORT', 'TERM_SHEET', 'STATEMENT', 'OTHER']),
    fileUrl: z.string().trim().url('URL invalide.').max(2000),
    sizeBytes: z
      .string()
      .trim()
      .optional()
      .transform((value) => (value ? Number(value) : undefined)),
    dealId: optionalText(160),
    userId: optionalText(160),
  })
  .refine((value) => value.dealId || value.userId, {
    message: 'Rattachez le document à une opération ou à un investisseur.',
    path: ['dealId'],
  });
