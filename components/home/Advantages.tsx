import Image from 'next/image';

import { Container } from '@/components/ui/Container';
import type { Dictionary } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/**
 * Grille asymétrique à quatre cellules, une par avantage : autant de cellules
 * que de contenus, jamais de tuile vide pour compléter une rangée. Deux
 * cellules portent un traitement visuel (aplat navy, photographie) pour éviter
 * une grille uniformément blanche.
 */
const spans = ['lg:col-span-4', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-4'];

export function Advantages({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-b border-hairline bg-canvas py-20 lg:py-28">
      <Container>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
          {dict.home.advantages.eyebrow}
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold text-navy md:text-4xl">
          {dict.home.advantages.title}
        </h2>

        <div className="mt-12 grid gap-5 lg:grid-cols-6">
          {dict.advantages.map((item, index) => {
            const isNavy = index === 0;
            const hasPhoto = index === 3;

            return (
              <article
                key={item.title}
                className={cn(
                  'relative overflow-hidden rounded-card border p-8 lg:p-10',
                  spans[index],
                  isNavy ? 'border-navy bg-navy text-white' : 'border-hairline bg-white',
                  hasPhoto && 'flex min-h-[280px] flex-col justify-end text-white',
                )}
              >
                {hasPhoto ? (
                  <>
                    {/* Placeholder photographique, à remplacer par un visuel de marque. */}
                    <Image
                      src="https://picsum.photos/seed/bridgeline-advantage-desk/1200/700"
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover"
                    />
                    {/* Voile navy : garantit le contraste du texte sur la photo. */}
                    <div aria-hidden="true" className="absolute inset-0 bg-navy/80" />
                  </>
                ) : null}

                <div className={cn(hasPhoto && 'relative')}>
                  <h3
                    className={cn(
                      'font-display text-xl font-bold md:text-2xl',
                      isNavy || hasPhoto ? 'text-white' : 'text-navy',
                    )}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      'mt-3 max-w-[48ch] text-[16px] leading-relaxed',
                      isNavy || hasPhoto ? 'text-white/75' : 'text-ink-muted',
                    )}
                  >
                    {item.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
