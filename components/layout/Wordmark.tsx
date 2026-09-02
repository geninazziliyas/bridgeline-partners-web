import { cn } from '@/lib/utils';

/**
 * Marque nominale. Le glyphe est une forme geometrique simple (deux appuis
 * relies par un tablier) rendue en SVG inline, a remplacer par le logo officiel
 * des qu'il est disponible en vectoriel.
 */
export function Wordmark({
  tone = 'navy',
  className,
}: {
  tone?: 'navy' | 'white';
  className?: string;
}) {
  const color = tone === 'white' ? 'text-white' : 'text-navy';

  return (
    <span className={cn('inline-flex items-center gap-2.5', color, className)}>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-6 w-6 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="square"
      >
        <path d="M3 15h18" />
        <path d="M7 15V8" />
        <path d="M17 15V8" />
        <path d="M3 20h18" opacity={0.45} />
      </svg>
      <span className="font-display text-[17px] font-extrabold leading-none tracking-tight">
        Bridgeline
        <span className="font-semibold opacity-70"> Partners</span>
      </span>
    </span>
  );
}
