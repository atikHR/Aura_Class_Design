import type { Chapter, Difficulty, Subject, Topic } from "./types";

type SubjectTemplate = {
  slug: string;
  name: string;
  icon: string;
  difficulty: Difficulty;
  progress: number;
};

const juniorSubjects: SubjectTemplate[] = [
  { slug: "mathematics", name: "Mathematics", icon: "Calculator", difficulty: "Medium", progress: 44 },
  { slug: "general-science", name: "General Science", icon: "Sparkles", difficulty: "Easy", progress: 39 },
  { slug: "ict", name: "ICT", icon: "MonitorSmartphone", difficulty: "Easy", progress: 61 },
  { slug: "english-stem", name: "English STEM Terms", icon: "BookOpen", difficulty: "Easy", progress: 33 },
  { slug: "practice-lab", name: "Practice Lab", icon: "Brain", difficulty: "Medium", progress: 27 }
];

const secondarySubjects: SubjectTemplate[] = [
  { slug: "mathematics", name: "Mathematics", icon: "Calculator", difficulty: "Medium", progress: 56 },
  { slug: "physics", name: "Physics", icon: "Atom", difficulty: "Hard", progress: 48 },
  { slug: "chemistry", name: "Chemistry", icon: "FlaskConical", difficulty: "Medium", progress: 42 },
  { slug: "biology", name: "Biology", icon: "Dna", difficulty: "Medium", progress: 45 },
  { slug: "ict", name: "ICT", icon: "MonitorSmartphone", difficulty: "Easy", progress: 67 }
];

const hscSubjects: SubjectTemplate[] = [
  { slug: "higher-mathematics", name: "Higher Mathematics", icon: "Calculator", difficulty: "Hard", progress: 34 },
  { slug: "physics-1", name: "Physics 1st Paper", icon: "Atom", difficulty: "Hard", progress: 41 },
  { slug: "physics-2", name: "Physics 2nd Paper", icon: "Atom", difficulty: "Hard", progress: 27 },
  { slug: "chemistry-1", name: "Chemistry 1st Paper", icon: "FlaskConical", difficulty: "Medium", progress: 38 },
  { slug: "chemistry-2", name: "Chemistry 2nd Paper", icon: "FlaskConical", difficulty: "Hard", progress: 30 },
  { slug: "biology-1", name: "Biology 1st Paper", icon: "Dna", difficulty: "Medium", progress: 36 },
  { slug: "biology-2", name: "Biology 2nd Paper", icon: "Dna", difficulty: "Medium", progress: 25 },
  { slug: "ict", name: "ICT", icon: "MonitorSmartphone", difficulty: "Easy", progress: 63 }
];

const classTemplates: Record<string, SubjectTemplate[]> = {
  "class-6": juniorSubjects,
  "class-7": juniorSubjects,
  "class-8": juniorSubjects,
  "class-9": secondarySubjects,
  "class-10": secondarySubjects,
  ssc: secondarySubjects,
  "hsc-1": hscSubjects,
  "hsc-2": hscSubjects
};

const motionTopics: Topic[] = [
  {
    id: "rest-and-motion",
    title: "Rest and Motion",
    description: "Understand reference points and how motion is measured.",
    duration: "14 min",
    difficulty: "Easy"
  },
  {
    id: "scalar-vector",
    title: "Scalar and Vector Quantity",
    description: "Compare magnitude-only quantities with directional quantities.",
    duration: "18 min",
    difficulty: "Medium"
  },
  {
    id: "distance-displacement",
    title: "Distance and Displacement",
    description: "Visualize path length versus shortest directional change.",
    duration: "17 min",
    difficulty: "Medium"
  },
  {
    id: "speed-velocity",
    title: "Speed and Velocity",
    description: "Solve speed and velocity problems using whiteboard formulas.",
    duration: "16 min",
    difficulty: "Easy"
  },
  {
    id: "acceleration",
    title: "Acceleration",
    description: "Learn how changing velocity creates acceleration.",
    duration: "20 min",
    difficulty: "Medium"
  },
  {
    id: "graph-motion",
    title: "Graph of Motion",
    description: "Read distance-time and velocity-time graphs for board questions.",
    duration: "24 min",
    difficulty: "Hard"
  },
  {
    id: "mathematical-problems",
    title: "Mathematical Problems",
    description: "Practice formula selection and clean step-by-step calculations.",
    duration: "28 min",
    difficulty: "Hard"
  },
  {
    id: "creative-questions",
    title: "Creative Questions",
    description: "Apply motion concepts to NCTB creative question patterns.",
    duration: "32 min",
    difficulty: "Hard"
  }
];

