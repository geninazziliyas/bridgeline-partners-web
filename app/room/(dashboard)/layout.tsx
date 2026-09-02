import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { RoomShell } from '@/components/room/RoomShell';

/**
 * Toutes les pages de ce segment sont protegees.
 *
 * Le middleware bloque deja les requetes non authentifiees ; ce controle
 * serveur est la seconde barriere, celle qui garantit qu'aucune donnee n'est
 * lue avant verification de la session.
 */
export default async function RoomDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect('/room/login');
  }

  return (
    <RoomShell
      user={{
        name: session.user.name ?? 'Investisseur',
        email: session.user.email ?? '',
        company: session.user.company,
      }}
    >
      {children}
    </RoomShell>
  );
}
