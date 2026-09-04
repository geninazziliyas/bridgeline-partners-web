import type { Metadata } from 'next';
import Link from 'next/link';

import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { site } from '@/lib/site';
import { getDictionary, localizedPath, type Locale } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const dict = getDictionary(params.locale);
  return {
    title: dict.privacy.title,
    description: dict.privacy.lead,
    alternates: { canonical: `/${params.locale}/privacy` },
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-hairline pt-10 first:border-t-0 first:pt-0">
      <h2 className="font-display text-xl font-bold text-navy">{title}</h2>
      <div className="mt-4 space-y-3 text-[16px] leading-relaxed text-ink-muted">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  const p = dict.privacy;

  return (
    <>
      <PageHeader title={p.title} lead={p.lead} />

      <section className="bg-white py-20 lg:py-24">
        <Container className="max-w-3xl space-y-10">
          <Section title={p.controller.title}>
            <p>{p.controller.body}</p>
          </Section>

          <Section title={p.collect.title}>
            <ul className="list-disc space-y-2 pl-5">
              {p.collect.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>

          <Section title={p.use.title}>
            <ul className="list-disc space-y-2 pl-5">
              {p.use.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>

          <Section title={p.basis.title}>
            <p>{p.basis.body}</p>
          </Section>

          <Section title={p.retention.title}>
            <p>{p.retention.body}</p>
          </Section>

          <Section title={p.rights.title}>
            <p>{p.rights.body}</p>
          </Section>

          <p>
            {p.cookiesNote}{' '}
            <Link
              href={localizedPath(params.locale, '/cookies')}
              className="text-accent underline-offset-4 hover:underline"
            >
              {p.cookiesNoteLink}
            </Link>
            .
          </p>

          <p>
            {p.contact}{' '}
            <a
              href={`mailto:${site.email}`}
              className="text-accent underline-offset-4 hover:underline"
            >
              {site.email}
            </a>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
