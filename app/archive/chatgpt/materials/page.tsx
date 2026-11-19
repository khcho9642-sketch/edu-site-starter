import Link from "next/link";
import materials from "@/content/chatgpt/archive-materials-v1.json";
import { requireLearner } from "@/lib/require-learner";
export const dynamic = "force-dynamic";
export default async function ArchivedMaterials(){
 await requireLearner("/archive/chatgpt/materials");
 return <div className="mx-auto max-w-3xl px-5 py-12">
 <Link href="/archive/chatgpt" className="text-sm text-accent">← 이전 ChatGPT 10강</Link>
 <h1 className="mt-3 text-3xl font-bold">이전판 실습 자료</h1>
 <p className="mt-3 text-muted">기존 10강 전용 자료입니다. 지출 샘플의 검수 합계는 40,000원이며 새 25강의 28,000원 샘플과 다릅니다.</p>
 <ul className="mt-6 space-y-3">{materials.map(m=><li key={m.slug} className="flex flex-wrap justify-between gap-3 rounded-xl border border-line bg-white p-5"><Link href={`/archive/chatgpt/materials/${m.slug}`} className="font-semibold">{m.title} →</Link><a href={m.download} download className="text-sm text-accent">파일 다운로드 ↓</a></li>)}</ul>
 </div>;}
