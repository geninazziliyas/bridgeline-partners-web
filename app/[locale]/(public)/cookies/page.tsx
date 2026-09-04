import type { Metadata } from 'next';

import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { site } from '@/lib/site';
import { getDictionary, type Locale } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const dict = getDictionary(params.locale);
  return {
    title: dict.cookies.title,
    description: dict.cookies.lead,
    alternates: { canonical: `/${params.locale}/cookies` },
  };
}

export default function CookiesPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);

  return (
    <>
      <PageHeader title={dict.cookies.title} lead={dict.cookies.lead} />

      <section className="bg-white py-20 lg:py-24">
        <Container className="max-w-3xl">
          <p className="text-[17px] leading-relaxed text-ink-muted">
            {dict.cookies.intro}
          </p>

          <div className="mt-10 overflow-hidden rounded-card border border-hairline">
            <table className="w-full border-collapse text-left text-[15px]">
              <thead>
                <tr className="bg-canvas">
                  <th className="border-b border-hairline px-5 py-3 font-display font-semibold text-navy">
                    {dict.cookies.table.name}
                  </th>
                  <th className="border-b border-hairline px-5 py-3 font-display font-semibold text-navy">
                    {dict.cookies.table.purpose}
                  </th>
                  <th className="border-b border-hairline px-5 py-3 font-display font-semibold text-navy">
                    {dict.cookies.table.duration}
                  </th>
                </tr>
              </thead>
              <tbody>
                {dict.cookies.table.rows.map((row, index) => (
                  <tr key={row.name} className={index > 0 ? 'border-t border-hairline' : undefined}>
                    <td className="px-5 py-4 align-top font-mono text-[13px] text-navy">
                      {row.name}
                    </td>
                    <td className="px-5 py-4 align-top leading-relaxed text-ink-muted">
                      {row.purpose}
                    </td>
                    <td className="px-5 py-4 align-top whitespace-nowrap text-ink-muted">
                      {row.duration}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-8 text-[15px] leading-relaxed text-ink-muted">
            {dict.cookies.none}
          </p>

          <p className="mt-8 text-[15px] leading-relaxed text-ink-muted">
            {dict.cookies.contact}{' '}
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
