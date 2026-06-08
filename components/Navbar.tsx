import { ArrowRight, Play, Sparkles } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/55 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-cyan-300 text-slate-950 shadow-glow">
            <Sparkles size={20} />
          </span>
          <span>
            <span className="block text-sm font-semibold text-white">AuraClass AI</span>
            <span className="block text-[11px] text-cyan-100/70">NCTB-ready STEM learning</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-slate-300 md:flex">
          <a href="/#features" className="hover:text-white">Features</a>
          <a href="/#pricing-preview" className="hover:text-white">Pricing</a>
          <Link href="/lecturer-room" className="hover:text-white">Demo Room</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/lecturer-room"
            className="hidden rounded-full border border-white/15 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/60 hover:text-white sm:inline-flex"
          >
            <Play className="mr-2 h-4 w-4" />
            Watch Demo
          </Link>
          <Link
            href="/onboarding"
            className="glow-button inline-flex items-center rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-white"
          >
            Start Learning
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
