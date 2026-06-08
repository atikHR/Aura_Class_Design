"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function LessonProgress() {
  const sections = [
    { label: "Concept", state: "done" },
    { label: "Formula", state: "done" },
    { label: "Example", state: "active" },
    { label: "Doubt Solving", state: "pending" },
    { label: "Practice", state: "pending" },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 glass px-4 py-3 rounded-2xl w-full">
      
      {/* Badges (Mobile Hidden) */}
      <div className="hidden lg:flex items-center gap-2">
         <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-semibold text-indigo-300 border border-indigo-500/30">SSC Physics</span>
         <span className="rounded-full bg-orange-500/20 px-2 py-0.5 text-[10px] font-semibold text-orange-300 border border-orange-500/30">NCTB Aligned</span>
      </div>

      {/* Progress Steps */}
      <div className="flex-1 flex items-center justify-center max-w-2xl w-full">
        {sections.map((section, idx) => (
          <div key={section.label} className="flex items-center w-full">
            <div className="flex flex-col items-center gap-1.5 relative group">
              {/* Node */}
              <div 
                className={`relative z-10 grid h-5 w-5 place-items-center rounded-full border-2 transition-colors duration-300 ${
                  section.state === "done" ? "border-emerald-400 bg-emerald-400" :
                  section.state === "active" ? "border-cyan-400 bg-cyan-900 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" :
                  "border-slate-600 bg-slate-800"
                }`}
              >
                {section.state === "done" && <CheckCircle2 size={10} className="text-slate-900" />}
                {section.state === "active" && <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />}
              </div>
              
              {/* Label */}
              <span className={`absolute top-6 whitespace-nowrap text-[10px] font-medium transition-colors ${
                section.state === "active" ? "text-cyan-300" : 
                section.state === "done" ? "text-emerald-400/80" : "text-slate-500"
              }`}>
                {section.label}
              </span>
            </div>

            {/* Connector Line (Don't draw after last item) */}
            {idx < sections.length - 1 && (
              <div className="h-0.5 flex-1 mx-2 rounded-full overflow-hidden bg-slate-700/50">
                {(section.state === "done") && (
                   <motion.div 
                     initial={{ width: 0 }} 
                     animate={{ width: "100%" }} 
                     className="h-full bg-emerald-400" 
                   />
                )}
                 {section.state === "active" && (
                   <motion.div 
                     initial={{ width: 0 }} 
                     animate={{ width: "35%" }} 
                     className="h-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]" 
                   />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Next Action Button */}
      <button className="hidden sm:flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20 border border-white/5">
        Next: Practice
        <ArrowRight size={14} />
      </button>

    </div>
  );
}