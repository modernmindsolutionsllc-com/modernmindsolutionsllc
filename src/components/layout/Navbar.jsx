import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-4 backdrop-blur-xl bg-[var(--glass-bg)] border-b border-[var(--glass-border)] shadow-[var(--nav-shadow)]'
            : 'py-6 bg-transparent'
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
                className="h-9 w-auto object-contain"
              />
            </div>
          </a>

          {/* ── Desktop links ── */}
          <div className="hidden lg:flex items-center gap-9">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-[15px] font-medium text-[var(--text-secondary)]
                  hover:text-[var(--accent)] transition-colors duration-200 relative
                  after:content-[''] after:absolute after:bottom-[-4px] after:left-0
                  after:w-0 after:h-[2px] after:bg-[var(--accent)]
                  after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
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
              onClick={() => setMobileOpen(!mobileOpen)}
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
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-display text-3xl font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.07, duration: 0.3 }}
              >
                {link.label}
              </motion.a>
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
