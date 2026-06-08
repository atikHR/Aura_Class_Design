"use client";

import { ChevronDown, GraduationCap, Play, StickyNote, Target, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { ProgressBar } from "@/components/ProgressBar";
import { getClassById } from "@/data/classes";
import { getChaptersForSubject, getSubjectById } from "@/data/curriculum";
import type { Chapter, Topic } from "@/data/types";
import { getEnrollment, setCurrentTopic, type Enrollment } from "@/lib/studentState";

export default function SubjectDetailsPage() {
  const params = useParams<{ subjectId: string }>();
  const router = useRouter();
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [openChapterId, setOpenChapterId] = useState<string | null>(null);

  useEffect(() => {
    setEnrollment(getEnrollment());
  }, []);

  const subject = useMemo(() => getSubjectById(params.subjectId), [params.subjectId]);
  const enrolledClass = useMemo(() => getClassById(enrollment?.classId), [enrollment]);
  const chapters = useMemo(() => getChaptersForSubject(params.subjectId), [params.subjectId]);

  useEffect(() => {
    if (chapters.length > 0) {
      setOpenChapterId(chapters[0].id);
    }
  }, [chapters]);

  const startLecture = (chapter: Chapter, topic: Topic) => {
    setCurrentTopic({ ...topic, subjectId: subject?.id, chapterId: chapter.id });
    router.push("/lecturer-room");
  };

  if (!enrollment || !enrolledClass) {
    return (
      <PageTransition>
        <section className="grid min-h-[70vh] place-items-center">
          <div className="glass max-w-xl rounded-3xl p-8 text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-cyan-300/15 text-cyan-100">
              <GraduationCap size={30} />
            </span>
            <h1 className="mt-6 text-3xl font-semibold text-white">No enrolled class found</h1>
            <p className="mt-3 text-sm leading-6 text-slate-300">Enroll in a class before opening subject content.</p>
            <Link href="/onboarding" className="mt-7 inline-flex rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white">
              Choose Your Class
            </Link>
          </div>
        </section>
      </PageTransition>
    );
  }

  if (!subject || subject.classId !== enrolledClass.id) {
    return (
      <PageTransition>
        <div className="glass mx-auto max-w-xl rounded-3xl p-8 text-center">
          <h1 className="text-2xl font-semibold text-white">Subject unavailable for {enrolledClass.name}</h1>
          <p className="mt-3 text-sm text-slate-300">Open a subject from your enrolled class.</p>
          <Link href="/subjects" className="mt-6 inline-flex rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950">
            View Subjects
          </Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="mb-7 grid gap-5 lg:grid-cols-[1fr_0.45fr]">
        <section className="glass rounded-3xl p-6">
          <p className="text-sm uppercase tracking-[0.18em] text-cyan-100">{enrolledClass.name}</p>
          <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{subject.name}</h1>
          <p className="mt-2 text-sm leading-6 text-slate-300">{chapters.length} chapters · {subject.difficulty} · NCTB-focused AI lectures</p>
          <div className="mt-6">
            <ProgressBar value={subject.progress} label="Subject progress" />
          </div>
        </section>
        <section className="glass rounded-3xl p-6">
          <p className="text-sm text-cyan-100">Continue Learning</p>
          <h2 className="mt-2 text-xl font-semibold text-white">{chapters[0]?.topics[0]?.title ?? "Concept Lecture"}</h2>
          <button
            onClick={() => chapters[0]?.topics[0] && startLecture(chapters[0], chapters[0].topics[0])}
            className="mt-5 w-full rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
          >
            Continue Learning
          </button>
        </section>
      </div>

      <div className="space-y-4">
        {chapters.map((chapter) => {
          const expanded = openChapterId === chapter.id;

          return (
            <section key={chapter.id} className="glass overflow-hidden rounded-3xl">
              <button
                type="button"
                onClick={() => setOpenChapterId(expanded ? null : chapter.id)}
                className="flex w-full flex-col gap-4 p-5 text-left transition hover:bg-white/5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-semibold text-white">{chapter.title}</h2>
                    <span className="rounded-full bg-emerald-300/15 px-3 py-1 text-xs text-emerald-100">{chapter.status}</span>
                  </div>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">{chapter.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
                    <span className="rounded-full bg-white/10 px-3 py-1">{chapter.topics.length} topics</span>
                    <span className="rounded-full bg-white/10 px-3 py-1">{chapter.estimatedTime}</span>
                    <span className="rounded-full bg-white/10 px-3 py-1">{chapter.progress}% progress</span>
                  </div>
                </div>
                <ChevronDown className={`h-6 w-6 shrink-0 text-cyan-100 transition ${expanded ? "rotate-180" : ""}`} />
              </button>

              {expanded ? (
                <div className="border-t border-white/10 p-4 sm:p-5">
                  <div className="mb-5">
                    <ProgressBar value={chapter.progress} label="Chapter completion" />
                  </div>
                  <div className="grid gap-3">
                    {chapter.topics.map((topic, index) => (
                      <article key={topic.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                        <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-start">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="grid h-8 w-8 place-items-center rounded-full bg-cyan-300/15 text-xs font-semibold text-cyan-100">{index + 1}</span>
                              <h3 className="text-lg font-semibold text-white">{topic.title}</h3>
                              <span className="rounded-full bg-fuchsia-400/15 px-3 py-1 text-xs text-fuchsia-100">{topic.difficulty}</span>
                            </div>
                            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">{topic.description}</p>
                            <p className="mt-2 text-sm text-cyan-100">{topic.duration}</p>
                          </div>
                          <div className="grid gap-2 sm:grid-cols-2 lg:min-w-[420px]">
                            <button onClick={() => startLecture(chapter, topic)} className="rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white">
                              <Play className="mr-2 inline h-4 w-4" />
                              Start AI Lecture
                            </button>
                            <Link href="/instant-solve" className="rounded-2xl bg-white/10 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/15">
                              <Target className="mr-2 inline h-4 w-4" />
                              Practice Problems
                            </Link>
                            <button onClick={() => startLecture(chapter, topic)} className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
                              <MessageCircle className="mr-2 inline h-4 w-4" />
                              Ask Doubt
                            </button>
                            <Link href="/notes" className="rounded-2xl bg-white/10 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/15">
                              <StickyNote className="mr-2 inline h-4 w-4" />
                              View Notes
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ) : null}
            </section>
          );
        })}
      </div>
    </PageTransition>
  );
}
