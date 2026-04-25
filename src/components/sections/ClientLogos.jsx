const clientNames = [
  'Vertex AI', 'NovaTech', 'Streamline', 'CloudPeak', 'DataForge',
  'QuantumBit', 'Elevate', 'Prismify', 'Nexara', 'ClearPath',
  'SkyBridge', 'CoreSync',
];

function LogoPlaceholder({ name }) {
  return (
    <div className="flex items-center justify-center px-10 py-5 min-w-[180px]
      opacity-30 hover:opacity-100 transition-all duration-400
      grayscale hover:grayscale-0 cursor-default"
    >
      <span className="font-display text-lg font-bold text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export default function ClientLogos() {
  return (
    <section id="clients" className="py-16 md:py-20 bg-[var(--bg-secondary)] border-y border-[var(--border)] overflow-hidden">
      <div className="container mb-8">
        <p className="text-center font-body text-sm tracking-[0.2em] uppercase text-[var(--text-secondary)]">
          Trusted by forward-thinking teams
        </p>
      </div>

      {/* Infinite scroll carousel */}
      <div className="relative">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-r from-[var(--bg-secondary)] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-l from-[var(--bg-secondary)] to-transparent pointer-events-none" />

        <div
          className="flex items-center"
          style={{
            animation: 'scroll-left 35s linear infinite',
            width: 'max-content',
          }}
        >
          {/* Duplicate for seamless loop */}
          {[...clientNames, ...clientNames].map((name, i) => (
            <LogoPlaceholder key={`${name}-${i}`} name={name} />
          ))}
        </div>
      </div>
    </section>
  );
}
