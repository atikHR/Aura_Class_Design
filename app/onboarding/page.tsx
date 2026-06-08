"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
import { PageTransition } from "@/components/PageTransition";
import { classes } from "@/data/classes";
import { setSelectedClass } from "@/lib/studentState";

export default function OnboardingPage() {
  const router = useRouter();

  const chooseClass = (classId: string) => {
    setSelectedClass(classId);
    router.push(`/enroll/${classId}`);
  };

  return (
    <PageTransition>
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-3xl bg-cyan-300/15 text-cyan-100">
            <GraduationCap size={26} />
          </span>
          <h1 className="mt-5 text-3xl font-semibold text-white sm:text-5xl">Which class are you studying in?</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            Select your class so AuraClass AI can prepare your NCTB-based learning dashboard.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {classes.map((classLevel) => (
            <motion.button
              key={classLevel.id}
              type="button"
              onClick={() => chooseClass(classLevel.id)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="glass rounded-3xl p-5 text-left transition hover:border-cyan-300/45"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-100">{classLevel.curriculum}</p>
                  <h2 className="mt-3 text-xl font-semibold text-white">{classLevel.name}</h2>
                </div>
                {classLevel.recommended ? (
                  <span className="rounded-full bg-fuchsia-400/15 px-3 py-1 text-xs font-medium text-fuchsia-100">Recommended</span>
                ) : null}
              </div>
              <div className="mt-5 space-y-2 text-sm text-slate-300">
                <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-100" /> {classLevel.subjectCount} subjects</p>
                <p>{classLevel.level} difficulty</p>
                <p className="text-lg font-semibold text-white">৳{classLevel.price}/month</p>
              </div>
              <span className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-300 hover:text-slate-950">
                Select Class
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
