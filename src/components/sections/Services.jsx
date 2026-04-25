import { motion } from 'framer-motion';
import { Code, Smartphone, Brain, Palette } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'High-performance websites and web apps built for scale and exceptional UX.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Cross-platform apps with React Native and Flutter that feel truly native.',
  },
  {
    icon: Brain,
    title: 'AI & Automation',
    description: 'Smart integrations and ML-powered features that automate your workflow.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'User-centric design systems that convert visitors into loyal customers.',
  },
];

function ServiceCard({ service, index }) {
  const [ref, isVisible] = useScrollAnimation();
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      className="group flex flex-col items-center text-center
        p-10 rounded-2xl
        bg-[var(--card-bg)] border border-[var(--border)]
        hover:border-[var(--accent)]/40
        hover:shadow-2xl hover:shadow-[var(--accent)]/8
        transition-all duration-300"
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
    >
      {/* Icon bubble */}
      <div className="w-16 h-16 rounded-2xl mb-8 flex items-center justify-center
        bg-gradient-to-br from-[var(--accent)]/15 to-[var(--accent)]/5
        group-hover:from-[var(--accent)]/25 group-hover:to-[var(--accent)]/10
        transition-all duration-300"
      >
        <Icon size={28} className="text-[var(--accent)]" strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mb-4 leading-snug">
        {service.title}
      </h3>

      {/* Divider */}
      <div className="w-10 h-0.5 rounded-full bg-[var(--accent)]/30 mb-5" />

      {/* Description */}
      <p className="font-body text-sm text-[var(--text-secondary)] leading-[1.85] max-w-[220px]">
        {service.description}
      </p>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-36 md:py-48 bg-transparent">
      <div className="container">
        <SectionHeader
          overline="What We Do"
          title="Services That Drive Growth"
          subtitle="End-to-end digital solutions tailored to your business."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
