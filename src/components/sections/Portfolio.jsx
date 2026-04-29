import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const projects = [
  {
    title: 'Project Alpha',
    subtitle: 'SaaS Dashboard · FinTech',
    tags: ['React', 'Node.js', 'D3.js', 'PostgreSQL'],
    image: '/images/project-alpha.png',
  },
  {
    title: 'Project Beta',
    subtitle: 'E-Commerce Platform',
    tags: ['Next.js', 'Stripe', 'MongoDB'],
    image: '/images/project-beta.png',
  },
  {
    title: 'Project Gamma',
    subtitle: 'AI Analytics Tool',
    tags: ['Python', 'React', 'TensorFlow', 'AWS'],
    image: '/images/project-gamma.png',
  },
  {
    title: 'Project Delta',
    subtitle: 'Healthcare Patient Portal',
    tags: ['React', 'Node.js', 'AWS', 'WebRTC'],
    image: '/images/project-delta.png',
  },
];

function ProjectCard({ project, index }) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      className="group relative rounded-2xl overflow-hidden cursor-pointer w-full shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.5, ease: 'easeOut' }}
      whileHover={{
        y: -8,
        scale: 1.015,
        boxShadow: '0 22px 54px rgba(14, 165, 233, 0.18)',
      }}
    >
      <div className="aspect-[16/10] relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10
        opacity-0 group-hover:opacity-100 transition-opacity duration-400
        flex flex-col justify-end p-10 items-center text-center"
      >
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-400 flex flex-col items-center w-full">
          <p className="font-body text-xs text-sky-300 mb-2 tracking-wide uppercase">{project.subtitle}</p>
          <h3 className="font-display text-2xl font-bold text-white mb-5 flex items-center justify-center gap-2">
            {project.title}
            <motion.span
              className="inline-flex opacity-60"
              initial={false}
              whileHover={{ rotate: 45, x: 2, y: -2 }}
              transition={{ type: 'spring', stiffness: 350, damping: 18 }}
            >
              <ArrowUpRight size={20} />
            </motion.span>
          </h3>
          <div className="flex flex-wrap justify-center gap-2.5">
            {project.tags.map((tag) => (
              <span key={tag} className="px-3.5 py-1.5 text-xs font-body bg-white/15 backdrop-blur-sm text-white rounded-full border border-white/10">
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
    <section id="portfolio" className="section bg-transparent pb-16 sm:pb-20 lg:pb-24">
      <div className="container">
        <SectionHeader
          overline="Our Work"
          title="Featured Projects"
          subtitle="A selection of our recent work in design, development, and problem-solving."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10 mb-10 md:mb-12">
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
