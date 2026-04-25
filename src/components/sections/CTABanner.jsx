import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function CTABanner() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section
      id="contact"
      className="bg-[var(--bg-secondary)] py-40 md:py-52 mt-24 mb-28 md:mt-32 md:mb-36 border-y border-[var(--border)]"
    >
      <div className="container">
        <motion.div
          ref={ref}
          className="text-center max-w-4xl mx-auto rounded-3xl bg-[var(--card-bg)] border border-[var(--border)] px-8 py-20 md:px-12 md:py-24 shadow-[0_24px_70px_rgba(0,0,0,0.08)]"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-7 leading-tight">
            Ready to Build Something Extraordinary?
          </h2>
          <p className="font-body text-lg text-[var(--text-secondary)] mb-12 md:mb-14 leading-relaxed max-w-2xl mx-auto">
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
      </div>
    </section>
  );
}
