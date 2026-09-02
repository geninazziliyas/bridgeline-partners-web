'use client';

import { useFormState } from 'react-dom';

import { Field, Input, Textarea } from '@/components/ui/Field';
import { FormFeedback } from '@/components/forms/FormFeedback';
import { SubmitButton } from '@/components/forms/SubmitButton';
import { initialFormState } from '@/lib/validations';
import { submitAccessRequest } from '@/app/[locale]/room/(public)/actions';
import type { Dictionary } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n/config';

/** Formulaire de demande d'accès à la Room. Ne crée jamais de compte. */
export function AccessRequestForm({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [state, formAction] = useFormState(submitAccessRequest, initialFormState);

  if (state.status === 'success') {
    return <FormFeedback state={state} />;
  }

  return (
    <form action={formAction} className="flex flex-col gap-6" noValidate>
      <input type="hidden" name="locale" value={locale} />

      <FormFeedback state={state} />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="ar-name" label={dict.forms.name} errors={state.fieldErrors?.name}>
          <Input
            id="ar-name"
            name="name"
            autoComplete="name"
            required
            aria-invalid={Boolean(state.fieldErrors?.name)}
          />
        </Field>

        <Field id="ar-email" label={dict.forms.email} errors={state.fieldErrors?.email}>
          <Input
            id="ar-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(state.fieldErrors?.email)}
          />
        </Field>
      </div>

      <Field
        id="ar-company"
        label={dict.forms.company}
        errors={state.fieldErrors?.company}
      >
        <Input id="ar-company" name="company" autoComplete="organization" />
      </Field>

      <Field
        id="ar-message"
        label={dict.forms.accessProfile}
        hint={dict.forms.accessProfileHint}
        errors={state.fieldErrors?.message}
      >
        <Textarea id="ar-message" name="message" rows={5} />
      </Field>

      <div>
        <SubmitButton pendingLabel={dict.forms.sending}>
          {dict.forms.accessSubmit}
        </SubmitButton>
      </div>

      <p className="text-[13px] leading-relaxed text-ink-faint">
        {dict.forms.accessNotice}
      </p>
    </form>
  );
}
