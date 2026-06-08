"use client";

import { ArrowRight, Bot, Clock, GraduationCap, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { QuickActionCard, TeacherCard } from "@/components/Cards";
import { PageTransition } from "@/components/PageTransition";
import { ProgressBar } from "@/components/ProgressBar";
import { getClassById } from "@/data/classes";
import { getChaptersForSubject, getSubjectsForClass } from "@/data/curriculum";
import { teachers } from "@/data/teachers";
import type { ClassLevel } from "@/data/types";
import { getEnrollment, getRoutines, getExams, getPerformanceData, type Enrollment } from "@/lib/studentState";
import { StudyPlanCard, ExamScheduleCard, StudyStreakCard, PerformanceProgressCard } from "@/components/StudyAndExamCards";

export default function DashboardPage() {
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [routines, setRoutines] = useState<any[]>([]);
  const [exams, setExams] = useState<any[]>([]);
  const [performance, setPerformance] = useState<any>(null);

  useEffect(() => {
    setEnrollment(getEnrollment());
    setRoutines(getRoutines());
    setExams(getExams());
    setPerformance(getPerformanceData());
  }, []);

  const enrolledClass = useMemo<ClassLevel | undefined>(() => getClassById(enrollment?.classId), [enrollment]);
  const classSubjects = useMemo(() => getSubjectsForClass(enrollment?.classId), [enrollment]);
  const firstSubject = classSubjects[1] ?? classSubjects[0];
  const firstChapter = firstSubject ? getChaptersForSubject(firstSubject.id)[0] : null;
  const firstTopic = firstChapter?.topics[0];

  if (!enrollment || !enrolledClass) {
    return (
      <PageTransition>
        <section className="grid min-h-[70vh] place-items-center">
          <div className="glass max-w-xl rounded-3xl p-8 text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-cyan-300/15 text-cyan-100">
              <GraduationCap size={30} />
            </span>
            <h1 className="mt-6 text-3xl font-semibold text-white">You have not enrolled in any class yet.</h1>
            <p className="mt-3 text-sm leading-6 text-slate-300">Choose your class to unlock a focused AuraClass AI dashboard.</p>
            <Link href="/onboarding" className="mt-7 inline-flex rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white">
              Choose Your Class
            </Link>
          </div>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-cyan-100">Assalamu alaikum, Atik</p>
          <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">Welcome back, Atik</h1>
          <p className="mt-2 text-slate-300">Continue your {enrolledClass.name} learning journey.</p>
        </div>
        <Link href="/subjects" className="glow-button inline-flex items-center justify-center rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white">
          View Subjects
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>

      {/* AI Study Planner & Progress */}
      {performance && (
        <section className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-cyan-100" />
            <h2 className="text-2xl font-semibold text-white">AI Study Planner & Progress</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr_1fr]">
            <StudyPlanCard routines={routines} />
            <div className="flex flex-col gap-5">
              <StudyStreakCard streak={performance.streak} completed={performance.completedTasks} pending={performance.pendingTasks} />
              <ExamScheduleCard exams={exams} />
            </div>
            <PerformanceProgressCard data={performance} />
          </div>
        </section>
      )}

      <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="glass rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-cyan-100">Enrolled class</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">{enrolledClass.name}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">{enrolledClass.curriculum} · {enrolledClass.level}</p>
          </div>
          
          <div className="mt-6">
            <ProgressBar value={enrolledClass.progress} label="Class progress" />
          </div>
          <Link href="/subjects" className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white">
            View Subjects
          </Link>
        </section>

        <section className="glass rounded-3xl p-6">
          <p className="text-sm uppercase tracking-[0.18em] text-cyan-100">Continue learning</p>
          <div className="mt-5 rounded-3xl bg-white/5 p-5">
            <Bot className="mb-4 h-8 w-8 text-cyan-100" />
            <h2 className="text-2xl font-semibold text-white">{firstSubject?.name ?? "Physics"}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {firstChapter?.title ?? "Chapter 2: Motion"} · {firstTopic?.title ?? "Speed and Velocity"}
            </p>
            <Link href={firstSubject ? `/subjects/${firstSubject.id}` : "/subjects"} className="mt-5 inline-flex rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-300 hover:text-slate-950">
              Continue Topic
            </Link>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/5 p-4">
              <TrendingUp className="mb-3 h-5 w-5 text-emerald-200" />
              <p className="text-2xl font-bold text-white">72%</p>
              <p className="text-xs text-slate-300">Weekly mastery</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <Clock className="mb-3 h-5 w-5 text-cyan-200" />
              <p className="text-2xl font-bold text-white">4.5h</p>
              <p className="text-xs text-slate-300">Study time</p>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <QuickActionCard title="Start AI Class" href="/lecturer-room" icon="brain" />
        <QuickActionCard title="Instant Solve" href="/instant-solve" icon="camera" />
        <QuickActionCard title="My Notes" href="/notes" icon="notes" />
        <QuickActionCard title="Practice Quiz" href={firstSubject ? `/subjects/${firstSubject.id}` : "/subjects"} icon="quiz" />
      </section>

      <section className="mt-8">
        <div className="mb-4 flex items-center gap-3">
          <Bot className="h-5 w-5 text-cyan-100" />
          <h2 className="text-2xl font-semibold text-white">AI teachers for {enrolledClass.name}</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {teachers.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
