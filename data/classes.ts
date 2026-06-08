import type { ClassLevel } from "./types";

export const classes: ClassLevel[] = [
  {
    id: "class-6",
    name: "Class 6",
    curriculum: "NCTB Curriculum",
    subjectCount: 5,
    level: "Junior",
    price: 299,
    progress: 32
  },
  {
    id: "class-7",
    name: "Class 7",
    curriculum: "NCTB Curriculum",
    subjectCount: 5,
    level: "Junior",
    price: 299,
    progress: 28
  },
  {
    id: "class-8",
    name: "Class 8",
    curriculum: "NCTB Curriculum",
    subjectCount: 6,
    level: "Junior",
    price: 349,
    progress: 36
  },
  {
    id: "class-9",
    name: "Class 9",
    curriculum: "NCTB Science Track",
    subjectCount: 6,
    level: "Secondary",
    price: 399,
    progress: 45
  },
  {
    id: "class-10",
    name: "Class 10",
    curriculum: "NCTB Science Track",
    subjectCount: 5,
    level: "Secondary",
    price: 449,
    progress: 58
  },
  {
    id: "ssc",
    name: "SSC",
    curriculum: "NCTB Board Prep",
    subjectCount: 5,
    level: "Secondary",
    price: 499,
    progress: 62,
    recommended: true
  },
  {
    id: "hsc-1",
    name: "HSC 1st Year",
    curriculum: "NCTB Science Group",
    subjectCount: 8,
    level: "Higher Secondary",
    price: 599,
    progress: 29,
    recommended: true
  },
  {
    id: "hsc-2",
    name: "HSC 2nd Year",
    curriculum: "NCTB Science Group",
    subjectCount: 8,
    level: "Higher Secondary",
    price: 599,
    progress: 24,
    recommended: true
  }
];

export const getClassById = (classId: string | null | undefined) =>
  classes.find((classLevel) => classLevel.id === classId);
