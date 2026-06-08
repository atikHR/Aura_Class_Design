"use client";

import { BookOpen, Bot, Camera, CreditCard, GraduationCap, Home, NotebookText, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getEnrollment } from "@/lib/studentState";

const enrolledNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/subjects", label: "Subjects", icon: GraduationCap },
  { href: "/lecturer-room", label: "AI Class", icon: Bot },
  { href: "/instant-solve", label: "Instant Solve", icon: Camera },
  { href: "/notes", label: "Notes", icon: NotebookText },
  { href: "/pricing", label: "Pricing", icon: CreditCard }
];

const guestNavItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/onboarding", label: "Choose Class", icon: GraduationCap },
  { href: "/pricing", label: "Pricing", icon: CreditCard }
];

export function Sidebar() {
  const pathname = usePathname();
  const [hasEnrollment, setHasEnrollment] = useState(false);

  useEffect(() => {
    setHasEnrollment(Boolean(getEnrollment()));
  }, [pathname]);

  const navItems = hasEnrollment ? enrolledNavItems : guestNavItems;

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 border-r border-white/10 bg-slate-950/55 p-5 backdrop-blur-2xl lg:block">
      <Link href="/" className="mb-8 flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300 text-slate-950 shadow-glow">
          <Sparkles size={22} />
        </span>
        <span>
          <span className="block font-semibold text-white">AuraClass AI</span>
          <span className="block text-xs text-slate-400">Interactive STEM lecturer</span>
        </span>
      </Link>
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || (item.href === "/subjects" && pathname.startsWith("/subjects"));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                active
                  ? "bg-cyan-300 text-slate-950 shadow-glow"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-4">
        <BookOpen className="mb-3 h-5 w-5 text-cyan-200" />
        <p className="text-sm font-medium text-white">{hasEnrollment ? "Class plan active" : "Start with one class"}</p>
        <p className="mt-1 text-xs text-slate-300">{hasEnrollment ? "Open Subjects to continue." : "Choose class, then enroll."}</p>
      </div>
    </aside>
  );
}
