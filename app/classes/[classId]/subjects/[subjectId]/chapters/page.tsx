import Link from "next/link";
import { notFound } from "next/navigation";
import { ChapterCard } from "@/components/Cards";
import { PageTransition } from "@/components/PageTransition";
import { allChapters, subjects } from "@/data/curriculum";

export default async function ChaptersPage({ params }: { params: Promise<{ classId: string; subjectId: string }> }) {
  const { classId, subjectId } = await params;
  const subject = subjects.find((item) => item.id === subjectId && item.classId === classId);
  const subjectChapters = allChapters.filter((chapter) => chapter.subjectId === subjectId);

  if (!subject || subjectChapters.length === 0) {
    notFound();
  }

  return (
    <PageTransition>
      <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-cyan-100">{subject.name}</p>
          <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Choose a chapter</h1>
        </div>
        <Link href={`/classes/${classId}/subjects`} className="text-sm font-semibold text-cyan-100 hover:text-white">Back to subjects</Link>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {subjectChapters.map((chapter) => (
          <ChapterCard key={chapter.id} chapter={chapter} classId={classId} />
        ))}
      </div>
    </PageTransition>
  );
}
