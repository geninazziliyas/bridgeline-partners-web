import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/lib/utils';

const controlStyles = cn(
  'w-full rounded-control border border-hairline bg-white px-3.5 py-2.5',
  'text-[15px] text-ink placeholder:text-ink-faint',
  'transition-colors duration-200',
  'focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring focus-visible:ring-offset-1',
  'disabled:bg-canvas disabled:text-ink-muted',
);

type FieldProps = {
  id: string;
  label: string;
  /** Message d'aide, affiche sous le libelle. */
  hint?: string;
  /** Erreurs de validation renvoyees par le serveur. */
  errors?: string[];
  children: ReactNode;
};

/**
 * Enveloppe de champ : libelle AU-DESSUS du controle, aide sous le libelle,
 * erreur EN DESSOUS du controle. Jamais de placeholder tenant lieu de libelle.
 */
export function Field({ id, label, hint, errors, children }: FieldProps) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      {hint ? (
        <p id={hintId} className="-mt-1 text-[13px] text-ink-muted">
          {hint}
        </p>
      ) : null}
      {children}
      {errors?.length ? (
        <p id={errorId} className="text-[13px] font-medium text-red-700">
          {errors[0]}
        </p>
      ) : null}
    </div>
  );
}

export function Input({ className, ...props }: ComponentProps<'input'>) {
  return <input className={cn(controlStyles, className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<'textarea'>) {
  return (
    <textarea className={cn(controlStyles, 'min-h-32 resize-y', className)} {...props} />
  );
}

export function Select({ className, children, ...props }: ComponentProps<'select'>) {
  return (
    <select className={cn(controlStyles, 'pr-8', className)} {...props}>
      {children}
    </select>
  );
}
