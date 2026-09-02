import Link from 'next/link';

import { Container } from '@/components/ui/Container';
import { Wordmark } from '@/components/layout/Wordmark';
import { navigation, offices, site } from '@/lib/site';

/**
 * Pied de page. Porte la mention de destination du site, exigee par le cadre
 * de commercialisation aupres d'investisseurs professionnels.
 */
export function PublicFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
        <div>
          <Wordmark tone="white" />
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/70">
            {site.description}
          </p>
        </div>

        <nav aria-label="Pied de page">
          <h2 className="font-display text-sm font-semibold text-white">Navigation</h2>
          <ul className="mt-4 space-y-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[15px] text-white/70 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/room"
                className="text-[15px] text-white/70 transition-colors hover:text-white"
              >
                Bridgeline Room
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-semibold text-white">Bureaux</h2>
          <ul className="mt-4 space-y-4">
            {offices.map((office) => (
              <li key={office.city}>
                <p className="text-[15px] text-white">{office.city}</p>
                <a
                  href={`mailto:${office.email}`}
                  className="font-mono text-[13px] text-white/60 transition-colors hover:text-white"
                >
                  {office.email}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-[13px] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {year} {site.name}. Tous droits reserves.
          </p>
          <p className="max-w-xl sm:text-right">
            Ce site s’adresse a des investisseurs professionnels. Il ne constitue ni
            une offre ni une sollicitation d’investissement.
          </p>
        </Container>
      </div>
    </footer>
  );
}
