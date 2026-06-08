"use client";

import {
  ArrowRight,
  Atom,
  BookOpen,
  Brain,
  Calculator,
  Camera,
  Check,
  Dna,
  Download,
  FlaskConical,
  MonitorSmartphone,
  Sparkles,
  Star,
  Plus,
  X,
  Calendar
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Chapter, ClassLevel, PricingPlan, Subject, Teacher, Topic } from "@/data/types";
import { ProgressBar } from "./ProgressBar";
import { addRoutine } from "@/lib/studentState";

const iconMap = {
  Calculator,
  Atom,
  FlaskConical,
  Dna,
  MonitorSmartphone,
  Sparkles,
  BookOpen,
  Brain
};

const cardMotion = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 }
};

export function ClassCard({ classLevel }: { classLevel: ClassLevel }) {
  return (
    <motion.div {...cardMotion} whileHover={{ y: -5 }} className="glass rounded-3xl p-5 transition">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/80">NCTB Track</p>
          <h3 className="mt-2 text-xl font-semibold text-white">{classLevel.name}</h3>
          <p className="mt-1 text-sm text-slate-300">{classLevel.subjectCount} subjects · ৳{classLevel.price}/month</p>
        </div>
        {classLevel.recommended ? (
          <span className="rounded-full bg-fuchsia-400/15 px-3 py-1 text-xs font-medium text-fuchsia-100">Recommended</span>
        ) : null}
      </div>
      <div className="mt-7">
        <ProgressBar value={classLevel.progress} label="Progress" />
      </div>
      <Link
        href="/onboarding"
        className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-300 hover:text-slate-950"
      >
        Start Enrollment
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </motion.div>
  );
}

