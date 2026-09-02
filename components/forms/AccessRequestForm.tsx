'use client';

import Link from 'next/link';
import { useFormState } from 'react-dom';

import { Field, Input, Select, Textarea, Checkbox } from '@/components/ui/Field';
import { FormFeedback } from '@/components/forms/FormFeedback';
import { SubmitButton } from '@/components/forms/SubmitButton';
import { initialFormState } from '@/lib/validations';
import { submitAccessRequest } from '@/app/[locale]/room/(public)/actions';
import { site } from '@/lib/site';
import type { Dictionary } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n/config';

/** Ordre d'affichage des types d'investisseur dans le select. */
const investorTypes = [
  'FAMILY_OFFICE',
  'WEALTH_MANAGER',
  'INSTITUTIONAL',
  'PRIVATE_INVESTOR',
  'OTHER',
] as const;

/** Formulaire de demande d'accès. Ne crée jamais de compte. */
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
        <Field
          id="ar-first-name"
          label={dict.forms.firstName}
          errors={state.fieldErrors?.firstName}
        >
          <Input
            id="ar-first-name"
            name="firstName"
            autoComplete="given-name"
            required
            aria-invalid={Boolean(state.fieldErrors?.firstName)}
          />
        </Field>

        <Field
          id="ar-last-name"
          label={dict.forms.lastName}
          errors={state.fieldErrors?.lastName}
        >
          <Input
            id="ar-last-name"
            name="lastName"
            autoComplete="family-name"
            required
            aria-invalid={Boolean(state.fieldErrors?.lastName)}
          />
        </Field>
      </div>

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

      <Field
        id="ar-organisation"
        label={dict.forms.organisation}
        errors={state.fieldErrors?.organisation}
      >
        <Input id="ar-organisation" name="organisation" autoComplete="organization" />
      </Field>

      <Field
        id="ar-investor-type"
        label={dict.forms.investorType}
        errors={state.fieldErrors?.investorType}
      >
        <Select id="ar-investor-type" name="investorType" defaultValue="">
          <option value="">{dict.forms.investorTypePlaceholder}</option>
          {investorTypes.map((value) => (
            <option key={value} value={value}>
              {dict.investorType[value]}
            </option>
          ))}
        </Select>
      </Field>

      <Field
        id="ar-message"
        label={dict.forms.yourMessage}
        errors={state.fieldErrors?.message}
      >
        <Textarea id="ar-message" name="message" rows={5} />
      </Field>

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-1 text-sm font-medium text-ink">
          {dict.forms.consent} <span aria-hidden="true">*</span>
        </legend>

        <Checkbox
          id="ar-privacy"
          name="privacy"
          value="true"
          required
          errors={state.fieldErrors?.privacy}
        >
          {/* Le lien n'apparaît que lorsqu'une politique est publiée : un lien
              mort vaudrait moins qu'un texte simple. */}
          {site.privacyPolicyUrl ? (
            <>
              {dict.forms.consentPrivacy.replace(dict.forms.consentPrivacyLink, '')}
              <Link
                href={site.privacyPolicyUrl}
                className="text-accent underline underline-offset-2"
              >
                {dict.forms.consentPrivacyLink}
              </Link>
            </>
          ) : (
            dict.forms.consentPrivacy
          )}
        </Checkbox>

        <Checkbox
          id="ar-professional"
          name="professional"
          value="true"
          required
          errors={state.fieldErrors?.professional}
        >
          {dict.forms.consentProfessional}
        </Checkbox>
      </fieldset>

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
