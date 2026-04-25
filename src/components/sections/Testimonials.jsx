import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

const testimonials = [
  {
    quote: "ModernMind completely transformed our online presence. Their attention to detail and technical expertise is unmatched. The team delivered a product that exceeded every expectation.",
    name: 'Sarah Chen',
    title: 'CEO',
    company: 'Vertex AI',
    avatar: 'SC',
  },
  {
    quote: "Working with ModernMind was an absolute pleasure. They understood our vision from day one and built a platform that our users love. Our conversion rates jumped 40% after launch.",
    name: 'Marcus Rivera',
    title: 'CTO',
    company: 'NovaTech',
    avatar: 'MR',
  },
  {
    quote: "The team at ModernMind brings a rare combination of design sensibility and engineering excellence. They don't just build websites — they craft experiences that drive real business results.",
    name: 'Aisha Patel',
    title: 'Founder',
    company: 'Streamline',
    avatar: 'AP',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section id="testimonials" className="py-24 md:py-36 bg-[var(--bg-primary)]">
      <div className="container">
        <SectionHeader overline="Testimonials" title="What Clients Say" subtitle="Don't just take our word for it — hear from the teams we've partnered with." />

        <div className="max-w-3xl mx-auto">
          <div className="relative p-10 md:p-14 rounded-3xl bg-[var(--card-bg)] border border-[var(--border)] shadow-lg">
            {/* Decorative quote */}
            <Quote size={56} className="text-[var(--accent)] opacity-15 absolute top-8 left-8" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <p className="font-body text-lg md:text-xl italic text-[var(--text-primary)] leading-[1.8] mb-10 mt-6">
                  "{testimonials[current].quote}"
                </p>

                <div className="flex items-center justify-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent-amber to-accent-orange flex items-center justify-center text-white font-display font-bold text-sm shadow-lg">
                    {testimonials[current].avatar}
                  </div>
                  <div className="text-left">
                    <p className="font-display text-base font-bold text-[var(--text-primary)]">
                      {testimonials[current].name}
                    </p>
                    <p className="font-body text-sm text-[var(--text-secondary)]">
                      {testimonials[current].title}, {testimonials[current].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex items-center justify-center gap-5 mt-10">
              <button onClick={prev} className="w-11 h-11 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300 cursor-pointer" aria-label="Previous testimonial">
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2.5">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)} className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${i === current ? 'bg-[var(--accent)] w-7' : 'bg-[var(--border)] w-2.5'}`} aria-label={`Go to testimonial ${i + 1}`} />
                ))}
              </div>
              <button onClick={next} className="w-11 h-11 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300 cursor-pointer" aria-label="Next testimonial">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
