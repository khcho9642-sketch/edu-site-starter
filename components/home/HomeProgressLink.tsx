"use client";
import Link from "next/link";
import { FIRST_LESSON, getLessonByStorageCode } from "@/lib/courses";
import { useProgress } from "@/lib/progress";

export default function HomeProgressLink() {
  const { progress, ready } = useProgress();
  const previous = ready ? progress.last : undefined;
  const lesson = previous ? getLessonByStorageCode(previous.lesson) : undefined;
  const last = lesson?.available && previous && lesson.sections.some((s) => s.no === previous.section)
    ? { lesson: lesson.code, section: previous.section }
    : null;
  return (
    <div className="flex shrink-0 flex-wrap items-center gap-2 text-sm">
      <Link href={last ? `/lessons/${last.lesson}/${last.section}` : `/lessons/${FIRST_LESSON}/1`} className="rounded-lg bg-accent px-4 py-3 font-semibold text-white hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">{last ? `${last.lesson} 이어보기` : "1강부터 시작"}</Link>
      <Link href="/dashboard" className="rounded-lg border border-line px-4 py-3 font-semibold hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">내 진도</Link>
    </div>
  );
}
