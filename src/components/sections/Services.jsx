import { motion } from 'framer-motion';
import { Code, Smartphone, Brain, Palette, ArrowRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Custom websites and web applications built for performance, scalability, and exceptional user experience.',
    link: '#',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Cross-platform and native mobile apps using React Native and Flutter that feel truly native.',
    link: '#',
  },
  {
    icon: Brain,
    title: 'AI & Automation',
    description: 'Smart integrations, intelligent chatbots, and ML-powered features that automate and elevate your business.',
    link: '#',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'User-centric design systems and interfaces that delight users and drive measurable conversions.',
    link: '#',
  },
];

function ServiceCard({ service, index }) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      className="group relative p-6 md:p-8 rounded-2xl
        bg-[var(--glass-bg)] backdrop-blur-md
        border border-[var(--border)]
        hover:border-[var(--accent)] hover:shadow-xl hover:shadow-[var(--accent)]/10
        transition-all duration-300 cursor-default"
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-amber/20 to-accent-orange/20
        flex items-center justify-center mb-5 group-hover:from-accent-amber/30 group-hover:to-accent-orange/30 transition-all duration-300"
      >
        <service.icon size={28} className="text-[var(--accent)]" />
      </div>

      {/* Content */}
      <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mb-3">
        {service.title}
      </h3>
      <p className="font-body text-sm text-[var(--text-secondary)] mb-5 leading-relaxed">
        {service.description}
      </p>

      {/* Link */}
      <a
        href={service.link}
        className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-[var(--accent)]
          hover:gap-3 transition-all duration-200"
      >
        Learn More <ArrowRight size={14} />
      </a>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-[var(--bg-primary)]">
      <div className="container">
        <SectionHeader
          overline="What We Do"
          title="Services That Drive Growth"
          subtitle="From concept to deployment, we provide end-to-end digital solutions tailored to your unique business needs."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
