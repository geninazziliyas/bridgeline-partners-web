import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { offices } from '@/lib/site';
import { localizedPath, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';

/**
 * Section À propos de la page d'accueil. Texte à gauche, bureaux à droite en
 * blocs séparés par des filets : pas de cartes, l'élévation n'apporte rien ici.
 */
export function AboutIntro({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="border-b border-hairline bg-canvas py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">
            {dict.home.about.title}
          </h2>
          <p className="mt-6 text-[17px] leading-relaxed text-ink-muted">
            {dict.home.about.body1}
          </p>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-muted">
            {dict.home.about.body2}
          </p>
          <ButtonLink
            href={localizedPath(locale, '/about')}
            variant="ghost"
            size="md"
            className="mt-8 -ml-3"
          >
            {dict.home.about.link}
          </ButtonLink>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <dl className="divide-y divide-hairline border-y border-hairline">
            {offices.map((office) => (
              <div key={office.id} className="py-6">
                <dt className="font-display text-xl font-bold text-navy">
                  {office.city}
                </dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-ink-muted">
                  {dict.offices[office.id].role}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
