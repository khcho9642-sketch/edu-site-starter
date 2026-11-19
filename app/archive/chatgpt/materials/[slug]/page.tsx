import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import materials from "@/content/chatgpt/archive-materials-v1.json";
import { requireLearner } from "@/lib/require-learner";
export const dynamic = "force-dynamic";
export default async function Material({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params,m=materials.find(m=>m.slug===slug);if(!m)notFound();
 await requireLearner(`/archive/chatgpt/materials/${encodeURIComponent(slug)}`);
 const md=fs.readFileSync(path.join(process.cwd(),"content/chatgpt/archive-materials",`${slug}.md`),"utf8");
 return <div className="mx-auto max-w-3xl px-5 py-12"><Link href="/archive/chatgpt/materials">← 이전판 실습 자료</Link><p className="my-5 rounded-xl bg-accent-soft p-4">이전판 자료입니다. 새 과정과 샘플·강의 번호가 다릅니다.</p><a href={m.download} download className="mb-6 inline-block rounded-full bg-accent px-5 py-2.5 text-white">이전판 {m.download.endsWith('.csv')?'CSV':'MD'} 다운로드</a><article className="prose-edu"><ReactMarkdown remarkPlugins={[remarkGfm]}>{md.replaceAll('/chatgpt-materials/','/archive/chatgpt/materials/').replaceAll('](/chatgpt-materials)','](/archive/chatgpt/materials)').replaceAll('](/courses/D)','](/archive/chatgpt)')}</ReactMarkdown></article></div>;
}
