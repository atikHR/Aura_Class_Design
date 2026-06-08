"use client";

import { BrainCircuit, Calendar, Clock, GraduationCap, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { PageTransition } from "@/components/PageTransition";
import { getSubjectsForClass, getChaptersForSubject } from "@/data/curriculum";
import { getEnrollment, type Enrollment, addExam, type ExamSchedule } from "@/lib/studentState";
import { useRouter } from "next/navigation";

export default function ExamManagementPage() {
  const router = useRouter();
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  
  const [subjectId, setSubjectId] = useState("");
  const [syllabusIds, setSyllabusIds] = useState<string[]>([]);
  const [day, setDay] = useState("Sunday");
  const [time, setTime] = useState("20:00");
  const [difficulty, setDifficulty] = useState("Medium");
  const [duration, setDuration] = useState("45");
  
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setEnrollment(getEnrollment());
  }, []);

  const subjects = useMemo(() => getSubjectsForClass(enrollment?.classId), [enrollment]);
  const availableChapters = useMemo(() => getChaptersForSubject(subjectId), [subjectId]);

  const handleToggleChapter = (chapterTitle: string) => {
    setSyllabusIds(prev => prev.includes(chapterTitle) ? prev.filter(t => t !== chapterTitle) : [...prev, chapterTitle]);
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectId) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      const subject = subjects.find(s => s.id === subjectId);
      const newExam: ExamSchedule = {
        id: `exam-${Date.now()}`,
        subjectId,
        title: `${subject?.name || "Subject"} AI Exam`,
        date: day,
        time,
        syllabus: syllabusIds.length > 0 ? syllabusIds : ["Full Subject"],
        duration: parseInt(duration),
        difficulty,
        status: 'upcoming'
      };
      
      addExam(newExam);
      setIsGenerating(false);
      router.push("/dashboard");
    }, 1500);
  };

  if (!enrollment) {
    return (
      <PageTransition>
        <section className="grid min-h-[70vh] place-items-center">
          <div className="glass max-w-xl rounded-3xl p-8 text-center">
            <GraduationCap size={30} className="mx-auto text-cyan-100" />
            <h1 className="mt-6 text-3xl font-semibold text-white">Enrollment Required</h1>
          </div>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-cyan-100">AI Study Planner</p>
          <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Exam Management</h1>
          <p className="mt-2 text-sm text-slate-300">Generate personalized AI exams to test your knowledge.</p>
        </div>
        <Link href="/dashboard" className="text-sm font-semibold text-cyan-100 hover:text-white">Back to dashboard</Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 max-w-5xl">
        <form onSubmit={handleGenerate} className="glass rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <BrainCircuit className="h-6 w-6 text-cyan-400" />
            <h2 className="text-xl font-semibold text-white">Add Exam</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Subject</label>
              <select 
                value={subjectId}
                onChange={(e) => {
                  setSubjectId(e.target.value);
                  setSyllabusIds([]);
                }}
                required
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50"
              >
                <option value="" disabled>Select Subject</option>
                {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>

            {subjectId && availableChapters.length > 0 && (
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Select Syllabus (Chapters)</label>
                <div className="space-y-2 bg-black/20 p-3 rounded-xl border border-white/5 max-h-48 overflow-y-auto">
                  {availableChapters.map(chapter => (
                    <label key={chapter.id} className="flex items-start gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={syllabusIds.includes(chapter.title)}
                        onChange={() => handleToggleChapter(chapter.title)}
                        className="mt-1 accent-cyan-500"
                      />
                      <span className="text-sm text-slate-200">{chapter.title}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Day</label>
                <select value={day} onChange={e => setDay(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Time Slot</label>
                <input type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Difficulty</label>
                <select value={difficulty} onChange={e => setDifficulty(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white">
                  <option>Easy</option><option>Medium</option><option>Hard</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Duration (mins)</label>
                <select value={duration} onChange={e => setDuration(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white">
                  <option>15</option><option>30</option><option>45</option><option>60</option>
                </select>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isGenerating || !subjectId}
            className="w-full mt-6 flex items-center justify-center gap-2 glow-button rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-900 py-3.5 font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2"><div className="h-4 w-4 rounded-full border-2 border-slate-900 border-t-transparent animate-spin"/> Generating...</span>
            ) : (
              <>Auto Generate Routine <ArrowRight size={18} /></>
            )}
          </button>
        </form>

        <div className="space-y-6 hidden lg:block">
          <div className="glass rounded-3xl p-8 bg-gradient-to-br from-cyan-900/20 to-transparent border-cyan-500/10">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Sparkles className="text-cyan-400"/> AI Exam System</h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3"><CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0"/> Our AI generates unique questions tailored to your requested difficulty and syllabus.</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0"/> Live feedback is provided immediately after submission to pinpoint weak topics.</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0"/> The results automatically adjust your daily study routine.</li>
            </ul>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
