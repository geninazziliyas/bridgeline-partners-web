import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Portrait } from '@/components/ui/Portrait';
import { team } from '@/lib/site';
import { localizedPath, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';

/**
 * Aperçu de l'équipe.
 *
 * Portrait à taille fixe en tête de carte, pas d'image pleine largeur : sur
 * mobile, une photo étirée occuperait tout l'écran et repousserait le nom hors
 * du champ.
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
          {team.map((member) => (
            <li key={member.id}>
              <article className="flex h-full flex-col rounded-card border border-hairline bg-white p-6">
                <Portrait
                  name={member.name}
                  photo={member.photo}
                  alt={`${dict.team.portraitAlt} ${member.name}`}
                  size="sm"
                />
                <h3 className="mt-5 font-display text-lg font-bold text-navy">
                  {member.name}
                </h3>
                <p className="mt-1 text-[15px] text-accent">
                  {dict.team_members[member.id].role}
                </p>
                {/* Première ligne de la biographie : un repère de parcours,
                    sans reprendre le texte complet de la page équipe. */}
                <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">
                  {dict.team_members[member.id].bio[0]}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