const topicsFor = (slug: string): Topic[] => [
  {
    id: `${slug}-concept`,
    title: "Concept Lecture",
    description: "AI teacher explains the core concept with Bangla-friendly examples.",
    duration: "15 min",
    difficulty: "Easy"
  },
  {
    id: `${slug}-worked-example`,
    title: "Worked Examples",
    description: "Step-by-step board-style solutions on the generative whiteboard.",
    duration: "22 min",
    difficulty: "Medium"
  },
  {
    id: `${slug}-practice`,
    title: "Practice Problems",
    description: "NCTB-style CQ, MCQ, and short-answer practice.",
    duration: "20 min",
    difficulty: "Medium"
  },
  {
    id: `${slug}-doubt-clinic`,
    title: "Doubt Clinic",
    description: "Ask follow-up questions and save whiteboard notes.",
    duration: "12 min",
    difficulty: "Easy"
  }
];

const makeChapters = (subject: Subject): Chapter[] => {
  const slug = subject.id;

  if (subject.name.includes("Physics")) {
    return [
      {
        id: `${slug}-motion`,
        subjectId: subject.id,
        title: "Chapter 2: Motion",
        description: "Learn rest, motion, speed, velocity, acceleration, and motion graphs.",
        estimatedTime: "2h 20m",
        progress: 58,
        status: "In Progress",
        topics: motionTopics
      },
      {
        id: `${slug}-force`,
        subjectId: subject.id,
        title: "Force and Newton's Laws",
        description: "Explore force, momentum, friction, and everyday motion examples.",
        estimatedTime: "1h 50m",
        progress: 26,
        status: "In Progress",
        topics: topicsFor(`${slug}-force`)
      },
      {
        id: `${slug}-work-energy`,
        subjectId: subject.id,
        title: "Work, Power and Energy",
        description: "Solve energy transformation and power calculation questions.",
        estimatedTime: "2h 10m",
        progress: 10,
        status: "Not Started",
        topics: topicsFor(`${slug}-work`)
      }
    ];
  }

  if (subject.name.includes("Mathematics")) {
    return [
      {
        id: `${slug}-algebra`,
        subjectId: subject.id,
        title: "Algebraic Expressions",
        description: "Formula patterns, factorization, and creative algebra problems.",
        estimatedTime: "2h 45m",
        progress: 64,
        status: "In Progress",
        topics: topicsFor(`${slug}-algebra`)
      },
      {
        id: `${slug}-geometry`,
        subjectId: subject.id,
        title: "Geometry",
        description: "Theorems, proofs, constructions, and visual reasoning.",
        estimatedTime: "3h",
        progress: 38,
        status: "In Progress",
        topics: topicsFor(`${slug}-geometry`)
      },
      {
        id: `${slug}-trigonometry`,
        subjectId: subject.id,
        title: "Trigonometry Basics",
        description: "Ratios, identities, and board-style triangle problems.",
        estimatedTime: "2h 30m",
        progress: 12,
        status: "Not Started",
        topics: topicsFor(`${slug}-trigonometry`)
      }
    ];
  }

  return [
    {
      id: `${slug}-fundamentals`,
      subjectId: subject.id,
      title: `${subject.name} Fundamentals`,
      description: "Core concepts explained with AI lecturer examples and whiteboard notes.",
      estimatedTime: "1h 45m",
      progress: subject.progress,
      status: subject.progress > 60 ? "In Progress" : "Not Started",
      topics: topicsFor(`${slug}-fundamentals`)
    },
    {
      id: `${slug}-board-practice`,
      subjectId: subject.id,
      title: "Board Question Practice",
      description: "Practice CQ, MCQ, and short-answer problems from the NCTB pattern.",
      estimatedTime: "2h 15m",
      progress: Math.max(8, subject.progress - 18),
      status: "In Progress",
      topics: topicsFor(`${slug}-practice`)
    }
  ];
};

export const subjects: Subject[] = Object.entries(classTemplates).flatMap(([classId, templates]) =>
  templates.map((template) => ({
    id: `${classId}-${template.slug}`,
    classId,
    name: template.name,
    icon: template.icon,
    chapterCount: template.name.includes("Physics") || template.name.includes("Mathematics") ? 3 : 2,
    difficulty: template.difficulty,
    progress: template.progress
  }))
);

export const chapters: Chapter[] = subjects.flatMap((subject) => makeChapters(subject));

export const allChapters = chapters;

export const getSubjectsForClass = (classId: string | null | undefined) =>
  subjects.filter((subject) => subject.classId === classId);

export const getSubjectById = (subjectId: string | null | undefined) =>
  subjects.find((subject) => subject.id === subjectId);

export const getChaptersForSubject = (subjectId: string | null | undefined) =>
  chapters.filter((chapter) => chapter.subjectId === subjectId);

export const getTopicsForChapter = (chapterId: string): Topic[] =>
  chapters.find((chapter) => chapter.id === chapterId)?.topics ?? topicsFor(chapterId);
