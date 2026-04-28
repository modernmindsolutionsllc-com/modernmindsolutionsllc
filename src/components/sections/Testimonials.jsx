import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

const testimonials = [
  {
    quote:
      'ModernMind completely transformed our online presence. Their attention to detail and technical expertise is unmatched.',
    name: 'Sarah Chen',
    title: 'CEO, Vertex AI',
    avatar: 'SC',
  },
  {
    quote:
      'Working with ModernMind was an absolute pleasure. They understood our vision from day one — our conversion rates jumped 40% after launch.',
    name: 'Marcus Rivera',
    title: 'CTO, NovaTech',
    avatar: 'MR',
  },
  {
    quote:
      'A rare combination of design sensibility and engineering excellence. They craft experiences that drive real business results.',
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

  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  const next = () =>
    setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section
      id="testimonials"
      className="section w-full bg-transparent overflow-hidden"
    >
      <div className="container">
        <SectionHeader
          overline="Testimonials"
          title="What Clients Say"
          subtitle="Hear from the teams we've partnered with."
        />

        {/* Card wrapper */}
        <div className="w-full flex justify-center">
          <div className="relative w-full max-w-5xl rounded-3xl bg-[var(--card-bg)] border border-[var(--border)] shadow-lg px-5 py-8 sm:px-10 md:px-16 md:py-14">

            <Quote
              size={48}
              className="text-[var(--accent)] opacity-20 absolute top-8 left-8 md:left-10"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <p className="font-body text-lg md:text-xl italic text-[var(--text-primary)] leading-[1.8] text-center w-full max-w-2xl mx-auto mb-10 px-6 md:px-10">
                  “{testimonials[current].quote}”
                </p>

                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F5A623] to-[#D94F30] flex items-center justify-center text-white font-display font-bold text-sm shadow-lg">
                    {testimonials[current].avatar}
                  </div>

                  <div className="text-center">
                    <p className="font-display text-base md:text-lg font-bold text-[var(--text-primary)]">
                      {testimonials[current].name}
                    </p>

                    <p className="font-body text-sm text-[var(--text-secondary)] mt-1">
                      {testimonials[current].title}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 mt-10">
              <button
                onClick={prev}
                className="w-11 h-11 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex items-center gap-3">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      i === current
                        ? 'bg-[var(--accent)] w-8'
                        : 'bg-[var(--border)] w-2.5'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-11 h-11 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
