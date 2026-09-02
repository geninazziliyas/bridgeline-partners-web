import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { RoomShell } from '@/components/room/RoomShell';
import { getDictionary, localizedPath, type Locale } from '@/lib/i18n';

/**
 * Toutes les pages de ce segment sont protégées.
 *
 * Le middleware bloque déjà les requêtes non authentifiées ; ce contrôle
 * serveur est la seconde barrière, celle qui garantit qu'aucune donnée n'est
 * lue avant vérification de la session.
 */
export default async function RoomDashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const session = await auth();

  if (!session?.user) {
    redirect(localizedPath(params.locale, '/room/login'));
  }

  const dict = getDictionary(params.locale);

  return (
    <RoomShell
      locale={params.locale}
      dict={dict}
      user={{
        name: session.user.name ?? dict.roomNav.fallbackUser,
        email: session.user.email ?? '',
        company: session.user.company,
      }}
    >
      {children}
    </RoomShell>
  );
}
