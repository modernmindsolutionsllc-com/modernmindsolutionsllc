import { motion } from 'framer-motion';

export default function Button({ children, variant = 'filled', size = 'md', href, onClick, className = '', ...props }) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2 font-body font-medium rounded-xl
    transition-all duration-300 cursor-pointer relative overflow-hidden
    focus:outline-none focus:ring-2 focus:ring-offset-2
  `;

  const variants = {
    filled: `
      bg-gradient-to-r from-accent-amber via-accent-orange to-accent-deep
      text-white shadow-lg hover:shadow-xl hover:shadow-accent-orange/25
      focus:ring-accent-orange
    `,
    outlined: `
      border-2 border-current bg-transparent
      hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)]
      focus:ring-accent-orange
    `,
    ghost: `
      bg-transparent hover:bg-[var(--bg-secondary)]
      focus:ring-accent-orange
    `,
    white: `
      bg-white text-[#1A1A2E] shadow-lg hover:shadow-xl
      focus:ring-white
    `,
    'white-outlined': `
      border-2 border-white text-white bg-transparent
      hover:bg-white hover:text-[#1A1A2E]
      focus:ring-white
    `,
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${baseStyles} ${variants[variant] || variants.filled} ${sizes[size] || sizes.md} ${className}`;

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </Component>
  );
}
