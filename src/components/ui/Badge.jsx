export default function Badge({ children, className = '' }) {
  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-medium font-body rounded-full
        bg-[var(--accent)]/10 text-[var(--accent)]
        ${className}`}
    >
      {children}
    </span>
  );
}
