"use client";

import { Cpu, PenLine } from "lucide-react";

export function PracticePreviewCard() {
  return (
    <div className="mt-4 rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-slate-900/80 to-slate-900/60 p-4 xl:p-5 backdrop-blur-xl shrink-0">
      <div className="flex items-center gap-2 mb-2">
        <span className="flex items-center justify-center rounded-lg bg-indigo-500/20 p-1.5 text-indigo-400">
           <PenLine size={14} />
        </span>
        <h4 className="text-sm font-semibold text-white">Up Next: Quick Practice</h4>
      </div>
      
      <p className="text-sm text-slate-300 mt-2 bg-black/20 p-3 rounded-xl border border-white/5">
        A bike travels 150 meters in 30 seconds. Find its speed.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button className="flex-1 rounded-xl bg-cyan-500 px-3 py-2 text-xs font-semibold text-slate-900 transition hover:bg-cyan-400 shadow-lg shadow-cyan-500/20">
          Try Yourself
        </button>
        <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white transition hover:bg-white/10">
          <Cpu size={14} className="text-cyan-300" />
          Solve with AI
        </button>
      </div>
    </div>
  );
}