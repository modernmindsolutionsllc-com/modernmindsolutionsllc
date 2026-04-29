import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Menu,
  X,
  Code2,
  Smartphone,
  Sparkles,
  Palette,
  Briefcase,
  LifeBuoy,
  ArrowRight,
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import Button from '../ui/Button';

const navLinks = [
  { label: 'Home',     href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Work',     href: '#portfolio' },
  { label: 'About',    href: '#about' },
  { label: 'Blog',     href: '#blog' },
  { label: 'Contact',  href: '#contact' },
];

const servicesMenu = [
  {
    title: 'Web Apps',
    icon: Code2,
    description: 'Modern, performant web solutions built on robust frameworks.',
    items: [
      { label: 'ReactJS Development', href: '/services/reactjs-development' },
      { label: 'NodeJS Development', href: '/services/nodejs-development' },
      { label: 'Laravel Development', href: '/services/laravel-development' },
      { label: 'WordPress Development', href: '/services/wordpress-development' },
      { label: 'Shopify Development', href: '/services/shopify-development' },
    ],
  },
  {
    title: 'Mobile Apps',
    icon: Smartphone,
    description: 'Native and cross-platform apps that feel fast everywhere.',
    items: [
      { label: 'React Native Development', href: '/services/react-native-development' },
      { label: 'Flutter App Development', href: '/services/flutter-app-development' },
      { label: 'Ionic App Development', href: '/services/ionic-app-development' },
      { label: 'iOS App Development', href: '/services/ios-app-development' },
      { label: 'Android App Development', href: '/services/android-app-development' },
    ],
  },
  {
    title: 'AI & Automation',
    icon: Sparkles,
    items: [],
  },
  {
    title: 'UI/UX Design',
    icon: Palette,
    items: [],
  },
  {
    title: 'Oracle Fusion HCM Implementation',
    icon: Briefcase,
    items: [],
  },
  {
    title: 'Oracle Fusion HCM — Managed Services',
    icon: LifeBuoy,
    items: [],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || servicesOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen, servicesOpen]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setServicesOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <motion.nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-7 backdrop-blur-xl bg-[var(--glass-bg)] border-b border-[var(--glass-border)] shadow-[var(--nav-shadow)]'
            : 'py-10 bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="container flex items-center justify-between">

          {/* ── Logo ── */}
          <a href="#home" id="nav-logo" className="flex items-center">
            <div className="bg-white rounded-xl px-3 py-2 shadow-sm">
              <img
                src="/images/logo.png"
                alt="ModernMind Solutions LLC"
                className="h-11 w-auto object-contain"
              />
            </div>
          </a>

          {/* ── Desktop links ── */}
          <div className="hidden lg:flex items-center gap-9">
            {navLinks.map((link) => (
              link.label === 'Services' ? (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => setServicesOpen((open) => !open)}
                  aria-expanded={servicesOpen}
                  className="font-body text-[15px] font-medium text-[var(--text-secondary)]
                    hover:text-[var(--accent)] transition-colors duration-200 relative
                    after:content-[''] after:absolute after:bottom-[-4px] after:left-0
                    after:w-0 after:h-[2px] after:bg-[var(--accent)]
                    after:transition-all after:duration-300 hover:after:w-full
                    flex items-center gap-1.5"
                >
                  {link.label}
                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setServicesOpen(false)}
                  className="font-body text-[15px] font-medium text-[var(--text-secondary)]
                    hover:text-[var(--accent)] transition-colors duration-200 relative
                    after:content-[''] after:absolute after:bottom-[-4px] after:left-0
                    after:w-0 after:h-[2px] after:bg-[var(--accent)]
                    after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </a>
              )
            ))}
          </div>

          {/* ── Right actions ── */}
          <div className="hidden lg:flex items-center gap-5">
            <ThemeToggle />
            <Button variant="filled" size="sm" href="#contact" id="nav-cta">
              Get a Quote
            </Button>
          </div>

          {/* ── Mobile toggle ── */}
          <div className="flex lg:hidden items-center gap-3">
            <ThemeToggle />
            <button
              id="mobile-menu-toggle"
              onClick={() => {
                setMobileOpen(!mobileOpen);
                setServicesOpen(false);
              }}
              className="p-2 rounded-lg hover:bg-[var(--card-bg)] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen
                ? <X size={24} className="text-[var(--text-primary)]" />
                : <Menu size={24} className="text-[var(--text-primary)]" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {servicesOpen && !mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] hidden overflow-y-auto bg-[var(--bg-primary)] lg:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {/* Backdrop */}
            <motion.button
              type="button"
              aria-label="Close services menu"
              onClick={() => setServicesOpen(false)}
              className="absolute inset-0 cursor-default bg-[var(--bg-primary)]/80 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />

            {/* Mega panel */}
            <motion.div
              className="absolute inset-0 origin-top overflow-y-auto border-b border-[var(--glass-border)]
                bg-[var(--bg-primary)] shadow-[0_30px_120px_rgba(0,0,0,0.25)]"
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="container relative flex min-h-screen flex-col pt-10 pb-14 xl:pb-16">
                <div className="mb-10 flex items-center justify-between gap-6">
                  <a href="#home" onClick={() => setServicesOpen(false)} className="flex items-center">
                    <div className="bg-white rounded-xl px-3 py-2 shadow-sm">
                      <img
                        src="/images/logo.png"
                        alt="ModernMind Solutions LLC"
                        className="h-9 w-auto object-contain"
                      />
                    </div>
                  </a>
                  <button
                    type="button"
                    aria-label="Close services menu"
                    onClick={() => setServicesOpen(false)}
                    className="group inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--glass-border)] bg-[var(--card-bg)] text-[var(--text-primary)] shadow-[0_18px_45px_rgba(0,0,0,0.18)] transition-all hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="flex flex-col gap-10">
                  {/* Left: intro + CTA */}
                  <motion.div
                    className="grid grid-cols-12 items-end gap-8 border-b border-[var(--border)] pb-10"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12, duration: 0.4, ease: 'easeOut' }}
                  >
                    <div className="col-span-12 xl:col-span-7">
                      <span className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--card-bg)] px-3 py-1 font-body text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
                        <Sparkles size={12} /> What we do
                      </span>
                      <h2 className="mt-5 font-display text-5xl xl:text-6xl font-bold leading-[1.05] text-[var(--text-primary)]">
                        Solutions that <span className="text-[var(--accent)]">scale with you</span>.
                      </h2>
                      <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-[var(--text-secondary)]">
                        From web and mobile to AI automation and Oracle Fusion HCM — pick a focus area and explore the offerings.
                      </p>
                    </div>

                    <div className="col-span-12 xl:col-span-5">
                      <div className="flex min-h-40 items-center justify-between gap-8 rounded-3xl bg-[var(--card-bg)] px-10 py-8 shadow-[0_22px_65px_rgba(0,0,0,0.14)]">
                        <div className="min-w-0 max-w-sm">
                          <p className="font-display text-2xl font-bold leading-tight text-[var(--text-primary)]">
                            Not sure where to start?
                          </p>
                          <p className="mt-3 font-body text-base leading-relaxed text-[var(--text-secondary)]">
                            Book a free 30-minute consult with our team.
                          </p>
                        </div>
                        <a
                          href="#contact"
                          onClick={() => setServicesOpen(false)}
                          className="group/consult inline-flex min-h-16 min-w-64 shrink-0 items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#1fb6ff] to-[#12c8bd] px-14 py-5 font-body text-lg font-bold text-white shadow-[0_18px_42px_-16px_var(--accent)] transition-all hover:-translate-y-0.5 hover:shadow-[0_24px_54px_-18px_var(--accent)]"
                        >
                          Book consult
                          <ArrowRight size={22} className="transition-transform group-hover/consult:translate-x-1" />
                        </a>
                      </div>
                    </div>
                  </motion.div>

                  {/* Right: service cards grid */}
                  <div>
                    <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
                      {servicesMenu.map((service, idx) => {
                        const Icon = service.icon;
                        return (
                          <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.18 + idx * 0.05, duration: 0.35, ease: 'easeOut' }}
                            className="group relative flex min-h-[16.5rem] flex-col gap-4 overflow-hidden rounded-2xl
                              border border-[var(--glass-border)] bg-[linear-gradient(145deg,var(--card-bg),rgba(14,165,233,0.045))] p-8 xl:p-9
                              transition-all duration-300
                              hover:-translate-y-1 hover:border-[var(--accent)]
                              hover:shadow-[0_20px_45px_-22px_var(--accent)]"
                          >
                            <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[var(--accent)]/10 blur-3xl transition-opacity duration-300 group-hover:opacity-90" />
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent
                              via-[var(--accent)]/0 to-transparent transition-all duration-300
                              group-hover:via-[var(--accent)]" />
                            <div className="flex items-start gap-5">
                              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl
                                bg-[var(--accent)]/10 text-[var(--accent)]
                                transition-all duration-300
                                group-hover:bg-[var(--accent)] group-hover:text-white">
                                <Icon size={22} />
                              </span>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-display text-2xl font-bold leading-[1.15] text-[var(--text-primary)]">
                                  {service.title}
                                </h3>
                                <div className="mt-4 h-0.5 w-20 rounded-full bg-[var(--accent)]/70" />
                              </div>
                            </div>

                            {service.items.length > 0 ? (
                              <ul className="mx-auto mt-2 w-full max-w-[20rem] space-y-2">
                                {service.items.map((item) => (
                                  <li key={item.label}>
                                    <a
                                      href={item.href}
                                      onClick={() => setServicesOpen(false)}
                                      className="group/link flex w-full items-center justify-between gap-3 rounded-xl border border-transparent bg-[var(--bg-primary)]/30 px-4 py-3 font-body text-[15px] font-semibold leading-relaxed text-[var(--text-secondary)] transition-all hover:border-[var(--accent)]/35 hover:bg-[var(--accent)]/10 hover:text-[var(--accent)]"
                                    >
                                      <span className="flex items-center gap-3">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]/60 transition-transform group-hover/link:scale-125" />
                                        {item.label}
                                      </span>
                                      <ArrowRight size={14} className="shrink-0 opacity-0 transition-all group-hover/link:translate-x-1 group-hover/link:opacity-100" />
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            ) : null}
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[var(--bg-primary)] flex flex-col items-center justify-center gap-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map((link, i) => (
              link.label === 'Services' ? (
                <motion.div
                  key={link.label}
                  className="w-full max-w-xl px-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.07, duration: 0.3 }}
                >
                  <button
                    type="button"
                    onClick={() => setServicesOpen((open) => !open)}
                    className="mx-auto flex items-center gap-2 font-display text-3xl font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                    aria-expanded={servicesOpen}
                  >
                    {link.label}
                    <ChevronDown
                      size={24}
                      className={`transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        className="mt-6 max-h-[45vh] overflow-y-auto rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-6 text-left"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="grid gap-7 sm:grid-cols-2">
                          {servicesMenu.map((service) => (
                            <div key={service.title}>
                              <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                                {service.title}
                              </h3>
                              <div className="mt-3 h-0.5 w-16 rounded-full bg-[var(--accent)]" />
                              {service.items.length > 0 && (
                                <ul className="mt-4 space-y-3">
                                  {service.items.map((item) => (
                                    <li key={item.label}>
                                      <a
                                        href={item.href}
                                        onClick={() => {
                                          setServicesOpen(false);
                                          setMobileOpen(false);
                                        }}
                                        className="font-body text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                                      >
                                        {item.label}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    setServicesOpen(false);
                    setMobileOpen(false);
                  }}
                  className="font-display text-3xl font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.07, duration: 0.3 }}
                >
                  {link.label}
                </motion.a>
              )
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.07, duration: 0.3 }}
            >
              <Button variant="filled" size="lg" href="#contact" onClick={() => setMobileOpen(false)}>
                Get a Quote
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
