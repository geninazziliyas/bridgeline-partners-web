import { Container } from '@/components/ui/Container';
import type { Dictionary } from '@/lib/i18n';

/**
 * Notre approche. Rail de numéros en monospace à gauche, contenu à droite,
 * séparés par des filets : une famille de mise en page distincte des grilles de
 * cartes utilisées ailleurs sur la page.
 */
export function Approach({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-b border-hairline bg-white py-20 lg:py-28">
      <Container>
        <h2 className="max-w-2xl font-display text-3xl font-bold text-navy md:text-4xl">
          {dict.home.approach.title}
        </h2>

        <ol className="mt-12 divide-y divide-hairline border-y border-hairline">
          {dict.approach.map((step, index) => (
            <li
              key={step.title}
              className="grid gap-4 py-8 md:grid-cols-12 md:items-baseline md:gap-8 lg:py-10"
            >
              <span className="tabular font-mono text-sm text-ink-faint md:col-span-1">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-xl font-bold text-navy md:col-span-3 md:text-2xl">
                {step.title}
              </h3>
              <p className="max-w-[62ch] text-[16px] leading-relaxed text-ink-muted md:col-span-8">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
