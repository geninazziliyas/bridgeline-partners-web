import type { Metadata } from 'next';

import { RoomPageHeader } from '@/components/room/RoomPageHeader';
import { EmptyState } from '@/components/room/EmptyState';
import { listContactMessagesAdmin } from '@/lib/admin';
import { formatShortDate } from '@/lib/utils';
import type { Locale } from '@/lib/i18n/config';

export const metadata: Metadata = { robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

/**
 * Messages du formulaire de contact public.
 *
 * Ils sont toujours enregistrés ici même si l'envoi de la notification email
 * échoue (clé Resend absente, domaine d'envoi non vérifié...) : cette page
 * reste donc la source fiable, à consulter si la boîte mail ne reçoit rien.
 */
export default async function AdminContactPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const messages = await listContactMessagesAdmin();

  return (
    <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <RoomPageHeader
        title="Messages de contact"
        lead="Tous les messages soumis depuis le formulaire de contact du site public, qu'ils aient été notifiés par email ou non."
      />

      {messages.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="Aucun message"
            body="Les messages soumis depuis le formulaire de contact apparaîtront ici."
          />
        </div>
      ) : (
        <ul className="mt-8 flex flex-col gap-4">
          {messages.map((message) => (
            <li key={message.id} className="rounded-card border border-hairline bg-white p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-display text-lg font-bold text-navy">{message.name}</p>
                  <a
                    href={`mailto:${message.email}`}
                    className="mt-1 block text-[14px] text-accent hover:underline"
                  >
                    {message.email}
                  </a>
                  {message.company ? (
                    <p className="text-[14px] text-ink-muted">{message.company}</p>
                  ) : null}
                </div>
                <span className="text-[13px] text-ink-faint">
                  {formatShortDate(message.createdAt, params.locale)}
                </span>
              </div>

              <p className="mt-4 max-w-[70ch] whitespace-pre-line text-[14px] leading-relaxed text-ink-muted">
                {message.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
