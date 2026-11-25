import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

const FLOATING_MOTES = [
  { id: 1, left: '14%', top: '76%', size: 4, duration: 13, delay: 0, driftX: 24, tint: 'warm' },
  { id: 2, left: '28%', top: '64%', size: 3, duration: 16, delay: 1.8, driftX: -18, tint: 'cool' },
  { id: 3, left: '42%', top: '82%', size: 5, duration: 14, delay: 0.7, driftX: 28, tint: 'warm' },
  { id: 4, left: '56%', top: '72%', size: 3, duration: 18, delay: 2.5, driftX: -22, tint: 'warm' },
  { id: 5, left: '68%', top: '58%', size: 6, duration: 15, delay: 1.1, driftX: 20, tint: 'cool' },
  { id: 6, left: '78%', top: '84%', size: 4, duration: 12, delay: 3.2, driftX: -26, tint: 'warm' },
  { id: 7, left: '86%', top: '44%', size: 3, duration: 17, delay: 0.4, driftX: -16, tint: 'cool' },
  { id: 8, left: '62%', top: '34%', size: 4, duration: 15, delay: 2.1, driftX: 22, tint: 'warm' },
  { id: 9, left: '34%', top: '42%', size: 3, duration: 19, delay: 3.9, driftX: 16, tint: 'cool' },
  { id: 10, left: '91%', top: '68%', size: 5, duration: 14, delay: 1.5, driftX: -20, tint: 'warm' },
] as const;

export function HeroAmbientBackdrop() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothX = useSpring(pointerX, { stiffness: 45, damping: 24, mass: 0.9 });
  const smoothY = useSpring(pointerY, { stiffness: 45, damping: 24, mass: 0.9 });

  const parallaxImgX = useTransform(smoothX, [-0.5, 0.5], [16, -16]);
  const parallaxImgY = useTransform(smoothY, [-0.5, 0.5], [12, -12]);
  const parallaxBeamX = useTransform(smoothX, [-0.5, 0.5], [-24, 24]);
  const parallaxBeamY = useTransform(smoothY, [-0.5, 0.5], [-16, 16]);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      pointerX.set(nx);
      pointerY.set(ny);
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [pointerX, pointerY]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[#050811] select-none"
    >
      {/* Layer 1: Ken Burns animated niche-friendly atelier texture with subtle pointer parallax */}
      <motion.div
        style={{ x: parallaxImgX, y: parallaxImgY }}
        className="absolute -inset-8 will-change-transform"
      >
        <motion.img
          src="/src/assets/images/hero_niche_atelier_1795576887240.jpg"
          alt=""
          referrerPolicy="no-referrer"
          initial={{ scale: 1.08, opacity: 0.82 }}
          animate={{
            scale: [1.05, 1.15, 1.09, 1.05],
            x: [0, -24, 16, 0],
            y: [0, -14, 10, 0],
            opacity: [0.82, 0.94, 0.88, 0.82],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-full h-full object-cover brightness-[1.06] contrast-[1.06] saturate-[1.08] will-change-transform"
        />
      </motion.div>

      {/* Layer 2: Drifting architectural warm amber & cobalt volumetric light rays */}
      <motion.div
        style={{ x: parallaxBeamX, y: parallaxBeamY }}
        className="absolute inset-0 will-change-transform"
      >
        <motion.div
          animate={{
            x: ['-14%', '18%', '-8%', '-14%'],
            opacity: [0.28, 0.5, 0.34, 0.28],
            rotate: [-18, -12, -20, -18],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-1/3 left-1/4 w-[48%] h-[170%] bg-gradient-to-r from-transparent via-[#F59E0B]/22 to-transparent blur-3xl will-change-transform"
        />
        <motion.div
          animate={{
            x: ['18%', '-12%', '12%', '18%'],
            opacity: [0.24, 0.44, 0.3, 0.24],
            rotate: [-24, -18, -26, -24],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -top-1/3 right-0 w-[44%] h-[175%] bg-gradient-to-r from-transparent via-[#3B82F6]/24 to-transparent blur-3xl will-change-transform"
        />
      </motion.div>

      {/* Layer 3: Breathing warm hospitality aura + cobalt studio glow orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 0.96, 1],
          x: [0, -36, 20, 0],
          y: [0, 22, -14, 0],
          opacity: [0.42, 0.68, 0.48, 0.42],
        }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-24 right-[8%] w-[480px] h-[480px] rounded-full bg-[#F59E0B]/18 blur-[110px] will-change-transform"
      />
      <motion.div
        animate={{
          scale: [1.05, 0.94, 1.15, 1.05],
          x: [0, 28, -20, 0],
          y: [0, -24, 16, 0],
          opacity: [0.34, 0.56, 0.4, 0.34],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="absolute -bottom-24 left-[12%] w-[440px] h-[440px] rounded-full bg-[#2563EB]/22 blur-[110px] will-change-transform"
      />

      {/* Layer 4: Slow floating sunlit dust motes / subtle ambient bokeh */}
      <div className="absolute inset-0 overflow-hidden">
        {FLOATING_MOTES.map((mote) => (
          <motion.span
            key={mote.id}
            style={{
              left: mote.left,
              top: mote.top,
              width: mote.size,
              height: mote.size,
            }}
            animate={{
              y: [0, -115, -220],
              x: [0, mote.driftX, mote.driftX * 0.4],
              opacity: [0, 0.78, 0],
              scale: [0.75, 1.35, 0.8],
            }}
            transition={{
              duration: mote.duration,
              delay: mote.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className={`absolute rounded-full blur-[0.5px] will-change-transform ${
              mote.tint === 'warm'
                ? 'bg-[#FCD34D]/80 shadow-[0_0_14px_rgba(251,191,36,0.55)]'
                : 'bg-[#93C5FD]/75 shadow-[0_0_14px_rgba(96,165,250,0.5)]'
            }`}
          />
        ))}
      </div>

      {/* Layer 5: Crisp animated luminous horizon line & balanced contrast scrim */}
      <motion.div
        animate={{
          opacity: [0.28, 0.55, 0.28],
          scaleX: [0.92, 1.04, 0.92],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#60A5FA]/50 to-transparent"
      />

      {/* Keep left headline column crisp while letting background imagery shine vividly */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050811]/72 via-[#050811]/38 to-[#0B1220]/16" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050811]/32 via-transparent to-[#050811]/74" />
    </div>
  );
}
