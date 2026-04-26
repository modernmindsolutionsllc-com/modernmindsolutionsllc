import { motion } from 'framer-motion';

/**
 * Premium Button component
 * variants: 'filled' | 'outlined' | 'ghost' | 'white' | 'white-outlined'
 * sizes:    'sm' | 'md' | 'lg'
 */
export default function Button({
  children,
  variant = 'filled',
  size = 'md',
  href,
  onClick,
  className = '',
  style: styleProp = {},
  ...props
}) {
  const base = `
    inline-flex items-center justify-center gap-2
    font-body font-bold
    rounded-full
    border border-transparent
    transition-all duration-300 ease-out
    cursor-pointer select-none
    whitespace-nowrap
    leading-none
    shrink-0
    focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2
    focus:ring-offset-[var(--bg)]
  `;

  const variants = {
    filled: `
      bg-gradient-to-r from-[#F5A623] to-[#F15A24]
      text-white
      shadow-[0_10px_28px_rgba(241,90,36,0.28)]
      hover:shadow-[0_14px_36px_rgba(241,90,36,0.38)]
      hover:brightness-110
      active:brightness-95
    `,
    outlined: `
      bg-transparent
      border-[var(--accent)]
      text-[var(--accent)]
      hover:bg-[var(--accent)]
      hover:text-white
      hover:shadow-[0_10px_28px_rgba(245,166,35,0.22)]
      active:brightness-95
    `,
    ghost: `
      bg-transparent
      text-[var(--text-secondary)]
      hover:bg-[var(--card-bg)]
      hover:text-[var(--text-primary)]
    `,
    white: `
      bg-white
      text-[#1A1A2E]
      shadow-[0_10px_28px_rgba(255,255,255,0.18)]
      hover:shadow-[0_14px_36px_rgba(255,255,255,0.25)]
      active:brightness-95
    `,
    'white-outlined': `
      bg-transparent
      border-white/80
      text-white
      hover:bg-white
      hover:text-[#1A1A2E]
      active:brightness-95
    `,
  };

  // Inline styles for size-dependent properties — Tailwind v4 cannot reliably
  // detect dynamically-assembled class names inside JS objects, so padding/height
  // classes were computing to 0px. Using inline styles guarantees correct layout.
  const sizeStyles = {
    sm: { minHeight: '44px', padding: '0 1.75rem', fontSize: '0.875rem' },
    md: { minHeight: '50px', padding: '0 2.25rem', fontSize: '1rem' },
    lg: { minHeight: '56px', padding: '0 2.75rem', fontSize: '1.125rem' },
  };

  const classes = `
    ${base}
    ${variants[variant] ?? variants.filled}
    ${className}
  `;

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      className={classes}
      style={{ ...(sizeStyles[size] ?? sizeStyles.md), ...styleProp }}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </Component>
  );
}