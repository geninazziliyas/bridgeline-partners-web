import Image from 'next/image';

import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { team } from '@/lib/site';
import { localizedPath, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';

/**
 * Aperçu de l'équipe. Grille menée par l'image, distincte des blocs de texte
 * qui l'entourent.
 */
export function TeamPreview({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="border-b border-hairline bg-white py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-xl font-display text-3xl font-bold text-navy md:text-4xl">
            {dict.home.team.title}
          </h2>
          <ButtonLink
            href={localizedPath(locale, '/team')}
            variant="secondary"
            size="md"
          >
            {dict.home.team.action}
          </ButtonLink>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => {
            return (
              <li key={member.id}>
                <article className="group h-full overflow-hidden rounded-card border border-hairline bg-white">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-canvas">
                    {/* Portrait de placeholder, à remplacer par la photographie officielle. */}
                    <Image
                      src={member.photo}
                      alt={`${dict.team.portraitAlt} ${member.name}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold text-navy">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-[15px] text-accent">
                      {dict.team_members[member.id].role}
                    </p>
                    {/* Première ligne de la biographie : donne un repère de
                        parcours sans reprendre le texte complet de la page équipe. */}
                    <p className="mt-3 line-clamp-3 text-[14px] leading-relaxed text-ink-muted">
                      {dict.team_members[member.id].bio[0]}
                    </p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
