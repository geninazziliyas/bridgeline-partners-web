import Image from 'next/image';

import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

/**
 * Hero en composition asymetrique : le message occupe sept colonnes, le visuel
 * cinq. Quatre elements de texte au maximum, pour que l'ensemble tienne dans la
 * premiere fenetre sans defilement.
 */
export function Hero() {
  return (
    <section className="border-b border-hairline bg-white">
      <Container className="grid items-center gap-12 pb-16 pt-16 lg:grid-cols-12 lg:gap-16 lg:pb-24 lg:pt-24">
        <div className="lg:col-span-7">
          <h1 className="max-w-2xl font-display text-4xl font-extrabold leading-[1.08] text-navy md:text-5xl lg:text-[56px]">
            Le capital institutionnel, connecte aux marches prives.
          </h1>

          <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-ink-muted">
            Bridgeline Partners structure et distribue des operations privees
            selectionnees a des investisseurs professionnels, depuis Luxembourg et
            Geneve.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/room" size="lg">
              Bridgeline Room
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary" size="lg">
              Nous contacter
            </ButtonLink>
          </div>
        </div>

        <div className="lg:col-span-5">
          {/* Placeholder photographique. A remplacer par un visuel de marque. */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card border border-hairline bg-canvas">
            <Image
              src="https://picsum.photos/seed/bridgeline-hero-architecture/1000/1250"
              alt="Facade d’un immeuble de bureaux, quartier financier"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
