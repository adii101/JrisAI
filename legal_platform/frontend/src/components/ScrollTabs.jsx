import { useState, useEffect } from 'react';

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'workflow', label: 'How it works' },
  { id: 'features', label: 'Features' },
  { id: 'benefits', label: 'Benefits' },
];

export default function ScrollTabs() {
  const [active, setActive] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActive(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`fixed top-16 left-1/2 -translate-x-1/2 z-30 flex gap-1 p-1.5 rounded-2xl backdrop-blur-xl border transition-all duration-500 ${
        scrolled
          ? 'opacity-100 translate-y-0 bg-white/70 dark:bg-slate-900/70 border-slate-200/60 dark:border-slate-700/60 shadow-lg'
          : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      {SECTIONS.map((s) => (
        <button
          key={s.id}
          onClick={() => scrollTo(s.id)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
            active === s.id
              ? 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-400'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
