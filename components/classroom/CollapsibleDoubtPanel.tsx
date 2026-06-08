"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, ChevronRight, Minimize2, Maximize2 } from "lucide-react";

export function CollapsibleDoubtPanel() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`glass flex flex-col rounded-3xl transition-all duration-300 ${isOpen ? 'w-full xl:w-[320px] 2xl:w-[380px]' : 'w-full xl:w-20'} shrink-0`}>
      <div 
        className="flex items-center justify-between border-b border-white/10 p-4 cursor-pointer xl:cursor-default"
        onClick={() => { if (window.innerWidth < 1280) setIsOpen(!isOpen) }}
      >
        <div className={`flex items-center gap-3 ${!isOpen && 'xl:hidden'}`}>
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-cyan-400/20 text-cyan-300">
            <MessageCircle size={16} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Q&A Panel</h3>
            <p className="text-[10px] text-slate-400">1 active doubt</p>
          </div>
        </div>
        
        {/* Toggle button always visible to show state */}
        <button 
          onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen) }}
          className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white transition"
          title={isOpen ? "Collapse panel" : "Expand panel"}
        >
          {isOpen ? <Minimize2 size={16} /> : <MessageCircle size={20} className="text-cyan-300" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex-1 overflow-hidden"
          >
            <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar">
              
              {/* Student Question */}
              <div className="flex gap-3">
                <div className="h-6 w-6 shrink-0 rounded-full bg-slate-700/50 flex items-center justify-center text-[10px] font-bold text-slate-300 border border-slate-600">
                  You
                </div>
                <div className="rounded-2xl rounded-tl-sm bg-white/10 p-3 backdrop-blur-sm border border-white/5">
                  <p className="text-sm text-slate-100">Why can velocity be negative?</p>
                </div>
              </div>

              {/* AI Answer */}
              <div className="flex gap-3 flex-row-reverse">
                <div className="h-6 w-6 shrink-0 rounded-full bg-cyan-400 flex items-center justify-center text-[10px] font-bold text-slate-900 shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                  AI
                </div>
                <div className="rounded-2xl rounded-tr-sm bg-cyan-900/40 p-3 backdrop-blur-sm border border-cyan-500/20">
                  <p className="text-sm text-cyan-50 leading-relaxed">
                    Velocity can be negative when the object moves opposite to the chosen positive direction. Think of a car backing up!
                  </p>
                </div>
              </div>
              
              {/* Suggestion Chips */}
               <div className="flex flex-col items-end gap-2 pr-9 pt-2">
                 <button className="flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs text-cyan-200 transition hover:bg-cyan-500/20">
                   Give me a real-world example
                   <ChevronRight size={14} />
                 </button>
                 <button className="flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs text-cyan-200 transition hover:bg-cyan-500/20">
                   What about speed?
                   <ChevronRight size={14} />
                 </button>
               </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}