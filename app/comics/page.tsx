import Image from "next/image";
import Link from "next/link";
import { ALL_LESSONS, getLesson, lessonPublicCode } from "@/lib/courses";
import { getComic } from "@/lib/comics";
import { requireLearner } from "@/lib/require-learner";

export const dynamic = "force-dynamic";

const comicLessons = ALL_LESSONS.filter((lesson) => getComic(lesson.code));
const uniqueComics = new Set(comicLessons.map(l => getComic(l.code)!.image)).size;
const desktopLessons = comicLessons.filter((lesson) => lesson.code.startsWith("C"));

export default async function ComicsPage() {
  await requireLearner("/comics");
  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <h1 className="text-3xl font-bold">{comicLessons.length}강 · 8컷 만화 모아보기</h1>
      <p className="mt-3 text-muted">공통 내용의 만화는 두 과정에서 함께 봅니다. 만화 {uniqueComics}편 · {uniqueComics * 8}컷을 {comicLessons.length}강에 연결했습니다. 그림을 누르면 컷별로 크게 읽을 수 있습니다.</p>
      <nav aria-label="만화 과정 선택" className="mt-5 flex flex-wrap gap-3 text-sm">
        <Link href="#desktop" className="rounded-full bg-accent px-5 py-2.5 font-semibold text-white">데스크톱 {desktopLessons.length}편 바로 보기 ↓</Link>
        <Link href="/courses/C" className="rounded-full border border-line px-5 py-2.5">데스크톱 강의 순서 보기</Link>
        <Link href="#chatgpt" className="rounded-full bg-accent px-5 py-2.5 font-semibold text-white">ChatGPT 25강 바로 보기 ↓</Link>
        <Link href="/courses/D" className="rounded-full border border-line px-5 py-2.5">ChatGPT 강의 순서 보기</Link>
      </nav>
      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        {comicLessons.map((lesson) => {
          const comic = getComic(lesson.code);
          if (!comic) return null;
          const course = getLesson(lesson.code)!.course;
          const label = lessonPublicCode(course, lesson);
          return (
            <Link id={lesson.code === "C01" ? "desktop" : lesson.code === "E101" ? "chatgpt" : undefined} key={lesson.code} href={`/lessons/${lesson.code}/1`} className="block scroll-mt-24 rounded-xl border border-line bg-white overflow-hidden hover:border-accent">
              <Image src={comic.image} unoptimized alt={`${label}. ${lesson.title}: 8컷 만화 전체`} width={1776} height={888} sizes="(max-width: 640px) 100vw, 50vw" className="w-full h-auto" />
              <div className="p-4"><h2 className="font-bold">{label}. {lesson.title}</h2><p className="mt-1 text-sm text-muted">{lesson.summary}</p></div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
