import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function CTABanner() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section
      id="contact"
      className="relative w-full flex flex-col items-center justify-center pt-24 pb-36 md:pt-32 md:pb-48 mt-28 md:mt-40 mb-36 md:mb-48 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <motion.div
        ref={ref}
        className="flex flex-col items-center justify-center text-center w-full max-w-5xl mx-auto mt-12 md:mt-20 px-8 py-16 md:px-14 md:py-20 min-h-[320px] md:min-h-[360px]"
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-7 leading-tight text-center max-w-[22ch] mx-auto w-full flex justify-center">
          Ready to Build Something Extraordinary?
        </h2>
        <p className="font-body text-lg text-[var(--text-secondary)] mb-12 md:mb-14 leading-relaxed text-center max-w-2xl mx-auto w-full flex justify-center">
          Let's turn your vision into a digital reality.
        </p>
        <div className="flex flex-wrap gap-5 justify-center">
          <Button variant="filled" size="lg" href="#" id="cta-start-project">
            Start a Project
          </Button>
          <Button variant="outlined" size="lg" href="#" id="cta-schedule-call">
            Schedule a Call
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
