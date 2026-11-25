import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import type { PageId, SectionId } from '../data/portfolioData';
import { EDITORIAL_EASE } from './MotionPrimitives';

interface NavbarProps {
  activeSection: SectionId;
  onNavigate: (page: PageId, sectionId?: SectionId) => void;
}

const NAV_LINKS: { id: SectionId; page: PageId; label: string; href: string }[] = [
  { id: 'works', page: 'home', label: 'Works', href: '#works' },
  { id: 'services', page: 'home', label: 'Services', href: '#services' },
  { id: 'about', page: 'about', label: 'About', href: '#about' },
  { id: 'guarantees', page: 'about', label: 'Guarantees', href: '#guarantees' },
  { id: 'faq', page: 'about', label: 'FAQ', href: '#faq' },
  { id: 'contact', page: 'about', label: 'Contact', href: '#contact' },
];

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSelect = (page: PageId, sectionId: SectionId) => {
    setMobileOpen(false);
    onNavigate(page, sectionId);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 border-b ${
        scrolled
          ? 'bg-[#05070C]/90 backdrop-blur-md border-[#27272A]'
          : 'bg-[#05070C]/75 backdrop-blur-sm border-[#18181B]'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element Brand Wordmark */}
        <motion.a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleSelect('home', 'home');
          }}
          whileHover={{ x: 1.5 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.18, ease: EDITORIAL_EASE }}
          className="font-display text-lg font-semibold tracking-tight text-[#F4F4F5] hover:text-[#60A5FA] transition-colors duration-150 whitespace-nowrap shrink-0"
        >
          Fortune Allwell
        </motion.a>

        {/* Zone 2: Standalone single-line section links */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-6 lg:gap-7">
          {NAV_LINKS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleSelect(item.page, item.id);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 ${
                  isActive ? 'text-[#60A5FA]' : 'text-[#A1A1AA] hover:text-[#F4F4F5]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="nav-active-underline"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-[#60A5FA] rounded-full"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + mobile menu trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <motion.button
            type="button"
            onClick={() => handleSelect('about', 'contact')}
            whileHover={{ y: -1.5 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18, ease: EDITORIAL_EASE }}
            className="cta-shimmer group hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>Start a Project</span>
            <ArrowUpRight
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </motion.button>

          <motion.button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            whileTap={{ scale: 0.94 }}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#27272A] text-[#F4F4F5] hover:bg-[#141417] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Scroll Progress Hairline */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-[#2563EB] via-[#60A5FA] to-[#93C5FD] pointer-events-none"
      />

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: EDITORIAL_EASE }}
            className="md:hidden border-t border-[#27272A] bg-[#050505] px-5 py-5 space-y-4"
          >
            <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
              {NAV_LINKS.map((item, idx) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.22, delay: idx * 0.035, ease: EDITORIAL_EASE }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSelect(item.page, item.id);
                    }}
                    aria-current={isActive ? 'page' : undefined}
                    className={`py-2.5 text-base font-medium transition-colors ${
                      isActive ? 'text-[#60A5FA]' : 'text-[#E4E4E7] hover:text-[#60A5FA]'
                    }`}
                  >
                    {item.label}
                  </motion.a>
                );
              })}
            </nav>
            <button
              type="button"
              onClick={() => handleSelect('about', 'contact')}
              className="cta-shimmer w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
