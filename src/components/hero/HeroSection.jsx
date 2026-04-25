import { Suspense } from 'react';
import { motion } from 'framer-motion';
import ThreeScene from './ThreeScene';
import ScrollIndicator from './ScrollIndicator';
import Button from '../ui/Button';

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{ background: 'var(--gradient-glow), var(--bg-primary)' }}
    >
      <div className="container grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
        {/* Text Content — left 55% */}
        <div className="lg:col-span-7 z-10 text-center lg:text-left">
          <motion.span
            className="inline-block font-body text-sm font-medium tracking-[0.2em] uppercase text-[var(--accent)] mb-4"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Web Solutions That Matter
          </motion.span>

          <motion.h1
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-bold leading-[1.1] text-[var(--text-primary)] mb-6"
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
            className="font-body text-base md:text-lg text-[var(--text-secondary)] max-w-xl mb-8 leading-relaxed mx-auto lg:mx-0"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            We design and develop modern, performant web solutions that help businesses
            stand out, engage users, and grow faster in the digital landscape.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
            custom={3}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <Button variant="filled" size="lg" href="#portfolio" id="hero-cta-primary">
              Explore Our Work
            </Button>
            <Button variant="outlined" size="lg" href="#contact" id="hero-cta-secondary">
              Let's Talk
            </Button>
          </motion.div>
        </div>

        {/* Three.js Visual — right 45% */}
        <motion.div
          className="lg:col-span-5 h-[350px] sm:h-[400px] lg:h-[550px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
        >
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin" />
              </div>
            }
          >
            <ThreeScene />
          </Suspense>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
