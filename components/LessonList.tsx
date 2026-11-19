"use client";
import Link from "next/link";
import { getCourse, lessonPublicCode } from "@/lib/courses";
import { lessonPercent, lessonStatus, useProgress } from "@/lib/progress";
import ProgressBar from "./ProgressBar";
import { coursePercent } from "./CourseCards";
import { readPercent } from "@/lib/progress-model";
import { learningLoginPath } from "@/lib/learning-access";

const LABEL = ["시작 전", "학습 중", "완료"] as const;
const BADGE = [
  "bg-line text-muted",
  "bg-amber-100 text-amber-800",
  "bg-accent-soft text-accent",
] as const;

export default function LessonList({ courseCode }: { courseCode: string }) {
  const course = getCourse(courseCode)!;
  const { progress, user, ready } = useProgress();
  const done = course.lessons.filter((l) => lessonStatus(progress, l.code) === 2).length;

  return (
    <>
      {ready && !user && <p className="mt-6 rounded-xl bg-accent-soft p-4 text-sm leading-relaxed">
        목차는 로그인 없이 볼 수 있습니다. 강의 본문·퀴즈·실습 자료는 로그인 후 무료로 이용하세요.
        <Link href={learningLoginPath(`/lessons/${course.lessons[0].code}/1`)} className="ml-2 font-semibold text-accent underline">로그인하기</Link>
      </p>}
      <div className="mt-8 rounded-xl border border-line bg-white p-5">
        <ProgressBar value={readPercent(progress.reads, course.lessons)} label="공개 단원 읽기 진도율" />
        <p className="text-xs text-muted mt-2">전체 과정 수료율 {coursePercent(done, course.lessons.length)}% · 완료 {done}/{course.lessons.length}강</p>
      </div>
      <ol className="mt-6 space-y-3">
        {course.lessons.map((l) => {
          const st = lessonStatus(progress, l.code);
          const inner = (
            <div className="flex items-start gap-4">
              <span className="font-mono text-sm text-muted w-8 pt-0.5">{lessonPublicCode(course, l)}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold">{l.title}</h3>
                  {l.available ? (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${BADGE[st]}`}>{LABEL[st]}</span>
                  ) : (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-line text-muted">준비 중</span>
                  )}
                </div>
                <p className="text-sm text-muted mt-1">{l.summary}</p>
                {l.available && st > 0 && (
                  <div className="mt-3 max-w-xs">
                    <ProgressBar value={lessonPercent(progress, l.code)} />
                  </div>
                )}
              </div>
            </div>
          );
          return (
            <li key={l.code}>
              {l.available ? (
                <Link
                  href={`/lessons/${l.code}/1`}
                  prefetch={false}
                  className="block rounded-xl border border-line bg-white p-4 hover:border-accent transition"
                >
                  {inner}
                </Link>
              ) : (
                <div className="rounded-xl border border-dashed border-line p-4 opacity-70">{inner}</div>
              )}
            </li>
          );
        })}
      </ol>
    </>
  );
}

