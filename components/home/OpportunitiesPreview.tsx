import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { getPublicDeals } from '@/lib/deals';
import { formatShortDate } from '@/lib/utils';

/**
 * Apercu des operations en cours.
 *
 * Le site public annonce l'existence des operations et leur calendrier, jamais
 * leurs montants : la donnee chiffree reste derriere l'authentification de la
 * Room.
 */
export async function OpportunitiesPreview() {
  const deals = await getPublicDeals(4);

  return (
    <section className="border-b border-hairline bg-canvas py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="max-w-xl font-display text-3xl font-bold text-navy md:text-4xl">
              Operations en cours
            </h2>
            <p className="mt-3 max-w-[56ch] text-[16px] leading-relaxed text-ink-muted">
              Les montants cibles, tickets minimums et documents sont accessibles
              apres connexion.
            </p>
          </div>
        </div>

        {deals.length === 0 ? (
          // Etat vide : aucune operation ouverte, ou base momentanement injoignable.
          <div className="mt-10 rounded-card border border-dashed border-hairline bg-white p-10 text-center">
            <p className="text-[16px] text-ink-muted">
              Aucune operation n’est ouverte a la souscription pour le moment.
            </p>
            <ButtonLink href="/contact" variant="secondary" size="md" className="mt-6">
              Nous contacter
            </ButtonLink>
          </div>
        ) : (
          <ul className="mt-10 divide-y divide-hairline border-y border-hairline">
            {deals.map((deal) => (
              <li key={deal.id}>
                <div className="grid gap-4 py-6 md:grid-cols-12 md:items-center md:gap-6">
                  <div className="md:col-span-5">
                    <h3 className="font-display text-lg font-bold text-navy">
                      {deal.name}
                    </h3>
                    <p className="mt-1 max-w-[52ch] text-[15px] leading-relaxed text-ink-muted">
                      {deal.summary}
                    </p>
                  </div>
                  <p className="text-[15px] text-ink-muted md:col-span-3">
                    {deal.sector}
                  </p>
                  <p className="tabular font-mono text-[14px] text-ink-muted md:col-span-2">
                    {formatShortDate(deal.closingDate)}
                  </p>
                  <div className="md:col-span-2 md:justify-self-end">
                    <StatusBadge status={deal.status} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <ButtonLink href="/room" variant="ghost" size="md" className="mt-8 -ml-3">
          Bridgeline Room
          <ArrowRight size={16} weight="bold" />
        </ButtonLink>
      </Container>
    </section>
  );
}
