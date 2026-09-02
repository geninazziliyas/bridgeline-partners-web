import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

/**
 * Bandeau de fin de page vers la Room. Aplat navy pleine largeur : derniere
 * famille de mise en page de la page d'accueil, aucune carte.
 */
export function RoomCta() {
  return (
    <section className="bg-navy py-20 text-white lg:py-24">
      <Container className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <h2 className="max-w-xl font-display text-3xl font-bold md:text-4xl">
            Vos operations et votre portefeuille, au meme endroit
          </h2>
          <p className="mt-4 max-w-[58ch] text-[17px] leading-relaxed text-white/75">
            La Bridgeline Room reunit les operations ouvertes, leur documentation
            et le suivi de vos participations. L’acces est reserve aux
            investisseurs professionnels.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
          <ButtonLink href="/room" variant="onNavy" size="lg">
            Bridgeline Room
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
