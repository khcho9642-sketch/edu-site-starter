import Link from "next/link";
import { getLesson, lessonPublicCode } from "@/lib/courses";

export default function ArchivedLesson({code,children}:{code:string;children:React.ReactNode}) {
  const {course,lesson}=getLesson(code)!;
  return <div className="mx-auto max-w-3xl px-5 py-10">
    <div className="rounded-xl border border-line bg-accent-soft p-5">
      <h1 className="text-xl font-bold">이전 ChatGPT 10강 · {lessonPublicCode(course,lesson)}. {lesson.title}</h1>
      <p className="mt-2 text-sm">이전판 보관 자료입니다. 기존 읽기·퀴즈 기록은 내 학습에 보관하며 새 25강 진도와 합산하지 않습니다.</p>
      <div className="mt-3 flex flex-wrap gap-4 text-sm font-semibold text-accent"><Link href="/courses/D">새 ChatGPT 25강 →</Link><Link href="/archive/chatgpt">이전판 목록</Link><Link href="/archive/chatgpt/materials">이전판 실습 자료</Link><Link href="/dashboard">내 학습 기록</Link></div>
    </div>
    <nav aria-label="이전판 단원" className="my-6 flex flex-wrap gap-4 text-sm">{lesson.sections.map(s=><Link key={s.no} href={`/lessons/${code}/${s.no}`}>단원 {s.no}</Link>)}<Link href={`/lessons/${code}/quiz`}>퀴즈·해설</Link></nav>
    {children}
  </div>;
}
