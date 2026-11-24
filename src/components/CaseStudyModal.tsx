import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import type { PortfolioProject } from '../data/portfolioData';
import { ResilientImage } from './ResilientImage';
import { EDITORIAL_EASE } from './MotionPrimitives';

interface CaseStudyModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  onInquireSimilar: (project: PortfolioProject) => void;
}

export function CaseStudyModal({
  project,
  onClose,
  onNavigate,
  onInquireSimilar,
}: CaseStudyModalProps) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onNavigate('prev');
      if (event.key === 'ArrowRight') onNavigate('next');
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24, ease: EDITORIAL_EASE }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.34, ease: EDITORIAL_EASE }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0C0C0E] border border-[#27272A] rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 bg-[#0C0C0E]/95 backdrop-blur-md border-b border-[#27272A]">
              <div className="flex items-center gap-2 text-xs text-[#A1A1AA] min-w-0 truncate">
                <span>{project.client}</span>
                <span aria-hidden="true">·</span>
                <span>{project.category}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{project.year}</span>
                <span aria-hidden="true">·</span>
                <span className="font-medium text-white">Concept</span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <motion.button
                  type="button"
                  onClick={() => onNavigate('prev')}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.92 }}
                  aria-label="Previous project"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[#27272A] text-[#E4E4E7] hover:bg-[#18181B] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => onNavigate('next')}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.92 }}
                  aria-label="Next project"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[#27272A] text-[#E4E4E7] hover:bg-[#18181B] transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                <motion.button
                  type="button"
                  onClick={onClose}
                  whileHover={{ scale: 1.06, rotate: 90 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ duration: 0.18 }}
                  aria-label="Close case study"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#18181B] text-[#F4F4F5] hover:bg-[#27272A] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Media Showcase & Animated Switch */}
            <AnimatePresence mode="wait">
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease: EDITORIAL_EASE }}
                className="p-6 sm:p-8 space-y-8"
              >
                <div className="overflow-hidden rounded-xl border border-[#27272A] bg-[#050505]">
                  <ResilientImage
                    src={project.image}
                    alt={project.imageAlt}
                    title={project.title}
                    className="w-full h-64 sm:h-96 object-cover"
                  />
                </div>

                {/* Title & Key Outcome */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8 border-b border-[#27272A]">
                  <div className="lg:col-span-2 space-y-3">
                    <h2
                      id="case-study-title"
                      className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F4F4F5]"
                    >
                      {project.title}
                    </h2>
                    <p className="text-base leading-relaxed text-[#A1A1AA]">{project.summary}</p>
                  </div>

                  <div className="space-y-3 lg:pl-6 lg:border-l border-[#27272A]">
                    <div>
                      <div className="text-xs text-[#71717A] mb-1">Role</div>
                      <div className="text-sm font-medium text-[#F4F4F5]">{project.role}</div>
                    </div>
                    <div>
                      <div className="text-xs text-[#71717A] mb-1">Measured Outcome</div>
                      <div className="text-sm font-semibold text-[#60A5FA]">
                        {project.outcomeMetric}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Challenge & Approach */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-[#F4F4F5]">The Challenge</h3>
                    <p className="text-sm leading-relaxed text-[#A1A1AA]">{project.challenge}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-[#F4F4F5]">Design Approach</h3>
                    <p className="text-sm leading-relaxed text-[#A1A1AA]">{project.approach}</p>
                  </div>
                </div>

                {/* Deliverables & Action */}
                <div className="pt-6 border-t border-[#27272A] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <div className="text-xs text-[#71717A] mb-1.5">Key Deliverables</div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#E4E4E7]">
                      {project.deliverables.map((item, idx) => (
                        <span key={item} className="inline-flex items-center gap-3">
                          <span>{item}</span>
                          {idx < project.deliverables.length - 1 && (
                            <span className="text-[#52525B]" aria-hidden="true">
                              ·
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    type="button"
                    onClick={() => onInquireSimilar(project)}
                    whileHover={{ y: -1.5 }}
                    whileTap={{ scale: 0.97 }}
                    className="cta-shimmer group inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Inquire About Similar Work</span>
                    <ArrowUpRight
                      className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
