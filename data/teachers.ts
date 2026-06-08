import type { Teacher } from "./types";

export const teachers: Teacher[] = [
  {
    id: "sir-rashid",
    name: "Rashid Sir",
    subjectFocus: "Physics Mentor",
    language: "Bangla + English",
    style: "Calm board-solver",
    image: "/images/aura-teacher-avatar.png",
    rating: 4.9
  },
  {
    id: "miss-nova",
    name: "Nova Miss",
    subjectFocus: "Math Coach",
    language: "Bangla-friendly",
    style: "Fast visual proofs",
    image: "/images/aura-teacher-avatar.png",
    rating: 4.8
  },
  {
    id: "dr-ray",
    name: "Dr. Ray",
    subjectFocus: "Chemistry Guide",
    language: "English + Bangla cues",
    style: "Lab-first examples",
    image: "/images/aura-teacher-avatar.png",
    rating: 4.7
  }
];
