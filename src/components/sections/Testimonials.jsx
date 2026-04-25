import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

const testimonials = [
  {
    quote: "ModernMind completely transformed our online presence. Their attention to detail and technical expertise is unmatched.",
    name: 'Sarah Chen',
    title: 'CEO, Vertex AI',
    avatar: 'SC',
  },
  {
    quote: "Working with ModernMind was an absolute pleasure. They understood our vision from day one — our conversion rates jumped 40% after launch.",
    name: 'Marcus Rivera',
    title: 'CTO, NovaTech',
    avatar: 'MR',
  },
  {
    quote: "A rare combination of design sensibility and engineering excellence. They craft experiences that drive real business results.",
    name: 'Aisha Patel',
    title: 'Founder, Streamline',
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
    <section id="testimonials" className="py-36 md:py-48 bg-transparent">
      <div className="container">
        <SectionHeader
          overline="Testimonials"
          title="What Clients Say"
          subtitle="Hear from the teams we've partnered with."
        />

        <div className="max-w-3xl mx-auto">
          <div className="relative p-14 md:p-18 rounded-3xl bg-[var(--card-bg)] border border-[var(--border)] shadow-lg min-h-[280px] flex flex-col justify-center">
            <Quote size={56} className="text-[var(--accent)] opacity-15 absolute top-10 left-10" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <p className="font-body text-lg md:text-xl italic text-[var(--text-primary)] leading-[1.85] mb-12 mt-6">
                  "{testimonials[current].quote}"
                </p>

                <div className="flex items-center justify-center gap-5">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent-amber to-accent-orange flex items-center justify-center text-white font-display font-bold text-sm shadow-lg">
                    {testimonials[current].avatar}
                  </div>
                  <div className="text-left">
                    <p className="font-display text-base font-bold text-[var(--text-primary)]">
                      {testimonials[current].name}
                    </p>
                    <p className="font-body text-sm text-[var(--text-secondary)] mt-1">
                      {testimonials[current].title}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-6 mt-12">
              <button onClick={prev} className="w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300 cursor-pointer" aria-label="Previous">
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-3">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)} className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${i === current ? 'bg-[var(--accent)] w-8' : 'bg-[var(--border)] w-3'}`} aria-label={`Testimonial ${i + 1}`} />
                ))}
              </div>
              <button onClick={next} className="w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300 cursor-pointer" aria-label="Next">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
