import { notFound, permanentRedirect } from "next/navigation";
import Link from "next/link";
import { COURSES, coursePublicCode, getCourse } from "@/lib/courses";
import LessonList from "@/components/LessonList";

export function generateStaticParams() {
  return COURSES.map((c) => ({ code: coursePublicCode(c) }));
}

export default async function CoursePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  if (code.toUpperCase() === "E") permanentRedirect("/courses/D");
  const course = getCourse(code);
  if (!course) notFound();
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <p className="text-sm font-semibold text-accent">과정 {course.displayCode ?? course.code}</p>
      <h1 className="text-3xl font-bold mt-1">{course.title}</h1>
      <p className="text-muted mt-3 leading-relaxed">{course.description}</p>
      {(course.code === "C" || course.code === "E") && (
        <Link href={`/setup/${course.code === "C" ? "claude" : "chatgpt"}`} className="mt-6 block rounded-xl border border-line bg-white p-5 hover:border-accent focus-visible:outline-2 focus-visible:outline-accent">
          <span className="block text-sm font-semibold text-accent">설치 안내</span>
          <span className="mt-1 block font-semibold">{course.code === "C" ? "클로드" : "ChatGPT"} 설치·개발환경 준비 →</span>
          <span className="mt-2 block text-sm text-muted">앱 설치와 로그인부터, 개발할 때 필요한 도구·GitHub·배포 준비까지</span>
        </Link>
      )}
      <LessonList courseCode={course.code} />
      {course.code === "E" && <Link href="/archive/chatgpt" className="mt-6 inline-block text-sm text-muted underline">이전 ChatGPT 10강 보관</Link>}
    </div>
  );
}
