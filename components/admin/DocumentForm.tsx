'use client';

import { useFormState } from 'react-dom';

import { Field, Input, Select } from '@/components/ui/Field';
import { FormFeedback } from '@/components/forms/FormFeedback';
import { SubmitButton } from '@/components/forms/SubmitButton';
import { initialFormState, type FormState } from '@/lib/validations';
import type { Locale } from '@/lib/i18n/config';

const typeLabels = {
  REPORT: 'Rapport',
  TERM_SHEET: 'Term sheet',
  STATEMENT: 'Relevé de participation',
  OTHER: 'Autre',
};

export function DocumentForm({
  locale,
  action,
  investors,
  deals,
}: {
  locale: Locale;
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  investors: { id: string; name: string; email: string }[];
  deals: { id: string; name: string }[];
}) {
  const [state, formAction] = useFormState(action, initialFormState);
  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="flex flex-col gap-6" noValidate>
      <input type="hidden" name="locale" value={locale} />

      <FormFeedback state={state} />

      <Field id="doc-title" label="Titre" errors={errors.title}>
        <Input id="doc-title" name="title" required />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="doc-type" label="Type" errors={errors.type}>
          <Select id="doc-type" name="type" required defaultValue="REPORT">
            {Object.entries(typeLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </Field>
        <Field id="doc-sizeBytes" label="Taille (octets)" hint="Facultatif." errors={errors.sizeBytes}>
          <Input id="doc-sizeBytes" name="sizeBytes" type="number" min="0" />
        </Field>
      </div>

      <Field
        id="doc-fileUrl"
        label="URL du fichier"
        hint="Lien vers le fichier hébergé (stockage objet, lien partagé...)."
        errors={errors.fileUrl}
      >
        <Input id="doc-fileUrl" name="fileUrl" type="url" required />
      </Field>

      <div className="rounded-card border border-dashed border-hairline p-5">
        <p className="mb-4 text-[13px] font-medium text-ink-muted">
          Rattacher à une opération (visible par tous ses souscripteurs) ou à un
          investisseur précis (relevé, KYC...) — un seul des deux.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="doc-dealId" label="Opération" errors={errors.dealId}>
            <Select id="doc-dealId" name="dealId" defaultValue="">
              <option value="">Aucune</option>
              {deals.map((deal) => (
                <option key={deal.id} value={deal.id}>
                  {deal.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field id="doc-userId" label="Investisseur" errors={errors.userId}>
            <Select id="doc-userId" name="userId" defaultValue="">
              <option value="">Aucun</option>
              {investors.map((investor) => (
                <option key={investor.id} value={investor.id}>
                  {investor.name} — {investor.email}
                </option>
              ))}
            </Select>
          </Field>
        </div>
      </div>

      <SubmitButton pendingLabel="Enregistrement…" className="self-start">
        Enregistrer
      </SubmitButton>
    </form>
  );
}
