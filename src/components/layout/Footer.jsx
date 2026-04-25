import { Globe, MessageCircle, GitFork, Palette, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Blog', href: '#blog' },
  { label: 'Careers', href: '#' },
];

const services = [
  { label: 'Web Development', href: '#services' },
  { label: 'Mobile Apps', href: '#services' },
  { label: 'AI & Automation', href: '#services' },
  { label: 'UI/UX Design', href: '#services' },
];

const socials = [
  { icon: Globe, href: '#', label: 'LinkedIn' },
  { icon: MessageCircle, href: '#', label: 'X (Twitter)' },
  { icon: GitFork, href: '#', label: 'GitHub' },
  { icon: Palette, href: '#', label: 'Dribbble' },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border)]">
      <div className="container py-20 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#home" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent-amber to-accent-orange flex items-center justify-center shadow-lg">
                <span className="text-white font-display font-bold text-lg">M</span>
              </div>
              <span className="font-display font-bold text-xl text-[var(--text-primary)]">
                ModernMind
              </span>
            </a>
            <p className="font-body text-sm text-[var(--text-secondary)] mb-8 leading-[1.8] max-w-xs">
              Building digital experiences that move people. Modern solutions for modern challenges.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-[var(--card-bg)] border border-[var(--border)]
                    flex items-center justify-center text-[var(--text-secondary)]
                    hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-200"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-base text-[var(--text-primary)] mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200 flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-base text-[var(--text-primary)] mb-6">Services</h4>
            <ul className="space-y-4">
              {services.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="font-body text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200 flex items-center gap-1 group"
                  >
                    {s.label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-base text-[var(--text-primary)] mb-6">Contact</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-[var(--accent)] mt-0.5 shrink-0" />
                <a href="mailto:hello@modernmind.dev" className="font-body text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
                  hello@modernmind.dev
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-[var(--accent)] mt-0.5 shrink-0" />
                <a href="tel:+1234567890" className="font-body text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[var(--accent)] mt-0.5 shrink-0" />
                <span className="font-body text-sm text-[var(--text-secondary)]">
                  San Francisco, CA<br />United States
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--border)]">
        <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-[var(--text-secondary)]">
            © 2026 ModernMind Solutions LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="font-body text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-body text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
