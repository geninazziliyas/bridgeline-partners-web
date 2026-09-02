import { CheckCircle, WarningCircle } from '@phosphor-icons/react/dist/ssr';

import type { FormState } from '@/lib/validations';

/**
 * Retour global d'un formulaire, affiche en tete de celui-ci.
 * role="status" pour que les lecteurs d'ecran annoncent le resultat sans que
 * l'utilisateur ait a rechercher le message.
 */
export function FormFeedback({ state }: { state: FormState }) {
  if (state.status === 'idle' || !state.message) return null;

  const success = state.status === 'success';

  return (
    <p
      role="status"
      aria-live="polite"
      className={[
        'flex items-start gap-2.5 rounded-control border px-4 py-3 text-[15px]',
        success
          ? 'border-accent/25 bg-accent-soft text-accent'
          : 'border-red-200 bg-red-50 text-red-800',
      ].join(' ')}
    >
      {success ? (
        <CheckCircle size={19} weight="fill" className="mt-0.5 shrink-0" />
      ) : (
        <WarningCircle size={19} weight="fill" className="mt-0.5 shrink-0" />
      )}
      <span>{state.message}</span>
    </p>
  );
}
