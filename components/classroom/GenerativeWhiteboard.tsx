"use client";

import { motion } from "framer-motion";
import { BookOpen, CheckCircle2, FlaskConical, HelpCircle, Target } from "lucide-react";

type WhiteboardProps = {
  compact?: boolean;
};

export function GenerativeWhiteboard({ compact = false }: WhiteboardProps) {
  return (
    <div className="relative flex h-full min-h-[600px] flex-col overflow-hidden rounded-3xl border border-cyan-200/20 bg-slate-50 text-slate-950 shadow-glow">
      <div className="absolute inset-0 opacity-50 soft-grid" />
      
      {/* Board Header */}
      <div className="relative border-b border-slate-300/70 bg-white/50 px-6 py-4 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
            <span className="flex items-center gap-2"><BookOpen size={16} className="text-sky-600" /> Physics</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span>Motion</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span className="text-slate-800">Speed and Velocity</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-700">Live Board</span>
            <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-sky-800">Writing...</span>
          </div>
        </div>
      </div>

      {/* Board Content */}
      <div className="relative flex-1 overflow-y-auto p-6 md:p-8">
        <div className="mx-auto max-w-4xl space-y-10">
          
          {/* Topic Title */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Speed and Velocity</h2>
          </motion.div>

          {/* Definition */}
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }} className="space-y-3">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-700">
              <FlaskConical size={20} className="text-purple-600" />
              Definition
            </h3>
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 text-lg shadow-sm">
              <p><strong className="text-slate-900">Speed</strong> tells us how fast an object moves.</p>
              <p className="mt-2"><strong className="text-slate-900">Velocity</strong> tells us speed <span className="text-sky-600 underline decoration-sky-300 decoration-2 underline-offset-4">with direction</span>.</p>
            </div>
          </motion.section>

          {/* Formula */}
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }} className="space-y-3">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-700">
              <CheckCircle2 size={20} className="text-emerald-600" />
              Formula
            </h3>
            <div className="inline-block rounded-2xl bg-slate-900 px-8 py-5 text-2xl font-semibold tracking-wide text-white shadow-lg">
              Speed = Distance / Time
            </div>
          </motion.section>

          {/* Example */}
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.5 }} className="space-y-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-700">
              <Target size={20} className="text-orange-500" />
              Worked Example
            </h3>
            
            <p className="rounded-2xl border border-slate-200 bg-white p-5 text-lg font-medium text-slate-800 shadow-sm">
              A car travels 100 meters in 20 seconds. Find its speed.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-100 p-5">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">Given</p>
                <ul className="space-y-2 font-mono text-lg text-slate-700">
                  <li>Distance (d) = 100 m</li>
                  <li>Time (t) = 20 s</li>
                </ul>
              </div>

              <div className="rounded-2xl bg-sky-50 p-5">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-sky-700">Solution</p>
                <div className="space-y-3 font-mono text-lg text-slate-800">
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.8 }}>Speed = d / t</motion.div>
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.2 }}>Speed = 100 / 20</motion.div>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    transition={{ delay: 2.8 }}
                    className="mt-4 rounded-xl border border-sky-300 bg-white p-3 font-bold text-sky-700 shadow-sm"
                  >
                    Speed = 5 m/s
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Key Idea */}
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.5, duration: 0.5 }}>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-amber-700">
                Key Takeaway
              </p>
              <p className="mt-2 text-lg text-amber-900">
                Speed has no direction, but velocity has direction.
              </p>
            </div>
          </motion.section>

        </div>
      </div>
    </div>
  );
}