import { useTheme } from '../../hooks/useTheme';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      id="theme-toggle"
      onClick={toggleTheme}
      className="relative w-16 h-8 rounded-full p-1 cursor-pointer
        bg-[var(--bg-secondary)] border border-[var(--border)]
        transition-all duration-300 hover:border-[var(--accent)]
        focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Sliding pill */}
      <div
        className={`absolute top-1 w-6 h-6 rounded-full
          bg-gradient-to-r from-accent-amber to-accent-orange
          shadow-md transition-all duration-300 ease-in-out flex items-center justify-center
          ${isDark ? 'left-[calc(100%-28px)]' : 'left-1'}`}
      >
        {isDark ? (
          <Moon size={14} className="text-white" />
        ) : (
          <Sun size={14} className="text-white" />
        )}
      </div>

      {/* Background icons */}
      <div className="flex items-center justify-between px-1 h-full relative z-0">
        <Sun size={12} className={`transition-opacity duration-300 ${isDark ? 'opacity-40' : 'opacity-0'} text-[var(--text-secondary)]`} />
        <Moon size={12} className={`transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-40'} text-[var(--text-secondary)]`} />
      </div>
    </button>
  );
}
