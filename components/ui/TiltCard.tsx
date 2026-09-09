'use client';

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

/**
 * Carte avec deux effets, purement décoratifs :
 *
 * 1. Au survol (souris uniquement) : légère inclinaison 3D qui suit le
 *    curseur, plus un reflet linéaire diagonal qui balaie la carte une fois
 *    — pas de tache qui suit la souris, un seul passage net, comme un reflet
 *    sur du verre.
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
  radiusClassName = 'rounded-card',
  revealDelayMs = 0,
  tone = 'light',
}: {
  children: ReactNode;
  className?: string;
  /** Doit correspondre au rayon de bordure du contenu, pour que le reflet épouse la carte. */
  radiusClassName?: string;
  /** Délai avant l'animation d'entrée, pour faire cascader plusieurs cartes. */
  revealDelayMs?: number;
  /**
   * Teinte du reflet, toujours teintée turquoise (couleur de marque) : `light`
   * accentue le blanc pour une carte au fond sombre, `dark` réduit le blanc
   * pour rester lisible sur un fond clair.
   */
  tone?: 'light' | 'dark';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [hovered, setHovered] = useState(false);

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

  function handlePointerEnter(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse') return;
    setHovered(true);
  }

  function handlePointerLeave() {
    const el = ref.current;
    if (!el) return;

    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
    setHovered(false);
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={cn('group/tilt relative', className)}
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
          Reflet diagonal : un seul passage net au survol, comme de la lumière
          filtrant à travers une vitre teintée turquoise — un cœur clair
          entouré d'une teinte de marque, pas une simple traînée blanche.
        */}
        <div
          aria-hidden="true"
          className={cn('pointer-events-none absolute inset-0 overflow-hidden', radiusClassName)}
        >
          <div
            className="absolute -inset-y-1/2 left-0 w-1/4"
            style={{
              backgroundImage:
                tone === 'light'
                  ? 'linear-gradient(100deg, transparent 0%, rgba(31, 232, 201, 0.22) 35%, rgba(255, 255, 255, 0.6) 48%, rgba(31, 232, 201, 0.3) 62%, transparent 100%)'
                  : 'linear-gradient(100deg, transparent 0%, rgba(31, 232, 201, 0.14) 35%, rgba(255, 255, 255, 0.4) 48%, rgba(31, 232, 201, 0.22) 62%, transparent 100%)',
              transform: `translateX(${hovered ? '550%' : '-550%'}) rotate(-20deg)`,
              opacity: hovered ? 1 : 0,
              transition: hovered
                ? 'transform 1400ms linear, opacity 250ms ease-out'
                : 'opacity 300ms ease-out',
            }}
          />
        </div>
      </div>
    </div>
  );
}
