export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-8 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="relative">
        <div className="w-20 h-20 rounded-2xl border-2 border-indigo-200/80 dark:border-indigo-500/30" />
        <div className="absolute inset-0 w-20 h-20 rounded-2xl border-2 border-transparent border-t-indigo-500 animate-spin" />
        <div className="absolute inset-2 w-16 h-16 rounded-xl border-2 border-transparent border-b-violet-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
      </div>
      <div className="text-center space-y-2">
        <p className="font-semibold text-slate-800 dark:text-slate-200 text-lg">
          Analyzing case
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
          Extracting issues, retrieving precedents, computing similarity...
        </p>
      </div>
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}
