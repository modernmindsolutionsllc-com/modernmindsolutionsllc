import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const projects = [
  {
    title: 'Project Alpha',
    subtitle: 'SaaS Dashboard for FinTech',
    description: 'A comprehensive analytics dashboard with real-time data visualization and AI-powered insights for financial institutions.',
    tags: ['React', 'Node.js', 'D3.js', 'PostgreSQL'],
    color: 'from-amber-500 to-orange-600',
    span: 'md:col-span-2',
  },
  {
    title: 'Project Beta',
    subtitle: 'E-Commerce Platform',
    description: 'A high-performance, scalable e-commerce solution with headless architecture and 60fps smooth interactions.',
    tags: ['Next.js', 'Stripe', 'MongoDB', 'Tailwind'],
    color: 'from-orange-500 to-red-500',
    span: 'md:col-span-1',
  },
  {
    title: 'Project Gamma',
    subtitle: 'AI-Powered Analytics Tool',
    description: 'Machine learning platform that transforms raw data into actionable business intelligence with natural language queries.',
    tags: ['Python', 'React', 'TensorFlow', 'AWS'],
    color: 'from-yellow-500 to-amber-600',
    span: 'md:col-span-1',
  },
  {
    title: 'Project Delta',
    subtitle: 'Healthcare Patient Portal',
    description: 'A secure, HIPAA-compliant patient portal with real-time appointment scheduling and telemedicine integration.',
    tags: ['React', 'Node.js', 'AWS', 'WebRTC'],
    color: 'from-rose-500 to-orange-500',
    span: 'md:col-span-2',
  },
];

function ProjectCard({ project, index }) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer ${project.span}`}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.5, ease: 'easeOut' }}
    >
      {/* Background */}
      <div className={`aspect-[16/10] bg-gradient-to-br ${project.color} transition-transform duration-500 group-hover:scale-105`}>
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        {/* Centered mock UI */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 w-full max-w-xs">
            <div className="space-y-2">
              <div className="h-2 bg-white/30 rounded-full w-3/4" />
              <div className="h-2 bg-white/20 rounded-full w-full" />
              <div className="h-2 bg-white/20 rounded-full w-2/3" />
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="h-8 bg-white/15 rounded-lg" />
                <div className="h-8 bg-white/15 rounded-lg" />
                <div className="h-8 bg-white/15 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent
        opacity-0 group-hover:opacity-100 transition-opacity duration-300
        flex flex-col justify-end p-6"
      >
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <p className="font-body text-xs text-amber-300 mb-1">{project.subtitle}</p>
          <h3 className="font-display text-xl font-bold text-white mb-2 flex items-center gap-2">
            {project.title}
            <ArrowUpRight size={18} />
          </h3>
          <p className="font-body text-sm text-gray-300 mb-3 line-clamp-2">{project.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 text-xs font-body bg-white/15 text-white rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 md:py-28 bg-[var(--bg-primary)]">
      <div className="container">
        <SectionHeader
          overline="Our Work"
          title="Featured Projects"
          subtitle="A selection of our recent work that showcases our expertise in design, development, and problem-solving."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        <div className="text-center">
          <Button variant="outlined" href="#" id="view-all-projects">
            View All Projects →
          </Button>
        </div>
      </div>
    </section>
  );
}
