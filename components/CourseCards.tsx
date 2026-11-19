"use client";
import Link from "next/link";
import { COURSES, coursePublicCode } from "@/lib/courses";
import { lessonStatus, useProgress } from "@/lib/progress";
import ProgressBar from "./ProgressBar";
import { readPercent } from "@/lib/progress-model";

export function coursePercent(done: number, total: number) {
  return total ? Math.round((done / total) * 100) : 0;
}

export default function CourseCards() {
  const { progress } = useProgress();
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {COURSES.map((c) => {
        const total = c.lessons.length;
        const done = c.lessons.filter((l) => lessonStatus(progress, l.code) === 2).length;
        const open = c.lessons.filter((l) => l.available).length;
        return (
          <Link
            key={c.code}
            href={`/courses/${coursePublicCode(c)}`}
            className="group rounded-2xl border border-line bg-white p-6 flex flex-col hover:border-accent hover:shadow-sm transition"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-widest text-accent">과정 {c.displayCode ?? c.code}{c.code === "C" ? " · 데스크톱 앱" : ""}</span>
              <span className="text-xs text-muted">{total}강</span>
            </div>
            <h3 className="mt-3 text-xl font-bold">{c.title}</h3>
            <p className="text-sm text-muted mt-1">{c.tagline}</p>
            <p className="text-sm mt-4 leading-relaxed flex-1">{c.description}</p>
            <div className="mt-6">
              <ProgressBar value={readPercent(progress.reads, c.lessons)} label={open ? "공개 단원 읽기 진도율" : "공개 준비 중"} />
              <p className="text-xs text-muted mt-2">전체 과정 수료율 {coursePercent(done, total)}% · 완료 {done}/{total}강</p>
              <p className="text-xs text-muted mt-2">
                {open === 0 ? "준비 중임. 존버 ㄱ" : open === total ? "전 강의 공개 중" : `${open}강 공개 중`}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

