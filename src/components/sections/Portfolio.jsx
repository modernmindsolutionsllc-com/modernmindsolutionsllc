import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const projects = [
  {
    title: 'Project Alpha',
    subtitle: 'SaaS Dashboard for FinTech',
    description: 'A comprehensive analytics dashboard with real-time data visualization and AI-powered insights for financial institutions.',
    tags: ['React', 'Node.js', 'D3.js', 'PostgreSQL'],
    image: '/images/project-alpha.png',
  },
  {
    title: 'Project Beta',
    subtitle: 'E-Commerce Platform',
    description: 'A high-performance, scalable e-commerce solution with headless architecture and 60fps smooth interactions.',
    tags: ['Next.js', 'Stripe', 'MongoDB', 'Tailwind'],
    image: '/images/project-beta.png',
  },
  {
    title: 'Project Gamma',
    subtitle: 'AI-Powered Analytics Tool',
    description: 'Machine learning platform that transforms raw data into actionable business intelligence with natural language queries.',
    tags: ['Python', 'React', 'TensorFlow', 'AWS'],
    image: '/images/project-gamma.png',
  },
  {
    title: 'Project Delta',
    subtitle: 'Healthcare Patient Portal',
    description: 'A secure, HIPAA-compliant patient portal with real-time appointment scheduling and telemedicine integration.',
    tags: ['React', 'Node.js', 'AWS', 'WebRTC'],
    image: '/images/project-delta.png',
  },
];

function ProjectCard({ project, index }) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer w-full`}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.5, ease: 'easeOut' }}
    >
      {/* Real image */}
      <div className="aspect-[16/10] relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Subtle overlay always visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10
        opacity-0 group-hover:opacity-100 transition-opacity duration-400
        flex flex-col justify-end p-8 items-center text-center"
      >
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-400 flex flex-col items-center w-full">
          <p className="font-body text-xs text-amber-300 mb-1.5 tracking-wide uppercase">{project.subtitle}</p>
          <h3 className="font-display text-2xl font-bold text-white mb-3 flex items-center justify-center gap-2">
            {project.title}
            <ArrowUpRight size={20} className="opacity-60" />
          </h3>
          <p className="font-body text-sm text-gray-300 mb-4 leading-relaxed line-clamp-2 max-w-md mx-auto">{project.description}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 text-xs font-body bg-white/15 backdrop-blur-sm text-white rounded-full border border-white/10">
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
    <section id="portfolio" className="py-24 md:py-36 bg-[var(--bg-primary)]">
      <div className="container">
        <SectionHeader
          overline="Our Work"
          title="Featured Projects"
          subtitle="A selection of our recent work that showcases our expertise in design, development, and problem-solving."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
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
