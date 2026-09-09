import Image from 'next/image';

import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { site } from '@/lib/site';
import { localizedPath, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';

/**
 * Hero en composition asymétrique : le message occupe sept colonnes, le visuel
 * cinq. Quatre éléments de texte au maximum, pour que l'ensemble tienne dans la
 * première fenêtre sans défilement.
 */
export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="border-b border-hairline bg-white">
      <Container className="grid items-center gap-12 pb-16 pt-16 lg:grid-cols-12 lg:gap-16 lg:pb-24 lg:pt-24">
        <div className="lg:col-span-7">
          <h1 className="max-w-2xl font-display text-4xl font-extrabold leading-[1.08] text-navy md:text-5xl lg:text-[56px]">
            {dict.home.hero.title}
          </h1>

          <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-ink-muted">
            {dict.home.hero.lead}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={localizedPath(locale, '/room')} size="lg">
              {dict.common.room}
            </ButtonLink>
            <ButtonLink
              href={localizedPath(locale, '/contact')}
              variant="secondary"
              size="lg"
            >
              {dict.common.contact}
            </ButtonLink>
          </div>
        </div>

        <div className="relative lg:col-span-5">
          {/* Touche de couleur secondaire : une lueur turquoise qui derive
              lentement derriere le cadre, seule tache de mouvement continu
              hors interaction sur cette page. */}
          <div
            aria-hidden="true"
            className="animate-drift-glow pointer-events-none absolute -inset-6 -z-10 rounded-full bg-teal/40 blur-3xl"
          />

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card border border-hairline bg-canvas">
            {site.heroVideo ? (
              <video
                src={site.heroVideo}
                poster={site.heroImage}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <Image
                src={site.heroImage}
                alt={dict.home.hero.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
