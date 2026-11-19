import Link from "next/link";
import { ARCHIVED_CHATGPT_COURSE, lessonPublicCode } from "@/lib/courses";
export default function ArchivePage(){return <div className="mx-auto max-w-3xl px-5 py-12">
 <h1 className="text-3xl font-bold">이전 ChatGPT 10강 보관</h1>
 <p className="mt-3 text-muted">이전 주소·자료·퀴즈 해설을 보존합니다. 기존 기록은 내 학습에 남으며 새 25강의 진도와 합산하지 않습니다.</p>
 <div className="my-6 flex flex-wrap gap-4"><Link href="/courses/D" className="font-semibold text-accent">새 ChatGPT 25강 →</Link><a href="/materials/chatgpt/chatgpt-10-lessons.zip" download>이전 10강 ZIP ↓</a></div>
 <ol className="space-y-3">{ARCHIVED_CHATGPT_COURSE.lessons.map(l=><li key={l.code} className="rounded-xl border border-line bg-white p-4"><Link href={`/lessons/${l.code}/1`} className="font-semibold">{lessonPublicCode(ARCHIVED_CHATGPT_COURSE,l)}. {l.title}</Link><a href={`/materials/chatgpt/archive-v1/manuscripts/${lessonPublicCode(ARCHIVED_CHATGPT_COURSE,l)}.md`} download className="ml-4 text-sm text-accent">원고 MD ↓</a></li>)}</ol>
 </div>;}
