import type { Metadata } from 'next';

import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContactForm } from '@/components/forms/ContactForm';
import { offices } from '@/lib/site';
import { getDictionary, type Locale } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const dict = getDictionary(params.locale);
  return {
    title: dict.contact.title,
    description: dict.contact.lead,
    alternates: { canonical: `/${params.locale}/contact` },
  };
}

export default function ContactPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);

  return (
    <>
      <PageHeader title={dict.contact.title} lead={dict.contact.lead} />

      <section className="bg-canvas py-16 lg:py-20">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="rounded-card border border-hairline bg-white p-8 lg:p-10">
              <ContactForm locale={params.locale} dict={dict} />
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <h2 className="font-display text-xl font-bold text-navy">
              {dict.contact.officesTitle}
            </h2>

            <dl className="mt-6 divide-y divide-hairline border-y border-hairline">
              {offices.map((office) => (
                <div key={office.id} className="py-6">
                  <dt className="font-display text-lg font-bold text-navy">
                    {office.city}
                  </dt>
                  <dd className="mt-2 space-y-1.5 text-[15px] leading-relaxed text-ink-muted">
                    <p>{dict.offices[office.id].country}</p>
                    {/* Adresse et téléphone restent masqués tant qu'ils ne sont
                        pas renseignés dans lib/site.ts. */}
                    {office.address ? <p>{office.address}</p> : null}
                    {office.phone ? (
                      <p>
                        <a
                          href={`tel:${office.phone.replace(/\s/g, '')}`}
                          className="font-mono text-[14px] text-accent underline-offset-4 hover:underline"
                        >
                          {office.phone}
                        </a>
                      </p>
                    ) : null}
                    <p>
                      <a
                        href={`mailto:${office.email}`}
                        className="font-mono text-[14px] text-accent underline-offset-4 hover:underline"
                      >
                        {office.email}
                      </a>
                    </p>
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 text-[14px] leading-relaxed text-ink-muted">
              {dict.contact.existingInvestor}
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
