import type { Dictionary } from '@/lib/i18n/dictionaries/fr';

/**
 * English copy. Typed against the French dictionary: a missing or misspelled
 * key fails the build rather than falling back silently at runtime.
 */
export const en: Dictionary = {
  meta: {
    tagline: 'Private markets, professional investors.',
    description:
      'Bridgeline Partners structures and distributes private markets opportunities for professional investors, from Luxembourg and Geneva.',
  },

  common: {
    contact: 'Contact us',
    room: 'Bridgeline Room',
    signIn: 'Sign in',
    requestAccess: 'Request access',
    backHome: 'Back to home',
    optional: 'Optional.',
    languageLabel: 'Language',
  },

  nav: {
    about: 'About',
    team: 'Team',
    contact: 'Contact us',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    primary: 'Main navigation',
    homeAria: 'Bridgeline Partners, home',
  },

  footer: {
    navigation: 'Navigation',
    offices: 'Offices',
    rights: 'All rights reserved.',
    disclaimer:
      'This website is intended for professional investors. It constitutes neither an offer nor a solicitation to invest.',
    ariaLabel: 'Footer',
  },

  home: {
    hero: {
      title: 'Institutional capital, connected to private markets.',
      lead: 'Bridgeline Partners structures and distributes selected private transactions for professional investors, from Luxembourg and Geneva.',
      imageAlt: 'Office building facade in a financial district',
    },
    about: {
      title: 'One investment house, two jurisdictions',
      body1:
        'We connect professional investors to private markets transactions they would not otherwise reach: secondaries, co-investments, financing backed by real assets. Every transaction sits in a dedicated vehicle, with the documentation and service providers that go with it.',
      body2:
        'Our size is deliberate. We take on a limited number of transactions each year so that we can follow them through to exit.',
      link: 'More about how we position ourselves',
    },
    entries: {
      investTitle: 'I want to invest',
      investBody:
        'Access open transactions, their documentation and the tracking of your holdings in the Bridgeline Room.',
      investAction: 'Explore the Room',
      raiseTitle: 'I am raising capital',
      raiseBody:
        'Tell us about your transaction. We come back to you within ten business days of a first read.',
      raiseAction: 'Submit a transaction',
    },
    approach: {
      title: 'How a transaction reaches you',
    },
    advantages: {
      eyebrow: 'What we bring',
      title: 'Access, structuring, follow-through',
    },
    team: {
      title: 'Three partners, one contact per transaction',
      action: 'Meet the team',
    },
    opportunities: {
      title: 'Current transactions',
      lead: 'Target amounts, minimum tickets and documents are available once you are signed in.',
      emptyBody: 'No transaction is open for subscription at the moment.',
    },
    trackRecord: {
      title: 'Transactions completed since 2019',
    },
    cta: {
      title: 'Your transactions and your portfolio, in one place',
      body: 'The Bridgeline Room brings together open transactions, their documentation and the tracking of your holdings. Access is reserved for professional investors.',
    },
  },

  about: {
    title: 'Connecting institutional capital to private markets',
    lead: 'We select a limited number of transactions each year, structure them in dedicated vehicles, and follow them through to exit.',
    positioning: {
      title: 'How we position ourselves',
      body1:
        'Private markets account for a growing share of value creation, yet access remains organised around ticket sizes and networks that in practice exclude a large part of the professional investor base: family offices, independent managers, private holding companies.',
      body2:
        'Bridgeline Partners sits at that junction. We source transactions from managers, advisers and co-investors, we verify what can be verified, then we build the vehicle that lets our investors take part within a clear regulatory framework.',
      body3:
        'We do not claim to cover every asset class. We operate where we know how to document the risk: asset-backed trade finance, secondaries in established companies, co-investments alongside a lead investor, contracted infrastructure.',
    },
    notDoing: {
      title: 'What we do not do',
      items: [
        'We do not run discretionary mandates.',
        'We do not distribute transactions we have not structured or co-structured.',
        'We do not address non-professional investors.',
      ],
    },
    offices: {
      title: 'Luxembourg and Geneva',
      lead: 'Two offices, two distinct functions. Structuring takes place in Luxembourg, where the vehicles are domiciled. Investor relations and origination are run from Geneva.',
      photoAlt: 'Office in',
    },
  },

  team: {
    title: 'The team',
    lead: 'A small team, where every transaction has a named owner from the first conversation through to exit.',
    officePrefix: 'Office in',
    portraitAlt: 'Portrait of',
    cta: {
      title: 'If you would like to speak with one of us',
      body: 'Describe your situation in a few lines. We route your enquiry to the relevant partner.',
    },
  },

  contact: {
    title: 'Contact us',
    lead: 'Whether you are looking to invest or to raise capital, tell us about your situation. We reply within two business days.',
    officesTitle: 'Our offices',
    existingInvestor:
      'Already an investor with us? Follow-up questions go through the Bridgeline Room, where your documents are available.',
  },

  roomLanding: {
    title: 'The Bridgeline Room',
    lead: 'Where our investors review open transactions, subscribe and track their holdings.',
    imageAlt: 'Meeting room in a business district',
    request: {
      title: 'Request access',
      body: 'The Room is not open to self-registration. Send us your profile: we verify your eligibility as a professional investor, then we open your access.',
      hasAccount: 'Already have an account?',
    },
  },

  login: {
    title: 'Sign in',
    lead: 'Enter your credentials, or request a single-use sign-in link.',
    back: 'Back to the overview',
    brandTitle: 'Your transactions and your portfolio, in one place.',
    brandBody:
      'Access to the Bridgeline Room is reserved for professional investors whose account has been opened by our team.',
    offices: 'Luxembourg and Geneva.',
    email: 'Email',
    password: 'Password',
    signingIn: 'Signing in',
    or: 'or',
    magicLink: 'Send me a sign-in link',
    sendingLink: 'Sending link',
    noAccount: 'No account yet?',
    verifySent: 'Check your inbox: the sign-in link has just been sent.',
    magicLinkSent:
      'If an account exists for this address, a sign-in link has just been sent.',
    magicLinkFailed: 'Sending failed for now. Please try again in a moment.',
    magicLinkNeedsEmail: 'Enter your email address to receive a link.',
    errors: {
      CredentialsSignin: 'Invalid credentials, or account without Room access.',
      AccessDenied:
        'This address is not linked to any account. Request access from the Room page.',
      Verification: 'This sign-in link has expired or has already been used.',
    },
  },

  roomNav: {
    overview: 'Overview',
    opportunities: 'Opportunities',
    portfolio: 'My portfolio',
    documents: 'Documents',
    ariaLabel: 'Room navigation',
    signOut: 'Sign out',
  },

  dashboard: {
    greeting: 'Hello',
    fallbackTitle: 'Overview',
    lead: 'Your exposure to Bridgeline vehicles and the transactions currently on the table.',
    summaryAria: 'Summary',
    committed: 'Committed capital',
    committedDetail: 'Total amount subscribed',
    currentValue: 'Current valuation',
    currentValueDetail: 'Latest known valuation',
    performance: 'Performance',
    performanceDetail: 'Since subscription',
    positions: 'Holdings',
    nextClosing: 'Next closing on',
    noClosing: 'No closing scheduled',
    featured: 'Featured transactions',
    allDeals: 'All transactions',
    emptyFeaturedTitle: 'No featured transaction',
    emptyFeaturedBody:
      'Featured transactions appear here as soon as a new raise opens.',
    seeDeals: 'View transactions',
  },

  opportunities: {
    title: 'Opportunities',
    lead: 'Transactions open for subscription and those available by invitation.',
    search: 'Search',
    searchPlaceholder: 'Name, sector, keyword',
    status: 'Status',
    allStatuses: 'All statuses',
    filter: 'Filter',
    reset: 'Reset',
    resetFilters: 'Reset filters',
    countOne: 'transaction matches',
    countMany: 'transactions match',
    countSuffixFiltered: 'your search',
    emptyFilteredTitle: 'No results',
    emptyFilteredBody:
      'No transaction matches these criteria. Broaden the search or reset the filters.',
    emptyTitle: 'No open transaction',
    emptyBody:
      'Upcoming transactions will appear here. Your relationship manager notifies you as soon as a raise opens.',
    raisedOf: 'of',
    minTicket: 'Minimum ticket',
    closing: 'Closing',
    daysLeft: 'days left',
    progressLabel: 'Raise progress for',
  },

  portfolio: {
    title: 'My portfolio',
    lead: 'Your holdings in Bridgeline vehicles, at their latest known valuation.',
    emptyTitle: 'No holding yet',
    emptyBody:
      'From your first subscription, the detail of your holdings and their valuation will appear here.',
    committed: 'Committed capital',
    currentValue: 'Current valuation',
    overall: 'Overall performance',
    detailAria: 'Holdings detail',
    tableCaption:
      'Your holdings, amount invested, valuation and performance',
    deal: 'Transaction',
    subscribedOn: 'Subscribed on',
    invested: 'Amount invested',
    value: 'Current value',
    performance: 'Performance',
    investedShort: 'Invested',
    disclaimer:
      'Valuations are indicative and reflect the latest assessment communicated by the management company of the relevant vehicle. They do not constitute a redemption value.',
  },

  documents: {
    title: 'Documents',
    lead: 'Reports, term sheets and statements attached to your account and to the transactions you have subscribed to.',
    emptyTitle: 'No document available',
    emptyBody:
      'Your periodic reports and statements will appear here. Our team uploads them as deadlines fall due.',
    download: 'Download',
  },

  forms: {
    name: 'Full name',
    email: 'Work email',
    company: 'Company',
    message: 'Message',
    contactHint:
      'Describe your enquiry, your horizon and the type of transaction you are interested in.',
    send: 'Send message',
    sending: 'Sending',
    privacy:
      'The information you provide is used solely to handle your enquiry.',
    accessProfile: 'Your investor profile',
    accessProfileHint:
      'Optional. Type of structure, asset classes followed, usual ticket size.',
    accessSubmit: 'Request access',
    accessNotice:
      'Access is reserved for professional investors. A request does not create an account: our team verifies your eligibility before any provisioning.',

    errors: {
      nameRequired: 'Enter your name.',
      nameTooLong: 'Name too long.',
      emailRequired: 'Enter your email address.',
      emailInvalid: 'Invalid email address.',
      emailTooLong: 'Email address too long.',
      companyTooLong: 'Company name too long.',
      messageTooShort: 'Describe your enquiry in at least 20 characters.',
      messageTooLong: 'Message too long.',
      passwordRequired: 'Enter your password.',
    },

    feedback: {
      checkFields: 'Check the highlighted fields.',
      contactSuccess:
        'Message sent. We come back to you within two business days.',
      contactFailure:
        'Your message could not be sent. Try again, or write to us directly.',
      accessSuccess:
        'Request received. We come back to you once your eligibility is verified.',
      accessFailure:
        'Your request could not be recorded. Please try again in a moment.',
    },
  },

  dealStatus: {
    OPEN: 'Open',
    CLOSING_SOON: 'Closing soon',
    INVITE_ONLY: 'By invitation',
    CLOSED: 'Closed',
  },

  documentType: {
    REPORT: 'Report',
    TERM_SHEET: 'Term sheet',
    STATEMENT: 'Statement',
    OTHER: 'Document',
  },

  notFound: {
    title: 'Page not found',
    body: 'This address does not match any page on the site. It may have been moved, or the link that brought you here is incomplete.',
  },

  offices: {
    luxembourg: {
      country: 'Grand Duchy of Luxembourg',
      role: 'Vehicle structuring and fund administration.',
    },
    geneva: {
      country: 'Switzerland',
      role: 'Investor relations and transaction origination.',
    },
  },

  team_members: {
    croset: {
      role: 'Co-founder',
      bio: 'Co-founder of Bridgeline Partners. He oversees the structuring of the investment vehicles and the relationships with the group’s depositaries, administrators and legal counsel.',
    },
    pal: {
      role: 'Co-founder',
      bio: 'Co-founder of Bridgeline Partners. He leads transaction origination and the relationship with the family offices, wealth managers and institutional investors in the network.',
    },
    tavares: {
      role: 'Investment Principal',
      bio: 'Investment principal. He runs deal analysis, due diligence and the monitoring of portfolio holdings through to exit.',
    },
  },

  approach: [
    {
      title: 'Origination',
      body: 'Transactions come through our network of managers, advisers and co-investors. We set aside anything we cannot document.',
    },
    {
      title: 'Structuring',
      body: 'Every selected transaction sits in a dedicated vehicle, with a depositary, an administrator and complete legal documentation.',
    },
    {
      title: 'Monitoring',
      body: 'Periodic reporting, valuations and documents available in the Bridgeline Room for the whole holding period.',
    },
  ],

  advantages: [
    {
      title: 'Access to closed transactions',
      body: 'Secondaries, co-investments and club deals that are not publicly distributed.',
    },
    {
      title: 'Two jurisdictions, one contact',
      body: 'Luxembourg structuring, investor relations in Geneva. A single point of contact for both.',
    },
    {
      title: 'Calibrated tickets',
      body: 'Entry thresholds designed for family offices and independent managers, not only for institutions.',
    },
    {
      title: 'Follow-through after subscription',
      body: 'The relationship does not end at closing: valuations, reports and documents stay available online.',
    },
  ],

  roomBenefits: [
    {
      title: 'Live opportunities',
      body: 'Open transactions, their raise progress, minimum ticket and closing date, updated continuously.',
    },
    {
      title: 'Online subscription',
      body: 'Register your interest and start the subscription process from the transaction page, with no documents exchanged by email.',
    },
    {
      title: 'Portfolio tracking',
      body: 'Committed capital, current valuation and performance of each holding, with the associated reports.',
    },
  ],
};
