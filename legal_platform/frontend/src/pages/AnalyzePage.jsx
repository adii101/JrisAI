import { useState } from 'react';
import { Link } from 'react-router-dom';
import { analyzeCase, analyzeCaseFile } from '../services/api';
import CaseInput from '../components/CaseInput';
import LoadingState from '../components/LoadingState';
import AnalysisResult from '../components/AnalysisResult';

export default function AnalyzePage() {
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
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back to Home
        </Link>

        <h1 className="text-3xl font-bold text-white mb-2">
          Case Analysis
        </h1>
        <p className="text-slate-400 mb-8">
          Paste case text or upload a document for legal research and precedent analysis
        </p>

        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/50 backdrop-blur-xl p-6 sm:p-8 mb-8">
          <CaseInput onAnalyze={handleAnalyze} loading={loading} />
        </div>

        {error && (
          <div className="rounded-xl border border-red-900/50 bg-red-950/30 backdrop-blur-xl p-4 text-red-300 flex items-center gap-3 mb-8">
            <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            {error}
          </div>
        )}

        {loading && <LoadingState />}

        {result && !loading && <AnalysisResult data={result} />}
      </div>
    </div>
  );
}
