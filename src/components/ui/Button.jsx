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
  ...props
}) {
  const base = `
    inline-flex items-center justify-center gap-2
    font-body font-semibold tracking-wide
    rounded-xl border-2 border-transparent
    transition-all duration-250 ease-out
    cursor-pointer select-none
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent)]
  `;

  const variants = {
    filled: `
      bg-gradient-to-r from-[#F5A623] via-[#E8763A] to-[#D94F30]
      border-transparent text-white
      shadow-md hover:shadow-xl hover:shadow-orange-400/30
      hover:brightness-110 active:brightness-95
    `,
    outlined: `
      bg-transparent border-2 border-[var(--accent)] text-[var(--accent)]
      hover:bg-[var(--accent)] hover:text-white
      active:brightness-95
    `,
    ghost: `
      bg-transparent border-transparent text-[var(--text-secondary)]
      hover:bg-[var(--card-bg)] hover:text-[var(--text-primary)]
    `,
    white: `
      bg-white border-transparent text-[#1A1A2E]
      shadow-md hover:shadow-xl hover:shadow-white/20
      active:brightness-95
    `,
    'white-outlined': `
      bg-transparent border-2 border-white text-white
      hover:bg-white hover:text-[#1A1A2E]
      active:brightness-95
    `,
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-7 py-3 text-sm',
    lg: 'px-9 py-4 text-base',
  };

  const classes = `${base} ${variants[variant] ?? variants.filled} ${sizes[size] ?? sizes.md} ${className}`;
  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      className={classes}
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {children}
    </Component>
  );
}
