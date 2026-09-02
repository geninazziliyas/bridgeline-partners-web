import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { localizedPath, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';

/**
 * Nos services. Rail de numéros en monospace à gauche, contenu à droite,
 * séparés par des filets : une famille de mise en page distincte des grilles de
 * cartes utilisées ailleurs sur la page.
 */
export function Services({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="border-b border-hairline bg-white py-20 lg:py-28">
      <Container>
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">
            {dict.home.services.title}
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-muted">
            {dict.home.services.lead}
          </p>
        </div>

        <ol className="mt-12 divide-y divide-hairline border-y border-hairline">
          {dict.servicesList.map((service, index) => (
            <li
              key={service.title}
              className="grid gap-4 py-8 md:grid-cols-12 md:items-baseline md:gap-8 lg:py-9"
            >
              <span className="tabular font-mono text-sm text-ink-faint md:col-span-1">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-xl font-bold text-navy md:col-span-4 md:text-2xl">
                {service.title}
              </h3>
              <p className="max-w-[62ch] text-[16px] leading-relaxed text-ink-muted md:col-span-7">
                {service.body}
              </p>
            </li>
          ))}
        </ol>

        <ButtonLink
          href={localizedPath(locale, '/services')}
          variant="ghost"
          size="md"
          className="mt-8 -ml-3"
        >
          {dict.common.learnMore}
        </ButtonLink>
      </Container>
    </section>
  );
}
