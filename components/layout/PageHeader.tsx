import type { ReactNode } from 'react';

import { Container } from '@/components/ui/Container';

/** Entete des pages interieures : titre, chapeau, action optionnelle. */
export function PageHeader({
  title,
  lead,
  action,
}: {
  title: string;
  lead: string;
  action?: ReactNode;
}) {
  return (
    <section className="border-b border-hairline bg-white">
      <Container className="grid gap-8 py-16 lg:grid-cols-12 lg:items-end lg:py-20">
        <div className="lg:col-span-8">
          <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.1] text-navy md:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-ink-muted">
            {lead}
          </p>
        </div>
        {action ? (
          <div className="lg:col-span-4 lg:justify-self-end">{action}</div>
        ) : null}
      </Container>
    </section>
  );
}
