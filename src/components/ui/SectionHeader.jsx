import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function SectionHeader({ overline, title, subtitle, centered = true, light = false }) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      className={`mb-24 md:mb-32 w-full ${
        centered ? 'flex flex-col items-center text-center' : 'text-left'
      }`}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {overline && (
        <span className={`inline-block font-body text-xs font-semibold tracking-[0.3em] uppercase mb-5 ${
          light ? 'text-amber-200' : 'text-[var(--accent)]'
        }`}>
          {overline}
        </span>
      )}

      <h2 className={`font-display text-3xl md:text-4xl lg:text-[3.25rem] font-bold mb-7 leading-[1.15] ${
        centered ? 'text-center' : 'text-left'
      } ${light ? 'text-white' : 'text-[var(--text-primary)]'}`}>
        {title}
      </h2>

      {subtitle && (
        <p className={`font-body text-base md:text-lg leading-[1.8] ${
          centered ? 'w-full max-w-2xl text-center' : 'max-w-2xl'
        } ${light ? 'text-white/70' : 'text-[var(--text-secondary)]'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
