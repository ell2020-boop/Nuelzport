import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
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
import {
  EDITORIAL_EASE,
  RevealBlock,
  MaskedLineReveal,
  AnimatedMetricValue,
  SpotlightSurface,
  TiltMediaFrame,
} from './components/MotionPrimitives';

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
  const pendingScrollSectionRef = useRef<SectionId | null>(null);

  const scrollToSectionTarget = useCallback((sectionId: SectionId) => {
    requestAnimationFrame(() => {
      if (
        sectionId === 'works' ||
        sectionId === 'services' ||
        sectionId === 'reviews' ||
        sectionId === 'contact'
      ) {
        const el = document.getElementById(`${sectionId}-section`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  }, []);

  useEffect(() => {
    document.title = PAGE_TITLES[activePage];
  }, [activePage]);

  useEffect(() => {
    const handleHashChange = () => {
      const next = parseHashToRoute(window.location.hash);
      const isSamePage = next.page === activePage;
      setActivePage(next.page);
      setActiveSection(next.section);
      if (isSamePage) {
        scrollToSectionTarget(next.section);
      } else {
        pendingScrollSectionRef.current = next.section;
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activePage, scrollToSectionTarget]);

  const navigateToPage = (page: PageId, sectionId?: SectionId) => {
    const resolvedSection: SectionId = sectionId ?? (page === 'home' ? 'home' : 'about');
    const isSamePage = page === activePage;
    setActivePage(page);
    setActiveSection(resolvedSection);

    const nextHash = `#${resolvedSection}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, '', nextHash);
    }

    if (isSamePage) {
      scrollToSectionTarget(resolvedSection);
    } else {
      pendingScrollSectionRef.current = resolvedSection;
    }
  };

  useEffect(() => {
    if (
      initialRoute.section === 'works' ||
      initialRoute.section === 'services' ||
      initialRoute.section === 'reviews' ||
      initialRoute.section === 'contact'
    ) {
      scrollToSectionTarget(initialRoute.section);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const flushPendingScroll = useCallback(() => {
    const target = pendingScrollSectionRef.current;
    if (!target) return;
    pendingScrollSectionRef.current = null;
    scrollToSectionTarget(target);
  }, [scrollToSectionTarget]);

  const filteredProjects =
    activeCategory === 'All Work'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((project) => project.category === activeCategory);

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
    <MotionConfig reducedMotion="user">
      <div id="top" className="min-h-screen bg-[#050505] text-[#F4F4F5] flex flex-col overflow-x-clip">
        <Navbar activeSection={activeSection} onNavigate={navigateToPage} />

        <main className="flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            {/* PAGE 1: HOME (HERO + WORKS + SERVICES) */}
            {activePage === 'home' && (
              <motion.div
                key="page-home"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.24, ease: EDITORIAL_EASE }}
                onAnimationStart={flushPendingScroll}
                className="flex-1 flex flex-col"
              >
                {/* Hero & Proof Strip */}
                <section
                  id="home-section"
                  className="relative max-w-[1280px] w-full mx-auto px-5 sm:px-8 pt-12 pb-16 lg:pt-16 lg:pb-20"
                >
                  {/* Subtle Ambient Studio Glow */}
                  <div
                    aria-hidden="true"
                    className="animate-ambient-glow pointer-events-none absolute -top-12 right-0 w-[420px] h-[420px] rounded-full bg-[#2563EB]/10 blur-[110px]"
                  />

                  <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
                    {/* Left Column: Typographic Hierarchy */}
                    <div className="lg:col-span-7 flex flex-col justify-between py-2">
                      <div className="space-y-6">
                        <RevealBlock immediate y={14} delay={0.02}>
                          <p className="text-sm font-medium text-[#A1A1AA]">
                            <span>{DESIGNER_PROFILE.title}</span>
                            <span className="mx-2 text-[#52525B]" aria-hidden="true">
                              ·
                            </span>
                            <span>{DESIGNER_PROFILE.location}</span>
                          </p>
                        </RevealBlock>

                        <MaskedLineReveal immediate delay={0.08}>
                          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold leading-[1.08] tracking-tight text-[#F4F4F5] max-w-2xl">
                            Designing high-converting websites for ambitious businesses &amp; brands.
                          </h1>
                        </MaskedLineReveal>

                        <RevealBlock immediate y={16} delay={0.16}>
                          <p className="text-base sm:text-lg leading-relaxed text-[#A1A1AA] max-w-xl">
                            I partner with real estate firms, fashion labels, hospitality groups, and
                            service businesses to craft memorable brand websites that build instant
                            credibility and turn visitors into paying clients.
                          </p>
                        </RevealBlock>
                      </div>

                      <RevealBlock immediate y={16} delay={0.24} className="mt-10 flex flex-wrap items-center gap-4">
                        <motion.button
                          type="button"
                          onClick={() => navigateToPage('home', 'works')}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          transition={{ duration: 0.18, ease: EDITORIAL_EASE }}
                          className="cta-shimmer group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0"
                        >
                          <span>Explore Selected Works</span>
                          <ArrowRight
                            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </motion.button>
                      </RevealBlock>
                    </div>

                    {/* Right Column: Studio Workspace Visual with 3D Interactive Tilt */}
                    <div className="lg:col-span-5">
                      <TiltMediaFrame className="group relative h-80 sm:h-[420px] lg:h-full min-h-[380px] overflow-hidden rounded-2xl border border-[#27272A] hover:border-[#3B82F6]/60 bg-[#0C0C0E] transition-colors duration-500">
                        <ResilientImage
                          src="/src/assets/images/hero_studio_workspace_1795310700218.jpg"
                          alt="Fortune Allwell web design studio desk with architectural display"
                          title="Fortune Allwell Studio"
                          className="w-full h-full object-cover transition-[transform,filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] grayscale-[12%] group-hover:grayscale-0 group-hover:scale-[1.05] group-hover:brightness-105 will-change-transform"
                        />
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/85 via-transparent to-[#3B82F6]/10 opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                        />
                        <div className="absolute z-20 bottom-5 left-5 right-5 flex items-center justify-between gap-4 text-xs text-[#E4E4E7]">
                          <span>{DESIGNER_PROFILE.availability}</span>
                          <span className="font-mono tabular-nums text-[#60A5FA]">2026 Portfolio</span>
                        </div>
                      </TiltMediaFrame>
                    </div>
                  </div>

                  {/* Full-Width 4-Column Proof Strip */}
                  <div className="mt-14 pt-8 border-t border-[#27272A] grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {PROOF_METRICS.map((metric, idx) => (
                      <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                          duration: 0.55,
                          delay: idx * 0.08,
                          ease: EDITORIAL_EASE,
                        }}
                        whileHover={{ y: -3 }}
                        className="group space-y-1 transition-transform duration-200"
                      >
                        <AnimatedMetricValue
                          value={metric.value}
                          className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#F4F4F5] group-hover:text-[#60A5FA] transition-colors duration-200 tabular-nums"
                        />
                        <div className="text-sm font-medium text-[#E4E4E7]">{metric.label}</div>
                        <div className="text-xs text-[#71717A]">{metric.context}</div>
                      </motion.div>
                    ))}
                  </div>
                </section>

                {/* SUBTLE EDITORIAL MARQUEE DIVIDER WITH EDGE FADE MASKS */}
                <div
                  aria-hidden="true"
                  className="relative border-y border-[#18181B] bg-[#09090B] py-3.5 overflow-hidden select-none"
                >
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 z-10 bg-gradient-to-r from-[#09090B] to-transparent" />
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 z-10 bg-gradient-to-l from-[#09090B] to-transparent" />

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
                      <RevealBlock y={12}>
                        <p className="text-xs font-medium text-[#60A5FA]">Works</p>
                      </RevealBlock>
                      <MaskedLineReveal delay={0.06}>
                        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#F4F4F5]">
                          Web experiences built to grow businesses and elevate brands.
                        </h2>
                      </MaskedLineReveal>
                    </div>

                    {/* Interactive Segmented Filter Control with Sliding Pill Indicator */}
                    <RevealBlock y={14} delay={0.1}>
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
                              className={`relative px-3.5 py-2 text-xs font-medium rounded-md transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                                isActive
                                  ? 'text-[#050505]'
                                  : 'text-[#A1A1AA] hover:text-[#F4F4F5]'
                              }`}
                            >
                              {isActive && (
                                <motion.span
                                  layoutId="works-category-indicator"
                                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                                  className="absolute inset-0 rounded-md bg-[#F4F4F5]"
                                />
                              )}
                              <span className="relative z-10">{category}</span>
                            </button>
                          );
                        })}
                      </div>
                    </RevealBlock>
                  </div>

                  {/* Media-First Asymmetric Bento Grid */}
                  <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AnimatePresence mode="popLayout">
                      {filteredProjects.map((project, idx) => {
                        const isWideFeatured = activeCategory === 'All Work' && idx === 0;
                        return (
                          <motion.article
                            key={project.id}
                            layout
                            initial={{ opacity: 0, y: 26, scale: 0.98 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.96, y: 12 }}
                            viewport={{ once: true, amount: 0.14 }}
                            transition={{
                              duration: 0.58,
                              delay: idx * 0.07,
                              ease: EDITORIAL_EASE,
                              layout: { duration: 0.38, ease: EDITORIAL_EASE },
                            }}
                            whileHover={{ y: -4 }}
                            className={`group rounded-2xl border border-[#27272A] bg-[#0C0C0E] overflow-hidden transition-colors duration-300 hover:border-[#3B82F6]/45 ${
                              isWideFeatured ? 'md:col-span-2' : ''
                            }`}
                          >
                            <SpotlightSurface className="h-full">
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
                                    className="w-full h-full object-cover transition-[transform,filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045] group-hover:brightness-105 will-change-transform"
                                  />
                                  <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0C0C0E]/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                                  />
                                </div>

                                <div className="relative z-20 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                                  <div className="space-y-3 max-w-2xl">
                                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#A1A1AA]">
                                      <span>{project.client}</span>
                                      <span aria-hidden="true">·</span>
                                      <span>{project.category}</span>
                                      <span aria-hidden="true">·</span>
                                      <span className="font-mono tabular-nums">{project.year}</span>
                                      <span aria-hidden="true">·</span>
                                      <span className="font-medium text-white">Concept</span>
                                    </div>

                                    <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#F4F4F5] group-hover:text-[#60A5FA] transition-colors duration-200">
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
                                      className="w-4 h-4 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1"
                                      aria-hidden="true"
                                    />
                                  </div>
                                </div>
                              </button>
                            </SpotlightSurface>
                          </motion.article>
                        );
                      })}
                    </AnimatePresence>
                  </motion.div>
                </section>

                {/* Services Section */}
                <section
                  id="services-section"
                  className="border-t border-[#18181B] bg-[#09090B] scroll-mt-16"
                >
                  <div className="max-w-[1280px] w-full mx-auto px-5 sm:px-8 py-20 lg:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                      <div className="lg:col-span-4 space-y-3">
                        <RevealBlock y={12}>
                          <p className="text-xs font-medium text-[#60A5FA]">Services</p>
                        </RevealBlock>
                        <MaskedLineReveal delay={0.06}>
                          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#F4F4F5]">
                            Tailored web craft for growing businesses.
                          </h2>
                        </MaskedLineReveal>
                      </div>

                      <div className="lg:col-span-8 divide-y divide-[#27272A] border-y border-[#27272A]">
                        {SERVICES.map((service, idx) => (
                          <motion.div
                            key={service.index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{
                              duration: 0.55,
                              delay: idx * 0.08,
                              ease: EDITORIAL_EASE,
                            }}
                            whileHover={{ x: 8 }}
                            className="group py-7 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-baseline transition-colors duration-200"
                          >
                            <div className="md:col-span-5 flex items-baseline gap-3">
                              <span className="font-mono text-sm text-[#60A5FA] group-hover:text-[#93C5FD] transition-colors tabular-nums shrink-0">
                                {service.index}
                              </span>
                              <h3 className="text-lg font-semibold text-[#F4F4F5] group-hover:text-[#60A5FA] transition-colors duration-200">
                                {service.title}
                              </h3>
                            </div>

                            <p className="md:col-span-7 text-sm leading-relaxed text-[#A1A1AA] group-hover:text-[#D4D4D8] transition-colors duration-200">
                              {service.description}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-16 pt-8 border-t border-[#18181B] flex items-center justify-end">
                      <motion.button
                        type="button"
                        onClick={() => navigateToPage('about', 'about')}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.18, ease: EDITORIAL_EASE }}
                        className="group inline-flex items-center gap-2 text-sm font-medium text-[#60A5FA] hover:text-[#93C5FD] transition-colors cursor-pointer"
                      >
                        <span>Next: About</span>
                        <ArrowRight
                          className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </motion.button>
                    </div>
                  </div>
                </section>
              </motion.div>
            )}

            {/* PAGE 2: ABOUT + REVIEWS + CONTACT */}
            {activePage === 'about' && (
              <motion.div
                key="page-about"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.24, ease: EDITORIAL_EASE }}
                onAnimationStart={flushPendingScroll}
                className="flex-1 flex flex-col"
              >
                {/* About Section */}
                <section
                  id="about-section"
                  className="relative max-w-[1280px] w-full mx-auto px-5 sm:px-8 py-16 lg:py-24 scroll-mt-16"
                >
                  <div
                    aria-hidden="true"
                    className="animate-ambient-glow pointer-events-none absolute top-4 left-0 w-[380px] h-[380px] rounded-full bg-[#2563EB]/10 blur-[110px]"
                  />

                  <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
                    {/* Portrait Column with 3D Interactive Tilt */}
                    <div className="lg:col-span-5">
                      <TiltMediaFrame className="group relative h-96 lg:h-full min-h-[420px] overflow-hidden rounded-2xl border border-[#27272A] hover:border-[#3B82F6]/55 bg-[#0C0C0E] transition-colors duration-500">
                        <ResilientImage
                          src="/assets/aistudio/668901_f28459b2.png"
                          alt="Portrait of web designer Fortune Allwell"
                          title="Fortune Allwell"
                          className="w-full h-full object-cover object-top transition-[transform,filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] grayscale-[15%] group-hover:grayscale-0 group-hover:scale-[1.05] group-hover:brightness-105 will-change-transform"
                        />
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/45 via-transparent to-[#3B82F6]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        />
                      </TiltMediaFrame>
                    </div>

                    {/* Bio, Process & Toolkit */}
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-10">
                      <div className="space-y-5">
                        <RevealBlock immediate y={12} delay={0.02}>
                          <p className="text-xs font-medium text-[#60A5FA]">About</p>
                        </RevealBlock>
                        <MaskedLineReveal immediate delay={0.08}>
                          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#F4F4F5]">
                            Helping brands look unmistakable and sell with confidence.
                          </h1>
                        </MaskedLineReveal>
                        <RevealBlock immediate y={16} delay={0.16}>
                          <p className="text-base leading-relaxed text-[#A1A1AA]">
                            Over the past two years, I’ve helped real estate agencies, fashion
                            labels, consultancies, and service businesses replace generic templates
                            with bespoke websites that earn immediate customer trust. Every layout is
                            designed around how real buyers browse, compare, and take action.
                          </p>
                        </RevealBlock>
                      </div>

                      {/* 3-Step Workflow */}
                      <div className="space-y-4">
                        <RevealBlock immediate y={12} delay={0.22}>
                          <h2 className="text-sm font-semibold text-[#F4F4F5]">
                            Collaboration Process
                          </h2>
                        </RevealBlock>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                          {PROCESS_STEPS.map((item, idx) => (
                            <motion.div
                              key={item.step}
                              initial={{ opacity: 0, y: 18 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, amount: 0.25 }}
                              transition={{
                                duration: 0.55,
                                delay: 0.1 + idx * 0.08,
                                ease: EDITORIAL_EASE,
                              }}
                              whileHover={{ y: -3 }}
                              className="group relative space-y-2 border-t border-[#27272A] hover:border-[#3B82F6]/60 pt-4 transition-colors duration-200"
                            >
                              <div className="font-mono text-xs text-[#60A5FA] tabular-nums">
                                {item.step}
                              </div>
                              <div className="text-sm font-semibold text-[#F4F4F5] group-hover:text-[#60A5FA] transition-colors">
                                {item.title}
                              </div>
                              <p className="text-xs leading-relaxed text-[#A1A1AA]">{item.detail}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Core Toolkit */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#27272A]">
                        {TOOLKIT_GROUPS.map((group, groupIdx) => (
                          <motion.div
                            key={group.label}
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                              duration: 0.5,
                              delay: groupIdx * 0.1,
                              ease: EDITORIAL_EASE,
                            }}
                            className="space-y-2"
                          >
                            <div className="text-xs font-medium text-[#71717A]">{group.label}</div>
                            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-[#E4E4E7]">
                              {group.items.map((tool, idx) => (
                                <span
                                  key={tool}
                                  className="inline-flex items-center gap-2.5 hover:text-[#60A5FA] transition-colors duration-150"
                                >
                                  <span>{tool}</span>
                                  {idx < group.items.length - 1 && (
                                    <span className="text-[#52525B]" aria-hidden="true">
                                      ·
                                    </span>
                                  )}
                                </span>
                              ))}
                            </div>
                          </motion.div>
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
                      <RevealBlock y={12}>
                        <p className="text-xs font-medium text-[#60A5FA]">Reviews</p>
                      </RevealBlock>
                      <MaskedLineReveal delay={0.06}>
                        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#F4F4F5]">
                          Trusted by business founders and brand leaders.
                        </h2>
                      </MaskedLineReveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {CLIENT_REVIEWS.map((review, idx) => (
                        <motion.blockquote
                          key={review.author}
                          initial={{ opacity: 0, y: 24, scale: 0.98 }}
                          whileInView={{ opacity: 1, y: 0, scale: 1 }}
                          viewport={{ once: true, amount: 0.05 }}
                          transition={{
                            duration: 0.58,
                            delay: idx * 0.09,
                            ease: EDITORIAL_EASE,
                          }}
                          whileHover={{ y: -5 }}
                          className="group rounded-2xl border border-[#27272A] hover:border-[#3B82F6]/45 bg-[#0C0C0E] transition-colors duration-300"
                        >
                          <SpotlightSurface className="p-6 sm:p-7 h-full flex flex-col justify-between gap-6">
                            <p className="relative z-20 text-sm leading-relaxed text-[#E4E4E7]">
                              “{review.quote}”
                            </p>

                            <footer className="relative z-20 pt-4 border-t border-[#18181B] flex items-end justify-between gap-3">
                              <div>
                                <div className="text-sm font-semibold text-[#F4F4F5] group-hover:text-[#60A5FA] transition-colors duration-200">
                                  {review.author}
                                </div>
                                <div className="text-xs text-[#A1A1AA]">
                                  <span>{review.role}</span>
                                  <span className="mx-1.5 text-[#52525B]" aria-hidden="true">
                                    ·
                                  </span>
                                  <span>{review.company}</span>
                                </div>
                              </div>
                              <span className="text-xs font-medium text-white whitespace-nowrap shrink-0">
                                Concept
                              </span>
                            </footer>
                          </SpotlightSurface>
                        </motion.blockquote>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Contact Section */}
                <section
                  id="contact-section"
                  className="relative border-t border-[#18181B] bg-[#050505] flex-1 scroll-mt-16"
                >
                  <div className="max-w-[1280px] w-full mx-auto px-5 sm:px-8 py-20 lg:py-28">
                    <div className="space-y-6">
                      <RevealBlock y={12}>
                        <p className="text-xs font-medium text-[#60A5FA]">Contact</p>
                      </RevealBlock>
                      <MaskedLineReveal delay={0.06}>
                        <h2 className="max-w-3xl text-3xl sm:text-5xl font-semibold tracking-tight text-[#F4F4F5] leading-[1.1]">
                          Ready to elevate your business online?
                        </h2>
                      </MaskedLineReveal>
                      <RevealBlock y={16} delay={0.12}>
                        <p className="text-base leading-relaxed text-[#A1A1AA] max-w-xl">
                          Whether you run a real estate firm, fashion label, or service brand, reach
                          out to discuss your website.
                        </p>
                      </RevealBlock>

                      <RevealBlock y={18} delay={0.18}>
                        <div className="pt-4 !mb-3 flex flex-wrap items-center justify-center gap-5 sm:gap-6">
                          <motion.a
                            href={`mailto:${DESIGNER_PROFILE.email}`}
                            whileHover={{ y: -2.5 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.18, ease: EDITORIAL_EASE }}
                            className="cta-shimmer group inline-flex items-center gap-2.5 px-6 py-3.5 text-base sm:text-lg font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors duration-150 whitespace-nowrap"
                          >
                            <Mail
                              className="w-5 h-5 transition-transform duration-200 group-hover:scale-110"
                              aria-hidden="true"
                            />
                            <span>Send an email</span>
                          </motion.a>

                          <motion.a
                            href={DESIGNER_PROFILE.whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -2.5 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.18, ease: EDITORIAL_EASE }}
                            className="cta-shimmer group inline-flex items-center gap-2.5 px-6 py-3.5 text-base sm:text-lg font-semibold text-white bg-[#15803D] hover:bg-[#166534] border border-[#22C55E]/40 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4ADE80] rounded-lg transition-colors duration-150 whitespace-nowrap"
                          >
                            <MessageCircle
                              className="w-5 h-5 transition-transform duration-200 group-hover:scale-110"
                              aria-hidden="true"
                            />
                            <span>WhatsApp</span>
                            <ArrowUpRight
                              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              aria-hidden="true"
                            />
                          </motion.a>
                        </div>
                      </RevealBlock>

                      <RevealBlock y={10} delay={0.24}>
                        <p className="text-center text-sm text-[#A1A1AA]">
                          I respond within 12 hours.
                        </p>
                      </RevealBlock>
                    </div>

                    <div className="mt-16 pt-8 border-t border-[#18181B] flex items-center justify-between gap-4">
                      <motion.button
                        type="button"
                        onClick={() => navigateToPage('home', 'services')}
                        whileHover={{ x: -4 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.18, ease: EDITORIAL_EASE }}
                        className="group inline-flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors cursor-pointer"
                      >
                        <ArrowLeft
                          className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
                          aria-hidden="true"
                        />
                        <span>Previous: Services</span>
                      </motion.button>
                      <motion.button
                        type="button"
                        onClick={() => navigateToPage('home', 'home')}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.18, ease: EDITORIAL_EASE }}
                        className="group inline-flex items-center gap-2 text-sm font-medium text-[#60A5FA] hover:text-[#93C5FD] transition-colors cursor-pointer"
                      >
                        <span>Return Home</span>
                        <ArrowRight
                          className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </motion.button>
                    </div>
                  </div>
                </section>
              </motion.div>
            )}
          </AnimatePresence>
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
              <motion.button
                type="button"
                onClick={() => navigateToPage('home', 'home')}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors cursor-pointer whitespace-nowrap"
              >
                Home
              </motion.button>
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
    </MotionConfig>
  );
}
