import type { Metadata } from 'next';

import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { PageHeader } from '@/components/layout/PageHeader';
import { getDictionary, localizedPath, type Locale } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const dict = getDictionary(params.locale);
  return {
    title: dict.nav.services,
    description: dict.services.lead,
    alternates: { canonical: `/${params.locale}/services` },
  };
}

export default function ServicesPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);

  return (
    <>
      <PageHeader title={dict.services.title} lead={dict.services.lead} />

      <section className="border-b border-hairline bg-canvas py-20 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="space-y-4 text-[17px] leading-relaxed text-ink-muted">
              <p>{dict.services.intro.body1}</p>
              <p>{dict.services.intro.body2}</p>
              <p>{dict.services.intro.body3}</p>
              <p>{dict.services.intro.body4}</p>
            </div>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="rounded-card border border-hairline bg-white p-8">
              <h2 className="font-display text-lg font-bold text-navy">
                {dict.services.listTitle}
              </h2>
              <ul className="mt-5 space-y-4 text-[15px] leading-relaxed text-ink-muted">
                {dict.servicesList.map((service) => (
                  <li key={service.title} className="border-l-2 border-hairline pl-4">
                    <span className="font-medium text-navy">{service.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Container>
      </section>

      <section className="bg-white py-20 lg:py-24">
        <Container>
          <ol className="divide-y divide-hairline border-y border-hairline">
            {dict.servicesList.map((service, index) => (
              <li
                key={service.title}
                className="grid gap-4 py-8 md:grid-cols-12 md:items-baseline md:gap-8"
              >
                <span className="tabular font-mono text-sm text-ink-faint md:col-span-1">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h2 className="font-display text-xl font-bold text-navy md:col-span-4 md:text-2xl">
                  {service.title}
                </h2>
                <p className="max-w-[62ch] text-[16px] leading-relaxed text-ink-muted md:col-span-7">
                  {service.body}
                </p>
              </li>
            ))}
          </ol>

          <ButtonLink
            href={localizedPath(params.locale, '/contact')}
            size="lg"
            className="mt-12"
          >
            {dict.common.contact}
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
