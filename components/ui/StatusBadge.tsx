import type { DealStatus } from '@prisma/client';

import type { Dictionary } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/**
 * Statut d'une opération. Le badge porte l'information par son libellé et son
 * contraste, sans pastille décorative.
 */
const styles: Record<DealStatus, string> = {
  OPEN: 'bg-accent-soft text-accent border-accent/20',
  CLOSING_SOON: 'bg-amber-50 text-amber-800 border-amber-200',
  INVITE_ONLY: 'bg-navy/5 text-navy border-navy/15',
  CLOSED: 'bg-slate-100 text-ink-muted border-hairline',
};

export function StatusBadge({
  status,
  dict,
  className,
}: {
  status: DealStatus;
  dict: Dictionary;
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
      {dict.dealStatus[status]}
    </span>
  );
}
