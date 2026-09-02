import type { ComponentProps, ElementType, ReactNode } from 'react';

import { cn } from '@/lib/utils';

type ContainerProps = ComponentProps<'div'> & {
  as?: ElementType;
  children: ReactNode;
};

/** Gouttiere horizontale unique du site public. */
export function Container({
  as: Tag = 'div',
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn('mx-auto w-full max-w-shell px-5 sm:px-8 lg:px-12', className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
