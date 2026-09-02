/**
 * Donnees de demonstration pour la Bridgeline Room.
 *
 * Lancement : npm run db:seed
 * Le script est idempotent (upsert sur les cles uniques), il peut etre rejoue.
 *
 * Les montants et valorisations sont des donnees de demonstration, destinees a
 * etre remplacees par les donnees reelles avant toute mise en production.
 */
import { PrismaClient, DealStatus, DocumentType, UserRole } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

/** Mot de passe des comptes de demonstration, surchargeable par variable d'env. */
const DEMO_PASSWORD = process.env.SEED_PASSWORD ?? 'BridgelineDemo2026!';

async function main() {
  const passwordHash = await hash(DEMO_PASSWORD, 12);

  // --- Comptes -------------------------------------------------------------
  const investor = await prisma.user.upsert({
    where: { email: 'camille.ferrand@meridien-fo.com' },
    update: {},
    create: {
      name: 'Camille Ferrand',
      email: 'camille.ferrand@meridien-fo.com',
      company: 'Meridien Family Office',
      jurisdiction: 'Luxembourg',
      role: UserRole.INVESTOR,
      emailVerified: new Date(),
      passwordHash,
    },
  });

  const secondInvestor = await prisma.user.upsert({
    where: { email: 'anton.brekalo@vestara-capital.ch' },
    update: {},
    create: {
      name: 'Anton Brekalo',
      email: 'anton.brekalo@vestara-capital.ch',
      company: 'Vestara Capital',
      jurisdiction: 'Suisse',
      role: UserRole.INVESTOR,
      emailVerified: new Date(),
      passwordHash,
    },
  });

  await prisma.user.upsert({
    where: { email: 'herve.croset@bridgelinepartners.com' },
    update: {},
    create: {
      name: 'Herve Croset',
      email: 'herve.croset@bridgelinepartners.com',
      company: 'Bridgeline Partners',
      jurisdiction: 'Luxembourg',
      role: UserRole.ADMIN,
      emailVerified: new Date(),
      passwordHash,
    },
  });

  // --- Opportunites --------------------------------------------------------
  const deals = [
    {
      slug: 'bcv-gold-trade-finance',
      name: 'BCV Gold Trade Finance',
      summary:
        'Financement de flux physiques d’or entre raffineries suisses et negociants agrees.',
      description:
        'Strategie de trade finance adossee a des flux physiques d’or entre raffineries suisses et negociants agrees. Chaque tirage est collateralise sur stock audite, avec une duration moyenne de 94 jours et une couverture de change systematique. Le vehicule cible une distribution trimestrielle.',
      sector: 'Trade finance',
      geography: 'Suisse, EAU',
      status: DealStatus.OPEN,
      targetAmount: 42_000_000,
      raisedAmount: 27_350_000,
      minTicket: 250_000,
      closingDate: new Date('2026-11-28'),
      featured: true,
    },
    {
      slug: 'bcv-anthropic-ai',
      name: 'BCV Anthropic AI',
      summary:
        'Acces secondaire a une position existante sur un laboratoire de recherche en IA.',
      description:
        'Vehicule dedie a l’acquisition secondaire d’une position existante au capital d’un laboratoire de recherche en intelligence artificielle. Structure en SPV luxembourgeois, avec droits d’information transmis par le vendeur. Allocation contrainte, servie par ordre de reception des engagements.',
      sector: 'Technologie',
      geography: 'Etats-Unis',
      status: DealStatus.CLOSING_SOON,
      targetAmount: 18_500_000,
      raisedAmount: 16_940_000,
      minTicket: 500_000,
      closingDate: new Date('2026-09-19'),
      featured: true,
    },
    {
      slug: 'bcv-oryx-agribiotech',
      name: 'BCV Oryx Agribiotech',
      summary:
        'Serie B d’une plateforme de biocontrole pour cultures cerealieres.',
      description:
        'Participation en Serie B dans une plateforme de biocontrole destinee aux cultures cerealieres d’Europe du Sud et d’Afrique du Nord. Trois produits homologues, un quatrieme en instruction. Le tour finance l’industrialisation du site de production et l’extension du portefeuille reglementaire.',
      sector: 'Agritech',
      geography: 'Europe, Afrique du Nord',
      status: DealStatus.OPEN,
      targetAmount: 12_000_000,
      raisedAmount: 4_120_000,
      minTicket: 150_000,
      closingDate: new Date('2027-01-30'),
      featured: false,
    },
    {
      slug: 'bcv-figure-ai',
      name: 'BCV Figure AI',
      summary: 'Co-investissement sur un constructeur de robotique humanoide.',
      description:
        'Co-investissement aux cotes d’un fonds chef de file sur un constructeur de robotique humanoide destinee a la logistique industrielle. Acces reserve aux investisseurs deja engages sur au moins un vehicule Bridgeline, dans la limite de l’allocation obtenue.',
      sector: 'Robotique',
      geography: 'Etats-Unis',
      status: DealStatus.INVITE_ONLY,
      targetAmount: 25_000_000,
      raisedAmount: 9_600_000,
      minTicket: 1_000_000,
      closingDate: new Date('2026-12-12'),
      featured: true,
    },
    {
      slug: 'bcv-project-prometheus',
      name: 'BCV Project Prometheus',
      summary:
        'Infrastructure de stockage par batteries raccordee au reseau iberique.',
      description:
        'Financement en fonds propres d’un portefeuille de trois actifs de stockage par batteries raccordes au reseau iberique, sous contrats de capacite indexes. Mise en service echelonnee sur dix-huit mois. Profil de rendement contractuel, avec une composante marche sur les services systeme.',
      sector: 'Infrastructure energetique',
      geography: 'Espagne, Portugal',
      status: DealStatus.OPEN,
      targetAmount: 60_000_000,
      raisedAmount: 38_700_000,
      minTicket: 500_000,
      closingDate: new Date('2027-03-06'),
      featured: false,
    },
  ];

  for (const deal of deals) {
    await prisma.deal.upsert({
      where: { slug: deal.slug },
      update: deal,
      create: deal,
    });
  }

  const bySlug = async (slug: string) =>
    prisma.deal.findUniqueOrThrow({ where: { slug } });

  const gold = await bySlug('bcv-gold-trade-finance');
  const anthropic = await bySlug('bcv-anthropic-ai');
  const prometheus = await bySlug('bcv-project-prometheus');
  const figure = await bySlug('bcv-figure-ai');

  // --- Participations ------------------------------------------------------
  const investments = [
    {
      userId: investor.id,
      dealId: gold.id,
      amountInvested: 750_000,
      currentValue: 812_400,
      investedAt: new Date('2025-04-17'),
    },
    {
      userId: investor.id,
      dealId: anthropic.id,
      amountInvested: 500_000,
      currentValue: 689_500,
      investedAt: new Date('2025-10-02'),
    },
    {
      userId: investor.id,
      dealId: prometheus.id,
      amountInvested: 1_200_000,
      currentValue: 1_243_800,
      investedAt: new Date('2026-02-26'),
    },
    {
      userId: secondInvestor.id,
      dealId: figure.id,
      amountInvested: 1_000_000,
      currentValue: 1_058_000,
      investedAt: new Date('2026-01-14'),
    },
  ];

  for (const investment of investments) {
    await prisma.investment.upsert({
      where: {
        userId_dealId: { userId: investment.userId, dealId: investment.dealId },
      },
      update: investment,
      create: investment,
    });
  }

  // --- Documents -----------------------------------------------------------
  // Les fichiers pointes ici sont des placeholders servis depuis /public.
  // Voir README, section "Documents", pour brancher un stockage objet.
  await prisma.document.deleteMany({});
  await prisma.document.createMany({
    data: [
      {
        userId: investor.id,
        title: 'Releve de portefeuille - T2 2026',
        type: DocumentType.STATEMENT,
        fileUrl: '/documents/placeholder.pdf',
        sizeBytes: 184_320,
        createdAt: new Date('2026-07-08'),
      },
      {
        userId: investor.id,
        title: 'Attestation fiscale 2025',
        type: DocumentType.OTHER,
        fileUrl: '/documents/placeholder.pdf',
        sizeBytes: 96_140,
        createdAt: new Date('2026-03-11'),
      },
      {
        dealId: gold.id,
        title: 'BCV Gold Trade Finance - rapport semestriel',
        type: DocumentType.REPORT,
        fileUrl: '/documents/placeholder.pdf',
        sizeBytes: 1_248_900,
        createdAt: new Date('2026-06-30'),
      },
      {
        dealId: anthropic.id,
        title: 'BCV Anthropic AI - term sheet',
        type: DocumentType.TERM_SHEET,
        fileUrl: '/documents/placeholder.pdf',
        sizeBytes: 412_600,
        createdAt: new Date('2025-09-22'),
      },
      {
        dealId: prometheus.id,
        title: 'BCV Project Prometheus - note d’investissement',
        type: DocumentType.REPORT,
        fileUrl: '/documents/placeholder.pdf',
        sizeBytes: 2_104_400,
        createdAt: new Date('2026-02-04'),
      },
    ],
  });

  console.log('Seed termine.');
  console.log(`Compte investisseur : ${investor.email} / ${DEMO_PASSWORD}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
