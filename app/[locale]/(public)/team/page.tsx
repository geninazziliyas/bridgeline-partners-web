import type { Metadata } from 'next';
import Image from 'next/image';

import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { PageHeader } from '@/components/layout/PageHeader';
import { team } from '@/lib/site';
import { getDictionary, localizedPath, type Locale } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const dict = getDictionary(params.locale);
  return {
    title: dict.nav.team,
    description: dict.team.lead,
    alternates: { canonical: `/${params.locale}/team` },
  };
}

export default function TeamPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);

  return (
    <>
      <PageHeader title={dict.team.title} lead={dict.team.lead} />

      <section className="bg-canvas py-16 lg:py-20">
        <Container>
          <ul className="space-y-6">
            {team.map((member) => (
              <li key={member.id}>
                {/* Portrait à gauche, biographie à droite : la lecture reste
                    horizontale au-delà de md, empilée en dessous. */}
                <article className="grid overflow-hidden rounded-card border border-hairline bg-white md:grid-cols-12">
                  <div className="relative aspect-[4/5] w-full bg-canvas md:col-span-4 md:aspect-auto md:min-h-[360px] lg:col-span-3">
                    {/* Portrait de placeholder, à remplacer par la photographie officielle. */}
                    <Image
                      src={member.photo}
                      alt={`${dict.team.portraitAlt} ${member.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="p-8 md:col-span-8 md:p-10 lg:col-span-9">
                    <h2 className="font-display text-2xl font-bold text-navy">
                      {member.name}
                    </h2>
                    <p className="mt-1.5 text-[16px] text-accent">
                      {dict.team_members[member.id].role}
                    </p>
                    <div className="mt-5 space-y-3">
                      {dict.team_members[member.id].bio.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="max-w-[70ch] text-[16px] leading-relaxed text-ink-muted"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <div className="mt-12 border-t border-hairline pt-10">
            <h2 className="font-display text-xl font-bold text-navy">
              {dict.team.cta.title}
            </h2>
            <p className="mt-3 max-w-[60ch] text-[16px] leading-relaxed text-ink-muted">
              {dict.team.cta.body}
            </p>
            <ButtonLink
              href={localizedPath(params.locale, '/contact')}
              size="lg"
              className="mt-6"
            >
              {dict.common.contact}
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
