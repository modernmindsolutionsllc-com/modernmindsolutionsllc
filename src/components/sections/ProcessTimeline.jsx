import { motion } from 'framer-motion';
import { Search, PenTool, Palette, Code2, TestTube2, Rocket, HeadphonesIcon } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const steps = [
  { icon: Search,          title: 'Discovery',     desc: 'Requirements analysis, stakeholder interviews, and technical feasibility assessment.', duration: '1–2 weeks' },
  { icon: PenTool,         title: 'Architecture',  desc: 'System design, technology selection, and infrastructure planning.',                    duration: '1–2 weeks' },
  { icon: Palette,         title: 'Design',        desc: 'UI/UX design, prototyping, design system creation, and user testing.',                duration: '2–4 weeks' },
  { icon: Code2,           title: 'Development',   desc: 'Agile sprints with continuous integration, code reviews, and demos.',                 duration: '6–12 weeks' },
  { icon: TestTube2,       title: 'Testing',       desc: 'Automated tests, manual QA, performance testing, and security audits.',               duration: '2–3 weeks' },
  { icon: Rocket,          title: 'Deployment',    desc: 'CI/CD setup, staging validation, production release, and monitoring.',                duration: '1 week' },
  { icon: HeadphonesIcon,  title: 'Support',       desc: 'Post-launch monitoring, bug fixes, optimization, and feature iterations.',            duration: 'Ongoing' },
];

/* ───────────────────────── Desktop node (horizontal) ───────────────────────── */
function DesktopNode({ step, index, total, isVisible }) {
  const Icon = step.icon;
  const isLast = index === total - 1;

  return (
    <motion.div
      className="relative flex flex-col items-center flex-1 min-w-0"
      initial={{ opacity: 0, y: 28 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.12 + index * 0.1, duration: 0.5, ease: 'easeOut' }}
    >
      {/* ── Connector line to next node (except last) ── */}
      {!isLast && (
        <div className="absolute top-[26px] left-[calc(50%+26px)] right-0 h-[2px] z-0">
          {/* Track */}
          <div className="absolute inset-0 bg-[var(--border)]" />
          {/* Filled gradient overlay — draws in via scaleX */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] to-[var(--accent)]"
            initial={{ scaleX: 0 }}
            animate={isVisible ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5 + index * 0.15, duration: 0.6, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
          />
          {/* End dot */}
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[7px] h-[7px] rounded-full bg-[var(--accent)] border-2 border-[var(--bg-primary)]"
            initial={{ scale: 0 }}
            animate={isVisible ? { scale: 1 } : {}}
            transition={{ delay: 0.9 + index * 0.15, duration: 0.3 }}
          />
        </div>
      )}

      {/* ── Icon circle with number badge ── */}
      <div className="relative z-10 mb-5">
        <div className="w-[52px] h-[52px] rounded-full border-2 border-[var(--accent)]/40 bg-[var(--card-bg)] flex items-center justify-center
          shadow-[0_0_20px_rgba(56,189,248,0.08)] group-hover:border-[var(--accent)] transition-all duration-300 hover:shadow-[0_0_28px_rgba(56,189,248,0.18)] hover:-translate-y-0.5">
          <Icon size={22} className="text-[var(--accent)]" strokeWidth={1.6} />
        </div>
        {/* Number badge */}
        <span className="absolute -top-1.5 -right-1.5 w-[22px] h-[22px] rounded-full bg-[var(--accent)] text-white text-[10px] font-bold font-display flex items-center justify-center shadow-md shadow-[var(--accent)]/30 border-2 border-[var(--bg-primary)]">
          {index + 1}
        </span>
      </div>

      {/* ── Title ── */}
      <h3 className="font-display text-sm font-bold text-[var(--text-primary)] mb-2 text-center leading-snug">
        {step.title}
      </h3>

      {/* ── Description ── */}
      <p className="font-body text-[11px] text-[var(--text-secondary)] leading-[1.7] text-center max-w-[140px] mb-3">
        {step.desc}
      </p>

      {/* ── Duration pill ── */}
      <span className="font-body text-[10px] font-semibold text-[var(--accent)]">
        {step.duration}
      </span>
    </motion.div>
  );
}

/* ───────────────────────── Mobile node (vertical) ──────────────────────────── */
function MobileNode({ step, index, total, isVisible }) {
  const Icon = step.icon;
  const isLast = index === total - 1;

  return (
    <motion.div
      className="relative flex gap-5"
      initial={{ opacity: 0, x: -18 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.12 + index * 0.09, duration: 0.45 }}
    >
      {/* ── Left rail: icon + connector ── */}
      <div className="relative flex flex-col items-center">
        {/* Icon circle */}
        <div className="relative z-10 w-11 h-11 rounded-full border-2 border-[var(--accent)]/40 bg-[var(--card-bg)] flex items-center justify-center shadow-md shrink-0">
          <Icon size={18} className="text-[var(--accent)]" strokeWidth={1.6} />
          <span className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full bg-[var(--accent)] text-white text-[9px] font-bold font-display flex items-center justify-center border-2 border-[var(--bg-primary)]">
            {index + 1}
          </span>
        </div>
        {/* Vertical connector */}
        {!isLast && (
          <motion.div
            className="w-[2px] flex-1 mt-2 bg-gradient-to-b from-[var(--accent)] to-[var(--border)]"
            initial={{ scaleY: 0 }}
            animate={isVisible ? { scaleY: 1 } : {}}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            style={{ transformOrigin: 'top' }}
          />
        )}
      </div>

      {/* ── Right content ── */}
      <div className={`pb-8 ${isLast ? 'pb-0' : ''}`}>
        <h3 className="font-display text-base font-bold text-[var(--text-primary)] mb-1 leading-snug">
          {step.title}
        </h3>
        <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed mb-2">
          {step.desc}
        </p>
        <span className="font-body text-xs font-semibold text-[var(--accent)]">
          {step.duration}
        </span>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════ Main section ═══════════════════════════════ */
export default function ProcessTimeline() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="process" className="section bg-transparent overflow-hidden" aria-label="Our process">
      <div className="container">
        <SectionHeader
          overline="Our Process"
          title="From Idea to Impact"
          subtitle="A proven 7-step methodology refined across 120+ successful engagements."
        />

        <div ref={ref}>
          {/* ── Desktop horizontal timeline (lg+) ── */}
          <div className="hidden lg:flex items-start gap-0">
            {steps.map((step, i) => (
              <DesktopNode
                key={step.title}
                step={step}
                index={i}
                total={steps.length}
                isVisible={isVisible}
              />
            ))}
          </div>

          {/* ── Mobile / tablet vertical timeline ── */}
          <div className="lg:hidden max-w-md mx-auto">
            {steps.map((step, i) => (
              <MobileNode
                key={step.title}
                step={step}
                index={i}
                total={steps.length}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
