export type PageId = 'home' | 'about';

export type SectionId = 'home' | 'works' | 'services' | 'about' | 'guarantees' | 'faq' | 'contact';

export type ProjectCategory =
  | 'All Work'
  | 'Home Services'
  | 'Health & Wellness'
  | 'Hospitality'
  | 'One-Page Sites';

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  category: Exclude<ProjectCategory, 'All Work'>;
  year: string;
  role: string;
  projectFocus: string;
  summary: string;
  challenge: string;
  approach: string;
  deliverables: string[];
  image: string;
  imageAlt: string;
  aspectClass: string;
  featured?: boolean;
}

export interface ServiceOffering {
  index: string;
  title: string;
  description: string;
}

export interface GuaranteeCard {
  step: string;
  title: string;
  detail: string;
  highlight: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  detail: string;
}

export const DESIGNER_PROFILE = {
  name: 'Fortune Allwell',
  title: 'Web Designer for Businesses & Brands',
  email: 'fortuneallwell2020@gmail.com',
  whatsappUrl: 'https://wa.me/+2348144771422',
  whatsappDisplay: '+234 814 477 1422',
  location: 'Remote Worldwide',
  availability: 'Accepting client projects',
};

export const PROOF_METRICS = [
  { value: '2+', label: 'Years Designing', context: 'Home services, One-page, Hospitality, Health & Wellness sites' },
  { value: '3', label: 'Core Niches', context: 'Home services, Hospitality & One-page sites' },
  { value: '4h', label: 'Response Window', context: 'Direct WhatsApp & Email Replies' },
  { value: '100%', label: 'Mobile-First Builds', context: 'One-Tap Call, WhatsApp & Email' },
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'premier-home-renovations',
    title: 'Premier Home Renovations & Remodeling',
    client: 'Premier Home Renovations',
    category: 'Home Services',
    year: '2026',
    role: 'Web & Lead Experience Concept',
    projectFocus:
      'Designed around instant estimate requests, clear service coverage, and one-tap WhatsApp and call inquiries.',
    summary:
      'A mobile-first lead generation concept built for residential remodelers and local contractors who need homeowners to trust their craft and request quotes in seconds.',
    challenge:
      'Home service contractors often lose local leads to cluttered websites where phone numbers are buried and visitors cannot quickly see service specialties.',
    approach:
      'Positioned high-clarity kitchen and interior remodeling photography right beside prominent Request Estimate and one-tap WhatsApp actions.',
    deliverables: [
      'Home Service Lead Layout',
      'Estimate Request Flow',
      'One-Tap WhatsApp & Call CTA',
      'Mobile-First Build',
    ],
    image: '/src/assets/images/work_home_services_1795574871881.jpg',
    imageAlt:
      'Concept website for Premier Home Renovations displayed on a studio monitor showing remodeling services and quote actions',
    aspectClass: 'aspect-[16/9]',
    featured: true,
  },
  {
    id: 'lumina-wellness-clinic',
    title: 'Lumina Wellness & Holistic Care Studio',
    client: 'Lumina Wellness Clinic',
    category: 'Health & Wellness',
    year: '2026',
    role: 'Brand & Booking UX Concept',
    projectFocus:
      'Structured for calm patient confidence, clear treatment offerings, and frictionless consultation scheduling.',
    summary:
      'A calm, high-trust website concept for a health and wellness clinic built to make prospective clients comfortable booking their first session from mobile or desktop.',
    challenge:
      'Many clinic and therapy websites feel clinical or confusing, causing prospective patients to leave before selecting a practitioner or booking time.',
    approach:
      'Paired serene treatment-room imagery with clean service selection, readable practitioner details, and an immediately accessible booking panel.',
    deliverables: [
      'Clinic & Studio Web Design',
      'Treatment Overview Structure',
      'Consultation Booking Flow',
      'Accessible Typography System',
    ],
    image: '/src/assets/images/work_wellness_clinic_1795574872364.jpg',
    imageAlt:
      'Concept website for Lumina Wellness Clinic presented on an aluminum laptop with calm treatment room visuals and consultation booking',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'the-luna-lodge',
    title: 'The Luna Lodge Boutique Hotel & Lounge',
    client: 'The Luna Lodge',
    category: 'Hospitality',
    year: '2025',
    role: 'Hospitality Web Concept',
    projectFocus:
      'Single-venue hospitality showcase crafted to drive direct room reservations and dining table bookings.',
    summary:
      'An editorial single-location hospitality concept designed for an intimate boutique hotel and candlelit dining lounge to turn guest curiosity into direct bookings.',
    challenge:
      'Independent boutique hotels and dining venues often rely on third-party platforms instead of an atmospheric site that invites direct stays and table reservations.',
    approach:
      'Combined warm interior atmosphere with clear Stay and Dine navigation and immediate Reserve Stay and Book a Table actions.',
    deliverables: [
      'Single-Venue Hospitality Site',
      'Stay & Dining Navigation',
      'Direct Reservation Flow',
      'Responsive Mobile Layout',
    ],
    image: '/src/assets/images/work_boutique_hospitality_1795574873165.jpg',
    imageAlt:
      'Concept website for The Luna Lodge single-location boutique hotel and dining lounge shown on a tablet',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'eliza-reed-consultancy',
    title: 'Eliza Reed Advisory One-Page Site',
    client: 'Eliza Reed Consultancy',
    category: 'One-Page Sites',
    year: '2026',
    role: 'One-Page Site Concept',
    projectFocus:
      'Focused single-page architecture delivering immediate credibility, a clear 3-step overview, and direct contact.',
    summary:
      'A fast, focused one-page website concept tailored for an independent professional consultant who needs to communicate expertise clearly and convert visitors on a single scroll.',
    challenge:
      'Solo professionals and specialists frequently overcomplicate their online presence with half-empty subpages that dilute their core message.',
    approach:
      'Distilled the entire client pitch into one sharp scroll: strong above-the-fold positioning, a 3-step process breakdown, and a direct one-tap contact button.',
    deliverables: [
      'Single-Page Architecture',
      'Conversion-Focused Copy Layout',
      '3-Step Service Summary',
      'One-Tap Inquiry Setup',
    ],
    image: '/src/assets/images/work_one_page_consultant_1795574873668.jpg',
    imageAlt:
      'Concept one-page website for Eliza Reed Consultancy shown on an angled studio display with structured process and contact CTA',
    aspectClass: 'aspect-[4/3]',
  },
];

