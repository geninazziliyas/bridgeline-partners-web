import Link from 'next/link';
import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr';
import { DealStatus } from '@prisma/client';

import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Field';
import { localizedPath, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';

/**
 * Recherche et filtre des opérations.
 *
 * Formulaire GET natif, sans état client : les critères vivent dans l'URL, la
 * page reste un Server Component, et un filtre est partageable par simple copie
 * du lien. C'est aussi ce qui demande le moins de maintenance.
 */
export function DealFilters({
  locale,
  dict,
  query,
  status,
}: {
  locale: Locale;
  dict: Dictionary;
  query?: string;
  status?: string;
}) {
  const hasFilters = Boolean(query || status);

  return (
    <form method="GET" className="flex flex-col gap-3 sm:flex-row sm:items-end" role="search">
      <div className="flex-1">
        <label htmlFor="deal-query" className="text-sm font-medium text-ink">
          {dict.opportunities.search}
        </label>
        <div className="relative mt-2">
          <MagnifyingGlass
            size={17}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint"
            aria-hidden="true"
          />
          <Input
            id="deal-query"
            name="q"
            type="search"
            defaultValue={query}
            placeholder={dict.opportunities.searchPlaceholder}
            className="pl-10"
          />
        </div>
      </div>

      <div className="sm:w-56">
        <label htmlFor="deal-status" className="text-sm font-medium text-ink">
          {dict.opportunities.status}
        </label>
        <Select id="deal-status" name="status" defaultValue={status ?? ''} className="mt-2">
          <option value="">{dict.opportunities.allStatuses}</option>
          {Object.values(DealStatus).map((value) => (
            <option key={value} value={value}>
              {dict.dealStatus[value]}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex gap-3">
        <Button type="submit" size="md">
          {dict.opportunities.filter}
        </Button>
        {hasFilters ? (
          <Link
            href={localizedPath(locale, '/room/opportunities')}
            className="inline-flex h-11 items-center rounded-control px-3 text-[15px] text-ink-muted transition-colors hover:text-accent"
          >
            {dict.opportunities.reset}
          </Link>
        ) : null}
      </div>
    </form>
  );
}
