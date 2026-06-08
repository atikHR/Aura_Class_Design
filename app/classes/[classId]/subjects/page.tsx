import Link from "next/link";
import { notFound } from "next/navigation";
import { SubjectCard } from "@/components/Cards";
import { PageTransition } from "@/components/PageTransition";
import { classes } from "@/data/classes";
import { subjects } from "@/data/curriculum";

export default async function SubjectsPage({ params }: { params: Promise<{ classId: string }> }) {
  const { classId } = await params;
  const classLevel = classes.find((item) => item.id === classId);
  const classSubjects = subjects.filter((subject) => subject.classId === classId);

  if (!classLevel || classSubjects.length === 0) {
    notFound();
  }

  return (
    <PageTransition>
      <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-cyan-100">{classLevel.name}</p>
          <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Select a STEM subject</h1>
        </div>
        <Link href="/classes" className="text-sm font-semibold text-cyan-100 hover:text-white">Change class</Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {classSubjects.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>
    </PageTransition>
  );
}
