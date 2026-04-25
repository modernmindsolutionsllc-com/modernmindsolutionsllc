import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const techs = [
  { name: 'React', color: '#61DAFB', delay: 0 },
  { name: 'Next.js', color: '#cccccc', delay: 0.4 },
  { name: 'Vue.js', color: '#4FC08D', delay: 0.8 },
  { name: 'Node.js', color: '#68A063', delay: 1.2 },
  { name: 'Python', color: '#3776AB', delay: 0.6 },
  { name: 'TypeScript', color: '#3178C6', delay: 1.0 },
  { name: 'AWS', color: '#FF9900', delay: 0.2 },
  { name: 'Docker', color: '#2496ED', delay: 0.9 },
  { name: 'Figma', color: '#F24E1E', delay: 0.3 },
  { name: 'Three.js', color: '#049EF4', delay: 0.7 },
  { name: 'MongoDB', color: '#47A248', delay: 1.1 },
  { name: 'PostgreSQL', color: '#4169E1', delay: 0.5 },
];

function TechIcon({ tech, index }) {
  const anim = index % 3 === 0
    ? 'animate-[float-1_4s_ease-in-out_infinite]'
    : index % 3 === 1
    ? 'animate-[float-2_5s_ease-in-out_infinite]'
    : 'animate-[float-3_6s_ease-in-out_infinite]';

  return (
    <div className={`group relative ${anim}`} style={{ animationDelay: `${tech.delay}s` }}>
      <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--accent)]/40 hover:shadow-xl hover:shadow-[var(--accent)]/8 flex items-center justify-center transition-all duration-400 cursor-default">
        <span className="font-display text-sm md:text-base font-bold text-center leading-tight px-4" style={{ color: tech.color }}>{tech.name}</span>
      </div>
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3.5 py-2 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] font-body text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        {tech.name}
      </div>
    </div>
  );
}

export default function TechStack() {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <section id="tech-stack" className="py-36 md:py-48 bg-transparent">
      <div className="container">
        <SectionHeader
          overline="Our Toolkit"
          title="Technologies We Master"
          subtitle="Cutting-edge technologies for robust, scalable, future-proof solutions."
        />
        <motion.div
          ref={ref}
          className="flex flex-wrap justify-center gap-6 md:gap-10 max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {techs.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <TechIcon tech={tech} index={i} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
