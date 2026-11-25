import { useEffect, useState, type RefObject } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';

interface HeroCodingBackgroundProps {
  sectionRef: RefObject<HTMLElement | null>;
}

const CODE_STREAM_LINES = [
  { top: '14%', left: '6%', width: '16%', delay: 0, duration: 7.5, color: 'bg-[#60A5FA]/45' },
  { top: '21%', left: '12%', width: '24%', delay: 1.2, duration: 9.2, color: 'bg-[#E4E4E7]/30' },
  { top: '29%', left: '4%', width: '19%', delay: 2.1, duration: 8.4, color: 'bg-[#3B82F6]/50' },
  { top: '38%', left: '18%', width: '28%', delay: 0.6, duration: 10.5, color: 'bg-[#60A5FA]/40' },
  { top: '47%', left: '8%', width: '22%', delay: 3.1, duration: 8.8, color: 'bg-[#93C5FD]/35' },
  { top: '56%', left: '14%', width: '30%', delay: 1.7, duration: 9.6, color: 'bg-[#3B82F6]/45' },
  { top: '66%', left: '6%', width: '20%', delay: 2.8, duration: 7.9, color: 'bg-[#E4E4E7]/25' },
  { top: '74%', left: '22%', width: '26%', delay: 0.9, duration: 11.2, color: 'bg-[#60A5FA]/40' },
  { top: '18%', left: '54%', width: '21%', delay: 1.5, duration: 8.6, color: 'bg-[#60A5FA]/45' },
  { top: '32%', left: '62%', width: '25%', delay: 2.6, duration: 9.8, color: 'bg-[#93C5FD]/35' },
  { top: '44%', left: '50%', width: '18%', delay: 0.4, duration: 7.4, color: 'bg-[#3B82F6]/50' },
  { top: '60%', left: '58%', width: '29%', delay: 2.0, duration: 10.4, color: 'bg-[#60A5FA]/40' },
  { top: '72%', left: '64%', width: '20%', delay: 3.4, duration: 8.2, color: 'bg-[#E4E4E7]/25' },
];

const VERTICAL_TRACES = [
  { left: '18%', delay: 0, duration: 6.5 },
  { left: '34%', delay: 2.1, duration: 8.2 },
  { left: '52%', delay: 1.1, duration: 7.4 },
  { left: '71%', delay: 3.0, duration: 9.0 },
  { left: '86%', delay: 0.7, duration: 7.0 },
];

