import type { Metadata } from 'next';
import Image from 'next/image';

import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { PageHeader } from '@/components/layout/PageHeader';
import { offices } from '@/lib/site';
import { getDictionary, localizedPath, type Locale } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const dict = getDictionary(params.locale);
  return {
    title: dict.nav.about,
    description: dict.about.lead,
    alternates: { canonical: `/${params.locale}/about` },
  };
}

export default function AboutPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);

  return (
    <>
      <PageHeader title={dict.about.title} lead={dict.about.lead} />

      <section className="border-b border-hairline bg-canvas py-20 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="font-display text-2xl font-bold text-navy md:text-3xl">
              {dict.about.positioning.title}
            </h2>
            <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-ink-muted">
              <p>{dict.about.positioning.body1}</p>
              <p>{dict.about.positioning.body2}</p>
              <p>{dict.about.positioning.body3}</p>
            </div>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="rounded-card border border-hairline bg-white p-8">
              <h3 className="font-display text-lg font-bold text-navy">
                {dict.home.advantages.eyebrow}
              </h3>
              <ul className="mt-5 space-y-4 text-[15px] leading-relaxed text-ink-muted">
                {dict.advantages.map((item) => (
                  <li key={item.title} className="border-l-2 border-hairline pl-4">
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Container>
      </section>

      {/* Les deux publics du site, chacun avec son argumentaire complet.
          Alternance des colonnes pour éviter deux blocs identiques d'affilée. */}
      <section className="border-b border-hairline bg-white py-20 lg:py-24">
        <Container className="space-y-16">
          <article className="grid gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="font-display text-2xl font-bold text-navy md:text-3xl">
                {dict.about.seeking.title}
              </h2>
              <p className="mt-4 text-[17px] leading-relaxed text-accent">
                {dict.about.seeking.lead}
              </p>
            </div>
            <div className="space-y-4 text-[16px] leading-relaxed text-ink-muted lg:col-span-6 lg:col-start-7">
              <p>{dict.about.seeking.body1}</p>
              <p>{dict.about.seeking.body2}</p>
            </div>
          </article>

          <article className="grid gap-8 border-t border-hairline pt-16 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-4 text-[16px] leading-relaxed text-ink-muted lg:col-span-6 lg:row-start-1">
              <p>{dict.about.investing.body1}</p>
              <p>{dict.about.investing.body2}</p>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1">
              <h2 className="font-display text-2xl font-bold text-navy md:text-3xl">
                {dict.about.investing.title}
              </h2>
              <p className="mt-4 text-[17px] leading-relaxed text-accent">
                {dict.about.investing.lead}
              </p>
            </div>
          </article>
        </Container>
      </section>

      <section className="bg-canvas py-20 lg:py-24">
        <Container>
          <h2 className="font-display text-2xl font-bold text-navy md:text-3xl">
            {dict.about.offices.title}
          </h2>
          <p className="mt-4 max-w-[62ch] text-[17px] leading-relaxed text-ink-muted">
            {dict.about.offices.lead}
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {offices.map((office) => (
              <article
                key={office.id}
                className="overflow-hidden rounded-card border border-hairline bg-white"
              >
                <div className="relative aspect-[4/3] w-full bg-canvas">
                  {/* Placeholder photographique, à remplacer par le visuel du bureau. */}
                  <Image
                    src={office.photo}
                    alt={`${dict.about.offices.photoAlt} ${office.city}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-display text-xl font-bold text-navy">
                    {office.city}
                  </h3>
                  <p className="mt-1 text-[14px] text-ink-faint">
                    {dict.offices[office.id].country}
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
                    {office.address}
                  </p>
                  <p className="mt-3 space-x-4">
                    <a
                      href={`tel:${office.phone.replace(/\s/g, '')}`}
                      className="font-mono text-[14px] text-accent underline-offset-4 hover:underline"
                    >
                      {office.phone}
                    </a>
                    <a
                      href={`mailto:${office.email}`}
                      className="font-mono text-[14px] text-accent underline-offset-4 hover:underline"
                    >
                      {office.email}
                    </a>
                  </p>
                </div>
              </article>
            ))}
          </div>

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
