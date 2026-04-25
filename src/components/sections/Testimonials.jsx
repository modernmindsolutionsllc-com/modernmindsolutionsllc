import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

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
      className="w-full py-28 md:py-40 bg-transparent overflow-hidden"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-14 md:mb-20">
          <span className="inline-block font-body text-xs font-semibold tracking-[0.3em] uppercase text-[var(--accent)] mb-5">
            Testimonials
          </span>

          <h2 className="font-display text-3xl md:text-5xl lg:text-[3.25rem] font-bold text-[var(--text-primary)] mb-6 leading-tight">
            What Clients Say
          </h2>

          <p className="font-body text-base md:text-lg text-[var(--text-secondary)] mx-auto max-w-xl leading-[1.8]">
            Hear from the teams we've partnered with.
          </p>
        </div>

        {/* Card wrapper */}
        <div className="w-full flex justify-center">
          <div className="relative w-full max-w-4xl rounded-3xl bg-[var(--card-bg)] border border-[var(--border)] shadow-lg px-6 py-10 sm:px-10 md:px-16 md:py-14">

            <Quote
              size={48}
              className="text-[var(--accent)] opacity-20 absolute top-8 left-8"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="relative z-10"
              >
                <p className="font-body text-lg md:text-xl italic text-[var(--text-primary)] leading-[1.8] text-center max-w-3xl mx-auto mb-10">
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