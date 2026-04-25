import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function CTABanner() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="contact" className="relative py-28 md:py-36 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent-amber via-accent-orange to-accent-deep" />

      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-3 h-3 rounded-full bg-white/20 animate-[float-1_4s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 rounded-full bg-white/15 animate-[float-2_5s_ease-in-out_infinite]" />
        <div className="absolute top-1/2 right-[15%] w-2 h-2 rounded-full bg-white/25 animate-[float-3_6s_ease-in-out_infinite]" />
      </div>

      <div className="container relative z-10">
        <motion.div
          ref={ref}
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Build Something Extraordinary?
          </h2>
          <p className="font-body text-base md:text-lg text-white/80 mb-10 leading-relaxed">
            Let's turn your vision into a digital reality. Start the conversation today.
          </p>
          <div className="flex flex-wrap gap-5 justify-center">
            <Button variant="white" size="lg" href="#" id="cta-start-project">
              Start a Project
            </Button>
            <Button variant="white-outlined" size="lg" href="#" id="cta-schedule-call">
              Schedule a Call
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
