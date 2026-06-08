import { ArrowRight, Bot, Camera, CheckCircle2, Mic, Play, Sparkles, WifiOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PricingCard } from "@/components/Cards";
import { Navbar } from "@/components/Navbar";
import { PageTransition } from "@/components/PageTransition";
import { Whiteboard } from "@/components/Whiteboard";
import { pricingPlans } from "@/data/pricing";

const problems = ["Passive video learning", "Expensive tutoring", "Robotic chatbots"];
const solutions = ["AI avatar lecturer", "Generative whiteboard", "Instant doubt solving"];
const features = [
  "Bangla-speaking AI teacher",
  "NCTB curriculum",
  "Real-time interactive voice",
  "Dynamic whiteboard",
  "Instant-solve from textbook photo",
  "Low-data mode"
];

export default function LandingPage() {
  return (
    <PageTransition>
      <Navbar />
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 soft-grid opacity-35" />
        <section className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:pt-24">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
              <Sparkles className="h-4 w-4" />
              Built for SSC/HSC STEM learners
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              AuraClass AI
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              The World&apos;s First Generative 3D Lecturer for Interactive STEM Education
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/onboarding" className="glow-button inline-flex items-center justify-center rounded-full bg-cyan-300 px-6 py-4 font-semibold text-slate-950 transition hover:bg-white">
                Start Learning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/onboarding" className="inline-flex items-center justify-center rounded-full border border-cyan-300/35 bg-cyan-300/10 px-6 py-4 font-semibold text-cyan-50 transition hover:bg-cyan-300 hover:text-slate-950">
                Create Account
              </Link>
              <Link href="/lecturer-room" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-4 font-semibold text-white transition hover:border-cyan-300/50 hover:bg-white/10">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-3 text-center">
              {["3D teacher", "Whiteboard AI", "Low-data"].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-slate-200 backdrop-blur">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-5 rounded-[2rem] bg-cyan-300/15 blur-3xl" />
            <div className="glass relative overflow-hidden rounded-[2rem] p-3">
              <Image
                src="/images/aura-hero-preview.png"
                alt="AuraClass AI product preview"
                width={1280}
                height={720}
                priority
                className="rounded-[1.4rem] object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 grid gap-3 rounded-3xl border border-white/15 bg-slate-950/70 p-4 backdrop-blur-xl md:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-100">Live AI Class</p>
                  <p className="mt-2 text-lg font-semibold text-white">Physics: Motion</p>
                  <p className="mt-1 text-sm text-slate-300">Bangla-friendly explanation</p>
                </div>
                <div className="hidden md:block">
                  <Whiteboard compact />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="glass rounded-3xl p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-fuchsia-100">Problem</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Learning still feels disconnected.</h2>
              <div className="mt-7 grid gap-3">
                {problems.map((problem) => (
                  <div key={problem} className="flex items-center gap-3 rounded-2xl bg-white/5 p-4 text-slate-200">
                    <span className="h-2 w-2 rounded-full bg-fuchsia-300" />
                    {problem}
                  </div>
                ))}
              </div>
            </div>
            <div className="glass rounded-3xl p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-100">Solution</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">A teacher that explains, draws, and responds.</h2>
              <div className="mt-7 grid gap-3">
                {solutions.map((solution) => (
                  <div key={solution} className="flex items-center gap-3 rounded-2xl bg-cyan-300/10 p-4 text-cyan-50">
                    <CheckCircle2 className="h-5 w-5 text-cyan-200" />
                    {solution}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-100">Features</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Premium AI learning stack</h2>
            </div>
            <Link href="/onboarding" className="inline-flex items-center text-sm font-semibold text-cyan-100 hover:text-white">
              Explore curriculum
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = index === 0 ? Mic : index === 4 ? Camera : index === 5 ? WifiOff : Bot;

              return (
                <div key={feature} className="glass rounded-3xl p-5">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300/15 text-cyan-100">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-white">{feature}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">Designed for fast, focused, board-style STEM preparation.</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-100">Subscription Flow</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">One student, one enrolled class</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              ["1", "Choose Class", "Select your current NCTB class."],
              ["2", "Enroll", "Review dynamic class pricing."],
              ["3", "Dashboard", "See only your enrolled class."],
              ["4", "Start AI Lecture", "Open topics from subject accordions."]
            ].map(([step, title, copy]) => (
              <div key={step} className="glass rounded-3xl p-5">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-cyan-300 text-sm font-bold text-slate-950">{step}</span>
                <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing-preview" className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-100">Pricing</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Simple plans for learners and centers</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        </section>

        <footer className="relative border-t border-white/10 px-4 py-10 text-center text-sm text-slate-400 sm:px-6">
          AuraClass AI · Frontend-only investor prototype · Built for interactive STEM education
        </footer>
      </main>
    </PageTransition>
  );
}
