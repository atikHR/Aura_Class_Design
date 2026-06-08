"use client";

import { useEffect, useState } from "react";
import type { Topic } from "@/data/types";
import { getCurrentTopic } from "@/lib/studentState";

export function LecturerHeader() {
  const [currentTopic, setCurrentTopic] = useState<(Topic & { chapterId?: string; subjectId?: string }) | null>(null);

  useEffect(() => {
    setCurrentTopic(getCurrentTopic());
  }, []);

  const lessonTitle = currentTopic?.title ? `Physics: ${currentTopic.title}` : "Physics: Speed and Velocity";

  return (
    <div>
      <p className="text-sm uppercase tracking-[0.18em] text-cyan-100">AI Lecturer Room</p>
      <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{lessonTitle}</h1>
      {currentTopic?.description ? (
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">{currentTopic.description}</p>
      ) : null}
    </div>
  );
}
