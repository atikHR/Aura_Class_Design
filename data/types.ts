export type Difficulty = "Easy" | "Medium" | "Hard";

export type ClassLevel = {
  id: string;
  name: string;
  curriculum: string;
  subjectCount: number;
  level: "Junior" | "Secondary" | "Higher Secondary";
  price: number;
  progress: number;
  recommended?: boolean;
};

export type Subject = {
  id: string;
  classId: string;
  name: string;
  icon: string;
  chapterCount: number;
  difficulty: Difficulty;
  progress: number;
};

export type Topic = {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: Difficulty;
};

export type Chapter = {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  estimatedTime: string;
  progress: number;
  status: "Not Started" | "In Progress" | "Completed";
  topics: Topic[];
};

export type Teacher = {
  id: string;
  name: string;
  subjectFocus: string;
  language: string;
  style: string;
  image: string;
  rating: number;
};

export type Note = {
  id: string;
  subject: string;
  chapter: string;
  topic: string;
  date: string;
};

export type PricingPlan = {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};
