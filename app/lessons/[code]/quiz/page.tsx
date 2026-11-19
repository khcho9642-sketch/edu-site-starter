import { notFound, permanentRedirect } from "next/navigation";
import { getLesson, LEGACY_LESSONS } from "@/lib/courses";
import { requireLearner } from "@/lib/require-learner";
import ArchivedLesson from "@/components/ArchivedLesson";
import { readQuiz } from "@/lib/content";
import Quiz from "@/components/Quiz";

export const dynamic = "force-dynamic";

export default async function QuizPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  await requireLearner(`/lessons/${encodeURIComponent(code)}/quiz`);
  if (LEGACY_LESSONS[code.toUpperCase()]) permanentRedirect(`/lessons/${LEGACY_LESSONS[code.toUpperCase()]}/quiz`);
  const found = getLesson(code);
  const quiz = found?.lesson.available ? readQuiz(found.lesson.code) : null;
  if (!found || !quiz) notFound();
  if (found.lesson.archived) return <ArchivedLesson code={found.lesson.code}><article className="space-y-6">{quiz.map((q,i)=><section key={q.prompt} className="rounded-xl border border-line bg-white p-5"><h2 className="font-bold">{i+1}. {q.prompt}</h2><ol className="mt-3 space-y-2">{q.choices.map((c,n)=><li key={c}>{"ABCD"[n]}. {c}</li>)}</ol><details className="mt-4"><summary className="cursor-pointer text-accent">정답·해설 보기</summary><p className="mt-2">정답 {"ABCD"[q.answer]} · {q.explanation}</p></details></section>)}</article></ArchivedLesson>;
  return <Quiz lessonCode={found.lesson.code} lessonTitle={found.lesson.title} questions={quiz} />;
}
