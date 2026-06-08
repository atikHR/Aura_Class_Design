"use client";

import { Clock, Download, LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function LessonTopBar({ isFocusMode, onToggleFocus }: { isFocusMode: boolean, onToggleFocus: () => void }) {
  const [time, setTime] = useState(12 * 60 + 40); // Starts at 12:40

  useEffect(() => {
    const timer = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl p-4 glass xl:px-6">
      
      {/* Left items - Navigation & Title */}
      <div className="flex items-center gap-4">
        {!isFocusMode && (
          <Link 
            href="/subjects/class-7-mathematics" 
            className="flex items-center justify-center rounded-xl bg-white/10 p-2.5 text-white transition hover:bg-white/20"
            title="Back to Subjects"
          >
             <LayoutDashboard size={18} />
          </Link>
        )}
        
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">Classroom Mode</span>
          <h1 className="text-base sm:text-lg font-semibold text-white">Physics: Concept Lecture</h1>
        </div>
      </div>

      {/* Right items - Timer & Controls */}
      <div className="flex items-center gap-3">
        
        {/* Timer */}
        <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-sm font-medium text-slate-300 backdrop-blur-md">
          <Clock size={14} className="text-cyan-400" />
          {formatTime(time)}
        </div>

        {/* Action Buttons */}
        {!isFocusMode && (
          <button className="hidden sm:flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white transition hover:bg-white/10">
            <Settings size={14} />
            <span className="hidden md:inline">Change Teacher</span>
          </button>
        )}
        
        {!isFocusMode && (
           <button className="hidden sm:flex items-center gap-1.5 rounded-xl bg-cyan-400/90 px-3 py-1.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-cyan-300">
             <Download size={14} />
             <span className="hidden md:inline">Notes</span>
           </button>
        )}

        {/* Focus Mode Toggle */}
        <button 
          onClick={onToggleFocus}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
            isFocusMode 
              ? "bg-amber-400 text-amber-950 shadow-[0_0_15px_rgba(251,191,36,0.3)]" 
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          <div className={`h-2 w-2 rounded-full ${isFocusMode ? 'bg-amber-700 animate-pulse' : 'bg-slate-400'}`} />
          {isFocusMode ? "Focus Mode ON" : "Focus Mode"}
        </button>

      </div>
    </div>
  );
}