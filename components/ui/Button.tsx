import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'onNavy';
type Size = 'sm' | 'md' | 'lg';

/**
 * Trois variantes seulement, un seul accent, un rayon unique (control = 10px).
 * Chaque combinaison texte / fond respecte le contraste AA.
 */
const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-white hover:bg-accent-hover active:translate-y-px shadow-card',
  secondary:
    'bg-white text-navy border border-hairline hover:border-accent hover:text-accent active:translate-y-px',
  ghost: 'text-accent hover:text-accent-hover hover:bg-accent-soft',
  onNavy:
    'bg-white text-navy hover:bg-accent-soft active:translate-y-px shadow-card',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-12 px-6 text-base',
};

const base = cn(
  'inline-flex items-center justify-center gap-2 rounded-control font-medium',
  // Un libelle de CTA ne doit jamais passer a la ligne.
  'whitespace-nowrap',
  'transition-colors duration-200',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring focus-visible:ring-offset-2',
  'disabled:pointer-events-none disabled:opacity-60',
);

type ButtonProps = ComponentProps<'button'> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

/** Meme apparence que Button, rendu en lien pour la navigation. */
export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