export const SERVICES: ServiceOffering[] = [
  {
    index: '01.',
    title: 'Home Service Lead Websites',
    description:
      'Mobile-first sites for contractors, home remodelers, and local service businesses built to generate calls, quote requests, and WhatsApp leads.',
  },
  {
    index: '02.',
    title: 'Health, Wellness & Hospitality Sites',
    description:
      'Calm, high-trust websites for clinics, wellness studios, hotels, and dining/hospitality venues designed to drive bookings and reservations.',
  },
  {
    index: '03.',
    title: 'High-Converting One-Page Sites',
    description:
      'Focused one-page websites for professionals, consultants, and service providers who want a clean, fast online presence.',
  },
  {
    index: '04.',
    title: 'Mobile Optimization & Direct Lead Setup',
    description:
      'Fast mobile performance and direct one-tap WhatsApp, Call, and Email actions.',
  },
];

export const SERVICE_GUARANTEES: GuaranteeCard[] = [
  {
    step: '01',
    title: 'Fast Turnaround',
    detail:
      'Clear milestones from structure to launch without agency bloat. Focused one-page sites and service websites are delivered quickly so your business can start taking inquiries sooner.',
    highlight: 'Streamlined 3-7 days delivery workflow',
  },
  {
    step: '02',
    title: 'Mobile-First Design',
    detail:
      'Most local service, wellness, and dining searches happen on a phone. Every page is engineered for fast loading, clean readability, and effortless thumb navigation.',
    highlight: 'Built for phone screens first',
  },
  {
    step: '03',
    title: 'Direct One-Tap Contact',
    detail:
      'No buried forms or friction. Visitors can reach you in one tap via WhatsApp, direct phone call, or email right where they decide to book or request a quote.',
    highlight: 'WhatsApp, Call & Email ready',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Scope & Structure',
    detail:
      'Map your core services, booking flow, and direct contact goals for home services, wellness clinics, single-venue hospitality, or one-page sites.',
  },
  {
    step: '02',
    title: 'Mobile-First Design',
    detail:
      'Shape calm, trustworthy layouts and concise messaging designed around how real clients browse on mobile and reach out.',
  },
  {
    step: '03',
    title: 'Launch & Lead Setup',
    detail:
      'Ship a fast, responsive website wired with clean one-tap WhatsApp, Call, and Email actions ready for everyday client inquiries.',
  },
];

