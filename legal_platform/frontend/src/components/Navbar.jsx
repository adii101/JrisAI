import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/50" style={{ boxShadow: '0 1px 0 rgba(255,255,255,0.03)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <span className="font-bold text-white">JurisAI</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="/#workflow" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">How it works</a>
            <a href="/#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Features</a>
            <a href="/#benefits" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Benefits</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/analyze"
              className="hidden sm:inline-flex px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/25"
            >
              Try Free
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-slate-800/60">
            <a href="/#workflow" className="block py-2 text-slate-400 hover:text-white" onClick={() => setMobileOpen(false)}>How it works</a>
            <a href="/#features" className="block py-2 text-slate-400 hover:text-white" onClick={() => setMobileOpen(false)}>Features</a>
            <a href="/#benefits" className="block py-2 text-slate-400 hover:text-white" onClick={() => setMobileOpen(false)}>Benefits</a>
            <Link to="/analyze" className="block py-2 text-indigo-400 font-medium" onClick={() => setMobileOpen(false)}>Try Free</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
