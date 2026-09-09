-- À exécuter dans l'éditeur SQL de Neon.
-- Ajoute le lien externe (manuel) vers la newsletter Beehiiv correspondant à une opération.
ALTER TABLE "Deal" ADD COLUMN IF NOT EXISTS "newsletterUrl" TEXT;
