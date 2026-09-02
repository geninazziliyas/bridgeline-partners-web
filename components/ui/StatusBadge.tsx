import type { DealStatus } from '@prisma/client';

import { cn } from '@/lib/utils';

/**
 * Statut d'une operation. Le badge porte l'information par son libelle et son
 * contraste, sans pastille decorative.
 */
export const dealStatusLabels: Record<DealStatus, string> = {
  OPEN: 'Ouvert',
  CLOSING_SOON: 'Cloture proche',
  INVITE_ONLY: 'Sur invitation',
  CLOSED: 'Cloture',
};

const styles: Record<DealStatus, string> = {
  OPEN: 'bg-accent-soft text-accent border-accent/20',
  CLOSING_SOON: 'bg-amber-50 text-amber-800 border-amber-200',
  INVITE_ONLY: 'bg-navy/5 text-navy border-navy/15',
  CLOSED: 'bg-slate-100 text-ink-muted border-hairline',
};

export function StatusBadge({
  status,
  className,
}: {
  status: DealStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium',
        styles[status],
        className,
      )}
    >
      {dealStatusLabels[status]}
    </span>
  );
}