export interface FaqItem {
  id: string;
  number: string;
  question: string;
  answer: string;
}

export const TOOLKIT_GROUPS = [
  {
    label: 'Core Focus Areas',
    items: ['Home Services', 'Health & Wellness', 'Boutique Hotels & Dining', 'One-Page Sites'],
  },
  {
    label: 'Design & Build Stack',
    items: ['Figma', 'React & TypeScript', 'Tailwind CSS', 'Mobile UX', 'Direct Lead Setup'],
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    number: '01',
    question:
      'I already get customers through Instagram, Google Maps, or word of mouth. Why do I need a website?',
    answer:
      "Social media and directories help people discover you, but a dedicated website closes the deal. When someone searches for a contractor, clinic, spa, or boutique hotel, a clean, fast website proves you are established, answers their key questions in seconds, and gives them one-tap WhatsApp, Call, or Booking buttons without getting distracted by competitors' feeds.",
  },
  {
    id: 'faq-2',
    number: '02',
    question:
      'Will my website actually bring in more calls, quotes, or bookings or just sit there looking pretty?',
    answer:
      'Every site I build is structured around action, not decoration. From clear service breakdowns and trust signals to prominent Request a Quote, Book an Appointment, or Reserve Now buttons on mobile, your visitors always have a direct, effortless way to reach you.',
  },
  {
    id: 'faq-3',
    number: '03',
    question:
      'Is a one-page website enough for my business, or do I need a multi-page site?',
    answer:
      'If you offer a focused set of services, run a clinic or studio, or want a high-converting page for ads and social traffic, a well-structured one-page website is often faster, clearer, and converts better on phones than a cluttered multi-page site. If your business needs separate pages for treatments, menus, rooms, or service areas, we can build a clean multi-page layout instead.',
  },
  {
    id: 'faq-4',
    number: '04',
    question: 'Most of my clients browse on their phones. How will my site look on mobile?',
    answer:
      'Every website is designed mobile-first. Pages load quickly, text is easy to read without zooming, and your phone number, WhatsApp chat, and booking links stay within easy thumb reach.',
  },
  {
    id: 'faq-5',
    number: '05',
    question: 'Can you connect my existing booking system, WhatsApp, or contact forms?',
    answer:
      'Yes. Whether you use Calendly, Acuity, a clinic/spa booking portal, OpenTable/reservation links, or prefer direct WhatsApp and phone inquiries, I integrate your preferred contact path cleanly into the site.',
  },
  {
    id: 'faq-6',
    number: '06',
    question: "What if I don't have professional photos or written copy ready yet?",
    answer:
      "You don't need to have everything figured out before we start. I help structure and refine your messaging so it speaks clearly to your ideal clients, and I can build out a clean layout using your existing photos (or curated placeholders while you gather new ones).",
  },
  {
    id: 'faq-7',
    number: '07',
    question: 'How long does it take to launch, and will I have to pay a monthly agency retainer?',
    answer:
      "Most one-page and small business sites go from initial concept to launch in 3 to 7 days. You pay a clear one-time project fee with no mandatory monthly agency retainers and once it's live, you own your website and domain outright.",
  },
  {
    id: 'faq-8',
    number: '08',
    question: 'How do we get started without risking money upfront?',
    answer:
      'Send over your business name, what you offer, and any links or photos you already have. I can put together a live preview so you can test the look, speed, and mobile experience on your own phone before committing to launch.',
  },
];
