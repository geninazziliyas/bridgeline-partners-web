import { cn } from '@/lib/utils';

/**
 * Tuile de synthese. La valeur est en monospace tabulaire pour que les tuiles
 * d'une meme rangee s'alignent, quelle que soit la longueur du montant.
 */
export function StatCard({
  label,
  value,
  detail,
  tone = 'neutral',
}: {
  label: string;
  value: string;
  detail?: string;
  /** positive et negative colorent la valeur, pour les performances. */
  tone?: 'neutral' | 'positive' | 'negative';
}) {
  return (
    <div className="rounded-card border border-hairline bg-white p-5">
      <p className="text-[13px] text-ink-muted">{label}</p>
      <p
        className={cn(
          'tabular mt-2 font-mono text-2xl font-medium',
          tone === 'positive' && 'text-emerald-700',
          tone === 'negative' && 'text-red-700',
          tone === 'neutral' && 'text-navy',
        )}
      >
        {value}
      </p>
      {detail ? <p className="mt-1.5 text-[13px] text-ink-faint">{detail}</p> : null}
    </div>
  );
}
