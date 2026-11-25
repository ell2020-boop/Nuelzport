export type PageId = 'home' | 'about';

export type SectionId = 'home' | 'works' | 'services' | 'about' | 'reviews' | 'contact';

export type ProjectCategory =
  | 'All Work'
  | 'Real Estate'
  | 'Brands & Retail'
  | 'Service Businesses';

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  category: Exclude<ProjectCategory, 'All Work'>;
  year: string;
  role: string;
  outcomeMetric: string;
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

export interface ClientReview {
  quote: string;
  author: string;
  role: string;
  company: string;
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
  { value: '2+', label: 'Years Designing', context: 'Real Estate, Fashion & Services' },
  { value: '5', label: 'Business Websites', context: 'Launched Across Countries' },
  { value: '+61%', label: 'Avg. Inquiry Lift', context: 'Measured 90 Days Post-Launch' },
  { value: '100%', label: 'Direct Partnership', context: 'Dedicated Principal Execution' },
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'aurum-advisory',
    title: 'Aurum Property & Wealth Advisory',
    client: 'Aurum Partners Group',
    category: 'Service Businesses',
    year: '2026',
    role: 'Lead Web & Client Experience Designer',
    outcomeMetric: '+64% qualified consultation bookings within 90 days of launch',
    summary:
      'Flagship business website and private client portal built to help a commercial advisory firm earn immediate trust and convert high-value client inquiries.',
    challenge:
      'Aurum’s outdated website buried their core advisory services under dense jargon, making it difficult for prospective business clients to understand offerings or book a consultation.',
    approach:
      'Restructured the entire web journey around clear service positioning, transparent portfolio performance views, and frictionless consultation booking tailored for decision-makers.',
    deliverables: [
      'Business Website Redesign',
      'Client Portal Experience',
      'Service Positioning Copy',
      'Responsive Frontend Build',
    ],
    image: '/src/assets/images/work_fintech_platform_1795310699885.jpg',
    imageAlt: 'Aurum Property and Wealth Advisory website and client dashboard displayed on a studio monitor',
    aspectClass: 'aspect-[16/9]',
    featured: true,
  },
  {
    id: 'aeternum-real-estate',
    title: 'Aeternum Luxury Real Estate Showcase',
    client: 'Aeternum Estates & Developments',
    category: 'Real Estate',
    year: '2025',
    role: 'Web Design & Digital Direction',
    outcomeMetric: '3.2x more private property viewing requests per listing',
    summary:
      'Architectural real estate website designed for a residential development firm to showcase luxury properties, floorplans, and neighborhood stories with editorial authority.',
    challenge:
      'Generic property listing templates made bespoke multimillion-dollar residences feel ordinary and failed to capture serious buyer inquiries.',
    approach:
      'Crafted a calm, gallery-grade property showcase pairing full-bleed architectural photography with effortless filtering and direct private viewing scheduling.',
    deliverables: [
      'Real Estate Flagship Site',
      'Property Listing Architecture',
      'Private Viewing Booking Flow',
      'Performance Optimization',
    ],
    image: '/src/assets/images/work_architecture_studio_1795310699508.jpg',
    imageAlt: 'Aeternum luxury real estate website displayed on an aluminum laptop on dark basalt stone',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'sonic-logic-brand',
    title: 'Sonic Logic Brand Flagship',
    client: 'Sonic Logic Studio Goods',
    category: 'Brands & Retail',
    year: '2025',
    role: 'Brand Web Design & Conversion Strategy',
    outcomeMetric: '$1.4M direct-to-customer pre-orders completed in 14 days',
    summary:
      'Direct-to-consumer flagship website and product launch experience helping an independent studio hardware brand sell out its debut release directly online.',
    challenge:
      'The brand needed to stand out against legacy competitors and explain craftsmanship and technical value clearly to discerning everyday buyers.',
    approach:
      'Designed an uncluttered, high-contrast storefront focused on crisp visual storytelling, clear specification comparisons, and a confident checkout path.',
    deliverables: [
      'Direct-to-Consumer Flagship',
      'Product Launch Experience',
      'Brand Visual System',
      'Conversion UX Optimization',
    ],
    image: '/src/assets/images/work_audio_hardware_1795310699738.jpg',
    imageAlt: 'Sonic Logic brand flagship website shown on an angled studio display',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'botanica-fashion-beauty',
    title: 'Botanica Fashion & Apothecary Storefront',
    client: 'Botanica Atelier',
    category: 'Brands & Retail',
    year: '2024',
    role: 'Brand & E-Commerce Web Designer',
    outcomeMetric: '+48% repeat customer orders across mobile storefronts',
    summary:
      'Editorial e-commerce flagship crafted for a modern lifestyle, fashion, and botanical beauty brand looking to turn first-time browsers into loyal customers.',
    challenge:
      'Off-the-shelf retail themes diluted the brand’s refined aesthetic and caused high mobile cart abandonment during seasonal collection drops.',
    approach:
      'Built an editorial lookbook-style shopping experience highlighting garment and formulation craft, clear sizing and ritual notes, and a streamlined mobile checkout.',
    deliverables: [
      'Editorial Storefront Design',
      'Seasonal Lookbook Layouts',
      'Mobile Shopping UX',
      'Brand Typography System',
    ],
    image: '/src/assets/images/work_wellness_brand_1795310699764.jpg',
    imageAlt: 'Botanica editorial fashion and beauty brand website presented on a sleek tablet over dark linen',
    aspectClass: 'aspect-[4/3]',
  },
];

