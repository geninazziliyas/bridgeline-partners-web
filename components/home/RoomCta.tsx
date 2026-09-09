import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { localizedPath, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';

/**
 * Bandeau de fin de page vers la Room. Aplat navy pleine largeur : dernière
 * famille de mise en page de la page d'accueil, aucune carte.
 */
export function RoomCta({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="bg-navy py-20 text-white lg:py-24">
      <Container className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <h2 className="max-w-xl font-display text-3xl font-bold md:text-4xl">
            {dict.home.cta.title}
          </h2>
          <p className="mt-4 max-w-[58ch] text-[17px] leading-relaxed text-white/75">
            {dict.home.cta.body}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
          <ButtonLink href={localizedPath(locale, '/room')} variant="onNavy" size="lg">
            {dict.common.room}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
