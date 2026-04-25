import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import Badge from '../ui/Badge';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const posts = [
  {
    title: 'The Future of Web Development in 2026',
    category: 'Development',
    date: 'Apr 15, 2026',
    readTime: '5 min read',
    excerpt: 'Explore the trends shaping the future of web development, from AI-assisted coding to edge computing.',
    color: 'from-amber-400 to-orange-500',
  },
  {
    title: 'Designing for Accessibility: A Complete Guide',
    category: 'Design',
    date: 'Apr 10, 2026',
    readTime: '7 min read',
    excerpt: 'Why accessibility should be a first-class citizen in your design process and how to implement it effectively.',
    color: 'from-orange-400 to-red-500',
  },
  {
    title: 'How AI is Transforming User Experiences',
    category: 'AI',
    date: 'Apr 5, 2026',
    readTime: '6 min read',
    excerpt: 'From personalized recommendations to predictive interfaces — AI is reshaping how users interact with products.',
    color: 'from-yellow-400 to-amber-500',
  },
];

function BlogCard({ post, index }) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <motion.article
      ref={ref}
      className="group rounded-2xl overflow-hidden bg-[var(--card-bg)] border border-[var(--border)] hover:shadow-xl hover:shadow-[var(--accent)]/5 transition-all duration-300 cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {/* Image placeholder */}
      <div className={`aspect-[16/9] bg-gradient-to-br ${post.color} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-all duration-300" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 w-2/3">
            <div className="space-y-1.5">
              <div className="h-1.5 bg-white/30 rounded-full w-full" />
              <div className="h-1.5 bg-white/20 rounded-full w-4/5" />
              <div className="h-1.5 bg-white/20 rounded-full w-3/5" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <Badge>{post.category}</Badge>
          <div className="flex items-center gap-1 text-[var(--text-secondary)]">
            <Clock size={12} />
            <span className="font-body text-xs">{post.readTime}</span>
          </div>
        </div>

        <h3 className="font-display text-lg font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent)] transition-colors">
          {post.title}
        </h3>

        <p className="font-body text-sm text-[var(--text-secondary)] mb-4 leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <span className="font-body text-xs text-[var(--text-secondary)]">{post.date}</span>
          <span className="inline-flex items-center gap-1 font-body text-sm font-medium text-[var(--accent)] group-hover:gap-2 transition-all">
            Read <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function Blog() {
  return (
    <section id="blog" className="py-20 md:py-28 bg-[var(--bg-secondary)]">
      <div className="container">
        <SectionHeader overline="Our Blog" title="Latest Insights" subtitle="Thoughts, tutorials, and perspectives from our team on design, development, and technology." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <BlogCard key={post.title} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
