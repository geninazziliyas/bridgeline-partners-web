import type { Metadata } from 'next';

import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContactForm } from '@/components/forms/ContactForm';
import { offices } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Nous contacter',
  description:
    'Contactez Bridgeline Partners. Bureaux a Luxembourg et a Geneve.',
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Nous contacter"
        lead="Que vous cherchiez a investir ou a lever du capital, decrivez votre situation. Nous repondons sous deux jours ouvres."
      />

      <section className="bg-canvas py-16 lg:py-20">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="rounded-card border border-hairline bg-white p-8 lg:p-10">
              <ContactForm />
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <h2 className="font-display text-xl font-bold text-navy">Nos bureaux</h2>

            <dl className="mt-6 divide-y divide-hairline border-y border-hairline">
              {offices.map((office) => (
                <div key={office.city} className="py-6">
                  <dt className="font-display text-lg font-bold text-navy">
                    {office.city}
                  </dt>
                  <dd className="mt-2 space-y-1.5 text-[15px] leading-relaxed text-ink-muted">
                    <p>{office.country}</p>
                    {/* Adresse et telephone restent masques tant qu'ils ne sont
                        pas renseignes dans lib/site.ts. */}
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
              Vous etes deja investisseur chez nous ? Vos questions de suivi
              passent par la Bridgeline Room, ou vos documents sont disponibles.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
