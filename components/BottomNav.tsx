"use client";

import { Bot, Camera, GraduationCap, Home, NotebookText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getEnrollment } from "@/lib/studentState";

const enrolledNavItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/subjects", label: "Subjects", icon: GraduationCap },
  { href: "/lecturer-room", label: "Class", icon: Bot },
  { href: "/instant-solve", label: "Solve", icon: Camera },
  { href: "/notes", label: "Notes", icon: NotebookText }
];

const guestNavItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/onboarding", label: "Choose", icon: GraduationCap },
  { href: "/pricing", label: "Pricing", icon: NotebookText }
];

export function BottomNav() {
  const pathname = usePathname();
  const [hasEnrollment, setHasEnrollment] = useState(false);

  useEffect(() => {
    setHasEnrollment(Boolean(getEnrollment()));
  }, [pathname]);

  const navItems = hasEnrollment ? enrolledNavItems : guestNavItems;

  return (
    <nav className="fixed inset-x-3 bottom-3 z-50 rounded-3xl border border-white/10 bg-slate-950/80 px-2 py-2 shadow-violet backdrop-blur-2xl lg:hidden">
      <div className={`grid gap-1 ${hasEnrollment ? "grid-cols-5" : "grid-cols-3"}`}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || (item.href === "/subjects" && pathname.startsWith("/subjects"));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-h-14 flex-col items-center justify-center rounded-2xl text-[11px] transition ${
                active ? "bg-cyan-300 text-slate-950" : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={18} />
              <span className="mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
