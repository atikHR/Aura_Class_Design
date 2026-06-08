"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { getClassById } from "@/data/classes";
import { getEnrollment, type Enrollment } from "@/lib/studentState";

export default function PaymentSuccessPage() {
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);

  useEffect(() => {
    setEnrollment(getEnrollment());
  }, []);

  const enrolledClass = useMemo(() => getClassById(enrollment?.classId), [enrollment]);

  return (
    <PageTransition>
      <section className="grid min-h-[75vh] place-items-center">
        <div className="glass w-full max-w-2xl rounded-3xl p-8 text-center">
          <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-300 text-slate-950 shadow-glow">
            <CheckCircle2 size={38} />
          </span>
          <h1 className="mt-6 text-3xl font-semibold text-white sm:text-5xl">Enrollment Successful!</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-300">
            You are now enrolled in {enrolledClass?.name ?? "your selected class"}. Your AI learning dashboard is ready.
          </p>

          <div className="mt-8 grid gap-3 text-left sm:grid-cols-2">
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-xs text-slate-400">Selected class</p>
              <p className="mt-2 font-semibold text-white">{enrolledClass?.name ?? "Not selected"}</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-xs text-slate-400">Plan price</p>
              <p className="mt-2 font-semibold text-white">{enrolledClass ? `৳${enrolledClass.price}/month` : "N/A"}</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-xs text-slate-400">Payment method</p>
              <p className="mt-2 font-semibold text-white">{enrollment?.paymentMethod ?? "N/A"}</p>
            </div>
            <div className="rounded-2xl bg-emerald-300/10 p-4">
              <p className="text-xs text-emerald-100">Access status</p>
              <p className="mt-2 font-semibold text-white">Active</p>
            </div>
          </div>

          <Link href="/dashboard" className="mt-8 inline-flex rounded-full bg-cyan-300 px-7 py-4 text-sm font-semibold text-slate-950 transition hover:bg-white">
            Go to Dashboard
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
