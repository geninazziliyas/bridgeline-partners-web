import type { Dictionary } from '@/lib/i18n/dictionaries/fr';

/**
 * English copy, translated from the French published on bridgelinepartners.com.
 *
 * If an official English version of the site exists, its wording should be
 * checked against this file: these are translations, not the company's own
 * approved English text.
 *
 * Typed against the French dictionary: a missing or misspelled key fails the
 * build rather than falling back silently at runtime.
 */
export const en: Dictionary = {
  meta: {
    tagline: 'Private asset investments',
    description:
      'We use our expertise to find promising investment opportunities. Offices in Luxembourg and Switzerland.',
  },

  common: {
    contact: 'Contact us',
    room: 'Investor area',
    signIn: 'Sign in',
    requestAccess: 'Request access',
    backHome: 'Back to home',
    optional: 'Optional.',
    languageLabel: 'Language',
    learnMore: 'Learn more',
    investWithUs: 'Invest with us',
  },

  nav: {
    about: 'About',
    services: 'Services',
    team: 'The team',
    contact: 'Contact us',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    primary: 'Main navigation',
    homeAria: 'Bridgeline Partners, home',
  },

  footer: {
    navigation: 'Navigation',
    services: 'Services',
    offices: 'Offices',
    contact: 'Contact us',
    tagline:
      'We apply our best practices to find promising investment opportunities.',
    rights: 'All rights reserved.',
    disclaimer:
      'This website is intended for professional investors. It constitutes neither an offer nor a solicitation to invest.',
    ariaLabel: 'Footer',
  },

  home: {
    hero: {
      title: 'Private asset investments',
      lead: 'We use our expertise to find promising investment opportunities.',
      imageAlt: 'Office building facade in a financial district',
    },
    about: {
      eyebrow: 'Who are we?',
      title: 'A team at the heart of the financial industry',
      body1:
        'The Bridgeline Capital Partners team is proud to serve demanding institutional investors by carefully identifying the best investment opportunities in private assets.',
      body2:
        'With offices in Luxembourg and Switzerland, our extensive network of contacts places us at the heart of the financial industry. Our track record reflects our commitment to delivering the best performance to the investors who trust us.',
      link: 'Invest with us',
    },
    entries: {
      investTitle: 'Looking for your next private asset investment opportunity?',
      investBody:
        'We use our expertise to find the best investment opportunities.',
      investAction: 'Learn more',
      raiseTitle: 'Looking for a way to invest in your next private asset?',
      raiseBody:
        'We offer the most versatile and straightforward way to invest in the private investment of your choice.',
      raiseAction: 'Learn more',
    },
    services: {
      title: 'Direct investment, trading and analytical expertise',
      lead: 'Investments in unlisted companies, private debt and real estate.',
    },
    advantages: {
      eyebrow: 'Our advantages',
      title: 'What sets us apart',
    },
    team: {
      title: 'Our team',
      action: 'Meet the team',
    },
    opportunities: {
      title: 'Current transactions',
      lead: 'Target amounts, minimum tickets and documents are available once you are signed in.',
      emptyBody: 'No transaction is open for subscription at the moment.',
    },
    trackRecord: {
      title: 'A look at our previous investments',
    },
    cta: {
      title: 'Would you like to get in touch?',
      body: 'Stay informed and gain access to the opportunities we offer.',
    },
  },

  about: {
    title: 'Private asset investments',
    lead: 'We use our expertise to find promising investment opportunities.',
    positioning: {
      title: 'Who are we?',
      body1:
        'The Bridgeline Capital Partners team is proud to serve demanding institutional investors by carefully identifying the best investment opportunities in private assets.',
      body2:
        'With offices in Luxembourg and Switzerland, our extensive network of contacts places us at the heart of the financial industry. Our track record reflects our commitment to delivering the best performance to the investors who trust us.',
      body3:
        'We offer an investment vehicle that holds the targeted securities on your behalf, fully segregated.',
    },
    seeking: {
      title: 'Looking for your next private asset investment opportunity?',
      lead: 'We use our expertise to find the best investment opportunities.',
      body1:
        'Capital flows remain as high as ever. The number of financial firms active in private markets keeps growing, and access to new opportunities keeps getting harder. As capital markets become increasingly saturated and competitive, investors need reliable sources of investment.',
      body2:
        'We use market data and our extensive network to serve your investment strategy, to find the companies you target that are ready to be financed, acquired or listed, and we help you assess their growth potential precisely.',
    },
    investing: {
      title: 'Looking for a way to invest in your next private asset?',
      lead: 'We offer the most versatile and straightforward way to invest in the private investment of your choice.',
      body1:
        'Direct access to private markets is close to impossible for your clients, unless you take on a long, costly and demanding research process. Your clients increasingly ask for access to these transactions and to the attractive returns they offer.',
      body2:
        'We have put in place an efficient structure to invest in these private assets, using the most reliable solutions, combining transparency and security within a well-regulated framework.',
    },
    offices: {
      title: 'Luxembourg and Geneva',
      lead: 'Two offices, and an extensive network of contacts at the heart of the financial industry.',
      photoAlt: 'Office in',
    },
  },

  services: {
    title: 'Direct investment, trading and analytical expertise',
    lead: 'Investments in unlisted companies, private debt and real estate.',
    intro: {
      body1:
        'We look for direct investments in non-public companies backed by the market’s most significant investors.',
      body2:
        'The equity or debt of private companies is not traded on public markets and has not yet been issued through an initial public offering.',
      body3:
        'Private companies issue securities through private placements, or carry out capital buybacks. To invest in private securities, you can go through a private placement, deal directly with the company, or take part in tender offers.',
      body4:
        'We offer an investment vehicle that holds the targeted securities on your behalf, fully segregated.',
    },
    listTitle: 'Our services',
  },

  team: {
    title: 'Our team',
    lead: 'A fully independent and committed team, present in Luxembourg and Switzerland.',
    portraitAlt: 'Portrait of',
    cta: {
      title: 'If you would like to speak with one of us',
      body: 'Describe your situation in a few lines. We route your enquiry to the relevant partner.',
    },
  },

  contact: {
    title: 'Would you like to get in touch?',
    lead: 'Stay informed and gain access to the opportunities we offer.',
    officesTitle: 'Our offices',
    existingInvestor:
      'Already an investor with us? Follow-up questions go through the investor area, where your documents are available.',
  },

  roomLanding: {
    title: 'The investor area',
    lead: 'Where our investors review open transactions, subscribe and track their holdings.',
    imageAlt: 'Meeting room in a business district',
    request: {
      title: 'Request access',
      body: 'The investor area is not open to self-registration. Send us your profile: we verify your eligibility as a professional investor, then we open your access.',
      hasAccount: 'Already have an account?',
    },
  },

  login: {
    title: 'Sign in',
    lead: 'Enter your credentials, or request a single-use sign-in link.',
    back: 'Back to the overview',
    brandTitle: 'Your transactions and your portfolio, in one place.',
    brandBody:
      'Access to the investor area is reserved for professional investors whose account has been opened by our team.',
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
      CredentialsSignin: 'Invalid credentials, or account without investor area access.',
      AccessDenied:
        'This address is not linked to any account. Request access from the investor area page.',
      Verification: 'This sign-in link has expired or has already been used.',
    },
  },

  roomNav: {
    overview: 'Overview',
    opportunities: 'Opportunities',
    portfolio: 'My portfolio',
    documents: 'Documents',
    ariaLabel: 'Investor area navigation',
    signOut: 'Sign out',
    fallbackUser: 'Investor',
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
    tableCaption: 'Your holdings, amount invested, valuation and performance',
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
    name: 'Your name',
    email: 'Email',
    company: 'Company',
    message: 'Message',
    contactHint:
      'Describe your enquiry, your horizon and the type of transaction you are interested in.',
    send: 'Send message',
    sending: 'Sending',
    privacy: 'The information you provide is used solely to handle your enquiry.',
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
      contactSuccess: 'Message sent. We come back to you within two business days.',
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
    luxembourg: { country: 'Luxembourg' },
    geneva: { country: 'Switzerland' },
  },

  team_members: {
    croset: {
      role: 'Co-founder',
      bio: [
        'Hervé Croset has worked across countries and cultures (New York, London, Hong Kong, Kuwait) for major financial institutions such as UBS, CS First Boston and HSBC.',
        'At HSBC, he managed a third-party fund portfolio of more than 17 billion dollars.',
        'He was named one of the 100 most influential wealth managers in 2015 by WN Wealth Manager magazine.',
        'Hervé is a CFA charterholder and holds a Master in banking management from SFI, a BSc in political economy from the University of Geneva, and an engineering degree.',
      ],
    },
    pal: {
      role: 'Co-founder',
      bio: [
        'George Pal is an experienced investment professional who began his career at HSBC, focusing on fixed income.',
        'In 2009 he founded OakHill Asset Management SA, an advisory, wealth management and multi-family office firm.',
        'He co-manages the firm’s total return fixed income fund, which has outperformed the Barclays Capital Aggregate bond index by 130.5% since July 2011 (the fund’s inception).',
        'George holds a degree in business economics from the University of London.',
      ],
    },
    tavares: {
      role: 'Investment Director',
      bio: [
        'John Tavares has 16 years of experience in transaction services at PwC.',
        'He has extensive experience in buy-side due diligence, sell-side assistance, transaction and negotiation support, and post-deal integration across a wide range of sectors and situations (investments in listed companies, disposals, carve-outs and others).',
        'He specialises in supporting private clients and corporates through cross-border and domestic mergers and acquisitions.',
        'John holds a master’s in international management from ESC Grenoble and a postgraduate diploma in corporate finance.',
      ],
    },
  },

  servicesList: [
    {
      title: 'Fundraising',
      body: 'We mobilise our network to finance the companies you target that are ready to be financed, acquired or listed.',
    },
    {
      title: 'Private equity',
      body: 'Direct investments in unlisted companies, backed by the market’s most significant investors.',
    },
    {
      title: 'Private debt',
      body: 'Financing whose securities are not traded on public markets, accessible through private placement.',
    },
    {
      title: 'Co-investments',
      body: 'Holdings alongside leading investors, in transactions we have assessed ourselves.',
    },
    {
      title: 'SPV structuring',
      body: 'An investment vehicle that holds the targeted securities on your behalf, fully segregated.',
    },
  ],

  advantages: [
    {
      title: 'Fundraising expertise',
      body: 'A proven practice in financing private companies, from first contact through to closing.',
    },
    {
      title: 'Sourcing capabilities',
      body: 'We use market data and our network to identify opportunities before they are widely circulated.',
    },
    {
      title: 'Access to an extensive private markets network',
      body: 'Offices in Luxembourg and Switzerland, and a network of contacts at the heart of the financial industry.',
    },
    {
      title: 'Strong research capabilities',
      body: 'We help you assess precisely the growth potential of the companies you target.',
    },
    {
      title: 'A fully independent and committed team',
      body: 'No affiliation that could steer our recommendations.',
    },
    {
      title: 'A remarkable track record',
      body: 'Our past successes reflect our commitment to delivering the best performance to the investors who trust us.',
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
