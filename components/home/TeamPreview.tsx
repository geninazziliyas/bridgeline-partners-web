import Image from 'next/image';

import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { team } from '@/lib/site';

/**
 * Apercu de l'equipe. Grille menee par l'image, distincte des blocs de texte
 * qui l'entourent.
 */
export function TeamPreview() {
  return (
    <section className="border-b border-hairline bg-white py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-xl font-display text-3xl font-bold text-navy md:text-4xl">
            Trois associes, un interlocuteur par dossier
          </h2>
          <ButtonLink href="/team" variant="secondary" size="md">
            Voir l’equipe
          </ButtonLink>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <li key={member.name}>
              <article className="group h-full overflow-hidden rounded-card border border-hairline bg-white">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-canvas">
                  {/* Portrait de placeholder, a remplacer par la photographie officielle. */}
                  <Image
                    src={member.photo}
                    alt={`Portrait de ${member.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-navy">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-[15px] text-accent">{member.role}</p>
                  <p className="mt-1 text-[14px] text-ink-faint">{member.office}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
