"use client";

import { Mic, Send, Lightbulb, TrendingUp, Presentation, Image as ImageIcon, RefreshCcw } from "lucide-react";

export function AskDoubtBox() {
  const quickQuestions = [
    { icon: <RefreshCcw className="h-3 w-3" />, text: "Explain again" },
    { icon: <Lightbulb className="h-3 w-3" />, text: "Give another example" },
    { icon: <ImageIcon className="h-3 w-3" />, text: "Show graph" },
    { icon: <Presentation className="h-3 w-3" />, text: "Practice question" },
  ];

  return (
    <div className="glass mt-4 flex flex-col gap-3 rounded-3xl p-4">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {quickQuestions.map((q, i) => (
          <button 
            key={i} 
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            {q.icon}
            {q.text}
          </button>
        ))}
      </div>
      
      <div className="flex items-end gap-3">
        <div className="relative flex-1">
          <textarea
            placeholder="Ask your doubt during the lesson..."
            className="w-full resize-none rounded-2xl border border-white/20 bg-slate-950/50 p-4 pr-12 text-sm text-white placeholder-slate-400 outline-none transition focus:border-cyan-400/50 focus:bg-slate-900 focus:ring-1 focus:ring-cyan-400/50"
            rows={2}
          />
          <button className="absolute bottom-3 right-3 rounded-xl bg-white/10 p-2 text-cyan-200 transition hover:bg-white/20 hover:text-cyan-100">
            <Mic size={16} />
          </button>
        </div>
        
        <button className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-400 text-slate-900 transition hover:bg-cyan-300 hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
          <Send size={20} className="ml-1" />
        </button>
      </div>
    </div>
  );
}
