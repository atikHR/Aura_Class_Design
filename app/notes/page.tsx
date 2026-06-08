import { Download, NotebookText } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { notes } from "@/data/notes";

export default function NotesPage() {
  return (
    <PageTransition>
      <div className="mb-7">
        <p className="text-sm uppercase tracking-[0.18em] text-cyan-100">Generated notes</p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Whiteboard note library</h1>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {notes.map((note) => (
          <article key={note.id} className="glass rounded-3xl p-5 transition hover:border-cyan-300/40">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300/15 text-cyan-100">
              <NotebookText size={22} />
            </span>
            <p className="mt-5 text-sm text-cyan-100">{note.subject}</p>
            <h2 className="mt-1 text-lg font-semibold text-white">{note.topic}</h2>
            <p className="mt-2 text-sm text-slate-300">{note.chapter}</p>
            <p className="mt-4 text-xs text-slate-400">{note.date}</p>
            <button className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-300 hover:text-slate-950">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </button>
          </article>
        ))}
      </div>
    </PageTransition>
  );
}
