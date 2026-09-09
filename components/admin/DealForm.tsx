'use client';

import { useFormState } from 'react-dom';

import { Field, Input, Select, Textarea, Checkbox } from '@/components/ui/Field';
import { FormFeedback } from '@/components/forms/FormFeedback';
import { SubmitButton } from '@/components/forms/SubmitButton';
import { initialFormState, type FormState } from '@/lib/validations';
import type { Locale } from '@/lib/i18n/config';

export type DealFormValues = {
  name: string;
  slug: string;
  summary: string;
  description: string;
  sector: string;
  geography: string;
  summaryEn: string;
  descriptionEn: string;
  sectorEn: string;
  geographyEn: string;
  currency: string;
  status: 'OPEN' | 'CLOSING_SOON' | 'INVITE_ONLY' | 'CLOSED';
  targetAmount: number;
  raisedAmount: number;
  minTicket: number;
  /** Format YYYY-MM-DD, celui attendu par un input type="date". */
  closingDate: string;
  featured: boolean;
};

const statusLabels: Record<DealFormValues['status'], string> = {
  OPEN: 'Ouvert',
  CLOSING_SOON: 'Clôture proche',
  INVITE_ONLY: 'Sur invitation',
  CLOSED: 'Clôturé',
};

/** Formulaire de création/édition d'une opération. Même composant pour les deux. */
export function DealForm({
  locale,
  action,
  deal,
}: {
  locale: Locale;
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  deal?: DealFormValues;
}) {
  const [state, formAction] = useFormState(action, initialFormState);
  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="flex flex-col gap-6" noValidate>
      <input type="hidden" name="locale" value={locale} />

      <FormFeedback state={state} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="d-name" label="Nom" errors={errors.name}>
          <Input id="d-name" name="name" required defaultValue={deal?.name} />
        </Field>
        <Field
          id="d-slug"
          label="Slug"
          hint="Identifiant d'URL : minuscules, chiffres, tirets."
          errors={errors.slug}
        >
          <Input id="d-slug" name="slug" required defaultValue={deal?.slug} />
        </Field>
      </div>

      <Field id="d-summary" label="Accroche (une ligne)" errors={errors.summary}>
        <Input id="d-summary" name="summary" required defaultValue={deal?.summary} />
      </Field>

      <Field id="d-description" label="Description complète" errors={errors.description}>
        <Textarea
          id="d-description"
          name="description"
          required
          defaultValue={deal?.description}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="d-sector" label="Secteur" errors={errors.sector}>
          <Input id="d-sector" name="sector" required defaultValue={deal?.sector} />
        </Field>
        <Field id="d-geography" label="Géographie" errors={errors.geography}>
          <Input
            id="d-geography"
            name="geography"
            required
            defaultValue={deal?.geography}
          />
        </Field>
      </div>

      <div className="rounded-card border border-dashed border-hairline p-5">
        <p className="mb-4 text-[13px] font-medium text-ink-muted">
          Traductions anglaises — facultatives, la version française s&apos;affiche si vide.
        </p>
        <div className="flex flex-col gap-4">
          <Field id="d-summaryEn" label="Accroche (EN)" errors={errors.summaryEn}>
            <Input id="d-summaryEn" name="summaryEn" defaultValue={deal?.summaryEn} />
          </Field>
          <Field
            id="d-descriptionEn"
            label="Description (EN)"
            errors={errors.descriptionEn}
          >
            <Textarea
              id="d-descriptionEn"
              name="descriptionEn"
              defaultValue={deal?.descriptionEn}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="d-sectorEn" label="Secteur (EN)" errors={errors.sectorEn}>
              <Input id="d-sectorEn" name="sectorEn" defaultValue={deal?.sectorEn} />
            </Field>
            <Field
              id="d-geographyEn"
              label="Géographie (EN)"
              errors={errors.geographyEn}
            >
              <Input
                id="d-geographyEn"
                name="geographyEn"
                defaultValue={deal?.geographyEn}
              />
            </Field>
          </div>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Field id="d-currency" label="Devise" errors={errors.currency}>
          <Input
            id="d-currency"
            name="currency"
            required
            defaultValue={deal?.currency ?? 'EUR'}
          />
        </Field>
        <Field id="d-status" label="Statut" errors={errors.status}>
          <Select id="d-status" name="status" required defaultValue={deal?.status ?? 'OPEN'}>
            {Object.entries(statusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </Field>
        <Field id="d-closingDate" label="Date de clôture" errors={errors.closingDate}>
          <Input
            id="d-closingDate"
            name="closingDate"
            type="date"
            required
            defaultValue={deal?.closingDate}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field id="d-targetAmount" label="Montant cible" errors={errors.targetAmount}>
          <Input
            id="d-targetAmount"
            name="targetAmount"
            type="number"
            min="0"
            step="0.01"
            required
            defaultValue={deal?.targetAmount}
          />
        </Field>
        <Field id="d-raisedAmount" label="Montant levé" errors={errors.raisedAmount}>
          <Input
            id="d-raisedAmount"
            name="raisedAmount"
            type="number"
            min="0"
            step="0.01"
            required
            defaultValue={deal?.raisedAmount ?? 0}
          />
        </Field>
        <Field id="d-minTicket" label="Ticket minimum" errors={errors.minTicket}>
          <Input
            id="d-minTicket"
            name="minTicket"
            type="number"
            min="0"
            step="0.01"
            required
            defaultValue={deal?.minTicket}
          />
        </Field>
      </div>

      <Checkbox id="d-featured" name="featured" defaultChecked={deal?.featured}>
        Mettre en avant sur la vue d&apos;ensemble de la Room
      </Checkbox>

      <SubmitButton pendingLabel="Enregistrement…" className="self-start">
        Enregistrer
      </SubmitButton>
    </form>
  );
}