export function SubjectCard({ subject }: { subject: Subject }) {
  const Icon = iconMap[subject.icon as keyof typeof iconMap] ?? BookOpen;
  const [isRoutineModalOpen, setIsRoutineModalOpen] = useState(false);
  const [rDay, setRDay] = useState("Monday");
  const [rStartTime, setRStartTime] = useState("18:00");
  const [rEndTime, setREndTime] = useState("19:00");

  const handleCreateRoutine = (e: React.FormEvent) => {
    e.preventDefault();
    addRoutine({
      id: `routine-${Date.now()}`,
      subjectId: subject.id,
      label: "Regular Study",
      days: [rDay],
      startTime: rStartTime,
      endTime: rEndTime
    });
    setIsRoutineModalOpen(false);
  };

  return (
    <>
      <motion.div {...cardMotion} whileHover={{ y: -5 }} className="glass rounded-3xl p-5">
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300/15 text-cyan-100">
            <Icon size={24} />
          </span>
          <div>
            <h3 className="text-lg font-semibold text-white">{subject.name}</h3>
            <p className="text-sm text-slate-300">{subject.chapterCount} chapters</p>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">{subject.difficulty}</span>
          <span className="text-xs text-cyan-100">AI notes available</span>
        </div>
        <div className="mt-5">
          <ProgressBar value={subject.progress} label="Mastery" />
        </div>
        <div className="mt-6 flex gap-2">
          <button 
            onClick={() => setIsRoutineModalOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            <Plus size={16} /> Routine
          </button>
          <Link
            href={`/subjects/${subject.id}`}
            className="flex-1 inline-flex items-center justify-center rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
          >
            Open Subject
          </Link>
        </div>
      </motion.div>

      <AnimatePresence>
        {isRoutineModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.form 
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              onSubmit={handleCreateRoutine} 
              className="glass w-full max-w-sm rounded-3xl p-6 relative border border-cyan-500/30"
            >
              <button type="button" onClick={() => setIsRoutineModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                <X size={20} />
              </button>
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="text-cyan-400" />
                <h2 className="text-xl font-bold text-white">Create Routine</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Day</label>
                  <select value={rDay} onChange={e => setRDay(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Start Time</label>
                    <input type="time" value={rStartTime} onChange={e => setRStartTime(e.target.value)} required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">End Time</label>
                    <input type="time" value={rEndTime} onChange={e => setREndTime(e.target.value)} required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white" />
                  </div>
                </div>
              </div>
              
              <button type="submit" className="mt-6 w-full rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-900 py-3 font-bold transition shadow-glow">
                Save Routine
              </button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function ChapterCard({ chapter, classId }: { chapter: Chapter; classId: string }) {
  return (
    <motion.div {...cardMotion} whileHover={{ y: -5 }} className="glass rounded-3xl p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold text-white">{chapter.title}</h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">{chapter.description}</p>
        </div>
        <span className="rounded-full bg-emerald-300/15 px-3 py-1 text-xs text-emerald-100">{chapter.status}</span>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-slate-300">
        <div className="rounded-2xl bg-white/5 p-3">{chapter.topics.length} topics</div>
        <div className="rounded-2xl bg-white/5 p-3">{chapter.estimatedTime}</div>
      </div>
      <div className="mt-5">
        <ProgressBar value={chapter.progress} label="Completion" />
      </div>
      <Link
        href={`/classes/${classId}/subjects/${chapter.subjectId}/chapters/${chapter.id}/topics`}
        className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-300 hover:text-slate-950"
      >
        View Topics
      </Link>
    </motion.div>
  );
}

export function TopicCard({ topic }: { topic: Topic }) {
  return (
    <motion.div {...cardMotion} whileHover={{ y: -4 }} className="glass rounded-3xl p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">{topic.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">{topic.description}</p>
        </div>
        <span className="rounded-full bg-fuchsia-400/15 px-3 py-1 text-xs text-fuchsia-100">{topic.difficulty}</span>
      </div>
      <p className="mt-4 text-sm text-cyan-100">{topic.duration}</p>
      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <Link href="/lecturer-room" className="rounded-2xl bg-cyan-300 px-4 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-white">
          Start AI Lecture
        </Link>
        <Link href="/instant-solve" className="rounded-2xl bg-white/10 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/15">
          Practice Problems
        </Link>
        <Link href="/lecturer-room" className="rounded-2xl bg-white/10 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/15">
          Ask Doubt
        </Link>
        <Link href="/notes" className="rounded-2xl bg-white/10 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/15">
          View Whiteboard Notes
        </Link>
      </div>
    </motion.div>
  );
}

export function TeacherCard({ teacher }: { teacher: Teacher }) {
  return (
    <motion.div {...cardMotion} whileHover={{ y: -5, scale: 1.01 }} className="glass overflow-hidden rounded-3xl">
      <div className="relative h-48">
        <Image src={teacher.image} alt={teacher.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
        <span className="absolute right-4 top-4 inline-flex items-center rounded-full bg-black/35 px-3 py-1 text-xs text-amber-100 backdrop-blur">
          <Star className="mr-1 h-3 w-3 fill-amber-300 text-amber-300" />
          {teacher.rating}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white">{teacher.name}</h3>
        <p className="mt-1 text-sm text-cyan-100">{teacher.subjectFocus}</p>
        <p className="mt-3 text-sm text-slate-300">{teacher.language} · {teacher.style}</p>
      </div>
    </motion.div>
  );
}

export function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <motion.div
      {...cardMotion}
      whileHover={{ y: -6 }}
      className={`rounded-3xl p-6 ${
        plan.highlighted
          ? "border border-cyan-300/45 bg-cyan-300 text-slate-950 shadow-glow"
          : "glass"
      }`}
    >
      {plan.highlighted ? (
        <span className="mb-4 inline-flex rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-cyan-100">Most Popular</span>
      ) : null}
      <h3 className={`text-xl font-semibold ${plan.highlighted ? "text-slate-950" : "text-white"}`}>{plan.name}</h3>
      <p className={`mt-2 text-sm ${plan.highlighted ? "text-slate-800" : "text-slate-300"}`}>{plan.description}</p>
      <p className="mt-6 text-3xl font-bold">{plan.price}</p>
      <ul className="mt-6 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className={`flex items-center gap-3 text-sm ${plan.highlighted ? "text-slate-900" : "text-slate-200"}`}>
            <Check className="h-4 w-4" />
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href="/onboarding"
        className={`mt-7 inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition ${
          plan.highlighted ? "bg-slate-950 text-white hover:bg-slate-800" : "bg-white/10 text-white hover:bg-cyan-300 hover:text-slate-950"
        }`}
      >
        Choose Plan
      </Link>
    </motion.div>
  );
}

export function QuickActionCard({ title, href, icon }: { title: string; href: string; icon: "brain" | "camera" | "notes" | "quiz" }) {
  const Icon = icon === "brain" ? Brain : icon === "camera" ? Camera : icon === "notes" ? Download : BookOpen;

  return (
    <Link href={href} className="glass group rounded-3xl p-5 transition hover:-translate-y-1 hover:border-cyan-300/40">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300/15 text-cyan-100 transition group-hover:bg-cyan-300 group-hover:text-slate-950">
        <Icon size={22} />
      </span>
      <h3 className="mt-5 text-base font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-300">Tap to open</p>
    </Link>
  );
}
