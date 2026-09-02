'use client';

import { useFormState } from 'react-dom';

import { Field, Input, Textarea } from '@/components/ui/Field';
import { FormFeedback } from '@/components/forms/FormFeedback';
import { SubmitButton } from '@/components/forms/SubmitButton';
import { initialFormState } from '@/lib/validations';
import { submitAccessRequest } from '@/app/room/(public)/actions';

/** Formulaire de demande d'acces a la Room. Ne cree jamais de compte. */
export function AccessRequestForm() {
  const [state, formAction] = useFormState(submitAccessRequest, initialFormState);

  if (state.status === 'success') {
    return <FormFeedback state={state} />;
  }

  return (
    <form action={formAction} className="flex flex-col gap-6" noValidate>
      <FormFeedback state={state} />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="ar-name" label="Nom et prenom" errors={state.fieldErrors?.name}>
          <Input
            id="ar-name"
            name="name"
            autoComplete="name"
            required
            aria-invalid={Boolean(state.fieldErrors?.name)}
          />
        </Field>

        <Field
          id="ar-email"
          label="Email professionnel"
          errors={state.fieldErrors?.email}
        >
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

      <Field id="ar-company" label="Societe" errors={state.fieldErrors?.company}>
        <Input id="ar-company" name="company" autoComplete="organization" />
      </Field>

      <Field
        id="ar-message"
        label="Votre profil d’investisseur"
        hint="Facultatif. Type de structure, classes d’actifs suivies, taille de ticket habituelle."
        errors={state.fieldErrors?.message}
      >
        <Textarea id="ar-message" name="message" rows={5} />
      </Field>

      <div>
        <SubmitButton pendingLabel="Envoi">Demander l’acces</SubmitButton>
      </div>

      <p className="text-[13px] leading-relaxed text-ink-faint">
        L’acces est reserve aux investisseurs professionnels. Une demande ne cree
        pas de compte : notre equipe verifie votre eligibilite avant tout
        provisionnement.
      </p>
    </form>
  );
}
