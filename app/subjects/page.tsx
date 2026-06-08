"use client";

import { GraduationCap } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { SubjectCard } from "@/components/Cards";
import { PageTransition } from "@/components/PageTransition";
import { getClassById } from "@/data/classes";
import { getSubjectsForClass } from "@/data/curriculum";
import { getEnrollment, type Enrollment } from "@/lib/studentState";

export default function SubjectsPage() {
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);

  useEffect(() => {
    setEnrollment(getEnrollment());
  }, []);

  const enrolledClass = useMemo(() => getClassById(enrollment?.classId), [enrollment]);
  const classSubjects = useMemo(() => getSubjectsForClass(enrollment?.classId), [enrollment]);

  if (!enrollment || !enrolledClass) {
    return (
      <PageTransition>
        <section className="grid min-h-[70vh] place-items-center">
          <div className="glass max-w-xl rounded-3xl p-8 text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-cyan-300/15 text-cyan-100">
              <GraduationCap size={30} />
            </span>
            <h1 className="mt-6 text-3xl font-semibold text-white">Choose your class first</h1>
            <p className="mt-3 text-sm leading-6 text-slate-300">Subjects unlock after dummy class enrollment.</p>
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
      <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-cyan-100">{enrolledClass.name}</p>
          <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Subjects for your enrolled class</h1>
          <p className="mt-2 text-sm text-slate-300">{enrolledClass.curriculum} · Active plan ৳{enrolledClass.price}/month</p>
        </div>
        <Link href="/dashboard" className="text-sm font-semibold text-cyan-100 hover:text-white">Back to dashboard</Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {classSubjects.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>
    </PageTransition>
  );
}
