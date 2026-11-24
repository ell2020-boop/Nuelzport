import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react';
import {
  motion,
  animate,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'motion/react';

export const EDITORIAL_EASE = [0.16, 1, 0.3, 1] as const;

interface RevealBlockProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  immediate?: boolean;
}

export function RevealBlock({
  children,
  delay = 0,
  y = 22,
  className = '',
  immediate = false,
}: RevealBlockProps) {
  const prefersReduced = useReducedMotion();
  const outerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(outerRef, { once: true, amount: 0.01 });
  const shouldShow = immediate || isInView;

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={outerRef} className={className}>
      <motion.div
        initial={{ opacity: 0, y }}
        animate={shouldShow ? { opacity: 1, y: 0 } : { opacity: 0, y }}
        transition={{ duration: 0.6, delay: shouldShow ? delay : 0, ease: EDITORIAL_EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}

interface MaskedLineRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  immediate?: boolean;
}

export function MaskedLineReveal({
  children,
  delay = 0,
  className = '',
  immediate = false,
}: MaskedLineRevealProps) {
  const prefersReduced = useReducedMotion();
  const outerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(outerRef, { once: true, amount: 0.01 });
  const shouldShow = immediate || isInView;

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={outerRef} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={shouldShow ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
        transition={{ duration: 0.68, delay: shouldShow ? delay : 0, ease: EDITORIAL_EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}

interface AnimatedMetricValueProps {
  value: string;
  className?: string;
}

export function AnimatedMetricValue({ value, className = '' }: AnimatedMetricValueProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReduced = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const match = value.match(/^([^0-9]*)(\d+)(.*)$/);
    if (!match || prefersReduced) {
      setDisplayValue(value);
      return;
    }

    const [, prefix, numStr, suffix] = match;
    const target = parseInt(numStr, 10);

    if (!isInView) {
      setDisplayValue(`${prefix}0${suffix}`);
      return;
    }

    const controls = animate(0, target, {
      duration: 1.15,
      ease: EDITORIAL_EASE,
      onUpdate: (latest) => {
        setDisplayValue(`${prefix}${Math.round(latest)}${suffix}`);
      },
    });

    return () => controls.stop();
  }, [isInView, prefersReduced, value]);

  return (
    <div ref={ref} className={className}>
      {displayValue}
    </div>
  );
}

interface SpotlightSurfaceProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

export function SpotlightSurface({
  children,
  className = '',
  spotlightColor = 'rgba(59, 130, 246, 0.14)',
}: SpotlightSurfaceProps) {
  const prefersReduced = useReducedMotion();
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);
  const [hovered, setHovered] = useState(false);

  const smoothX = useSpring(mouseX, { stiffness: 320, damping: 32 });
  const smoothY = useSpring(mouseY, { stiffness: 320, damping: 32 });

  const background = useTransform([smoothX, smoothY], ([x, y]) => {
    return `radial-gradient(420px circle at ${x}px ${y}px, ${spotlightColor}, transparent 70%)`;
  });

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (prefersReduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative ${className}`}
    >
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          style={{ background }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
        />
      )}
      {children}
    </div>
  );
}

interface TiltMediaFrameProps {
  children: ReactNode;
  className?: string;
}

export function TiltMediaFrame({ children, className = '' }: TiltMediaFrameProps) {
  const prefersReduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5.5, -5.5]), {
    stiffness: 220,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6.5, 6.5]), {
    stiffness: 220,
    damping: 24,
  });

  const sheenBackground = useTransform([glareX, glareY], ([gx, gy]) => {
    return `radial-gradient(380px circle at ${gx}% ${gy}%, rgba(96, 165, 250, 0.22), transparent 65%)`;
  });

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (prefersReduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(px - 0.5);
    y.set(py - 0.5);
    glareX.set(px * 100);
    glareY.set(py * 100);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    glareX.set(50);
    glareY.set(50);
  };

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.75, delay: 0.14, ease: EDITORIAL_EASE }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1100,
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
      <motion.div
        aria-hidden="true"
        style={{ background: sheenBackground }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.28 }}
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
      />
    </motion.div>
  );
}
