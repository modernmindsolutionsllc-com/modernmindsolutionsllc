import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function SectionHeader({ overline, title, subtitle, centered = true, light = false }) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {overline && (
        <span
          className={`inline-block font-body text-sm font-medium tracking-[0.2em] uppercase mb-3 ${
            light ? 'text-amber-200' : 'text-[var(--accent)]'
          }`}
        >
          {overline}
        </span>
      )}
      <h2
        className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight ${
          light ? 'text-white' : 'text-[var(--text-primary)]'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`font-body text-base md:text-lg max-w-2xl leading-relaxed ${
            centered ? 'mx-auto' : ''
          } ${light ? 'text-gray-300' : 'text-[var(--text-secondary)]'}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
