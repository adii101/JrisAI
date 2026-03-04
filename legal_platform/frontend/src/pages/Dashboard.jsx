import { useState } from 'react';
import { analyzeCase, analyzeCaseFile } from '../services/api';
import CaseInput from '../components/CaseInput';
import LoadingState from '../components/LoadingState';
import AnalysisResult from '../components/AnalysisResult';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (input) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      let data;
      if (input.type === 'file') {
        data = await analyzeCaseFile(input.file);
      } else {
        data = await analyzeCase(input.text);
      }
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="animate-in">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 dark:from-white dark:via-indigo-200 dark:to-white bg-clip-text text-transparent">
          Case Analysis
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-base">
          Enter case text or upload a document for legal research and precedent analysis
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-6 shadow-xl shadow-slate-200/20 dark:shadow-none animate-in" style={{ animationDelay: '0.15s', animationFillMode: 'backwards' }}>
        <CaseInput onAnalyze={handleAnalyze} loading={loading} />
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200/80 dark:border-red-900/50 bg-red-50/80 dark:bg-red-950/30 backdrop-blur-xl p-4 text-red-700 dark:text-red-300 flex items-center gap-3">
          <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      {loading && <LoadingState />}

      {result && !loading && <AnalysisResult data={result} />}
    </div>
  );
}
