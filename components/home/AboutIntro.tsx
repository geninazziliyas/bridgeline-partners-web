import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { offices } from '@/lib/site';

/**
 * Section A propos de la page d'accueil. Texte a gauche, bureaux a droite en
 * blocs separes par des filets : pas de cartes, l'elevation n'apporte rien ici.
 */
export function AboutIntro() {
  return (
    <section className="border-b border-hairline bg-canvas py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">
            Une maison de placement, deux juridictions
          </h2>
          <p className="mt-6 text-[17px] leading-relaxed text-ink-muted">
            Nous relions des investisseurs professionnels a des operations de
            marches prives auxquelles ils n’auraient pas acces autrement :
            secondaires, co-investissements, financements adosses a des actifs
            reels. Chaque dossier est structure dans un vehicule dedie, avec la
            documentation et les prestataires qui vont avec.
          </p>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-muted">
            Notre taille est un choix. Nous traitons un nombre limite
            d’operations par an pour rester en mesure de les suivre jusqu’a la
            sortie.
          </p>
          <ButtonLink href="/about" variant="ghost" size="md" className="mt-8 -ml-3">
            En savoir plus sur notre positionnement
          </ButtonLink>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <dl className="divide-y divide-hairline border-y border-hairline">
            {offices.map((office) => (
              <div key={office.city} className="py-6">
                <dt className="font-display text-xl font-bold text-navy">
                  {office.city}
                </dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-ink-muted">
                  {office.role}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
