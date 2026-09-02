import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ChartLineUp, FileText, Lock } from '@phosphor-icons/react/dist/ssr';

import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { AccessRequestForm } from '@/components/forms/AccessRequestForm';
import { getDictionary, localizedPath, type Locale } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const dict = getDictionary(params.locale);
  return {
    title: dict.common.room,
    description: dict.roomLanding.lead,
    alternates: { canonical: `/${params.locale}/room` },
  };
}

/** Une icône par bénéfice, dans l'ordre du dictionnaire. */
const benefitIcons = [FileText, Lock, ChartLineUp];

export default function RoomLandingPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const dict = getDictionary(params.locale);

  return (
    <>
      {/* Hero sur aplat navy : la Room est un espace distinct du site vitrine,
          le changement de fond l'annonce dès la première fenêtre. */}
      <section className="bg-navy text-white">
        <Container className="grid items-center gap-12 pb-16 pt-16 lg:grid-cols-12 lg:gap-16 lg:pb-24 lg:pt-24">
          <div className="lg:col-span-7">
            <h1 className="max-w-2xl font-display text-4xl font-extrabold leading-[1.08] md:text-5xl">
              {dict.roomLanding.title}
            </h1>
            <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-white/75">
              {dict.roomLanding.lead}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href={localizedPath(params.locale, '/room/login')}
                variant="onNavy"
                size="lg"
              >
                {dict.common.signIn}
              </ButtonLink>
              <ButtonLink
                href="#demander-l-acces"
                variant="secondary"
                size="lg"
                className="border-white/25 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white"
              >
                {dict.common.requestAccess}
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card border border-white/15">
              {/* Placeholder photographique, à remplacer par une capture de la Room. */}
              <Image
                src="https://picsum.photos/seed/bridgeline-room-interior/1000/750"
                alt={dict.roomLanding.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Trois bénéfices en colonnes séparées par des filets verticaux, sans
          cartes : l'élévation n'ajouterait rien à une liste de trois items. */}
      <section className="border-b border-hairline bg-white py-20 lg:py-24">
        <Container>
          <ul className="grid divide-y divide-hairline md:grid-cols-3 md:divide-x md:divide-y-0">
            {dict.roomBenefits.map((benefit, index) => {
              const Icon = benefitIcons[index];
              return (
                <li
                  key={benefit.title}
                  className="px-0 py-8 md:px-8 md:py-0 md:first:pl-0 md:last:pr-0"
                >
                  <Icon size={26} weight="light" className="text-accent" />
                  <h2 className="mt-5 font-display text-xl font-bold text-navy">
                    {benefit.title}
                  </h2>
                  <p className="mt-3 max-w-[42ch] text-[16px] leading-relaxed text-ink-muted">
                    {benefit.body}
                  </p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section id="demander-l-acces" className="scroll-mt-20 bg-canvas py-20 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">
              {dict.roomLanding.request.title}
            </h2>
            <p className="mt-5 max-w-[52ch] text-[17px] leading-relaxed text-ink-muted">
              {dict.roomLanding.request.body}
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-muted">
              {dict.roomLanding.request.hasAccount}{' '}
              <Link
                href={localizedPath(params.locale, '/room/login')}
                className="font-medium text-accent underline-offset-4 hover:underline"
              >
                {dict.common.signIn}
              </Link>
              .
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="rounded-card border border-hairline bg-white p-8 lg:p-10">
              <AccessRequestForm locale={params.locale} dict={dict} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
