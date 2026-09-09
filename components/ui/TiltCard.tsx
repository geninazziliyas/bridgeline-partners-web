'use client';

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

/**
 * Carte avec deux effets, purement décoratifs :
 *
 * 1. Au survol (souris uniquement) : légère inclinaison 3D qui suit le
 *    curseur.
 * 2. À l'entrée dans le viewport : la carte pivote depuis l'intérieur de
 *    l'écran jusqu'à faire face au visiteur. Se déclenche une seule fois par
 *    carte, avec un délai optionnel pour cascader plusieurs cartes.
 *
 * `prefers-reduced-motion` désactive l'animation d'entrée (la carte apparaît
 * directement) ; l'inclinaison au survol reste inoffensive puisqu'elle exige
 * un mouvement de souris actif.
 */
export function TiltCard({
  children,
  className,
  revealDelayMs = 0,
}: {
  children: ReactNode;
  className?: string;
  /** Délai avant l'animation d'entrée, pour faire cascader plusieurs cartes. */
  revealDelayMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion) {
      setRevealed(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
  }

  function handlePointerLeave() {
    const el = ref.current;
    if (!el) return;

    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn('relative', className)}
      style={{
        perspective: '1200px',
        opacity: revealed ? 1 : 0,
        transform: revealed
          ? 'none'
          : 'perspective(1200px) rotateY(-52deg) rotateX(5deg) translateZ(-180px) scale(0.94)',
        transition:
          'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${revealDelayMs}ms`,
      }}
    >
      <div
        className="relative h-full [transform:rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))] transition-transform duration-150 ease-out"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </div>
    </div>
  );
}
