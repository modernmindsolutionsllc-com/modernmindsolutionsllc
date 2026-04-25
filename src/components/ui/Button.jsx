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
    font-body font-bold
    rounded-full
    border border-transparent
    transition-all duration-300 ease-out
    cursor-pointer select-none
    whitespace-nowrap
    leading-none
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

  const sizes = {
    sm: 'min-h-[44px] px-5 text-sm',
    md: 'min-h-[50px] px-7 text-base',
    lg: 'min-h-[56px] px-9 text-lg',
  };

  const classes = `
    ${base}
    ${variants[variant] ?? variants.filled}
    ${sizes[size] ?? sizes.md}
    ${className}
  `;

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      className={classes}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </Component>
  );
}