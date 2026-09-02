'use client';

import { useFormStatus } from 'react-dom';
import { CircleNotch } from '@phosphor-icons/react';

import { Button } from '@/components/ui/Button';

/**
 * Bouton de soumission conscient de l'etat du formulaire parent.
 * Doit etre rendu a l'interieur du <form> pour que useFormStatus le detecte.
 */
export function SubmitButton({
  children,
  pendingLabel,
  className,
}: {
  children: string;
  pendingLabel: string;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="lg" disabled={pending} className={className}>
      {pending ? (
        <>
          <CircleNotch size={17} weight="bold" className="animate-spin" />
          {pendingLabel}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
