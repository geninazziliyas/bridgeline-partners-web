import Link from 'next/link';

import { Container } from '@/components/ui/Container';
import { Wordmark } from '@/components/layout/Wordmark';
import { navigation, offices, site } from '@/lib/site';
import { localizedPath, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';

/**
 * Pied de page. Porte la mention de destination du site, exigée par le cadre
 * de commercialisation auprès d'investisseurs professionnels.
 */
export function PublicFooter({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
        <div>
          <Wordmark tone="white" />
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/70">
            {dict.meta.description}
          </p>
        </div>

        <nav aria-label={dict.footer.ariaLabel}>
          <h2 className="font-display text-sm font-semibold text-white">
            {dict.footer.navigation}
          </h2>
          <ul className="mt-4 space-y-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={localizedPath(locale, item.href)}
                  className="text-[15px] text-white/70 transition-colors hover:text-white"
                >
                  {dict.nav[item.key]}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={localizedPath(locale, '/room')}
                className="text-[15px] text-white/70 transition-colors hover:text-white"
              >
                {dict.common.room}
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-semibold text-white">
            {dict.footer.offices}
          </h2>
          <ul className="mt-4 space-y-4">
            {offices.map((office) => (
              <li key={office.id}>
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
            {year} {site.name}. {dict.footer.rights}
          </p>
          <p className="max-w-xl sm:text-right">{dict.footer.disclaimer}</p>
        </Container>
      </div>
    </footer>
  );
}
