import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  Mail,
  MessageCircle,
} from 'lucide-react';
import {
  DESIGNER_PROFILE,
  PROOF_METRICS,
  PORTFOLIO_PROJECTS,
  SERVICES,
  CLIENT_REVIEWS,
  PROCESS_STEPS,
  TOOLKIT_GROUPS,
  type PageId,
  type SectionId,
  type ProjectCategory,
  type PortfolioProject,
} from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { ResilientImage } from './components/ResilientImage';
import { CaseStudyModal } from './components/CaseStudyModal';

const FILTER_CATEGORIES: ProjectCategory[] = [
  'All Work',
  'Real Estate',
  'Brands & Retail',
  'Service Businesses',
];

const PAGE_TITLES: Record<PageId, string> = {
  home: 'Fortune Allwell — Web Designer for Businesses & Brands',
  about: 'About — Fortune Allwell',
};

function parseHashToRoute(hash: string): { page: PageId; section: SectionId } {
  const cleaned = hash.replace(/^#\/?/, '').toLowerCase();
  if (cleaned === 'works') return { page: 'home', section: 'works' };
  if (cleaned === 'services') return { page: 'home', section: 'services' };
  if (cleaned === 'about') return { page: 'about', section: 'about' };
  if (cleaned === 'reviews') return { page: 'about', section: 'reviews' };
  if (cleaned === 'contact') return { page: 'about', section: 'contact' };
  return { page: 'home', section: 'home' };
}

export default function App() {
  const initialRoute =
    typeof window !== 'undefined'
      ? parseHashToRoute(window.location.hash)
      : { page: 'home' as PageId, section: 'home' as SectionId };

  const [activePage, setActivePage] = useState<PageId>(initialRoute.page);
  const [activeSection, setActiveSection] = useState<SectionId>(initialRoute.section);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All Work');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    document.title = PAGE_TITLES[activePage];
  }, [activePage]);

  useEffect(() => {
    const handleHashChange = () => {
      const next = parseHashToRoute(window.location.hash);
      setActivePage(next.page);
      setActiveSection(next.section);
      requestAnimationFrame(() => {
        if (
          next.section === 'works' ||
          next.section === 'services' ||
          next.section === 'reviews' ||
          next.section === 'contact'
        ) {
          const el = document.getElementById(`${next.section}-section`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            return;
          }
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToPage = (page: PageId, sectionId?: SectionId) => {
    const resolvedSection: SectionId = sectionId ?? (page === 'home' ? 'home' : 'about');
    setActivePage(page);
    setActiveSection(resolvedSection);

    const nextHash = `#${resolvedSection}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, '', nextHash);
    }

    requestAnimationFrame(() => {
      if (
        resolvedSection === 'works' ||
        resolvedSection === 'services' ||
        resolvedSection === 'reviews' ||
        resolvedSection === 'contact'
      ) {
        const el = document.getElementById(`${resolvedSection}-section`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  };

  const filteredProjects =
    activeCategory === 'All Work'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((project) => project.category === activeCategory);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(DESIGNER_PROFILE.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      window.location.href = `mailto:${DESIGNER_PROFILE.email}`;
    }
  };

  const handleModalNavigate = (direction: 'prev' | 'next') => {
    if (!selectedProject) return;
    const currentIndex = filteredProjects.findIndex((p) => p.id === selectedProject.id);
    if (currentIndex === -1) return;
    const nextIndex =
      direction === 'next'
        ? (currentIndex + 1) % filteredProjects.length
        : (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    setSelectedProject(filteredProjects[nextIndex]);
  };

  const handleInquireSimilar = (project: PortfolioProject) => {
    setSelectedProject(null);
    const subject = encodeURIComponent(`Project Inquiry: ${project.title}`);
    window.location.href = `mailto:${DESIGNER_PROFILE.email}?subject=${subject}`;
    navigateToPage('about', 'contact');
  };

  return (
    <div id="top" className="min-h-screen bg-[#050505] text-[#F4F4F5] flex flex-col">
      <Navbar activeSection={activeSection} onNavigate={navigateToPage} />

      <main className="flex-1 flex flex-col">
        {/* PAGE 1: HOME (HERO + WORKS + SERVICES) */}
        {activePage === 'home' && (
          <div className="flex-1 flex flex-col">
            {/* Hero & Proof Strip */}
            <section
              id="home-section"
              className="max-w-[1280px] w-full mx-auto px-5 sm:px-8 pt-12 pb-16 lg:pt-16 lg:pb-20"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
                {/* Left Column: Typographic Hierarchy */}
                <div className="lg:col-span-7 flex flex-col justify-between py-2">
                  <div className="space-y-6">
                    <p className="text-sm font-medium text-[#A1A1AA]">
                      <span>{DESIGNER_PROFILE.title}</span>
                      <span className="mx-2 text-[#52525B]" aria-hidden="true">
                        ·
                      </span>
                      <span>{DESIGNER_PROFILE.location}</span>
                    </p>

                    <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold leading-[1.08] tracking-tight text-[#F4F4F5] max-w-2xl">
                      Designing high-converting websites for ambitious businesses &amp; brands.
                    </h1>

                    <p className="text-base sm:text-lg leading-relaxed text-[#A1A1AA] max-w-xl">
                      I partner with real estate firms, fashion labels, hospitality groups, and
                      service businesses to craft memorable brand websites that build instant
                      credibility and turn visitors into paying clients.
                    </p>
                  </div>

                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => navigateToPage('home', 'works')}
                      className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <span>Explore Selected Works</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>

                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-[#E4E4E7] bg-[#0C0C0E] hover:bg-[#141417] border border-[#27272A] rounded-lg transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-4 h-4 text-[#60A5FA]" aria-hidden="true" />
                          <span>Copied {DESIGNER_PROFILE.email}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-[#A1A1AA]" aria-hidden="true" />
                          <span>{DESIGNER_PROFILE.email}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Right Column: Studio Workspace Visual */}
                <div className="lg:col-span-5">
                  <motion.div
                    initial={{ opacity: 0.85, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative h-80 sm:h-[420px] lg:h-full min-h-[380px] overflow-hidden rounded-2xl border border-[#27272A] hover:border-[#3B82F6]/60 bg-[#0C0C0E] transition-colors duration-500"
                  >
                    <ResilientImage
                      src="/src/assets/images/hero_studio_workspace_1795310700218.jpg"
                      alt="Fortune Allwell web design studio desk with architectural display"
                      title="Fortune Allwell Studio"
                      className="w-full h-full object-cover transition-[transform,filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] grayscale-[12%] group-hover:grayscale-0 group-hover:scale-[1.04] group-hover:brightness-105 will-change-transform"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-[#3B82F6]/10 opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 text-xs text-[#E4E4E7]">
                      <span>{DESIGNER_PROFILE.availability}</span>
                      <span className="font-mono tabular-nums text-[#60A5FA]">2026 Portfolio</span>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Full-Width 4-Column Proof Strip */}
              <div className="mt-14 pt-8 border-t border-[#27272A] grid grid-cols-2 lg:grid-cols-4 gap-8">
                {PROOF_METRICS.map((metric) => (
                  <div key={metric.label} className="space-y-1">
                    <div className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#F4F4F5] tabular-nums">
                      {metric.value}
                    </div>
                    <div className="text-sm font-medium text-[#E4E4E7]">{metric.label}</div>
                    <div className="text-xs text-[#71717A]">{metric.context}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* SUBTLE EDITORIAL MARQUEE DIVIDER */}
            <div
              aria-hidden="true"
              className="border-y border-[#18181B] bg-[#09090B] py-3.5 overflow-hidden select-none"
            >
              <div className="animate-editorial-marquee text-xs sm:text-sm tracking-wide text-[#71717A]">
                {[0, 1].map((loopIdx) => (
                  <div key={loopIdx} className="flex items-center gap-8 pr-8 whitespace-nowrap">
                    <span>Real Estate Websites</span>
                    <span className="text-[#3F3F46]">·</span>
                    <span>Fashion &amp; Retail Flagships</span>
                    <span className="text-[#3F3F46]">·</span>
                    <span>Service Business Platforms</span>
                    <span className="text-[#3F3F46]">·</span>
                    <span>Brand Storytelling</span>
                    <span className="text-[#3F3F46]">·</span>
                    <span>Conversion-Focused Design</span>
                    <span className="text-[#3F3F46]">·</span>
                    <span>Fortune Allwell Studio</span>
                    <span className="text-[#3F3F46]">·</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Works Section */}
            <section
              id="works-section"
              className="max-w-[1280px] w-full mx-auto px-5 sm:px-8 py-20 lg:py-24 scroll-mt-16"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="space-y-2 max-w-xl">
                  <p className="text-xs font-medium text-[#60A5FA]">Works</p>
                  <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#F4F4F5]">
                    Web experiences built to grow businesses and elevate brands.
                  </h2>
                </div>

                {/* Interactive Segmented Filter Control */}
                <div
                  role="group"
                  aria-label="Filter projects by category"
                  className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#0C0C0E] border border-[#27272A] rounded-lg self-start md:self-auto"
                >
                  {FILTER_CATEGORIES.map((category) => {
                    const isActive = activeCategory === category;
                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setActiveCategory(category)}
                        className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                          isActive
                            ? 'bg-[#F4F4F5] text-[#050505]'
                            : 'text-[#A1A1AA] hover:text-[#F4F4F5]'
                        }`}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Media-First Asymmetric Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProjects.map((project, idx) => {
                  const isWideFeatured = activeCategory === 'All Work' && idx === 0;
                  return (
                    <article
                      key={project.id}
                      className={`group rounded-2xl border border-[#27272A] bg-[#0C0C0E] overflow-hidden transition-colors duration-200 hover:border-[#3F3F46] ${
                        isWideFeatured ? 'md:col-span-2' : ''
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="w-full text-left block cursor-pointer focus-visible:outline-none"
                      >
                        <div
                          className={`relative overflow-hidden bg-[#050505] ${
                            isWideFeatured ? 'aspect-[16/9] lg:aspect-[21/9]' : 'aspect-[4/3]'
                          }`}
                        >
                          <ResilientImage
                            src={project.image}
                            alt={project.imageAlt}
                            title={project.title}
                            className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                          />
                        </div>

                        <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                          <div className="space-y-3 max-w-2xl">
                            <div className="flex flex-wrap items-center gap-2 text-xs text-[#A1A1AA]">
                              <span>{project.client}</span>
                              <span aria-hidden="true">·</span>
                              <span>{project.category}</span>
                              <span aria-hidden="true">·</span>
                              <span className="font-mono tabular-nums">{project.year}</span>
                            </div>

                            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#F4F4F5] group-hover:text-[#60A5FA] transition-colors duration-150">
                              {project.title}
                            </h3>

                            <p className="text-sm leading-relaxed text-[#A1A1AA]">
                              {project.summary}
                            </p>
                            <p className="text-xs font-medium text-[#60A5FA]">
                              {project.outcomeMetric}
                            </p>
                          </div>

                          <div className="inline-flex items-center gap-1.5 text-sm font-medium text-[#F4F4F5] group-hover:text-[#60A5FA] transition-colors whitespace-nowrap shrink-0">
                            <span>View Case Study</span>
                            <ArrowUpRight
                              className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                      </button>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* Services Section */}
            <section
              id="services-section"
              className="border-t border-[#18181B] bg-[#09090B] scroll-mt-16"
            >
              <div className="max-w-[1280px] w-full mx-auto px-5 sm:px-8 py-20 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  <div className="lg:col-span-4 space-y-3">
                    <p className="text-xs font-medium text-[#60A5FA]">Services</p>
                    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#F4F4F5]">
                      Tailored web craft for growing businesses.
                    </h2>
                  </div>

                  <div className="lg:col-span-8 divide-y divide-[#27272A] border-y border-[#27272A]">
                    {SERVICES.map((service) => (
                      <div
                        key={service.index}
                        className="py-7 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-baseline"
                      >
                        <div className="md:col-span-5 flex items-baseline gap-3">
                          <span className="font-mono text-sm text-[#60A5FA] tabular-nums shrink-0">
                            {service.index}
                          </span>
                          <h3 className="text-lg font-semibold text-[#F4F4F5]">{service.title}</h3>
                        </div>

                        <p className="md:col-span-7 text-sm leading-relaxed text-[#A1A1AA]">
                          {service.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-16 pt-8 border-t border-[#18181B] flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => navigateToPage('about', 'about')}
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#60A5FA] hover:text-[#93C5FD] transition-colors cursor-pointer"
                  >
                    <span>Next: About</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* PAGE 2: ABOUT + REVIEWS + CONTACT */}
        {activePage === 'about' && (
          <div className="flex-1 flex flex-col">
            {/* About Section */}
            <section
              id="about-section"
              className="max-w-[1280px] w-full mx-auto px-5 sm:px-8 py-16 lg:py-24 scroll-mt-16"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
                {/* Portrait Column */}
                <div className="lg:col-span-5">
                  <motion.div
                    initial={{ opacity: 0.85, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative h-96 lg:h-full min-h-[420px] overflow-hidden rounded-2xl border border-[#27272A] hover:border-[#3B82F6]/50 bg-[#0C0C0E] transition-colors duration-500"
                  >
                    <ResilientImage
                      src="/assets/aistudio/668901_f28459b2.png"
                      alt="Portrait of web designer Fortune Allwell"
                      title="Fortune Allwell"
                      className="w-full h-full object-cover object-top transition-[transform,filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] grayscale-[15%] group-hover:grayscale-0 group-hover:scale-[1.04] group-hover:brightness-105 will-change-transform"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/45 via-transparent to-[#3B82F6]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  </motion.div>
                </div>

                {/* Bio, Process & Toolkit */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-10">
                  <div className="space-y-5">
                    <p className="text-xs font-medium text-[#60A5FA]">About</p>
                    <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#F4F4F5]">
                      Helping brands look unmistakable and sell with confidence.
                    </h1>
                    <p className="text-base leading-relaxed text-[#A1A1AA]">
                      Over the past two years, I’ve helped real estate agencies, fashion labels,
                      consultancies, and service businesses replace generic templates with bespoke
                      websites that earn immediate customer trust. Every layout is designed around
                      how real buyers browse, compare, and take action.
                    </p>
                  </div>

                  {/* 3-Step Workflow */}
                  <div className="space-y-4">
                    <h2 className="text-sm font-semibold text-[#F4F4F5]">Collaboration Process</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                      {PROCESS_STEPS.map((item) => (
                        <div key={item.step} className="space-y-2 border-t border-[#27272A] pt-4">
                          <div className="font-mono text-xs text-[#60A5FA] tabular-nums">
                            {item.step}
                          </div>
                          <div className="text-sm font-semibold text-[#F4F4F5]">{item.title}</div>
                          <p className="text-xs leading-relaxed text-[#A1A1AA]">{item.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Core Toolkit */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#27272A]">
                    {TOOLKIT_GROUPS.map((group) => (
                      <div key={group.label} className="space-y-2">
                        <div className="text-xs font-medium text-[#71717A]">{group.label}</div>
                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-[#E4E4E7]">
                          {group.items.map((tool, idx) => (
                            <span key={tool} className="inline-flex items-center gap-2.5">
                              <span>{tool}</span>
                              {idx < group.items.length - 1 && (
                                <span className="text-[#52525B]" aria-hidden="true">
                                  ·
                                </span>
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Reviews Section */}
            <section
              id="reviews-section"
              className="border-t border-[#18181B] bg-[#09090B] scroll-mt-16"
            >
              <div className="max-w-[1280px] w-full mx-auto px-5 sm:px-8 py-20 lg:py-24">
                <div className="space-y-2 mb-12 max-w-xl">
                  <p className="text-xs font-medium text-[#60A5FA]">Reviews</p>
                  <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#F4F4F5]">
                    Trusted by business founders and brand leaders.
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {CLIENT_REVIEWS.map((review) => (
                    <blockquote
                      key={review.author}
                      className="p-6 sm:p-7 rounded-2xl border border-[#27272A] bg-[#0C0C0E] flex flex-col justify-between gap-6"
                    >
                      <p className="text-sm leading-relaxed text-[#E4E4E7]">“{review.quote}”</p>

                      <footer className="pt-4 border-t border-[#18181B]">
                        <div className="text-sm font-semibold text-[#F4F4F5]">{review.author}</div>
                        <div className="text-xs text-[#A1A1AA]">
                          <span>{review.role}</span>
                          <span className="mx-1.5 text-[#52525B]" aria-hidden="true">
                            ·
                          </span>
                          <span>{review.company}</span>
                        </div>
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section
              id="contact-section"
              className="border-t border-[#18181B] bg-[#050505] flex-1 scroll-mt-16"
            >
              <div className="max-w-[1280px] w-full mx-auto px-5 sm:px-8 py-20 lg:py-28">
                <div className="space-y-6">
                  <p className="text-xs font-medium text-[#60A5FA]">Contact</p>
                  <h2 className="max-w-3xl text-3xl sm:text-5xl font-semibold tracking-tight text-[#F4F4F5] leading-[1.1]">
                    Ready to elevate your business online?
                  </h2>
                  <p className="text-base leading-relaxed text-[#A1A1AA] max-w-xl">
                    Whether you run a real estate firm, fashion label, or service brand, reach out to
                    discuss your website.
                  </p>

                  <div className="pt-4 !mb-3 flex flex-wrap items-center justify-center gap-4">
                    <a
                      href={`mailto:${DESIGNER_PROFILE.email}`}
                      className="inline-flex items-center gap-2.5 px-6 py-3.5 text-base sm:text-lg font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors duration-150 whitespace-nowrap"
                    >
                      <Mail className="w-5 h-5" aria-hidden="true" />
                      <span>Email me</span>
                    </a>

                    <a
                      href={DESIGNER_PROFILE.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 px-6 py-3.5 text-base sm:text-lg font-semibold text-white bg-[#15803D] hover:bg-[#166534] border border-[#22C55E]/40 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4ADE80] rounded-lg transition-colors duration-150 whitespace-nowrap"
                    >
                      <MessageCircle className="w-5 h-5" aria-hidden="true" />
                      <span>WhatsApp</span>
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                  </div>

                  <p className="text-center text-sm text-[#A1A1AA]">
                    I respond within 12 hours.
                  </p>
                </div>

                <div className="mt-16 pt-8 border-t border-[#18181B] flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => navigateToPage('home', 'services')}
                    className="inline-flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                    <span>Previous: Services</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateToPage('home', 'home')}
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#60A5FA] hover:text-[#93C5FD] transition-colors cursor-pointer"
                  >
                    <span>Return Home</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* QUIET FOOTER */}
      <footer className="border-t border-[#18181B] bg-[#050505]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717A]">
          <div>
            © <span className="tabular-nums">2026</span> {DESIGNER_PROFILE.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a
              href={`mailto:${DESIGNER_PROFILE.email}`}
              className="hover:text-[#E4E4E7] transition-colors"
            >
              {DESIGNER_PROFILE.email}
            </a>
            <button
              type="button"
              onClick={() => navigateToPage('home', 'home')}
              className="text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors cursor-pointer whitespace-nowrap"
            >
              Home
            </button>
          </div>
        </div>
      </footer>

      {/* CASE STUDY MODAL */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onNavigate={handleModalNavigate}
        onInquireSimilar={handleInquireSimilar}
      />
    </div>
  );
}
