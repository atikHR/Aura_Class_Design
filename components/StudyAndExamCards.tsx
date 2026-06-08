import { Calendar, CheckCircle2, Clock, Brain, Target, TrendingUp, Flame, AlertTriangle, BookOpen, CalendarDays } from "lucide-react";
import Link from "next/link";
import { type StudyRoutine, type ExamSchedule, type PerformanceData } from "@/lib/studentState";
import { getSubjectById } from "@/data/curriculum";
import { useState } from "react";

export function StudyPlanCard({ routines }: { routines: StudyRoutine[] }) {
  const [timeframe, setTimeframe] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  
  const displayedRoutines = timeframe === 'Daily' 
    ? routines.filter(r => r.days.includes(today)) 
    : routines;

  return (
    <div className="glass rounded-3xl p-6 space-y-4 relative overflow-hidden flex flex-col">
      <div className="absolute -right-4 -top-4 opacity-10">
        <Calendar size={120} />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 z-10">
        <div className="flex items-center gap-3">
          <CalendarDays className="h-5 w-5 text-cyan-300" />
          <h3 className="text-xl font-semibold text-white">Study Plan</h3>
        </div>
        <div className="flex bg-black/40 rounded-xl p-1 border border-white/10 shrink-0">
          {['Daily', 'Weekly', 'Monthly'].map(t => (
            <button 
              key={t}
              onClick={() => setTimeframe(t as any)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition ${timeframe === t ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-white'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      
      {displayedRoutines.length === 0 ? (
        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-center text-slate-400 text-sm flex-1 flex items-center justify-center">
          No study routines scheduled for {timeframe.toLowerCase()}. Take a break or revise!
        </div>
      ) : (
        <div className="space-y-3 overflow-y-auto custom-scrollbar flex-1 pr-1" style={{ maxHeight: '200px' }}>
          {displayedRoutines.map(routine => {
            const subject = getSubjectById(routine.subjectId);
            return (
              <div key={routine.id} className="bg-slate-900/40 border border-cyan-500/20 p-4 rounded-2xl flex items-center justify-between shadow-[0_0_15px_rgba(34,211,238,0.05)]">
                <div>
                  <h4 className="text-sm font-bold text-white">{subject?.name} - {routine.label}</h4>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                    <Clock size={12} /> {routine.startTime} - {routine.endTime}
                  </p>
                </div>
                <button className="h-8 w-8 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 flex items-center justify-center transition border border-cyan-500/20">
                  <BookOpen size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function ExamScheduleCard({ exams }: { exams: ExamSchedule[] }) {
  const [timeframe, setTimeframe] = useState<'Daily' | 'Weekly' | 'Monthly'>('Monthly');
  const allUpcoming = exams.filter(e => e.status === 'upcoming').sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  // Dummy logic: Daily shows first exam if today, otherwise Weekly/Monthly shows all
  const displayedExams = timeframe === 'Daily' ? allUpcoming.slice(0, 1) : allUpcoming;

  return (
    <div className="glass rounded-3xl p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Target className="h-5 w-5 text-rose-400 animate-pulse" />
          <h3 className="text-xl font-semibold text-white">Exam Schedule</h3>
        </div>
        <div className="flex bg-black/40 rounded-xl p-1 border border-white/10 shrink-0">
          {['Daily', 'Weekly', 'Monthly'].map(t => (
            <button 
              key={t}
              onClick={() => setTimeframe(t as any)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition ${timeframe === t ? 'bg-rose-500/20 text-rose-300' : 'text-slate-400 hover:text-white'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {displayedExams.length === 0 ? (
        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-center text-slate-400 text-sm">
          No upcoming exams scheduled for this {timeframe.toLowerCase()}.
          <Link href="/exam-management" className="text-cyan-400 hover:text-cyan-300 block mt-2 font-semibold">Generate Routine</Link>
        </div>
      ) : (
        <div className="space-y-3 max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
          {displayedExams.map(upcoming => (
            <div key={upcoming.id} className="bg-rose-950/20 border border-rose-500/20 p-4 rounded-2xl">
              <h4 className="text-lg font-bold text-white">{upcoming.title}</h4>
              <p className="text-xs text-rose-300 mt-1">{upcoming.date} at {upcoming.time}</p>
              <div className="mt-4 flex flex-col gap-2">
                <span className="text-xs text-slate-300"><span className="text-slate-400">Duration:</span> {upcoming.duration} mins</span>
                <span className="text-xs text-slate-300"><span className="text-slate-400">Syllabus:</span> {upcoming.syllabus.join(', ')}</span>
              </div>
              <div className="mt-5 flex gap-2">
                <button className="flex-1 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-900 py-2.5 text-xs font-bold transition-all shadow-md shadow-rose-500/20">Start Exam</button>
                <button className="flex-1 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-200 py-2.5 text-xs font-bold transition-all">Revise</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function StudyStreakCard({ streak, completed, pending }: { streak: number, completed: number, pending: number }) {
  return (
    <div className="glass rounded-3xl p-6 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest">Study Streak</h3>
        <Flame className="h-5 w-5 text-orange-500 animate-bounce" style={{ animationDuration: '2s' }} />
      </div>
      <div className="flex items-end gap-2">
        <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-rose-600">{streak}</span>
        <span className="text-lg text-slate-400 font-bold mb-1">Days</span>
      </div>
      <div className="mt-6 flex justify-between items-center border-t border-white/5 pt-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-emerald-400">{completed}</p>
          <p className="text-[10px] uppercase text-slate-500 font-bold">Tasks Done</p>
        </div>
        <div className="h-8 w-[1px] bg-white/10" />
        <div className="text-center">
          <p className="text-2xl font-bold text-amber-400">{pending}</p>
          <p className="text-[10px] uppercase text-slate-500 font-bold">Pending</p>
        </div>
      </div>
    </div>
  );
}

export function PerformanceProgressCard({ data }: { data: PerformanceData }) {
  return (
    <div className="glass rounded-3xl p-6 space-y-5">
      <div className="flex items-center gap-3 border-b border-white/5 pb-4">
        <TrendingUp className="h-5 w-5 text-emerald-400" />
        <h3 className="text-xl font-semibold text-white">Performance</h3>
        <span className="ml-auto bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2.5 py-1 rounded-lg">
          +{data.improvement}% <span className="hidden sm:inline">Overall</span>
        </span>
      </div>

      <div className="space-y-4">
        {Object.entries(data.subjectScores).map(([subject, score]) => (
          <div key={subject}>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-300 capitalize font-medium">{subject}</span>
              <span className="text-white font-bold">{score}%</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${score >= 80 ? 'bg-emerald-400' : score >= 60 ? 'bg-cyan-400' : 'bg-amber-400'}`} 
                style={{ width: `${score}%` }} 
              />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 mt-4">
        <div className="flex gap-2 items-start">
          <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-amber-200">Weak Topics Detected</h4>
            <p className="text-[11px] text-amber-400/80 mt-1">{data.weakTopics.join(', ')}</p>
          </div>
        </div>
      </div>

      <div className="bg-cyan-950/40 border border-cyan-500/20 rounded-2xl p-4 flex gap-3 items-start">
        <div className="h-8 w-8 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
          <Brain className="h-4 w-4 text-cyan-300" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-cyan-300">Dr. Aura's Feedback</h4>
          <p className="text-[11px] text-cyan-100 mt-1 leading-relaxed">"{data.aiFeedback}"</p>
        </div>
      </div>
    </div>
  );
}
