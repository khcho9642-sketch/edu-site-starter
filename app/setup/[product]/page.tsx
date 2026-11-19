import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireLearner } from "@/lib/require-learner";
import { SetupGuide } from "@/components/SetupGuide";

export const dynamic = "force-dynamic";

const guides = {
  claude: { name: "클로드", course: "C", first: "C01" },
  chatgpt: { name: "ChatGPT", course: "D", first: "E101" },
} as const;

export default async function SetupPage({ params }: { params: Promise<{ product: string }> }) {
  const { product } = await params;
  if (product !== "claude" && product !== "chatgpt") notFound();
  await requireLearner(`/setup/${product}`);
  const guide = guides[product];
  const root = path.join(process.cwd(), "content/setup");
  const md = [fs.readFileSync(path.join(root, `${product}.md`), "utf8"), fs.readFileSync(path.join(root, "common.md"), "utf8")].join("\n\n");
  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <Link href={`/courses/${guide.course}`} className="text-sm text-muted hover:text-accent">← {guide.name} 강의 목록</Link>
      <h1 className="mt-3 text-3xl font-bold">{guide.name} 설치·개발환경 준비</h1>
      <p className="mt-3 text-sm text-muted">조회계사 · Windows 중심 · 공식 안내 확인 2026-11-15</p>
      <div className="mt-6 rounded-2xl border border-line bg-card p-5 sm:p-6">
        <p className="font-bold">처음이라면 앱 설치 → 로그인 → 첫 답변까지만</p>
        <p className="mt-2 text-sm leading-7 text-muted">1~2단계로 시작하세요. 개발 도구·GitHub·DART·배포는 필요한 실습을 할 때 준비합니다. 그림의 번호와 아래 설명을 함께 보고, 확인 결과를 만족하면 다음으로 넘어갑니다.</p>
        <nav aria-label="설치 안내 목차" className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {["앱 설치·첫 대화", "계정·이용 범위", "개발 도구 (선택)", "GitHub (선택)", "DART (선택)", "Vercel (선택)", "로컬 실행", "환경변수·배포", "문제 해결", "완료 확인"].map((label, i) => <a key={label} href={`#step-${i + 1}`} className="rounded-lg border border-line px-3 py-2 text-sm hover:text-accent">{i + 1}. {label}</a>)}
        </nav>
      </div>
      <SetupGuide markdown={md} />
      <Link href={`/lessons/${guide.first}/1`} className="mt-8 inline-flex min-h-11 items-center rounded-xl bg-accent px-5 py-3 font-semibold text-white">1강 시작하기 →</Link>
    </div>
  );
}
