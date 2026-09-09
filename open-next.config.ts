// Configuration OpenNext pour Cloudflare Workers.
//
// Le cache incrémental (ISR) par défaut vit en mémoire du Worker et ne
// survit donc pas entre requêtes. Comme les pages dynamiques du site
// (Room, admin) sont déjà marquées `force-dynamic` et que les pages
// publiques se contentent d'un rendu statique simple, ce n'est pas un
// problème ici. À reconsidérer si des pages avec `revalidate` sont
// ajoutées plus tard : voir https://opennext.js.org/cloudflare/caching
// pour brancher un cache R2.
import { defineCloudflareConfig } from '@opennextjs/cloudflare/config';

export default defineCloudflareConfig();
