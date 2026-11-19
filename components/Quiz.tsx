"use client";
import Link from "next/link";
import { useState } from "react";
import { PASS_SCORE, coursePublicCode, getLesson, lessonPublicCode, lessonStorageCode } from "@/lib/courses";
import { useProgress } from "@/lib/progress";
import { gradeQuiz, type QuizQuestion } from "@/lib/quiz";

type Result = {
  score: number;
  passed: boolean;
  right: number;
  total: number;
  results: { chosen: number; answer: number; correct: boolean; explanation: string; page?: string }[];
};

export default function Quiz({
  lessonCode,
  lessonTitle,
  questions,
}: {
  lessonCode: string;
  lessonTitle: string;
  questions: QuizQuestion[];
}) {
  const { recordQuiz, progress, ready } = useProgress();
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const unanswered = answers.filter((a) => a === null).length;

  const submit = () => {
    setError(null);
    try {
      const data = gradeQuiz(questions, answers, PASS_SCORE);
      setResult(data);
      recordQuiz(lessonCode, data.score);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "채점 결과를 확인하지 못했습니다. 다시 시도해 주세요.");
    }
  };

  const retry = () => {
    setAnswers(questions.map(() => null));
    setResult(null);
    window.scrollTo({ top: 0 });
  };

  const sectionCount = getLesson(lessonCode)?.lesson.sections.length ?? 0;
  const course = getLesson(lessonCode)?.course;
  const nextLesson = course && (course.code === "C" || course.code === "E") ? course.lessons[course.lessons.findIndex((l) => l.code === lessonCode) + 1] : undefined;
  const storedCode = lessonStorageCode(getLesson(lessonCode)!.lesson);
  const allRead = sectionCount > 0 && getLesson(lessonCode)!.lesson.sections.every((s) => progress.reads.includes(`${storedCode}-${s.no}`));

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <Link href={`/lessons/${lessonCode}/1`} className="text-sm text-muted hover:text-accent">
        ← {course ? lessonPublicCode(course, getLesson(lessonCode)!.lesson) : lessonCode}. {lessonTitle}
      </Link>
      <h1 className="text-3xl font-bold mt-2">확인 퀴즈</h1>
      <p className="text-muted mt-2">
        {questions.length}문항 · {PASS_SCORE}점 이상이면 통과 · 재응시 무제한(최고 점수 반영)
      </p>
      <p className="text-sm text-muted mt-2">자가학습용 퀴즈입니다. 점수는 이 브라우저에 저장되며, 강의 완료는 모든 단원 읽음으로 판정합니다.</p>

      {result && (
        <div
          className={`mt-6 rounded-2xl p-6 ${result.passed ? "bg-accent-soft" : "bg-amber-50 border border-amber-200"}`}
          role="status"
        >
          <p className="text-sm font-semibold">{result.passed ? "통과 ㅊㅊ 개추 박고 감" : "아쉽 ㅠ 70점 못 넘음"}</p>
          <p className="text-4xl font-bold mt-1 tabular-nums">
            {result.score}점 <span className="text-base font-normal text-muted">({result.right}/{result.total})</span>
          </p>
          <p className="text-sm mt-2">
            {result.passed
              ? allRead
                ? "모든 단원을 읽은 강의입니다. 퀴즈도 통과했어요!"
                : `단원 ${sectionCount}개를 모두 읽으면 강의가 완료됩니다.`
              : "아래 해설 보고 해당 단원 다시 읽고 재도전 ㄱ"}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {nextLesson && <Link href={`/lessons/${nextLesson.code}/1`} className="rounded-full bg-accent text-white px-4 py-2 text-sm font-semibold">다음 강의 {course ? lessonPublicCode(course, nextLesson) : nextLesson.code} →</Link>}
            {course && (course.code === "C" || course.code === "E") && !nextLesson && <Link href={`/courses/${coursePublicCode(course)}`} className="rounded-full bg-accent text-white px-4 py-2 text-sm font-semibold">{course.code === "E" ? "ChatGPT 과정 돌아보기" : "데스크톱 과정 돌아보기"}</Link>}
            <button onClick={retry} className="rounded-full border border-ink px-4 py-2 text-sm font-semibold">
              다시 풀기
            </button>
            <Link href="/dashboard" className="rounded-full bg-ink text-white px-4 py-2 text-sm font-semibold">
              내 학습으로
            </Link>
          </div>
        </div>
      )}

      <ol className="mt-8 space-y-6">
        {questions.map((q, qi) => {
          const r = result?.results[qi];
          return (
            <li key={qi} className="rounded-2xl border border-line bg-white p-5">
              <p className="font-semibold">
                <span className="text-accent mr-1">Q{qi + 1}.</span>
                {q.prompt}
              </p>
              <div className="mt-4 space-y-2" role="group" aria-label={`Q${qi + 1}. ${q.prompt}`}>
                {q.choices.map((c, ci) => {
                  const chosen = answers[qi] === ci;
                  let cls = "border-line hover:border-accent";
                  if (r) {
                    if (ci === r.answer) cls = "border-accent bg-accent-soft";
                    else if (chosen) cls = "border-red-300 bg-red-50";
                    else cls = "border-line opacity-60";
                  } else if (chosen) cls = "border-accent bg-accent-soft";
                  return (
                    <button
                      key={ci}
                      type="button"
                      aria-pressed={chosen}
                      disabled={!!r}
                      onClick={() => setAnswers((a) => a.map((v, i) => (i === qi ? ci : v)))}
                      className={`w-full text-left rounded-xl border px-4 py-3 text-[15px] leading-relaxed transition ${cls}`}
                    >
                      <span className="font-mono text-sm text-muted mr-2">{"①②③④"[ci]}</span>
                      {c}
                      {r && ci === r.answer && <span className="ml-2 text-accent font-semibold">정답</span>}
                      {r && chosen && ci !== r.answer && <span className="ml-2 text-red-600 font-semibold">내 답</span>}
                    </button>
                  );
                })}
              </div>
              {r && (
                <div className="mt-4 text-sm leading-relaxed bg-paper rounded-xl p-4">
                  <b className={r.correct ? "text-accent" : "text-red-600"}>{r.correct ? "정답" : "오답"}</b>
                  <span className="mx-1">·</span>
                  {r.explanation}
                  {r.page && <span className="block text-muted mt-1">관련 단원: {r.page}</span>}
                </div>
              )}
            </li>
          );
        })}
      </ol>

      {!result && (
        <div className="mt-8 flex items-center gap-4">
          <button
            onClick={submit}
            disabled={!ready || unanswered > 0}
            className="rounded-full bg-accent text-white px-6 py-3 font-semibold disabled:opacity-40"
          >
            채점하고 해설 보기
          </button>
          {unanswered > 0 && <span className="text-sm text-muted">남은 문항 {unanswered}개</span>}
          {error && <span className="text-sm text-red-600">{error}</span>}
        </div>
      )}
    </div>
  );
}
