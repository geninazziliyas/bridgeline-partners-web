import { cn } from '@/lib/utils';

/**
 * Avancement d'une levee. Reserve a la Bridgeline Room : c'est une donnee de
 * l'operation, pas un ornement de page marketing.
 */
export function ProgressBar({
  value,
  label,
  className,
}: {
  /** Pourcentage de 0 a 100. */
  value: number;
  /** Description lue par les technologies d'assistance. */
  label: string;
  className?: string;
}) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={cn('h-1.5 w-full overflow-hidden rounded-full bg-hairline', className)}
    >
      <div
        className="h-full rounded-full bg-accent transition-[width] duration-500"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
