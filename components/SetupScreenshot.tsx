import Image from "next/image";
import screenshots from "@/content/setup/screenshots.json";
import walkthrough from "@/content/walkthrough/screenshots.json";

export type SetupCapture = {
  title: string; width: number; height: number; source: string; provenance: string;
  steps: string[]; result: string; note: string; marks: { n: number; x: number; y: number }[];
};

export function SetupScreenshot({ src }: { src: string }) {
  const shot = ({ ...screenshots, ...walkthrough } as Record<string, SetupCapture>)[src];
  if (!shot) throw new Error(`Unknown setup screenshot: ${src}`);
  return (
    <figure className="setup-capture not-prose my-7 overflow-hidden rounded-2xl border border-line bg-card">
      <figcaption className="border-b border-line px-4 py-4 sm:px-6">
        <p className="text-xs font-bold tracking-wide text-accent">화면을 보며 따라 하기</p>
        <h4 className="mt-1 text-base font-bold">{shot.title}</h4>
      </figcaption>
      <div className="relative bg-white">
        <Image src={src} alt={shot.title} width={shot.width} height={shot.height} unoptimized className="h-auto w-full" style={{ margin: 0, border: 0, borderRadius: 0 }} />
        {shot.marks.map((mark) => <span key={mark.n} aria-hidden="true" style={{ left: `${mark.x}%`, top: `${mark.y}%` }} className="pointer-events-none absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-orange-600 text-xs font-bold text-white shadow sm:h-8 sm:w-8 sm:text-sm">{mark.n}</span>)}
      </div>
      <div className="setup-capture-description px-4 py-5 text-sm leading-7 sm:px-6">
        <ol className="list-decimal space-y-2 pl-5">{shot.steps.map((step, i) => <li key={i}>{step}</li>)}</ol>
        <p className="rounded-xl border border-accent/20 bg-accent/5 p-3"><strong className="text-accent">다음으로 넘어가기 전</strong><br />{shot.result}</p>
        {shot.note && <p className="text-muted">{shot.note}</p>}
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted">
          <a href={src} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">원본 화면 크게 보기 ↗</a>
          <a href={shot.source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{src.startsWith("/materials/walkthrough/") ? "참고 자료 열기" : "공식 페이지 열기"} ↗</a>
          <span>{shot.provenance}</span>
        </div>
      </div>
    </figure>
  );
}
