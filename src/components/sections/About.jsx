import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useCountUp } from '../../hooks/useCountUp';

const stats = [
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 30, suffix: '+', label: 'Happy Clients' },
  { value: 5, suffix: '+', label: 'Years of Experience' },
  { value: 99, suffix: '%', label: 'Client Satisfaction' },
];

function StatCard({ stat }) {
  const [ref, count] = useCountUp(stat.value, 2000);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center sm:items-start p-4 border-l-2 border-[var(--accent)]/30"
    >
      <span className="font-display text-3xl md:text-4xl font-bold text-[var(--accent)]">
        {count}{stat.suffix}
      </span>
      <span className="font-body text-sm text-[var(--text-secondary)] mt-1">
        {stat.label}
      </span>
    </div>
  );
}

export default function About() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="about" className="py-20 md:py-28 bg-[var(--bg-secondary)]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text — left 60% */}
          <motion.div
            ref={ref}
            className="lg:col-span-7"
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span className="inline-block font-body text-sm font-medium tracking-[0.2em] uppercase text-[var(--accent)] mb-3">
              Who We Are
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-6 leading-tight">
              Modern Problems Deserve{' '}
              <span className="bg-gradient-to-r from-accent-amber via-accent-orange to-accent-deep bg-clip-text text-transparent">
                Modern Minds
              </span>
            </h2>

            <div className="space-y-4 mb-10">
              <p className="font-body text-base text-[var(--text-secondary)] leading-relaxed">
                At ModernMind Solutions, we believe technology should be invisible yet impactful.
                Our team of designers, developers, and strategists work together to craft digital
                products that are not just functional — they're delightful to use.
              </p>
              <p className="font-body text-base text-[var(--text-secondary)] leading-relaxed">
                Founded with a mission to bridge the gap between great design and powerful
                engineering, we partner with startups and enterprises to turn ambitious ideas
                into reality. From MVPs to enterprise platforms, we've got you covered.
              </p>
              <p className="font-body text-base text-[var(--text-secondary)] leading-relaxed">
                Our approach is simple: understand deeply, design thoughtfully, and build meticulously.
                Every project we take on is a partnership, and every solution we deliver is crafted with care.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {stats.map((stat) => (
                <StatCard key={stat.label} stat={stat} />
              ))}
            </div>
          </motion.div>

          {/* Visual — right 40% */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              {/* Abstract gradient visual */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-amber via-accent-orange to-accent-deep opacity-90" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                    <span className="font-display text-4xl font-bold">M</span>
                  </div>
                  <p className="font-display text-2xl font-bold mb-2">ModernMind</p>
                  <p className="font-body text-sm opacity-80">Building the future, one pixel at a time.</p>
                </div>
              </div>
              {/* Decorative dots */}
              <div className="absolute top-4 right-4 grid grid-cols-3 gap-1.5">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-white/30" />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
