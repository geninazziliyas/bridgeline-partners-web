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
   * Intensité du reflet : `light` (plus marqué) pour une carte au fond
   * sombre, `dark` (plus discret) pour une carte au fond clair, où un reflet
   * trop appuyé délaverait le contenu.
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
          Reflet diagonal net, sans teinte : un bord net qui balaie la carte,
          comme le reflet d'une vitre qu'on déplace — pas une lueur diffuse.
        */}
        <div
          aria-hidden="true"
          className={cn('pointer-events-none absolute inset-0 overflow-hidden', radiusClassName)}
        >
          <div
            className="absolute -inset-y-1/2 left-0 w-1/5"
            style={{
              backgroundImage:
                tone === 'light'
                  ? 'linear-gradient(100deg, transparent 0%, transparent 40%, rgba(255, 255, 255, 0.55) 47%, rgba(255, 255, 255, 0.85) 50%, rgba(255, 255, 255, 0.55) 53%, transparent 60%, transparent 100%)'
                  : 'linear-gradient(100deg, transparent 0%, transparent 40%, rgba(120, 130, 150, 0.35) 47%, rgba(120, 130, 150, 0.55) 50%, rgba(120, 130, 150, 0.35) 53%, transparent 60%, transparent 100%)',
              transform: `translateX(${hovered ? '550%' : '-550%'}) rotate(-20deg)`,
              opacity: hovered ? 1 : 0,
              transition: hovered
                ? 'transform 550ms linear, opacity 120ms ease-out'
                : 'opacity 200ms ease-out',
            }}
          />
        </div>
      </div>
    </div>
  );
}
