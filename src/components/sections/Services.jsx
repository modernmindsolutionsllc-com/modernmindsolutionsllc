import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, BriefcaseBusiness, Code, Palette, Settings2, Smartphone } from 'lucide-react';
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
  {
    icon: BriefcaseBusiness,
    title: 'Oracle Fusion HCM Implementation',
    description: 'Structured Oracle Fusion Cloud HCM setup for unified HR processes, data, and employee experiences.',
  },
  {
    icon: Settings2,
    title: 'Oracle Fusion HCM - Managed Services',
    description: 'Ongoing HCM support, optimization, and release-readiness to keep your Oracle environment running smoothly.',
  },
];

function ServiceCard({ service, index }) {
  const [ref, isVisible] = useScrollAnimation();
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      className="group flex h-full min-h-[300px] w-[min(78vw,18rem)] shrink-0 snap-start flex-col items-center text-center
        rounded-2xl p-8 sm:w-[19rem] xl:w-[20rem]
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
      <div className="w-14 h-14 rounded-2xl mb-7 flex items-center justify-center
        bg-gradient-to-br from-[var(--accent)]/15 to-[var(--accent)]/5
        group-hover:from-[var(--accent)]/25 group-hover:to-[var(--accent)]/10
        transition-all duration-300"
      >
        <Icon size={25} className="text-[var(--accent)]" strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h3 className="font-display text-lg font-bold text-[var(--text-primary)] mb-4 leading-snug">
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
  const servicesTrackRef = useRef(null);
  const scrollBarTrackRef = useRef(null);
  const [thumbLeft, setThumbLeft] = useState(0);
  const [thumbWidth, setThumbWidth] = useState(30);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartLeft = useRef(0);

  const computeThumb = useCallback(() => {
    const track = servicesTrackRef.current;
    const bar = scrollBarTrackRef.current;
    if (!track || !bar) return;
    const ratio = track.clientWidth / track.scrollWidth;
    const thumbW = Math.max(ratio * bar.clientWidth, 40);
    const maxScroll = track.scrollWidth - track.clientWidth;
    const progress = maxScroll > 0 ? track.scrollLeft / maxScroll : 0;
    const maxLeft = bar.clientWidth - thumbW;
    setThumbWidth(thumbW);
    setThumbLeft(progress * maxLeft);
  }, []);

  useEffect(() => {
    const track = servicesTrackRef.current;
    if (!track) return;
    computeThumb();
    track.addEventListener('scroll', computeThumb, { passive: true });
    window.addEventListener('resize', computeThumb);
    return () => {
      track.removeEventListener('scroll', computeThumb);
      window.removeEventListener('resize', computeThumb);
    };
  }, [computeThumb]);

  /* Drag the thumb */
  const handleThumbMouseDown = (e) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartLeft.current = thumbLeft;
    e.preventDefault();
  };

  useEffect(() => {
    const onMove = (e) => {
      if (!isDragging.current) return;
      const bar = scrollBarTrackRef.current;
      const track = servicesTrackRef.current;
      if (!bar || !track) return;
      const dx = e.clientX - dragStartX.current;
      const maxLeft = bar.clientWidth - thumbWidth;
      const newLeft = Math.min(Math.max(dragStartLeft.current + dx, 0), maxLeft);
      const progress = maxLeft > 0 ? newLeft / maxLeft : 0;
      track.scrollLeft = progress * (track.scrollWidth - track.clientWidth);
    };
    const onUp = () => { isDragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [thumbWidth]);

  /* Click on the track to jump */
  const handleTrackClick = (e) => {
    const bar = scrollBarTrackRef.current;
    const track = servicesTrackRef.current;
    if (!bar || !track) return;
    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left - thumbWidth / 2;
    const maxLeft = bar.clientWidth - thumbWidth;
    const progress = Math.min(Math.max(clickX / maxLeft, 0), 1);
    track.scrollLeft = progress * (track.scrollWidth - track.clientWidth);
  };

  return (
    <section id="services" className="py-44 md:py-56 bg-transparent">
      <div className="container">
        <SectionHeader
          overline="What We Do"
          title="Services That Drive Growth"
          subtitle="End-to-end digital solutions tailored to your business."
        />

        <div
          ref={servicesTrackRef}
          className="scrollbar-hidden flex snap-x snap-mandatory gap-8 overflow-x-auto pb-4"
        >
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        {/* Custom scroll indicator */}
        <div className="mt-8 flex justify-center">
          <div
            ref={scrollBarTrackRef}
            onClick={handleTrackClick}
            className="service-scrollbar-track"
            role="scrollbar"
            aria-label="Scroll services"
          >
            <div
              className="service-scrollbar-thumb"
              style={{ width: thumbWidth, left: thumbLeft }}
              onMouseDown={handleThumbMouseDown}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
