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
    excerpt: 'Explore the trends shaping the future of web development, from AI-assisted coding to edge computing and beyond.',
    image: '/images/blog-dev.png',
  },
  {
    title: 'Designing for Accessibility: A Complete Guide',
    category: 'Design',
    date: 'Apr 10, 2026',
    readTime: '7 min read',
    excerpt: 'Why accessibility should be a first-class citizen in your design process and how to implement it effectively.',
    image: '/images/blog-design.png',
  },
  {
    title: 'How AI is Transforming User Experiences',
    category: 'AI',
    date: 'Apr 5, 2026',
    readTime: '6 min read',
    excerpt: 'From personalized recommendations to predictive interfaces — AI is reshaping how users interact with products.',
    image: '/images/blog-ai.png',
  },
];

function BlogCard({ post, index }) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <motion.article
      ref={ref}
      className="group rounded-2xl overflow-hidden bg-[var(--card-bg)] border border-[var(--border)]
        hover:shadow-2xl hover:shadow-[var(--accent)]/8 hover:border-[var(--accent)]/30
        transition-all duration-400 cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.5 }}
    >
      {/* Real image */}
      <div className="aspect-[16/9] relative overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="p-7 text-center flex flex-col items-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Badge>{post.category}</Badge>
          <div className="flex items-center justify-center gap-1.5 text-[var(--text-secondary)]">
            <Clock size={13} />
            <span className="font-body text-xs">{post.readTime}</span>
          </div>
        </div>

        <h3 className="font-display text-lg font-bold text-[var(--text-primary)] mb-3 leading-snug group-hover:text-[var(--accent)] transition-colors duration-300">
          {post.title}
        </h3>

        <p className="font-body text-sm text-[var(--text-secondary)] mb-5 leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-center w-full pt-4 border-t border-[var(--border)] relative">
          <span className="font-body text-xs text-[var(--text-secondary)] absolute left-0">{post.date}</span>
          <span className="inline-flex items-center justify-center gap-1.5 font-body text-sm font-medium text-[var(--accent)] group-hover:gap-3 transition-all duration-300">
            Read More <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function Blog() {
  return (
    <section id="blog" className="py-24 md:py-36 bg-[var(--bg-secondary)]">
      <div className="container">
        <SectionHeader overline="Our Blog" title="Latest Insights" subtitle="Thoughts, tutorials, and perspectives from our team on design, development, and technology." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <BlogCard key={post.title} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
