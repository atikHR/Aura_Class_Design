import type { Topic } from "@/data/types";

const SELECTED_CLASS_KEY = "auraclass:selectedClass";
const ENROLLMENT_KEY = "auraclass:enrollment";
const CURRENT_TOPIC_KEY = "auraclass:currentTopic";

export type Enrollment = {
  classId: string;
  paymentStatus: "completed";
  paymentMethod: string;
  enrolledAt: string;
};

const canUseStorage = () => typeof window !== "undefined" && typeof window.localStorage !== "undefined";

export function setSelectedClass(classId: string) {
  if (canUseStorage()) {
    window.localStorage.setItem(SELECTED_CLASS_KEY, classId);
  }
}

export function getSelectedClass() {
  if (!canUseStorage()) {
    return null;
  }

  return window.localStorage.getItem(SELECTED_CLASS_KEY);
}

export function setEnrollment(data: Enrollment) {
  if (canUseStorage()) {
    window.localStorage.setItem(ENROLLMENT_KEY, JSON.stringify(data));
  }
}

export function getEnrollment(): Enrollment | null {
  if (!canUseStorage()) {
    return null;
  }

  const raw = window.localStorage.getItem(ENROLLMENT_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as Enrollment;
  } catch {
    return null;
  }
}

export function clearEnrollment() {
  if (canUseStorage()) {
    window.localStorage.removeItem(ENROLLMENT_KEY);
  }
}

export function setCurrentTopic(topic: Topic & { subjectId?: string; chapterId?: string }) {
  if (canUseStorage()) {
    window.localStorage.setItem(CURRENT_TOPIC_KEY, JSON.stringify(topic));
  }
}

export function getCurrentTopic() {
  if (!canUseStorage()) {
    return null;
  }

  const raw = window.localStorage.getItem(CURRENT_TOPIC_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as Topic & { subjectId?: string; chapterId?: string };
  } catch {
    return null;
  }
}

// --- NEW SMART STUDY ROUTINE & EXAM SYSTEM ---

const ROUTINES_KEY = "auraclass:routines";
const EXAMS_KEY = "auraclass:exams";

export type StudyRoutine = {
  id: string;
  subjectId: string;
  chapterId?: string;
  topicId?: string;
  days: string[];
  startTime: string;
  endTime: string;
  label: string;
};

export type ExamSchedule = {
  id: string;
  subjectId: string;
  title: string;
  date: string;
  time: string;
  syllabus: string[];
  duration: number;
  difficulty: string;
  status: 'upcoming' | 'completed';
};

export type PerformanceData = {
  subjectScores: Record<string, number>;
  weakTopics: string[];
  improvement: number;
  aiFeedback: string;
  streak: number;
  completedTasks: number;
  pendingTasks: number;
};

// Default Dummy Performance Data
const DEFAULT_PERFORMANCE: PerformanceData = {
  subjectScores: { "physics": 72, "mathematics": 65, "chemistry": 81 },
  weakTopics: ["Velocity Graph", "Algebraic Fractions"],
  improvement: 14,
  aiFeedback: "Revise motion graphs and practice 3 more problems. You're doing great on concept clarity!",
  streak: 12,
  completedTasks: 24,
  pendingTasks: 5,
};

export function getRoutines(): StudyRoutine[] {
  if (!canUseStorage()) return [];
  const raw = window.localStorage.getItem(ROUTINES_KEY);
  if (!raw) return [];
  try { return JSON.parse(raw) as StudyRoutine[]; } catch { return []; }
}

export function addRoutine(routine: StudyRoutine) {
  if (!canUseStorage()) return;
  const current = getRoutines();
  window.localStorage.setItem(ROUTINES_KEY, JSON.stringify([...current, routine]));
}

export function getExams(): ExamSchedule[] {
  if (!canUseStorage()) return [];
  const raw = window.localStorage.getItem(EXAMS_KEY);
  if (!raw) return [];
  try { return JSON.parse(raw) as ExamSchedule[]; } catch { return []; }
}

export function addExam(exam: ExamSchedule) {
  if (!canUseStorage()) return;
  const current = getExams();
  window.localStorage.setItem(EXAMS_KEY, JSON.stringify([...current, exam]));
}

export function getPerformanceData(): PerformanceData {
  return DEFAULT_PERFORMANCE; // Returning dummy data directly for frontend prototype
}
