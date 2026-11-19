import { getComic } from "@/lib/comics";

export default function LessonComic({ code, title }: { code: string; title: string }) {
  const comic = getComic(code);
  if (!comic) return null;
  return (
    <figure className="my-6" aria-labelledby={`comic-title-${code}`}>
      <figcaption id={`comic-title-${code}`} className="font-semibold mb-3">8컷으로 보는 ‘{title}’</figcaption>
      <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {comic.captions.map((caption, i) => (
          <li key={caption} className="min-w-0">
            <div role="img" aria-label={`${i + 1}컷. ${caption}`} className="aspect-square rounded-lg border border-line" style={{
              backgroundImage: `url('${comic.image}')`,
              backgroundSize: "400% 200%",
              backgroundPosition: `${(i % 4) * 100 / 3}% ${i < 4 ? 0 : 100}%`,
            }} />
            <p className="text-xs text-muted mt-1">{i + 1}. {caption}</p>
          </li>
        ))}
      </ol>
      <p className="text-xs text-muted mt-2">모바일에서는 컷 순서대로 크게 표시됩니다. 글자로 된 설명도 함께 읽을 수 있습니다.</p>
    </figure>
  );
}
