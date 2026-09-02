import type { Metadata } from 'next';
import Image from 'next/image';
import { ChartLineUp, FileText, Lock } from '@phosphor-icons/react/dist/ssr';

import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { AccessRequestForm } from '@/components/forms/AccessRequestForm';
import { roomBenefits } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Bridgeline Room',
  description:
    'L’espace investisseurs de Bridgeline Partners : operations en cours, souscription en ligne et suivi de portefeuille.',
};

/** Une icone par benefice, dans l'ordre de roomBenefits. */
const benefitIcons = [FileText, Lock, ChartLineUp];

export default function RoomLandingPage() {
  return (
    <>
      {/* Hero sur aplat navy : la Room est un espace distinct du site vitrine,
          le changement de fond l'annonce des la premiere fenetre. */}
      <section className="bg-navy text-white">
        <Container className="grid items-center gap-12 pb-16 pt-16 lg:grid-cols-12 lg:gap-16 lg:pb-24 lg:pt-24">
          <div className="lg:col-span-7">
            <h1 className="max-w-2xl font-display text-4xl font-extrabold leading-[1.08] md:text-5xl">
              La Bridgeline Room
            </h1>
            <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-white/75">
              L’espace ou nos investisseurs consultent les operations ouvertes,
              souscrivent et suivent leurs participations.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/room/login" variant="onNavy" size="lg">
                Se connecter
              </ButtonLink>
              <ButtonLink
                href="#demander-l-acces"
                variant="secondary"
                size="lg"
                className="border-white/25 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white"
              >
                Demander l’acces
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card border border-white/15">
              {/* Placeholder photographique, a remplacer par une capture de la Room. */}
              <Image
                src="https://picsum.photos/seed/bridgeline-room-interior/1000/750"
                alt="Salle de reunion, quartier d’affaires"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Trois benefices en colonnes separees par des filets verticaux, sans
          cartes : l'elevation n'ajouterait rien a une liste de trois items. */}
      <section className="border-b border-hairline bg-white py-20 lg:py-24">
        <Container>
          <ul className="grid divide-y divide-hairline md:grid-cols-3 md:divide-x md:divide-y-0">
            {roomBenefits.map((benefit, index) => {
              const Icon = benefitIcons[index];
              return (
                <li
                  key={benefit.title}
                  className="px-0 py-8 md:px-8 md:py-0 md:first:pl-0 md:last:pr-0"
                >
                  <Icon size={26} weight="light" className="text-accent" />
                  <h2 className="mt-5 font-display text-xl font-bold text-navy">
                    {benefit.title}
                  </h2>
                  <p className="mt-3 max-w-[42ch] text-[16px] leading-relaxed text-ink-muted">
                    {benefit.body}
                  </p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section id="demander-l-acces" className="scroll-mt-20 bg-canvas py-20 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">
              Demander l’acces
            </h2>
            <p className="mt-5 max-w-[52ch] text-[17px] leading-relaxed text-ink-muted">
              La Room n’est pas ouverte a l’inscription libre. Transmettez-nous
              votre profil : nous verifions votre eligibilite en tant
              qu’investisseur professionnel, puis nous ouvrons votre acces.
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-muted">
              Vous avez deja un compte ?{' '}
              <a
                href="/room/login"
                className="font-medium text-accent underline-offset-4 hover:underline"
              >
                Se connecter
              </a>
              .
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="rounded-card border border-hairline bg-white p-8 lg:p-10">
              <AccessRequestForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
