'use client';

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

/**
 * Carte avec deux effets, purement décoratifs :
 *
 * 1. Au survol (souris uniquement) : légère inclinaison 3D qui suit le
 *    curseur, accompagnée d'un reflet doux qui suit le même point — comme la
 *    lumière sur une surface vitrée qui réagit à l'angle de vue. Le reflet
 *    est directement piloté par la position de la souris (pas d'animation
 *    préprogrammée qui se déclencherait toute seule), ce qui le fait paraître
 *    réel plutôt que décoratif.
 * 2. À l'entrée dans le viewport : la carte pivote depuis l'intérieur de
 *    l'écran jusqu'à faire face au visiteur. Se déclenche une seule fois par
 *    carte, avec un délai optionnel pour cascader plusieurs cartes.
 *
 * `prefers-reduced-motion` désactive l'animation d'entrée (la carte apparaît
 * directement) ; l'inclinaison et le reflet au survol restent inoffensifs
 * puisqu'ils exigent un mouvement de souris actif.
 */
export function TiltCard({
  children,
  className,
  revealDelayMs = 0,
  tone = 'light',
}: {
  children: ReactNode;
  className?: string;
  /** Délai avant l'animation d'entrée, pour faire cascader plusieurs cartes. */
  revealDelayMs?: number;
  /**
   * `light` : reflet blanc doux, pour une carte au fond sombre.
   * `dark` : ombre douce, pour une carte au fond clair où un reflet blanc
   * serait invisible.
   */
  tone?: 'light' | 'dark';
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

    const tiltMax = 6;
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

        {/*
          Reflet doux qui suit le curseur, plaqué sur le contenu sans le
          bloquer. Très basse opacité et grand rayon de fondu : une touche de
          lumière, jamais une pastille visible en soi.
        */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[var(--glow-opacity,0)] transition-opacity duration-300"
          style={{
            backgroundImage:
              tone === 'light'
                ? 'radial-gradient(480px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(255, 255, 255, 0.16), transparent 62%)'
                : 'radial-gradient(480px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(16, 32, 58, 0.07), transparent 62%)',
          }}
        />
      </div>
    </div>
  );
}
