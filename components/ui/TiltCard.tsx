'use client';

import { useRef, type PointerEvent, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

/**
 * Inclinaison 3D au survol de la souris, avec une lueur turquoise qui suit le
 * curseur. Purement décoratif : `transform`/variables CSS custom, aucun état
 * React ne change (pas de re-render par mouvement), et tout revient à plat
 * dès que le pointeur quitte la carte ou n'est pas une souris (tactile).
 *
 * `prefers-reduced-motion` n'a rien à désactiver ici : sans mouvement de
 * souris, la carte reste plate.
 */
export function TiltCard({
  children,
  className,
  radiusClassName = 'rounded-card',
}: {
  children: ReactNode;
  className?: string;
  /** Doit correspondre au rayon de bordure du contenu, pour que la lueur épouse la carte. */
  radiusClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse') return;

    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    const tiltMax = 8;
    el.style.setProperty('--tilt-x', `${(0.5 - py) * tiltMax}deg`);
    el.style.setProperty('--tilt-y', `${(px - 0.5) * tiltMax}deg`);
    el.style.setProperty('--glow-x', `${px * 100}%`);
    el.style.setProperty('--glow-y', `${py * 100}%`);
    el.style.setProperty('--glow-opacity', '1');
  }

  function handlePointerLeave() {
    const el = ref.current;
    if (!el) return;

    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
    el.style.setProperty('--glow-opacity', '0');
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ transformStyle: 'preserve-3d', perspective: '800px' }}
      className={cn('group/tilt relative', className)}
    >
      <div
        className="relative h-full [transform:rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))] transition-transform duration-150 ease-out"
      >
        {children}

        {/* Lueur qui suit le curseur, au-dessus du contenu mais sans le bloquer. */}
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0 opacity-[var(--glow-opacity,0)] transition-opacity duration-300',
            radiusClassName,
          )}
          style={{
            background:
              'radial-gradient(280px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(31, 232, 201, 0.18), transparent 65%)',
          }}
        />
      </div>
    </div>
  );
}
