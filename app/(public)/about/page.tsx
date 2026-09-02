import type { Metadata } from 'next';
import Image from 'next/image';

import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { PageHeader } from '@/components/layout/PageHeader';
import { offices } from '@/lib/site';

export const metadata: Metadata = {
  title: 'A propos',
  description:
    'Bridgeline Partners structure et distribue des operations de marches prives a des investisseurs professionnels, depuis Luxembourg et Geneve.',
};

/** Photographies de placeholder, a remplacer par les visuels des bureaux. */
const officePhotos: Record<string, string> = {
  Luxembourg: 'https://picsum.photos/seed/bridgeline-office-luxembourg/1200/900',
  Geneve: 'https://picsum.photos/seed/bridgeline-office-geneve/1200/900',
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Relier le capital institutionnel aux marches prives"
        lead="Nous selectionnons un nombre limite d’operations par an, nous les structurons dans des vehicules dedies, et nous les suivons jusqu’a la sortie."
      />

      <section className="border-b border-hairline bg-canvas py-20 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="font-display text-2xl font-bold text-navy md:text-3xl">
              Notre positionnement
            </h2>
            <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-ink-muted">
              <p>
                Les marches prives concentrent une part croissante de la creation
                de valeur, mais leur acces reste organise autour de tickets et de
                reseaux qui excluent de fait une grande partie des investisseurs
                professionnels : family offices, gerants independants, holdings
                patrimoniales.
              </p>
              <p>
                Bridgeline Partners se place a cette jonction. Nous sourcons des
                operations aupres de gerants, de conseils et de co-investisseurs,
                nous verifions ce qui peut l’etre, puis nous construisons le
                vehicule qui permet a nos investisseurs d’y participer dans un
                cadre reglementaire clair.
              </p>
              <p>
                Nous ne pretendons pas couvrir toutes les classes d’actifs. Nous
                intervenons la ou nous savons documenter le risque : trade finance
                adossee a des actifs, secondaires sur des societes etablies,
                co-investissements aux cotes d’un chef de file, infrastructures
                sous contrat.
              </p>
            </div>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="rounded-card border border-hairline bg-white p-8">
              <h3 className="font-display text-lg font-bold text-navy">
                Ce que nous ne faisons pas
              </h3>
              <ul className="mt-5 space-y-4 text-[15px] leading-relaxed text-ink-muted">
                <li className="border-l-2 border-hairline pl-4">
                  Nous ne gerons pas de mandat discretionnaire.
                </li>
                <li className="border-l-2 border-hairline pl-4">
                  Nous ne distribuons pas d’operation que nous n’avons pas
                  structuree ou co-structuree.
                </li>
                <li className="border-l-2 border-hairline pl-4">
                  Nous ne nous adressons pas aux investisseurs non professionnels.
                </li>
              </ul>
            </div>
          </aside>
        </Container>
      </section>

      <section className="bg-white py-20 lg:py-24">
        <Container>
          <h2 className="font-display text-2xl font-bold text-navy md:text-3xl">
            Luxembourg et Geneve
          </h2>
          <p className="mt-4 max-w-[62ch] text-[17px] leading-relaxed text-ink-muted">
            Deux bureaux, deux fonctions distinctes. La structuration se fait au
            Luxembourg, ou sont domicilies les vehicules. La relation
            investisseurs et l’origination sont menees depuis Geneve.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {offices.map((office) => (
              <article
                key={office.city}
                className="overflow-hidden rounded-card border border-hairline bg-white"
              >
                <div className="relative aspect-[4/3] w-full bg-canvas">
                  <Image
                    src={officePhotos[office.city]}
                    alt={`Bureau de ${office.city}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-display text-xl font-bold text-navy">
                    {office.city}
                  </h3>
                  <p className="mt-1 text-[14px] text-ink-faint">{office.country}</p>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
                    {office.role}
                  </p>
                  <a
                    href={`mailto:${office.email}`}
                    className="mt-5 inline-block font-mono text-[14px] text-accent underline-offset-4 hover:underline"
                  >
                    {office.email}
                  </a>
                </div>
              </article>
            ))}
          </div>

          <ButtonLink href="/contact" size="lg" className="mt-12">
            Nous contacter
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