export const SERVICES: ServiceOffering[] = [
  {
    index: '01.',
    title: 'Business & Corporate Websites',
    description:
      'Credibility-first websites for real estate agencies, consultancies, hospitality, and service businesses designed to attract qualified leads and bookings.',
  },
  {
    index: '02.',
    title: 'Fashion, Retail & Brand Flagships',
    description:
      'Editorial storefronts and lookbook-driven digital experiences that elevate brand perception and turn browsers into paying customers.',
  },
  {
    index: '03.',
    title: 'Brand Identity & Design Systems',
    description:
      'Cohesive typography, color direction, and reusable web page templates that keep your business recognizable across every campaign and launch.',
  },
  {
    index: '04.',
    title: 'Responsive Web Development',
    description:
      'Fast, mobile-ready, search-friendly website builds engineered for smooth performance, accessibility, and effortless day-to-day updates.',
  },
];

export const CLIENT_REVIEWS: ClientReview[] = [
  {
    quote:
      'Fortune replaced our dated property site with an editorial showcase that reflects the quality of our listings. Private viewing inquiries tripled within the first two months.',
    author: 'Elena Lindqvist',
    role: 'Managing Director',
    company: 'Aeternum Estates',
  },
  {
    quote:
      'Our online storefront finally feels like our physical boutique. Mobile shoppers browse seasonal collections effortlessly and repeat orders rose by nearly half.',
    author: 'Amara Osei',
    role: 'Founder',
    company: 'Botanica Atelier',
  },
  {
    quote:
      'Working directly with Fortune gave our advisory practice clear positioning and a much faster client booking path, lifting qualified consultations by 64%.',
    author: 'Marcus Vance',
    role: 'Managing Partner',
    company: 'Aurum Partners Group',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Business Discovery',
    detail:
      'Understand your market, audience, and revenue goals—whether selling luxury property, launching a fashion line, or booking service clients.',
  },
  {
    step: '02',
    title: 'Brand & Layout Design',
    detail:
      'Shape clear messaging, refined visual hierarchy, and mobile-first page layouts tailored specifically to how your customers decide and buy.',
  },
  {
    step: '03',
    title: 'Build & Launch',
    detail:
      'Deliver a fast, polished, launch-ready website built to perform reliably across every screen size and search engine.',
  },
];

export const TOOLKIT_GROUPS = [
  {
    label: 'Industries Served',
    items: ['Real Estate', 'Fashion & Apparel', 'Professional Services', 'Hospitality', 'Lifestyle Brands'],
  },
  {
    label: 'Design & Build Stack',
    items: ['Figma', 'React & TypeScript', 'Tailwind CSS', 'E-Commerce UX', 'SEO Foundations'],
  },
];