export function HeroCodingBackground({ sectionRef }: HeroCodingBackgroundProps) {
  const prefersReduced = useReducedMotion();
  const [imageError, setImageError] = useState(false);

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(42);
  const pointerPxX = useMotionValue(640);
  const pointerPxY = useMotionValue(280);

  const smoothPercentX = useSpring(mouseX, { stiffness: 90, damping: 24 });
  const smoothPercentY = useSpring(mouseY, { stiffness: 90, damping: 24 });
  const smoothPxX = useSpring(pointerPxX, { stiffness: 180, damping: 28 });
  const smoothPxY = useSpring(pointerPxY, { stiffness: 180, damping: 28 });

  const parallaxX = useTransform(smoothPercentX, [0, 100], [20, -20]);
  const parallaxY = useTransform(smoothPercentY, [0, 100], [15, -15]);
  const tiltY = useTransform(smoothPercentX, [0, 100], [-3, 3]);
  const tiltX = useTransform(smoothPercentY, [0, 100], [2.4, -2.4]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const scrollParallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const spotlightMask = useMotionTemplate`radial-gradient(460px circle at ${smoothPxX}px ${smoothPxY}px, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.55) 45%, transparent 80%)`;
  const cursorAura = useMotionTemplate`radial-gradient(540px circle at ${smoothPxX}px ${smoothPxY}px, rgba(59, 130, 246, 0.3), transparent 72%)`;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || prefersReduced) return;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const relX = event.clientX - rect.left;
      const relY = event.clientY - rect.top;
      pointerPxX.set(relX);
      pointerPxY.set(relY);
      mouseX.set(Math.max(0, Math.min(100, (relX / rect.width) * 100)));
      mouseY.set(Math.max(0, Math.min(100, (relY / rect.height) * 100)));
    };

    el.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => el.removeEventListener('pointermove', handlePointerMove);
  }, [mouseX, mouseY, pointerPxX, pointerPxY, prefersReduced, sectionRef]);

  const backdropSrc = '/src/assets/images/hero_coding_backdrop_1795569521640.jpg';

  if (prefersReduced) {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {!imageError && (
          <img
            src={backdropSrc}
            alt=""
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover opacity-55 brightness-110 contrast-115 saturate-125"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/85 via-[#050505]/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/30 via-transparent to-[#050505]" />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      {/* Layer 1: Scroll + Cursor + Continuous Ken Burns Animated Coding Photo */}
      <motion.div
        style={{
          x: parallaxX,
          y: parallaxY,
          rotateX: tiltX,
          rotateY: tiltY,
          scale: scrollScale,
          transformPerspective: 1200,
        }}
        className="absolute -inset-8 will-change-transform"
      >
        <motion.div
          style={{ y: scrollParallaxY }}
          animate={{
            scale: [1.04, 1.12, 1.07, 1.04],
            x: [0, -16, 12, 0],
            y: [0, 10, -10, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-full h-full will-change-transform"
        >
          {!imageError ? (
            <img
              src={backdropSrc}
              alt=""
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover opacity-75 brightness-115 contrast-115 saturate-125"
            />
          ) : (
            <div className="w-full h-full bg-[radial-gradient(ellipse_at_top_right,#1e3a8a_0%,#09090b_55%,#050505_100%)] opacity-75" />
          )}
        </motion.div>
      </motion.div>

      {/* Layer 2: Interactive Cursor-Illuminated High-Contrast Syntax Layer */}
      {!imageError && (
        <motion.div
          style={{
            x: parallaxX,
            y: parallaxY,
            maskImage: spotlightMask,
            WebkitMaskImage: spotlightMask,
          }}
          className="absolute -inset-8 will-change-transform"
        >
          <motion.img
            src={backdropSrc}
            alt=""
            referrerPolicy="no-referrer"
            animate={{
              scale: [1.04, 1.12, 1.07, 1.04],
              x: [0, -16, 12, 0],
              y: [0, 10, -10, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-full h-full object-cover opacity-95 brightness-135 contrast-125 saturate-150"
          />
        </motion.div>
      )}

      {/* Layer 3: Animated Technical Matrix Grid (GPU-composited transform) */}
      <div className="absolute inset-0 overflow-hidden opacity-75">
        <motion.div
          animate={{
            x: [0, 64],
            y: [0, 64],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(96, 165, 250, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(96, 165, 250, 0.1) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
          className="absolute -inset-16 will-change-transform"
        />
      </div>

      {/* Layer 4: Drifting Syntax Line Pulses & Sweeping Compiler Traces */}
      <div className="absolute inset-0 overflow-hidden">
        {CODE_STREAM_LINES.map((line, index) => (
          <motion.div
            key={index}
            style={{ top: line.top, left: line.left, width: line.width }}
            initial={{ opacity: 0.2, x: -30 }}
            animate={{
              opacity: [0.2, 0.85, 0.3, 0.2],
              x: [-30, 42, 14, -30],
            }}
            transition={{
              duration: line.duration,
              delay: line.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className={`absolute h-[2px] rounded-full ${line.color} blur-[0.3px] will-change-transform`}
          />
        ))}

        {VERTICAL_TRACES.map((trace, index) => (
          <motion.div
            key={index}
            style={{ left: trace.left }}
            initial={{ y: '-25%', opacity: 0 }}
            animate={{
              y: ['-25%', '125%'],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: trace.duration,
              delay: trace.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute top-0 w-[1.5px] h-44 bg-gradient-to-b from-transparent via-[#60A5FA]/80 to-transparent will-change-transform"
          />
        ))}

        {/* Horizontal Kinetic Scanline Sweep */}
        <motion.div
          animate={{
            y: ['-15%', '115%'],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: 7.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-transparent via-[#3B82F6]/18 to-transparent will-change-transform"
        />

        {/* Diagonal Luminous Beam Sweep */}
        <motion.div
          animate={{
            x: ['-40%', '140%'],
            opacity: [0, 0.65, 0],
          }}
          transition={{
            duration: 8.5,
            repeat: Infinity,
            repeatDelay: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute -inset-y-20 w-80 -skew-x-12 bg-gradient-to-r from-transparent via-[#60A5FA]/20 to-transparent will-change-transform"
        />
      </div>

      {/* Layer 5: Cursor-Tracking Cobalt Aura & Subtle Blue Rim Light */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_68%_32%,rgba(37,99,235,0.22),transparent_62%)]" />
      <motion.div style={{ background: cursorAura }} className="absolute inset-0" />

      {/* Layer 6: Balanced Contrast Scrim (black & subtle blue blend while keeping coding image crisp) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/86 via-[#070B14]/45 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/25 via-transparent to-[#050505]/85" />
    </div>
  );
}
