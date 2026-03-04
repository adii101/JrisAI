import { useRef, useEffect, useState } from 'react';

const NODES = [
  { id: '1', label: 'Case Input', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', x: 80, y: 100 },
  { id: '2', label: 'Issue Extraction', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z', x: 240, y: 60 },
  { id: '3', label: 'Precedent Search', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', x: 400, y: 100 },
  { id: '4', label: 'Similarity Rank', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', x: 560, y: 60 },
  { id: '5', label: 'Legal Report', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', x: 720, y: 100 },
];

const CONNECTIONS = [
  { path: 'M 150 100 C 200 100 200 60 170 60' },
  { path: 'M 310 60 C 355 60 355 100 330 100' },
  { path: 'M 470 100 C 515 100 515 60 490 60' },
  { path: 'M 630 60 C 675 60 675 100 650 100' },
];

function Node({ node, isVisible }) {
  return (
    <g transform={`translate(${node.x}, ${node.y})`}>
      <rect
        x="-72"
        y="-32"
        width="144"
        height="64"
        rx="14"
        className="fill-slate-800/90 stroke-slate-600/60"
        style={{
          filter: isVisible ? 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.2))' : 'none',
          transition: 'filter 0.5s ease',
        }}
      />
      <g transform="translate(-48, -22)">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-indigo-400">
          <path strokeLinecap="round" strokeLinejoin="round" d={node.icon} />
        </svg>
      </g>
      <text x="0" y="10" textAnchor="middle" className="fill-slate-200 font-semibold" style={{ fontSize: '13px' }}>
        {node.label}
      </text>
    </g>
  );
}

export default function AIWorkflowSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="workflow" ref={sectionRef} className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center lg:text-left">How it works</h2>
        <p className="text-slate-400 text-base mb-10 sm:mb-14 text-center lg:text-left max-w-2xl">Our AI pipeline from case input to legal report.</p>
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-4xl">
              <div
                className="absolute -inset-px rounded-[26px] opacity-80"
                style={{
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.6), rgba(139,92,246,0.4), rgba(99,102,241,0.5))',
                  filter: 'blur(12px)',
                }}
              />
              <div
                className="relative rounded-3xl bg-slate-900/60 p-8 sm:p-10 lg:p-12 backdrop-blur-sm border border-indigo-500/30 overflow-hidden"
                style={{
                  boxShadow: '0 0 0 1px rgba(99, 102, 241, 0.4), 0 0 40px rgba(99, 102, 241, 0.25), 0 0 80px rgba(139, 92, 246, 0.12), inset 0 1px 0 rgba(255,255,255,0.06)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-violet-500/5 pointer-events-none" />
              <svg viewBox="0 0 800 200" className="w-full h-auto min-h-[280px] sm:min-h-[340px]" style={{ maxHeight: 'none' }}>
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.3" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {CONNECTIONS.map((c, i) => (
                  <path
                    key={i}
                    d={c.path}
                    fill="none"
                    stroke="url(#lineGrad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    filter="url(#glow)"
                    pathLength="1"
                    strokeDasharray="1"
                    strokeDashoffset={visible ? 0 : 1}
                    className="transition-all duration-700 ease-out"
                    style={{ opacity: visible ? 0.95 : 0 }}
                  />
                ))}
                {NODES.map((node) => (
                  <Node key={node.id} node={node} isVisible={visible} />
                ))}
              </svg>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:pl-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-6"
                 style={{ boxShadow: '0 0 40px rgba(16, 185, 129, 0.15)' }}>
              <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              Speed Up Research E2E Using
              <span className="block mt-1 bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                LLM-Powered Knowledge Graphs
              </span>
            </h2>
            <p className="text-slate-400 text-base lg:text-lg leading-relaxed mb-6">
              Our pipeline runs end-to-end: from your case text or document to a structured legal report with precedents and strategy. No manual steps.
            </p>
            <ul className="space-y-3 text-slate-400 text-sm lg:text-base">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                <span><strong className="text-slate-300">Case Input</strong> — Upload a PDF or paste your scenario. The system parses and normalizes the text for analysis.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                <span><strong className="text-slate-300">Issue Extraction</strong> — An LLM identifies legal issues, applicable statutes, and the burden of proof.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                <span><strong className="text-slate-300">Precedent Search & Rank</strong> — We fetch relevant cases via API and rank them by semantic similarity (embeddings + cosine similarity).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                <span><strong className="text-slate-300">Legal Report</strong> — You get a structured report: summary, issues, strengths, risks, recommendations, and a case viability score.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
