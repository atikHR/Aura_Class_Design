import Link from "next/link";
import { notFound } from "next/navigation";
import { TopicCard } from "@/components/Cards";
import { PageTransition } from "@/components/PageTransition";
import { allChapters, getTopicsForChapter, subjects } from "@/data/curriculum";

export default async function TopicsPage({ params }: { params: Promise<{ classId: string; subjectId: string; chapterId: string }> }) {
  const { classId, subjectId, chapterId } = await params;
  const subject = subjects.find((item) => item.id === subjectId && item.classId === classId);
  const chapter = allChapters.find((item) => item.id === chapterId && item.subjectId === subjectId);

  if (!subject || !chapter) {
    notFound();
  }

  const chapterTopics = getTopicsForChapter(chapterId);

  return (
    <PageTransition>
      <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-cyan-100">{subject.name} · {chapter.title}</p>
          <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Topic breakdown</h1>
        </div>
        <Link href={`/classes/${classId}/subjects/${subjectId}/chapters`} className="text-sm font-semibold text-cyan-100 hover:text-white">
          Back to chapters
        </Link>
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        {chapterTopics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </PageTransition>
  );
}
