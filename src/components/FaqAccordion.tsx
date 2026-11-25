import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import type { FaqItem } from '../data/portfolioData';
import { EDITORIAL_EASE } from './MotionPrimitives';

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openId === item.id;
        const buttonId = `${item.id}-trigger`;
        const panelId = `${item.id}-panel`;

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.45,
              delay: idx * 0.04,
              ease: EDITORIAL_EASE,
            }}
            className={`relative rounded-xl border transition-colors duration-200 overflow-hidden backdrop-blur-md ${
              isOpen
                ? 'border-[#3B82F6]/50 bg-[#0B1220]/85 shadow-lg shadow-[#2563EB]/10'
                : 'border-[#27272A] bg-[#080B12]/75 hover:border-[#3F3F46]'
            }`}
          >
            {/* Animated left cobalt indicator on active row */}
            <motion.span
              aria-hidden="true"
              initial={false}
              animate={{
                scaleY: isOpen ? 1 : 0,
                opacity: isOpen ? 1 : 0,
              }}
              transition={{ duration: 0.25, ease: EDITORIAL_EASE }}
              className="absolute left-0 top-0 bottom-0 w-[3px] origin-top bg-gradient-to-b from-[#60A5FA] to-[#2563EB]"
            />

            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(item.id)}
                className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer focus-visible:outline-none group"
              >
                <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 min-w-0">
                  <span
                    className={`font-mono text-xs tabular-nums pt-0.5 sm:pt-0 shrink-0 transition-colors duration-200 ${
                      isOpen ? 'text-[#60A5FA]' : 'text-[#71717A] group-hover:text-[#60A5FA]'
                    }`}
                  >
                    {item.number}
                  </span>
                  <span
                    className={`text-sm sm:text-base font-medium leading-snug transition-colors duration-200 ${
                      isOpen ? 'text-[#F4F4F5]' : 'text-[#E4E4E7] group-hover:text-white'
                    }`}
                  >
                    {item.question}
                  </span>
                </div>

                <motion.span
                  aria-hidden="true"
                  animate={{
                    rotate: isOpen ? 45 : 0,
                    backgroundColor: isOpen ? 'rgba(37, 99, 235, 0.2)' : 'rgba(24, 24, 27, 0.8)',
                    borderColor: isOpen ? 'rgba(96, 165, 250, 0.5)' : 'rgba(63, 63, 70, 0.7)',
                  }}
                  transition={{ duration: 0.24, ease: EDITORIAL_EASE }}
                  className="w-8 h-8 rounded-full border flex items-center justify-center shrink-0 text-[#A1A1AA] group-hover:text-[#F4F4F5]"
                >
                  <Plus className={`w-4 h-4 ${isOpen ? 'text-[#60A5FA]' : ''}`} />
                </motion.span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: 'auto',
                    opacity: 1,
                    transition: {
                      height: { duration: 0.32, ease: EDITORIAL_EASE },
                      opacity: { duration: 0.24, delay: 0.06, ease: EDITORIAL_EASE },
                    },
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: {
                      height: { duration: 0.24, ease: EDITORIAL_EASE },
                      opacity: { duration: 0.16, ease: EDITORIAL_EASE },
                    },
                  }}
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={{ y: -6 }}
                    animate={{ y: 0 }}
                    exit={{ y: -4 }}
                    transition={{ duration: 0.26, ease: EDITORIAL_EASE }}
                    className="px-5 sm:px-6 pb-5 pl-[3.1rem] sm:pl-[3.5rem] pr-6 sm:pr-14"
                  >
                    <div className="pt-1 border-t border-[#1E293B]/70">
                      <p className="pt-3 text-sm leading-relaxed text-[#D4D4D8]">{item.answer}</p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
