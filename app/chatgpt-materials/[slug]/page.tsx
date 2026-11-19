import archivedMaterials from "@/content/chatgpt/archive-materials-v1.json";
import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getChatgptMaterial } from "@/lib/chatgpt-materials";
import { requireLearner } from "@/lib/require-learner";

export const dynamic = "force-dynamic";

export default async function ChatgptMaterialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await requireLearner(`/chatgpt-materials/${encodeURIComponent(slug)}`);
  const material = getChatgptMaterial(slug);
  if (!material && archivedMaterials.some(m=>m.slug===slug)) permanentRedirect(`/archive/chatgpt/materials/${slug}`);
  if (!material) notFound();
  const md = fs.readFileSync(path.join(process.cwd(), material.sourceFile), "utf8")
    .replaceAll("/desktop-materials/", "/chatgpt-materials/").replaceAll("/lessons/C", "/lessons/E1").replaceAll("/courses/C", "/courses/D");
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <Link href="/chatgpt-materials" className="text-sm text-muted hover:text-accent">← 실습 자료 목록</Link>
      <div className="mt-5 mb-8 flex flex-wrap gap-3">
        <a href={material.download} download className="rounded-full bg-accent px-5 py-2.5 font-semibold text-white">{material.download.endsWith(".csv") ? "CSV" : "MD"} 파일 내려받기</a>
        <Link href="/courses/D" className="rounded-full border border-line px-5 py-2.5">ChatGPT 강의 목록</Link>
      </div>
      <article className="prose-edu"><ReactMarkdown remarkPlugins={[remarkGfm]}>{md}</ReactMarkdown></article>
    </div>
  );
}
