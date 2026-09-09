'use client';

import { useFormState } from 'react-dom';

import { Field, Input, Select } from '@/components/ui/Field';
import { FormFeedback } from '@/components/forms/FormFeedback';
import { SubmitButton } from '@/components/forms/SubmitButton';
import { initialFormState, type FormState } from '@/lib/validations';
import type { Locale } from '@/lib/i18n/config';

export type InvestmentFormValues = {
  userId: string;
  dealId: string;
  amountInvested: number;
  currentValue: number;
  /** Format YYYY-MM-DD. */
  investedAt: string;
};

export function InvestmentForm({
  locale,
  action,
  investors,
  deals,
  investment,
}: {
  locale: Locale;
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  investors: { id: string; name: string; email: string }[];
  deals: { id: string; name: string }[];
  investment?: InvestmentFormValues;
}) {
  const [state, formAction] = useFormState(action, initialFormState);
  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="flex flex-col gap-6" noValidate>
      <input type="hidden" name="locale" value={locale} />

      <FormFeedback state={state} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="i-userId" label="Investisseur" errors={errors.userId}>
          <Select
            id="i-userId"
            name="userId"
            required
            defaultValue={investment?.userId ?? ''}
          >
            <option value="" disabled>
              Choisir…
            </option>
            {investors.map((investor) => (
              <option key={investor.id} value={investor.id}>
                {investor.name} — {investor.email}
              </option>
            ))}
          </Select>
        </Field>
        <Field id="i-dealId" label="Opération" errors={errors.dealId}>
          <Select
            id="i-dealId"
            name="dealId"
            required
            defaultValue={investment?.dealId ?? ''}
          >
            <option value="" disabled>
              Choisir…
            </option>
            {deals.map((deal) => (
              <option key={deal.id} value={deal.id}>
                {deal.name}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field
          id="i-amountInvested"
          label="Montant investi"
          errors={errors.amountInvested}
        >
          <Input
            id="i-amountInvested"
            name="amountInvested"
            type="number"
            min="0"
            step="0.01"
            required
            defaultValue={investment?.amountInvested}
          />
        </Field>
        <Field id="i-currentValue" label="Valorisation actuelle" errors={errors.currentValue}>
          <Input
            id="i-currentValue"
            name="currentValue"
            type="number"
            min="0"
            step="0.01"
            required
            defaultValue={investment?.currentValue}
          />
        </Field>
        <Field id="i-investedAt" label="Date d'investissement" errors={errors.investedAt}>
          <Input
            id="i-investedAt"
            name="investedAt"
            type="date"
            required
            defaultValue={investment?.investedAt}
          />
        </Field>
      </div>

      <SubmitButton pendingLabel="Enregistrement…" className="self-start">
        Enregistrer
      </SubmitButton>
    </form>
  );
}
