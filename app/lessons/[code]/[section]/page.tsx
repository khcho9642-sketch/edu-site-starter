import { notFound, permanentRedirect } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { getLesson, LEGACY_LESSONS } from "@/lib/courses";
import { requireLearner } from "@/lib/require-learner";
import ArchivedLesson from "@/components/ArchivedLesson";
import { readSection } from "@/lib/content";
import LessonShell from "@/components/LessonShell";
import LessonComic from "@/components/LessonComic";
import LessonMarkdown from "@/components/LessonMarkdown";

export const dynamic = "force-dynamic";

export default async function SectionPage({
  params,
}: {
  params: Promise<{ code: string; section: string }>;
}) {
  const { code, section } = await params;
  await requireLearner(`/lessons/${encodeURIComponent(code)}/${encodeURIComponent(section)}`);
  if (LEGACY_LESSONS[code.toUpperCase()]) {
    const desktopAlias = code.toUpperCase().startsWith("D");
    if (desktopAlias && !["1", "2", "3"].includes(section)) notFound();
    permanentRedirect(`/lessons/${LEGACY_LESSONS[code.toUpperCase()]}/${desktopAlias ? section : "1"}`);
  }
  const found = getLesson(code);
  const no = Number(section);
  if (!found || !found.lesson.available) notFound();
  if (!/^\d+$/.test(section) || !found.lesson.sections.some((s) => s.no === no)) notFound();
  const md = readSection(found.lesson.code, no);
  if (!md) notFound();

  if (found.lesson.archived) return <ArchivedLesson code={found.lesson.code}>
    {no===1 && <LessonComic code={found.lesson.code} title={found.lesson.title} />}
    <article className="prose-edu"><ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{md.replaceAll('/chatgpt-materials/','/archive/chatgpt/materials/').replaceAll('](/chatgpt-materials)','](/archive/chatgpt/materials)').replaceAll('](/courses/D)','](/archive/chatgpt)')}</ReactMarkdown></article>
  </ArchivedLesson>;

  return (
    <LessonShell lessonCode={found.lesson.code} sectionNo={no}>
      {no === 1 && /^(D\d{2}|E1\d{2})$/.test(found.lesson.code) && <a href={`/lessons/${found.lesson.code.startsWith("D") ? `C${found.lesson.code.slice(1)}` : found.lesson.code}/2#walkthrough`} className="mb-5 block rounded-xl border border-accent/30 bg-accent/5 px-4 py-3 text-sm font-semibold text-accent">실제 화면·실습 파일·막혔을 때 안내 보기 →</a>}
      {no === 1 && <LessonComic code={found.lesson.code} title={found.lesson.title} />}
      <article className="prose-edu">
        <LessonMarkdown markdown={md} />
      </article>
    </LessonShell>
  );
}

