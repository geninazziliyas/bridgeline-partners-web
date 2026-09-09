'use client';

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

/**
 * Carte avec deux effets, purement décoratifs :
 *
 * 1. Au survol (souris uniquement) : légère inclinaison 3D qui suit le
 *    curseur, accompagnée d'un reflet net en biais — comme le bord lumineux
 *    d'une vitre — dont la position suit directement la souris, sans aucune
 *    animation préprogrammée. C'est ce lien direct avec le mouvement réel qui
 *    le rend crédible plutôt que décoratif.
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
   * `light` : reflet blanc, pour une carte au fond sombre.
   * `dark` : reflet gris-bleu discret, pour une carte au fond clair où un
   * reflet blanc serait invisible.
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

    // Bande centrée sur le curseur, en pixels réels (pas en %, pour éviter
    // toute dérive géométrique une fois combinée à la rotation diagonale).
    const bandWidth = rect.width * 0.22;
    const glowX = px * rect.width - bandWidth / 2;
    el.style.setProperty('--glow-x', `${glowX}px`);
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
          Reflet en biais dont la position (--glow-x, en pixels) suit
          directement le curseur — un léger amorti (80ms) lisse le tremblement
          de la souris sans jamais devenir une animation indépendante d'elle.
          La forme, fine et nette, imite le bord lumineux d'une vitre plutôt
          qu'une tache diffuse.
        */}
        <div
          aria-hidden="true"
          className={cn('pointer-events-none absolute inset-0 overflow-hidden', radiusClassName)}
        >
          <div
            className="absolute -inset-y-1/4 w-[22%] opacity-[var(--glow-opacity,0)]"
            style={{
              transform: 'translateX(var(--glow-x, -9999px)) rotate(-20deg)',
              transitionProperty: 'opacity, transform',
              transitionDuration: '300ms, 80ms',
              transitionTimingFunction: 'ease-out, ease-out',
              backgroundImage:
                tone === 'light'
                  ? 'linear-gradient(100deg, transparent 0%, transparent 32%, rgba(255, 255, 255, 0.5) 47%, rgba(255, 255, 255, 0.75) 50%, rgba(255, 255, 255, 0.5) 53%, transparent 68%, transparent 100%)'
                  : 'linear-gradient(100deg, transparent 0%, transparent 32%, rgba(90, 107, 133, 0.35) 47%, rgba(90, 107, 133, 0.55) 50%, rgba(90, 107, 133, 0.35) 53%, transparent 68%, transparent 100%)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
