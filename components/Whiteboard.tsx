"use client";

import { motion } from "framer-motion";

type WhiteboardProps = {
  compact?: boolean;
  title?: string;
};

const steps = ["Speed = Distance / Time", "Speed = 100 / 20", "Speed = 5 m/s"];

export function Whiteboard({ compact = false, title = "A car travels 100 meters in 20 seconds. Find its speed." }: WhiteboardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-cyan-200/20 bg-slate-50 p-5 text-slate-950 shadow-glow">
      <div className="absolute inset-0 opacity-50 soft-grid" />
      <div className="relative">
        <div className="mb-5 flex items-center justify-between gap-3 border-b border-slate-300/70 pb-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Generative Whiteboard</p>
            <h3 className="mt-1 text-base font-bold text-slate-950">{compact ? "Detected solution" : "Physics: Motion"}</h3>
          </div>
          <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-sky-800">Writing</span>
        </div>
        <p className="rounded-2xl bg-slate-900 px-4 py-3 text-sm leading-6 text-white">{title}</p>
        <div className="mt-5 space-y-3">
          {steps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.28, duration: 0.45 }}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 font-mono text-sm shadow-sm"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cyan-100 text-xs font-bold text-sky-700">{index + 1}</span>
              <span>{step}</span>
            </motion.div>
          ))}
        </div>
        {!compact ? (
          <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs text-slate-600">
            <span className="rounded-xl bg-slate-100 p-2">Distance = 100 m</span>
            <span className="rounded-xl bg-slate-100 p-2">Time = 20 s</span>
            <span className="rounded-xl bg-cyan-100 p-2 font-semibold text-sky-800">Speed = 5 m/s</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
