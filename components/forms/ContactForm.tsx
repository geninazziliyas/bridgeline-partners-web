'use client';

import { useFormState } from 'react-dom';

import { Field, Input, Textarea } from '@/components/ui/Field';
import { FormFeedback } from '@/components/forms/FormFeedback';
import { SubmitButton } from '@/components/forms/SubmitButton';
import { initialFormState } from '@/lib/validations';
import { submitContact } from '@/app/(public)/contact/actions';

/**
 * Formulaire de contact. La validation fait autorite cote serveur : les erreurs
 * affichees ici proviennent de la server action, pas d'une copie cliente des
 * regles.
 */
export function ContactForm() {
  const [state, formAction] = useFormState(submitContact, initialFormState);

  // Apres un envoi reussi, le formulaire cede la place a la confirmation.
  if (state.status === 'success') {
    return <FormFeedback state={state} />;
  }

  return (
    <form action={formAction} className="flex flex-col gap-6" noValidate>
      <FormFeedback state={state} />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Nom et prenom" errors={state.fieldErrors?.name}>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            required
            aria-invalid={Boolean(state.fieldErrors?.name)}
          />
        </Field>

        <Field id="email" label="Email professionnel" errors={state.fieldErrors?.email}>
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
        label="Societe"
        hint="Facultatif."
        errors={state.fieldErrors?.company}
      >
        <Input id="company" name="company" autoComplete="organization" />
      </Field>

      <Field
        id="message"
        label="Message"
        hint="Decrivez votre demande, votre horizon et le type d’operation qui vous interesse."
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
        <SubmitButton pendingLabel="Envoi">Envoyer le message</SubmitButton>
      </div>

      <p className="text-[13px] leading-relaxed text-ink-faint">
        Les informations transmises servent uniquement a traiter votre demande.
      </p>
    </form>
  );
}
