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
