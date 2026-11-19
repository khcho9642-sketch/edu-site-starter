"use client";
import Link from "next/link";
import { COURSES, FIRST_LESSON, PASS_SCORE, coursePublicCode, getLesson, getLessonByStorageCode, lessonPublicCode } from "@/lib/courses";
import { lessonStatus, useProgress } from "@/lib/progress";
import { supabaseEnabled } from "@/lib/supabase/client";
import ProgressBar from "@/components/ProgressBar";
import { coursePercent } from "@/components/CourseCards";
import { readPercent } from "@/lib/progress-model";

export default function Dashboard() {
  const { progress, user, profile, ready } = useProgress();
  if (!ready) return <div className="mx-auto max-w-3xl px-5 py-16 text-muted">불러오는 중…</div>;

  const last = progress.last ? getLessonByStorageCode(progress.last.lesson) : undefined;
  const attempts = Object.entries(progress.best);
  const fullyDone = COURSES.filter((c) => c.lessons.every((l) => lessonStatus(progress, l.code) === 2));

  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="text-3xl font-bold">내 학습</h1>
      <p className="text-muted mt-2">
        {user
          ? `${profile?.nickname ?? "회원"}님의 읽기 기록은 계정과 동기화됩니다. 퀴즈 점수는 이 브라우저에만 저장됩니다.`
          : supabaseEnabled
            ? "로그인하지 않아 이 브라우저에 저장된 기록을 보여줍니다."
            : "진행 기록은 이 브라우저에 저장됩니다."}
      </p>

      {user && ready && profile && !profile.nickname && (
        <Link
          href="/account"
          className="mt-4 block rounded-xl border border-accent/40 bg-accent-soft px-5 py-3 text-sm hover:border-accent transition"
        >
          아직 닉네임이 없어요 · <span className="font-semibold text-accent">닉네임 설정하러 가기 →</span>
        </Link>
      )}

      {last && progress.last ? (
        <Link
          href={`/lessons/${last.code}/${progress.last.section}`}
          className="mt-8 block rounded-2xl bg-ink text-white p-6 hover:bg-accent transition"
        >
          <p className="text-sm text-white/70">이어서 학습하기</p>
          <p className="text-xl font-bold mt-1">
            {lessonPublicCode(getLesson(last.code)!.course, last)}. {last.title} · 단원 {progress.last.section}
          </p>
        </Link>
      ) : (
        <Link href={`/lessons/${FIRST_LESSON}/1`} className="mt-8 block rounded-2xl bg-ink text-white p-6 hover:bg-accent transition">
          <p className="text-sm text-white/70">뉴비임?</p>
          <p className="text-xl font-bold mt-1">
            {FIRST_LESSON}. {getLesson(FIRST_LESSON)?.lesson.title}부터 ㄱㄱ →
          </p>
        </Link>
      )}

      <p className="text-sm text-muted mt-4">이전판과 종료된 터미널 과정의 기록은 아래에 보관됩니다. 데스크톱 과정은 별도로 학습합니다.</p>
      <h2 className="text-xl font-bold mt-12 mb-4">과정별 읽기 진도율 · 수료율</h2>
      <div className="space-y-4">
        {COURSES.map((c) => {
          const done = c.lessons.filter((l) => lessonStatus(progress, l.code) === 2).length;
          const doing = c.lessons.filter((l) => lessonStatus(progress, l.code) === 1).length;
          return (
            <Link key={c.code} href={`/courses/${coursePublicCode(c)}`} className="block rounded-xl border border-line bg-white p-5 hover:border-accent">
              <div className="flex justify-between items-baseline mb-3">
                <span className="font-semibold">
                  과정 {c.displayCode ?? c.code}. {c.title}
                  {fullyDone.includes(c) && <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-accent text-white">과정 완료</span>}
                </span>
                <span className="text-sm text-muted">학습 중 {doing}강</span>
              </div>
              <ProgressBar value={readPercent(progress.reads, c.lessons)} label={c.lessons.some((l) => l.available) ? "공개 단원 읽기 진도율" : "공개 준비 중"} />
              <p className="text-xs text-muted mt-2">전체 과정 수료율 {coursePercent(done, c.lessons.length)}% · 완료 {done}/{c.lessons.length}강</p>
            </Link>
          );
        })}
      </div>

      <h2 className="text-xl font-bold mt-12 mb-4">자가학습 퀴즈 기록 · 이 브라우저</h2>
      {attempts.length === 0 ? (
        <p className="text-muted">아직 퀴즈 안 풀었음. 강의 다 읽고 ㄱ</p>
      ) : (
        <table className="w-full text-sm bg-white rounded-xl overflow-hidden border border-line">
          <thead className="bg-paper text-left">
            <tr>
              <th className="p-3">강의</th>
              <th className="p-3">최고 점수</th>
              <th className="p-3">결과</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map(([code, score]) => (
              <tr key={code} className="border-t border-line">
                <td className="p-3">
                  {(() => { const l = getLessonByStorageCode(code); return l ? `${lessonPublicCode(getLesson(l.code)!.course, l)}. ${l.title}` : code; })()}
                </td>
                <td className="p-3 tabular-nums">{score}점</td>
                <td className="p-3">{score >= PASS_SCORE ? "통과 ㅊㅊ" : "재도전 ㄱ"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {(progress.legacy.reads.length > 0 || Object.keys(progress.legacy.best).length > 0 || progress.legacy.last) && (
        <section className="mt-10 rounded-xl border border-line bg-white p-5">
          <h2 className="text-lg font-bold">이전 교육과정 기록 (보관)</h2>
          <p className="text-sm text-muted mt-2">읽은 단원 {progress.legacy.reads.length}개 · 새 교육과정의 진도와 합산하지 않습니다.</p>
          <ul className="mt-3 text-sm space-y-1">{Object.entries(progress.legacy.best).map(([code, score]) => <li key={code}>{code.startsWith("E") ? `이전 ChatGPT D${code.slice(1)}` : `${code.startsWith("C") ? "이전 터미널 " : "이전판 "}${code}`}: 퀴즈 최고 {score}점 (보관 기록)</li>)}</ul>
          <Link href="/archive/chatgpt" className="mt-3 block text-sm text-accent underline">이전 ChatGPT 10강 보기</Link>
          {progress.legacy.last && <Link href={`/lessons/${progress.legacy.last.lesson}/${progress.legacy.last.section}`} className="mt-3 block text-sm text-accent">이전 ChatGPT D{progress.legacy.last.lesson.slice(1)} · 단원 {progress.legacy.last.section} 이어 보기 →</Link>}
        </section>
      )}
    </div>
  );
}
