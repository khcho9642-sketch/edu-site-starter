import comics from "../content/comics/lessons.json" with { type: "json" };
import archived from "../content/comics/archive-chatgpt.json" with { type: "json" };
export type Comic = { image:string; captions:string[] };
type Entry = Comic | { sharedWith:string };
const entries: Record<string,Entry> = comics;
const archive: Record<string,Comic> = archived;
export function getComic(code:string): Comic | undefined {
  const entry=entries[code] ?? archive[code];
  if (!entry) return undefined;
  if (!("sharedWith" in entry)) return entry;
  const source=entries[entry.sharedWith];
  if (!source || "sharedWith" in source) throw Error(`잘못된 공통 만화: ${code}`);
  return source;
}
