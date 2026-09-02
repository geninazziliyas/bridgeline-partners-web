import type { Metadata } from 'next';
import Image from 'next/image';

import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { PageHeader } from '@/components/layout/PageHeader';
import { team } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Equipe',
  description:
    'Les associes de Bridgeline Partners, entre Luxembourg et Geneve : structuration, origination et suivi des participations.',
};

export default function TeamPage() {
  return (
    <>
      <PageHeader
        title="L’equipe"
        lead="Une equipe restreinte, ou chaque dossier a un responsable identifie du premier echange jusqu’a la sortie."
      />

      <section className="bg-canvas py-16 lg:py-20">
        <Container>
          <ul className="space-y-6">
            {team.map((member) => (
              <li key={member.name}>
                {/* Portrait a gauche, biographie a droite : la lecture reste
                    horizontale au-dela de md, empilee en dessous. */}
                <article className="grid overflow-hidden rounded-card border border-hairline bg-white md:grid-cols-12">
                  <div className="relative aspect-[4/5] w-full bg-canvas md:col-span-4 md:aspect-auto md:min-h-[320px] lg:col-span-3">
                    {/* Portrait de placeholder, a remplacer par la photographie officielle. */}
                    <Image
                      src={member.photo}
                      alt={`Portrait de ${member.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="p-8 md:col-span-8 md:p-10 lg:col-span-9">
                    <h2 className="font-display text-2xl font-bold text-navy">
                      {member.name}
                    </h2>
                    <p className="mt-1.5 text-[16px] text-accent">{member.role}</p>
                    <p className="mt-1 text-[14px] text-ink-faint">
                      Bureau de {member.office}
                    </p>
                    <p className="mt-5 max-w-[70ch] text-[16px] leading-relaxed text-ink-muted">
                      {member.bio}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <div className="mt-12 border-t border-hairline pt-10">
            <h2 className="font-display text-xl font-bold text-navy">
              Vous souhaitez echanger avec l’un d’entre nous
            </h2>
            <p className="mt-3 max-w-[60ch] text-[16px] leading-relaxed text-ink-muted">
              Decrivez votre situation en quelques lignes. Nous orientons votre
              demande vers l’associe concerne.
            </p>
            <ButtonLink href="/contact" size="lg" className="mt-6">
              Nous contacter
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
