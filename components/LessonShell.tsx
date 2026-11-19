"use client";
import Link from "next/link";
import { useEffect } from "react";
import { coursePublicCode, getLesson, lessonPublicCode, lessonStorageCode } from "@/lib/courses";
import { lessonPercent, useProgress } from "@/lib/progress";
import { learningLoginPath } from "@/lib/learning-access";
import ProgressBar from "./ProgressBar";

export default function LessonShell({
  lessonCode,
  sectionNo,
  children,
}: {
  lessonCode: string;
  sectionNo: number;
  children: React.ReactNode;
}) {
  const { course, lesson } = getLesson(lessonCode)!;
  const storedCode = lessonStorageCode(lesson);
  const { progress, markRead, setLast, user, ready } = useProgress();
  const sections = lesson.sections;
  const idx = sections.findIndex((s) => s.no === sectionNo);
  const next = sections[idx + 1];
  const prev = sections[idx - 1];
  const lessonIndex = course.lessons.findIndex((l) => l.code === lessonCode);
  const previousLesson = course.lessons[lessonIndex - 1];
  const nextLesson = course.lessons[lessonIndex + 1];
  const isRead = progress.reads.includes(`${storedCode}-${sectionNo}`);

  useEffect(() => {
    setLast(lessonCode, sectionNo);
    window.scrollTo(0, 0);
  }, [lessonCode, sectionNo, setLast]);

  const locked = ready && !user;

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 grid gap-10 lg:grid-cols-[260px_1fr]">
      <aside className="lg:sticky lg:top-20 self-start">
        <Link href={`/courses/${coursePublicCode(course)}`} className="text-sm text-muted hover:text-accent">
          ← {course.title}
        </Link>
        <h2 className="mt-2 text-lg font-bold">
          {lessonPublicCode(course, lesson)}. {lesson.title}
        </h2>
        <div className="mt-4">
          <ProgressBar value={lessonPercent(progress, lessonCode)} label="이 강의" />
        </div>
        <ol className="mt-5 space-y-1 text-sm">
          {sections.map((s) => {
            const read = progress.reads.includes(`${storedCode}-${s.no}`);
            const active = s.no === sectionNo;
            return (
              <li key={s.no}>
                <Link
                  href={`/lessons/${lessonCode}/${s.no}`}
                  className={`flex gap-2 rounded-lg px-3 py-2 ${active ? "bg-white border border-line font-semibold" : "hover:bg-white/60"}`}
                >
                  <span className={read ? "text-accent" : "text-muted"}>{read ? "✓" : s.no}</span>
                  <span>{s.title}</span>
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href={`/lessons/${lessonCode}/quiz`}
              className="flex gap-2 rounded-lg px-3 py-2 hover:bg-white/60 font-semibold text-accent"
            >
              <span>?</span>
              <span>확인 퀴즈{progress.best[storedCode] !== undefined ? ` · 최고 ${progress.best[storedCode]}점` : ""}</span>
            </Link>
          </li>
        </ol>
        {(course.code === "C" || course.code === "E") && (
          <nav aria-label={`${course.title} 강의 순서`} className="mt-5 border-t border-line pt-4 text-sm space-y-3">
            {previousLesson && <Link href={`/lessons/${previousLesson.code}/1`} className="block hover:text-accent">← 이전 강의 {lessonPublicCode(course, previousLesson)}</Link>}
            {nextLesson && <Link href={`/lessons/${nextLesson.code}/1`} className="block font-semibold hover:text-accent">다음 강의 {lessonPublicCode(course, nextLesson)} →</Link>}
            <Link href={course.code === "E" ? "/chatgpt-materials" : "/desktop-materials"} className="block text-accent underline">실습 자료·MD 다운로드</Link>
          </nav>
        )}
      </aside>

      <div className="min-w-0 max-w-3xl">
        <p className="text-sm text-muted mb-6">
          단원 {sectionNo} / {sections.length} · {sections[idx]?.title}
        </p>
        {locked ? (
          <div className="rounded-2xl border border-line bg-white p-8 text-center">
            <h3 className="text-xl font-bold">로그인 후 읽을 수 있어요</h3>
            <p className="text-muted mt-2">무료 가입 후 모든 강의를 읽고 진행 기록을 저장할 수 있습니다.</p>
            <Link href={learningLoginPath(`/lessons/${lessonCode}/${sectionNo}`)} className="inline-block mt-5 rounded-full bg-accent text-white px-6 py-2.5 font-semibold">
              로그인 · 가입
            </Link>
          </div>
        ) : (
          <>
            {children}
            <div className="mt-12 rounded-2xl border border-line bg-white p-5 flex flex-col sm:flex-row gap-3 items-center justify-between">
              <button
                onClick={() => markRead(lessonCode, sectionNo)}
                disabled={!ready || isRead}
                className={`rounded-full px-5 py-2.5 font-semibold ${isRead ? "bg-accent-soft text-accent" : "bg-ink text-white hover:bg-accent"}`}
              >
                {isRead ? "✓ 정독 완료" : "다 읽음 ㅇㅋ"}
              </button>
              <div className="flex gap-2">
                {prev && (
                  <Link href={`/lessons/${lessonCode}/${prev.no}`} className="rounded-full border border-line px-4 py-2.5 hover:bg-paper">
                    ← 이전 단원
                  </Link>
                )}
                {next ? (
                  <Link
                    href={`/lessons/${lessonCode}/${next.no}`}
                    onClick={() => markRead(lessonCode, sectionNo)}
                    className="rounded-full bg-accent text-white px-5 py-2.5 font-semibold hover:opacity-90"
                  >
                    다음 단원 →
                  </Link>
                ) : (
                  <Link
                    href={`/lessons/${lessonCode}/quiz`}
                    onClick={() => markRead(lessonCode, sectionNo)}
                    className="rounded-full bg-accent text-white px-5 py-2.5 font-semibold hover:opacity-90"
                  >
                    확인 퀴즈 풀기 →
                  </Link>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
