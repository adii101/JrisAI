import { useState } from 'react';

export default function SimilarCaseCard({ case: caseData, score }) {
  const [expanded, setExpanded] = useState(false);
  const c = caseData || {};
  const pct = Math.round((score ?? c.similarity_score ?? 0) * 100);

  return (
    <div className="rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl overflow-hidden hover:border-indigo-300/50 dark:hover:border-indigo-600/30 transition-all duration-300">
      <div
        className="p-5 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
        onClick={() => setExpanded((e) => !e)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 truncate">
              {c.case_name || 'Unknown'}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {c.court || '—'} · {c.year || '—'}
            </p>
          </div>
          <span
            className={`shrink-0 px-3 py-1.5 rounded-xl text-sm font-semibold ${
              pct >= 80
                ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
                : pct >= 60
                ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300'
                : 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300'
            }`}
          >
            {pct}% match
          </span>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">
          {c.summary || ''}
        </p>
        <div className="flex items-center justify-between mt-3">
          {c.source_url && (
            <a
              href={c.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              View source →
            </a>
          )}
          <span className="text-slate-400 text-sm">
            {expanded ? 'Less' : 'More'}
          </span>
        </div>
      </div>
      {expanded && (
        <div className="px-5 pb-5 pt-0 border-t border-slate-200/60 dark:border-slate-700/60">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-3">
            Legal principle
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            {c.legal_principle || '—'}
          </p>
          {c.citation && (
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
              Citation: {c.citation}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
