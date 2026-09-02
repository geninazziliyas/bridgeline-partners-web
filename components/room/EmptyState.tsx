import type { ReactNode } from 'react';

/**
 * Etat vide. Dit ce qui manque et comment y remedier, plutot que d'afficher un
 * simple message d'absence de donnees.
 */
export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-card border border-dashed border-hairline bg-white px-8 py-14 text-center">
      <h2 className="font-display text-lg font-bold text-navy">{title}</h2>
      <p className="mx-auto mt-2 max-w-[52ch] text-[15px] leading-relaxed text-ink-muted">
        {body}
      </p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}
