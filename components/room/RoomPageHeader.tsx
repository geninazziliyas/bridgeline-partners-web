import type { ReactNode } from 'react';

/** Entete d'une page de la Room : titre, sous-titre, action optionnelle. */
export function RoomPageHeader({
  title,
  lead,
  action,
}: {
  title: string;
  lead?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-hairline pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy md:text-3xl">
          {title}
        </h1>
        {lead ? (
          <p className="mt-2 max-w-[70ch] text-[15px] leading-relaxed text-ink-muted">
            {lead}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
