import Link from "next/link";
import { getCourse } from "@/lib/courses";
import { DESKTOP_MATERIALS } from "@/lib/desktop-materials";
import { requireLearner } from "@/lib/require-learner";

export const dynamic = "force-dynamic";

export default async function DesktopMaterialsPage() {
  await requireLearner("/desktop-materials");
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <Link href="/courses/C" className="text-sm text-muted hover:text-accent">← 데스크톱 {getCourse("C")?.lessons.length}강</Link>
      <h1 className="mt-3 text-3xl font-bold">데스크톱 실습 자료</h1>
      <p className="mt-3 text-muted">모든 거래·인물·메일·서비스는 가짜입니다. 자료를 읽거나 MD 파일을 내려받아 Claude에 첨부하세요. 검수 기준은 먼저 결과를 만든 뒤 비교하세요.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href="/materials/desktop/claude-desktop-25-lessons.zip" download className="rounded-full bg-accent px-5 py-2.5 font-semibold text-white">25강 원고·실습·퀴즈 ZIP 받기</a>
      </div>
      <ul className="mt-8 space-y-3">
        <li><Link href="/setup/claude" className="block rounded-xl border border-line bg-white p-5 hover:border-accent">클로드 설치·개발환경 준비 →</Link></li>
        {DESKTOP_MATERIALS.filter((m) => m.slug !== "guide").map((m) => (
          <li key={m.slug}>
            <Link href={`/desktop-materials/${m.slug}`} className="block rounded-xl border border-line bg-white p-5 hover:border-accent">{m.title} →</Link>
          </li>
        ))}
      </ul>
      <h2 className="mt-10 text-xl font-bold">강의별 전체 원고 MD</h2>
      <ul className="mt-4 space-y-2 text-sm">
        {getCourse("C")?.lessons.map((lesson) => (
          <li key={lesson.code}><a href={`/materials/desktop/manuscripts/${lesson.code}.md`} download className="text-accent underline underline-offset-4">{lesson.code}. {lesson.title} ↓</a></li>
        ))}
      </ul>
    </div>
  );
}
