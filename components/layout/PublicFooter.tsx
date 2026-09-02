import Link from 'next/link';

import { Container } from '@/components/ui/Container';
import { Wordmark } from '@/components/layout/Wordmark';
import { navigation, offices, phones, site } from '@/lib/site';
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
      <Container className="grid gap-12 py-16 lg:grid-cols-4 lg:gap-10">
        <div>
          <Wordmark tone="white" />
          <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-white/70">
            {dict.footer.tagline}
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
            {dict.footer.services}
          </h2>
          <ul className="mt-4 space-y-3">
            {dict.servicesList.map((service) => (
              <li key={service.title} className="text-[15px] text-white/70">
                {service.title}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold text-white">
            {dict.footer.contact}
          </h2>
          <ul className="mt-4 space-y-3">
            {phones.map((phone) => (
              <li key={phone}>
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="font-mono text-[14px] text-white/70 transition-colors hover:text-white"
                >
                  {phone}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${site.email}`}
                className="font-mono text-[14px] text-white/70 transition-colors hover:text-white"
              >
                {site.email}
              </a>
            </li>
          </ul>

          <h2 className="mt-8 font-display text-sm font-semibold text-white">
            {dict.footer.offices}
          </h2>
          <ul className="mt-4 space-y-3">
            {offices.map((office) => (
              <li key={office.id} className="text-[14px] leading-relaxed text-white/70">
                {office.address}
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
