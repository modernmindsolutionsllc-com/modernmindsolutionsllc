import { Suspense } from 'react';
import { motion } from 'framer-motion';
import ThreeScene from './ThreeScene';
import ScrollIndicator from './ScrollIndicator';
import Button from '../ui/Button';
import { useTheme } from '../../hooks/useTheme';

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.12, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function HeroSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      id="home"
      className={`relative min-h-screen flex items-center overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20 transition-colors duration-500 ${
        isDark ? 'bg-[#050d1a]' : 'bg-[#f8fbff]'
      }`}
    >
      <Suspense fallback={null}>
        <ThreeScene isDark={isDark} />
      </Suspense>

      {/* Theme-aware side fade keeps the headline readable over the globe. */}
      <div
        className={`pointer-events-none absolute inset-0 z-[1] ${
          isDark
            ? 'bg-[radial-gradient(circle_at_70%_48%,rgba(0,201,167,0.14),transparent_32%),linear-gradient(90deg,rgba(5,13,26,0.82)_0%,rgba(5,13,26,0.38)_48%,rgba(5,13,26,0.16)_100%)]'
            : 'bg-[radial-gradient(circle_at_71%_46%,rgba(14,165,233,0.16),transparent_30%),radial-gradient(circle_at_86%_18%,rgba(15,118,110,0.11),transparent_26%),radial-gradient(circle_at_18%_78%,rgba(79,70,229,0.08),transparent_30%),linear-gradient(90deg,rgba(248,251,255,0.97)_0%,rgba(248,251,255,0.78)_43%,rgba(248,251,255,0.24)_100%)]'
        }`}
      />

      <div className="container relative z-10">
        <div className="max-w-4xl text-center lg:text-left">

          <motion.span
            className={`inline-block font-body text-xs font-medium tracking-[0.25em] uppercase mb-8 ${
              isDark ? 'text-sky-200' : 'text-sky-600'
            }`}
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Web Solutions That Matter
          </motion.span>

          <motion.h1
            className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold leading-[1.12] mb-10 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            We Build Digital{' '}
            <span className="bg-gradient-to-r from-accent-amber via-accent-orange to-accent-deep bg-clip-text text-transparent">
              Experiences
            </span>{' '}
            That Move People.
          </motion.h1>

          <motion.p
            className={`font-body text-lg max-w-lg mb-14 leading-[1.85] mx-auto lg:mx-0 ${
              isDark ? 'text-white/70' : 'text-slate-600'
            }`}
            custom={2}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Modern, performant web solutions that help businesses stand out and grow faster.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-5 justify-center lg:justify-start"
            custom={3}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <Button variant="filled" size="lg" href="#portfolio" id="hero-cta-primary">
              Explore Our Work
            </Button>
            <Button
              variant={isDark ? 'white-outlined' : 'outlined'}
              size="lg"
              href="#contact"
              id="hero-cta-secondary"
            >
              Let's Talk
            </Button>
          </motion.div>

        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
