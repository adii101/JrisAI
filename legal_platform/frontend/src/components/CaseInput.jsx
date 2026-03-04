import { useState, useRef } from 'react';

export default function CaseInput({ onAnalyze, loading, compact }) {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      onAnalyze({ type: 'file', file });
    } else if (text.trim()) {
      onAnalyze({ type: 'text', text: text.trim() });
    }
  };

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    setFile(f || null);
    if (f) setText('');
  };

  const clearFile = () => {
    setFile(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const canSubmit = (text.trim() || file) && !loading;

  return (
    <form onSubmit={handleSubmit} className={compact ? 'space-y-4' : 'space-y-5'}>
      <div>
        {!compact && (
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Case Description or Legal Text
          </label>
        )}
        <textarea
          value={text}
          onChange={(e) => { setText(e.target.value); if (file) clearFile(); }}
          placeholder="Paste case summary, FIR, contract dispute, or legal scenario..."
          rows={compact ? 4 : 6}
          disabled={!!file}
          className="w-full px-4 py-3.5 rounded-xl border border-slate-200/80 dark:border-slate-600/60 bg-white/80 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 dark:focus:border-indigo-500 transition-all duration-300 disabled:opacity-60 resize-none"
        />
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        <div>
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.txt"
            onChange={handleFileChange}
            className="hidden"
            id="case-file"
          />
          <label
            htmlFor="case-file"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300/80 dark:border-slate-600/60 bg-slate-50/80 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all duration-300 text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Upload PDF / TXT
          </label>
        </div>
        {file && (
          <span className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100/80 dark:bg-slate-800/50">
            {file.name}
            <button
              type="button"
              onClick={clearFile}
              className="text-red-500 hover:text-red-600 transition-colors"
            >
              ×
            </button>
          </span>
        )}
      </div>
      <button
        type="submit"
        disabled={!canSubmit}
        className={`w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 disabled:shadow-none ${compact ? 'text-base py-4' : ''}`}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Analyzing...
          </span>
        ) : (
          'Analyze Case'
        )}
      </button>
    </form>
  );
}
