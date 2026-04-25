import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useCountUp } from '../../hooks/useCountUp';

const stats = [
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 30, suffix: '+', label: 'Happy Clients' },
  { value: 5, suffix: '+', label: 'Years Experience' },
  { value: 99, suffix: '%', label: 'Satisfaction' },
];

function StatCard({ stat }) {
  const [ref, count] = useCountUp(stat.value, 2000);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center sm:items-start p-5 border-l-2 border-[var(--accent)]/30"
    >
      <span className="font-display text-3xl md:text-4xl font-bold text-[var(--accent)]">
        {count}{stat.suffix}
      </span>
      <span className="font-body text-sm text-[var(--text-secondary)] mt-2">
        {stat.label}
      </span>
    </div>
  );
}

export default function About() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="about" className="py-44 md:py-56 bg-transparent">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Text */}
          <motion.div
            ref={ref}
            className="lg:col-span-7"
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span className="inline-block font-body text-sm font-medium tracking-[0.2em] uppercase text-[var(--accent)] mb-6">
              Who We Are
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[3.25rem] font-bold text-[var(--text-primary)] mb-10 leading-[1.15]">
              Modern Problems Deserve{' '}
              <span className="bg-gradient-to-r from-accent-amber via-accent-orange to-accent-deep bg-clip-text text-transparent">
                Modern Minds
              </span>
            </h2>

            <p className="font-body text-base md:text-lg text-[var(--text-secondary)] leading-[1.85] mb-16">
              We bridge great design and powerful engineering — partnering with startups and enterprises
              to turn ambitious ideas into reality.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <StatCard key={stat.label} stat={stat} />
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            className="lg:col-span-5 lg:mt-28 xl:mt-32"
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/about-team.png"
                alt="ModernMind team collaborating"
                className="w-full h-auto object-cover aspect-[4/3]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute top-5 right-5 grid grid-cols-3 gap-2">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-white/40" />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
