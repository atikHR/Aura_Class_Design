"use client";

import { motion } from "framer-motion";
import { Camera, FileText, Save, Sparkles, Upload } from "lucide-react";
import Link from "next/link";
import { PageTransition } from "@/components/PageTransition";
import { Whiteboard } from "@/components/Whiteboard";

export default function InstantSolvePage() {
  return (
    <PageTransition>
      <div className="mb-7">
        <p className="text-sm uppercase tracking-[0.18em] text-cyan-100">Instant Solve</p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Scan a textbook problem</h1>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="space-y-5">
          <div className="glass relative overflow-hidden rounded-3xl p-6">
            <motion.div
              animate={{ y: ["0%", "220%", "0%"] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-6 right-6 top-8 h-1 rounded-full bg-cyan-300 shadow-glow"
            />
            <div className="grid min-h-72 place-items-center rounded-3xl border border-dashed border-cyan-200/35 bg-white/5 p-8 text-center">
              <div>
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-cyan-300/15 text-cyan-100">
                  <Upload size={28} />
                </span>
                <h2 className="mt-5 text-xl font-semibold text-white">Upload or take photo</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">Static prototype flow with a simulated scan.</p>
                <button className="mt-6 rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white">
                  <Camera className="mr-2 inline h-4 w-4" />
                  Choose Photo
                </button>
              </div>
            </div>
          </div>

          <div className="glass rounded-3xl p-5">
            <div className="mb-4 flex items-center gap-3">
              <FileText className="h-5 w-5 text-cyan-100" />
              <h2 className="font-semibold text-white">Detected question</h2>
            </div>
            <p className="rounded-2xl bg-white/5 p-4 text-sm leading-6 text-slate-200">
              A car travels 100 meters in 20 seconds. Find its speed.
            </p>
          </div>
        </section>

        <section className="space-y-5">
          <div className="glass rounded-3xl p-5">
            <div className="mb-4 flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-cyan-100" />
              <h2 className="font-semibold text-white">AI explanation</h2>
            </div>
            <Whiteboard compact />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/lecturer-room" className="rounded-2xl bg-cyan-300 px-5 py-4 text-center text-sm font-semibold text-slate-950 transition hover:bg-white">
              Explain with AI Teacher
            </Link>
            <Link href="/notes" className="rounded-2xl bg-white/10 px-5 py-4 text-center text-sm font-semibold text-white transition hover:bg-white/15">
              <Save className="mr-2 inline h-4 w-4" />
              Save as Notes
            </Link>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
