import { ChevronDown } from 'lucide-react';

export default function ScrollIndicator() {
  return (
    <a
      href="#clients"
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
      aria-label="Scroll down"
    >
      <span className="font-body text-xs tracking-widest uppercase">Scroll</span>
      <ChevronDown
        size={20}
        className="animate-[bounce-down_2s_ease-in-out_infinite]"
      />
    </a>
  );
}
