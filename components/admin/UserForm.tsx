'use client';

import { useFormState } from 'react-dom';

import { Field, Input, Select } from '@/components/ui/Field';
import { FormFeedback } from '@/components/forms/FormFeedback';
import { SubmitButton } from '@/components/forms/SubmitButton';
import { initialFormState, type FormState } from '@/lib/validations';
import type { Locale } from '@/lib/i18n/config';

export type UserFormValues = {
  name: string;
  email: string;
  company: string;
  jurisdiction: string;
  role: 'INVESTOR' | 'ADMIN';
};

/** Formulaire de création/édition d'un compte. Même composant pour les deux. */
export function UserForm({
  locale,
  action,
  user,
}: {
  locale: Locale;
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  user?: UserFormValues;
}) {
  const [state, formAction] = useFormState(action, initialFormState);
  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="flex flex-col gap-6" noValidate>
      <input type="hidden" name="locale" value={locale} />

      <FormFeedback state={state} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="u-name" label="Nom" errors={errors.name}>
          <Input id="u-name" name="name" required defaultValue={user?.name} />
        </Field>
        <Field id="u-email" label="Email" errors={errors.email}>
          <Input
            id="u-email"
            name="email"
            type="email"
            required
            defaultValue={user?.email}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="u-company" label="Société" errors={errors.company}>
          <Input id="u-company" name="company" defaultValue={user?.company} />
        </Field>
        <Field id="u-jurisdiction" label="Juridiction" errors={errors.jurisdiction}>
          <Input
            id="u-jurisdiction"
            name="jurisdiction"
            defaultValue={user?.jurisdiction}
          />
        </Field>
      </div>

      <Field id="u-role" label="Rôle" errors={errors.role}>
        <Select id="u-role" name="role" required defaultValue={user?.role ?? 'INVESTOR'}>
          <option value="INVESTOR">Investisseur</option>
          <option value="ADMIN">Administrateur (équipe Bridgeline)</option>
        </Select>
      </Field>

      <Field
        id="u-password"
        label={user ? 'Nouveau mot de passe' : 'Mot de passe'}
        hint={
          user
            ? 'Laissez vide pour ne pas changer le mot de passe actuel.'
            : 'Facultatif : laissez vide pour un compte connecté uniquement par lien magique (email).'
        }
        errors={errors.password}
      >
        <Input id="u-password" name="password" type="password" autoComplete="new-password" />
      </Field>

      <SubmitButton pendingLabel="Enregistrement…" className="self-start">
        Enregistrer
      </SubmitButton>
    </form>
  );
}
