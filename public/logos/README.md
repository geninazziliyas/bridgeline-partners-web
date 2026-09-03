# Logos des investissements passés

12 fichiers PNG attendus ici, un par société, déjà déclarés dans `trackRecord`
(`lib/site.ts`) :

| Fichier attendu | Société |
| --- | --- |
| `palantir.png` | Palantir |
| `forward.png` | Forward |
| `impossible.png` | Impossible |
| `spacex.png` | SpaceX |
| `wefox.png` | wefox |
| `airbnb.png` | Airbnb |
| `stripe.png` | Stripe |
| `grab.png` | Grab |
| `revolut.png` | Revolut |
| `ripple.png` | Ripple |
| `kodiak.png` | Kodiak |
| `uber.png` | Uber |

Tant qu'un fichier est absent, l'entrée correspondante affiche le nom de la
société en typographie plutôt qu'une image cassée : déposer les fichiers
manquants suffit à faire basculer l'affichage, sans toucher au code.

## Format

- Couleurs réelles de la marque, fond transparent (PNG). Le bandeau est sur
  fond blanc : un fond opaque non blanc créerait un cadre visible autour du
  logo
- Hauteur de trace utile d'environ 80-120 px avant export, pour rester net
  une fois affiché en petit sur les écrans à forte densité
- Le composant contraint la hauteur affichée (28 px) et laisse la largeur
  libre selon les proportions du fichier

Ces logos appartiennent aux sociétés concernées. Ils doivent être obtenus
depuis leur kit de presse ou avec leur accord avant toute publication.
