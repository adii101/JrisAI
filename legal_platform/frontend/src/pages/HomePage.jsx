import { Link } from 'react-router-dom';
import AIWorkflowSection from '../components/AIWorkflowSection';

export default function HomePage() {
  return (
    <>
      <section id="hero" className="min-h-screen flex flex-col justify-center pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/25 mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">AI-Powered Legal Research</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            Bring Inhuman Speed
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
              To Legal Research
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
            Simple. Fast. Reliable. Precedent-backed insights in seconds.
          </p>
          <p className="mt-4 text-sm font-medium text-indigo-400">
            Fully Automated Legal Research
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/analyze"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50"
            >
              Start Analyzing
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-slate-600/50 text-slate-300 font-medium hover:bg-white/5 hover:border-slate-500/50 transition-all"
            >
              Explore Features
            </a>
          </div>
        </div>
      </section>

      <AIWorkflowSection />

      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-4">
            Speed Up Research E2E Using
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">AI-Powered Precedent Analysis</span>
          </h2>
          <p className="text-slate-400 text-center max-w-2xl mx-auto mb-16">
            Run fully automated legal research with precedent retrieval and similarity ranking. Get litigation-ready insights at scale.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Automated Legal Issue Extraction', desc: 'AI extracts core legal issues, applicable statutes, and burden of proof from any case text or document.', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
              { title: 'Precedent Retrieval & Similarity', desc: 'Semantic search finds relevant cases. Cosine similarity ranks top precedents with scores and citations.', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
              { title: 'Strategic Litigation Intelligence', desc: 'Strengths, weaknesses, risks, and recommendations. Case viability score and settlement outlook.', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl border border-slate-700/60 bg-slate-900/50 backdrop-blur-xl p-6 hover:border-indigo-500/40 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-4 group-hover:bg-indigo-500/30 transition-colors">
                  <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={f.icon} /></svg>
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-slate-700/60 bg-slate-900/30 backdrop-blur-xl p-8 overflow-hidden">
            <p className="text-center text-base sm:text-lg font-medium text-slate-400 mb-6">
              Enhance your legal research with powerful features
            </p>
            <div className="space-y-4 overflow-hidden">
              <div className="flex gap-3 justify-center flex-nowrap" style={{ animation: 'slideRowLeft 8s ease-in-out infinite' }}>
                {[
                  { tag: 'API Integration', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
                  { tag: 'Precedent Retrieval', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
                  { tag: 'Risk Assessment', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
                  { tag: 'Strategic Recommendations', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
                ].map(({ tag, icon }) => (
                  <span key={tag} className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/60 text-slate-300 text-sm sm:text-base font-medium border border-slate-700/50">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} /></svg>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 justify-center flex-nowrap" style={{ animation: 'slideRowRight 8s ease-in-out infinite' }}>
                {[
                  { tag: 'Case Viability Scoring', icon: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z' },
                  { tag: 'PDF & TXT Support', icon: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
                  { tag: 'Semantic Similarity', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
                  { tag: 'Litigation Insights', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
                ].map(({ tag, icon }) => (
                  <span key={tag} className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/60 text-slate-300 text-sm sm:text-base font-medium border border-slate-700/50">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} /></svg>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-950/40 border-y border-slate-800/40">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-4">
            Unlock Top Speed for Legal Research
          </h2>
          <p className="text-slate-400 text-center max-w-2xl mx-auto mb-16">
            Experience game-changing advantages that boost research speed and reduce manual work, allowing you to scale at top speed.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: 'Efficiency', title: 'Get research done faster without mistakes.', desc: 'Fully automate issue extraction, precedent search, and analysis. No more hours of manual case reading.' },
              { label: 'Accuracy', title: 'Precedent-backed insights every time.', desc: 'Semantic similarity ensures relevant cases. Structured reports with viability scores and recommendations.' },
              { label: 'Scale', title: 'Handle more cases without more headcount.', desc: 'Run verifications at scale. API-ready for integration into your existing workflows.' },
            ].map((b, i) => (
              <div key={i} className="rounded-2xl border border-slate-700/60 bg-slate-900/50 backdrop-blur-xl p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">{b.label}</span>
                <h3 className="font-semibold text-white text-lg mt-2 mb-2">{b.title}</h3>
                <p className="text-slate-400 text-sm">{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/analyze"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/30"
            >
              Start Analyzing Now
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/60 bg-slate-950/30">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Discover JurisAI
          </h2>
          <p className="text-slate-400 mb-6">
            We look forward to connecting with you. Businesses of all sizes welcome.
          </p>
          <a href="mailto:legal@jurisai.com" className="text-indigo-400 font-medium hover:underline">
            legal@jurisai.com
          </a>
          <p className="text-slate-500 text-sm mt-8">
            © JurisAI. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
