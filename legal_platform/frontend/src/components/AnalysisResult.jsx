import SimilarCaseCard from './SimilarCaseCard';

export default function AnalysisResult({ data }) {
  const analysis = data?.analysis || {};
  const similarCases = data?.similar_cases || [];
  const scores = data?.similarity_scores || [];

  const list = (items, color = 'slate') => (
    <ul className="space-y-2">
      {items?.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm">
          <span className="text-indigo-500 mt-0.5">•</span>
          <span className="text-slate-600 dark:text-slate-400">{item}</span>
        </li>
      ))}
    </ul>
  );

  const cardClass = "rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-5";

  return (
    <div className="space-y-8 animate-in">
      <section>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
          <span className="w-1 h-5 rounded-full bg-indigo-500" />
          Executive Summary
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          {analysis.executive_summary || 'No summary available.'}
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <div className={`${cardClass} border-l-4 border-l-indigo-500/50`}>
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">
            Legal Issues
          </h3>
          {list(analysis.legal_issues)}
          {(!analysis.legal_issues || analysis.legal_issues.length === 0) && (
            <p className="text-sm text-slate-500">None identified</p>
          )}
        </div>
        <div className={`${cardClass} border-l-4 border-l-violet-500/50`}>
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">
            Applicable Statutes
          </h3>
          {list(analysis.applicable_statutes)}
          {(!analysis.applicable_statutes || analysis.applicable_statutes.length === 0) && (
            <p className="text-sm text-slate-500">Review pleadings</p>
          )}
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <div className={`${cardClass} border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20`}>
          <h3 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-3">
            Strengths
          </h3>
          {list(analysis.strengths)}
          {(!analysis.strengths || analysis.strengths.length === 0) && (
            <p className="text-sm text-slate-500">To be developed</p>
          )}
        </div>
        <div className={`${cardClass} border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20`}>
          <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-3">
            Weaknesses
          </h3>
          {list(analysis.weaknesses)}
          {(!analysis.weaknesses || analysis.weaknesses.length === 0) && (
            <p className="text-sm text-slate-500">To be assessed</p>
          )}
        </div>
      </section>

      <section className={cardClass}>
        <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">
          Litigation Risks
        </h3>
        {list(analysis.litigation_risks)}
        {(!analysis.litigation_risks || analysis.litigation_risks.length === 0) && (
          <p className="text-sm text-slate-500">Conduct full risk assessment</p>
        )}
      </section>

      <section className={cardClass}>
        <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">
          Strategic Recommendations
        </h3>
        {list(analysis.strategic_recommendations)}
        {(!analysis.strategic_recommendations || analysis.strategic_recommendations.length === 0) && (
          <p className="text-sm text-slate-500">Develop strategy from full briefing</p>
        )}
      </section>

      <section className="flex flex-wrap gap-4">
        <div className={`${cardClass} min-w-[140px]`}>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Case Viability</p>
          <p className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            {analysis.case_viability_score ?? 0}/100
          </p>
        </div>
        <div className={`${cardClass} min-w-[140px]`}>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Settlement Outlook</p>
          <p className="text-xl font-semibold text-slate-800 dark:text-slate-200">
            {analysis.settlement_outlook || '—'}
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-5 rounded-full bg-violet-500" />
          Similar Cases
        </h2>
        {similarCases.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">
            No similar cases retrieved. Configure case search API or check connectivity.
          </p>
        ) : (
          <div className="space-y-4">
            {similarCases.map((c, i) => (
              <SimilarCaseCard
                key={i}
                case={c}
                score={scores[i]}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
