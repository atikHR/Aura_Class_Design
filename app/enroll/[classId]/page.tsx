"use client";

import { CheckCircle2, CreditCard, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { getClassById } from "@/data/classes";
import { getSubjectsForClass } from "@/data/curriculum";
import { setEnrollment, setSelectedClass } from "@/lib/studentState";

const paymentMethods = ["bKash", "Nagad", "Rocket", "Card"];
const included = ["AI teacher access", "Generative whiteboard", "Instant solve", "Whiteboard PDF notes", "Low-data mode"];

export default function EnrollPage() {
  const params = useParams<{ classId: string }>();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("bKash");
  const selectedClass = useMemo(() => getClassById(params.classId), [params.classId]);
  const classSubjects = useMemo(() => getSubjectsForClass(params.classId), [params.classId]);

  if (!selectedClass) {
    return (
      <PageTransition>
        <div className="glass mx-auto max-w-xl rounded-3xl p-8 text-center">
          <h1 className="text-2xl font-semibold text-white">Class not found</h1>
          <button onClick={() => router.push("/onboarding")} className="mt-6 rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950">
            Choose Class
          </button>
        </div>
      </PageTransition>
    );
  }

  const payAndEnroll = () => {
    setSelectedClass(selectedClass.id);
    setEnrollment({
      classId: selectedClass.id,
      paymentStatus: "completed",
      paymentMethod,
      enrolledAt: new Date().toISOString()
    });
    router.push("/payment-success");
  };

  return (
    <PageTransition>
      <div className="mb-7">
        <p className="text-sm uppercase tracking-[0.18em] text-cyan-100">Class enrollment</p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Enroll in {selectedClass.name}</h1>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="glass rounded-3xl p-6">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
            <div>
              <p className="text-sm text-cyan-100">{selectedClass.curriculum}</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">{selectedClass.name}</h2>
              <p className="mt-2 text-sm text-slate-300">{selectedClass.level} · {classSubjects.length} included subjects</p>
            </div>
            <div className="rounded-3xl bg-cyan-300 p-5 text-slate-950">
              <p className="text-sm font-semibold">Monthly price</p>
              <p className="mt-2 text-3xl font-bold">৳{selectedClass.price}</p>
              <p className="text-sm">/month</p>
            </div>
          </div>
          <div className="mt-6">
            <p className="mb-3 text-sm font-semibold text-white">Included subjects</p>
            <div className="flex flex-wrap gap-2">
              {classSubjects.map((subject) => (
                <span key={subject.id} className="rounded-full bg-white/10 px-3 py-2 text-sm text-slate-200">{subject.name}</span>
              ))}
            </div>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {included.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/5 p-4 text-sm text-slate-200">
                <CheckCircle2 className="h-5 w-5 text-cyan-100" />
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="glass rounded-3xl p-6">
          <div className="mb-5 flex items-center gap-3">
            <CreditCard className="h-6 w-6 text-cyan-100" />
            <h2 className="text-xl font-semibold text-white">Dummy payment</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {paymentMethods.map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => setPaymentMethod(method)}
                className={`rounded-2xl border p-4 text-left text-sm font-semibold transition ${
                  paymentMethod === method
                    ? "border-cyan-300 bg-cyan-300 text-slate-950 shadow-glow"
                    : "border-white/10 bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                {method}
              </button>
            ))}
          </div>
          <div className="mt-6 rounded-3xl border border-emerald-300/20 bg-emerald-300/10 p-4">
            <ShieldCheck className="mb-3 h-5 w-5 text-emerald-100" />
            <p className="text-sm font-medium text-white">Frontend-only simulation</p>
            <p className="mt-1 text-sm leading-6 text-slate-300">No real payment, no gateway, no card data. This only saves enrollment state locally.</p>
          </div>
          <button onClick={payAndEnroll} className="mt-6 w-full rounded-2xl bg-cyan-300 px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-white">
            Pay & Enroll
          </button>
        </section>
      </div>
    </PageTransition>
  );
}
