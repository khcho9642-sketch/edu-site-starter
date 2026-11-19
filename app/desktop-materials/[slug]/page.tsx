import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getDesktopMaterial } from "@/lib/desktop-materials";
import { requireLearner } from "@/lib/require-learner";

export const dynamic = "force-dynamic";

export default async function DesktopMaterialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await requireLearner(`/desktop-materials/${encodeURIComponent(slug)}`);
  const material = getDesktopMaterial(slug);
  if (!material) notFound();
  const md = fs.readFileSync(path.join(process.cwd(), "content/desktop/materials", `${material.slug}.md`), "utf8");
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <Link href="/desktop-materials" className="text-sm text-muted hover:text-accent">← 실습 자료 목록</Link>
      <div className="mt-5 mb-8 flex flex-wrap gap-3">
        <a href={material.download} download className="rounded-full bg-accent px-5 py-2.5 font-semibold text-white">MD 파일 내려받기</a>
        <Link href="/courses/C" className="rounded-full border border-line px-5 py-2.5">데스크톱 강의 목록</Link>
      </div>
      <article className="prose-edu"><ReactMarkdown remarkPlugins={[remarkGfm]}>{md}</ReactMarkdown></article>
    </div>
  );
}
