import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/lib/utils';

type CardProps = ComponentProps<'div'> & {
  children: ReactNode;
  /** Ajoute une elevation au survol. Reserve aux cartes cliquables. */
  interactive?: boolean;
};

/**
 * Surface de contenu. Rayon 14px (card), ombre teintee navy, jamais de noir pur.
 * A n'utiliser que lorsque l'elevation traduit une vraie hierarchie : ailleurs,
 * un simple separateur suffit.
 */
export function Card({
  children,
  className,
  interactive = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-card border border-hairline bg-white shadow-card',
        interactive &&
          'transition-shadow duration-200 hover:shadow-lifted focus-within:shadow-lifted',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
