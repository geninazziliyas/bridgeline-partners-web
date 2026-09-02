'use client';

import { useFormState } from 'react-dom';

import { Field, Input, Textarea } from '@/components/ui/Field';
import { FormFeedback } from '@/components/forms/FormFeedback';
import { SubmitButton } from '@/components/forms/SubmitButton';
import { initialFormState } from '@/lib/validations';
import { submitContact } from '@/app/[locale]/(public)/contact/actions';
import type { Dictionary } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n/config';

/**
 * Formulaire de contact. La validation fait autorité côté serveur : les erreurs
 * affichées ici proviennent de la server action, pas d'une copie cliente des
 * règles.
 */
export function ContactForm({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [state, formAction] = useFormState(submitContact, initialFormState);

  // Après un envoi réussi, le formulaire cède la place à la confirmation.
  if (state.status === 'success') {
    return <FormFeedback state={state} />;
  }

  return (
    <form action={formAction} className="flex flex-col gap-6" noValidate>
      {/* La server action n'a pas accès à l'URL : la langue voyage avec le formulaire. */}
      <input type="hidden" name="locale" value={locale} />

      <FormFeedback state={state} />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label={dict.forms.name} errors={state.fieldErrors?.name}>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            required
            aria-invalid={Boolean(state.fieldErrors?.name)}
          />
        </Field>

        <Field id="email" label={dict.forms.email} errors={state.fieldErrors?.email}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(state.fieldErrors?.email)}
          />
        </Field>
      </div>

      <Field
        id="company"
        label={dict.forms.company}
        hint={dict.common.optional}
        errors={state.fieldErrors?.company}
      >
        <Input id="company" name="company" autoComplete="organization" />
      </Field>

      <Field
        id="message"
        label={dict.forms.message}
        hint={dict.forms.contactHint}
        errors={state.fieldErrors?.message}
      >
        <Textarea
          id="message"
          name="message"
          required
          rows={7}
          aria-invalid={Boolean(state.fieldErrors?.message)}
        />
      </Field>

      <div>
        <SubmitButton pendingLabel={dict.forms.sending}>
          {dict.forms.send}
        </SubmitButton>
      </div>

      <p className="text-[13px] leading-relaxed text-ink-faint">
        {dict.forms.privacy}
      </p>
    </form>
  );
}
