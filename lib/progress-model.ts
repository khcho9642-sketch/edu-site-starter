import { lessonStorageCode, type Lesson } from "./courses.ts";

export type Progress = {
  reads: string[];
  best: Record<string, number>;
  last?: { lesson: string; section: number };
  legacy: { reads: string[]; best: Record<string, number>; last?: { lesson:string; section:number } };
  pendingReads: string[];
};

export const emptyProgress = (): Progress => ({ reads: [], best: {}, legacy: { reads: [], best: {} }, pendingReads: [] });
const oldCode = /^(?:[ABC](?:[1-9]|10)|[CE](?:0[1-9]|10))$/;
const retiredRead = (key: unknown): key is string => typeof key === "string" && /^[CE](?:0[1-9]|10)-[1-3]$/.test(key);

/** Validate persisted identities (desktop D), not public route labels (desktop C). */
export function validRead(key: unknown, lessons: Lesson[]): key is string {
  if (typeof key !== "string") return false;
  return lessons.some((l) => l.available && l.sections.some((s) => key === `${lessonStorageCode(l)}-${s.no}`));
}

export function normalizeProgress(raw: unknown, lessons: Lesson[]): Progress {
  const p = (raw && typeof raw === "object" ? raw : {}) as Partial<Progress>;
  const reads = Array.isArray(p.reads) ? p.reads.filter((r): r is string => typeof r === "string") : [];
  const archiveLast=[p.last,p.legacy?.last].find(last => last && /^E(?:0[1-9]|10)$/.test(last.lesson) && [1,2,3].includes(last.section));
  const best = (value: unknown, legacy: boolean) => Object.fromEntries(
    Object.entries(value && typeof value === "object" ? value : {}).filter(([c, n]) =>
      (legacy ? oldCode.test(c) && !lessons.some((l) => l.available && lessonStorageCode(l) === c) : lessons.some((l) => l.available && lessonStorageCode(l) === c)) &&
      typeof n === "number" && Number.isFinite(n) && n >= 0 && n <= 100),
  );
  return {
    reads: [...new Set(reads.filter((r) => validRead(r, lessons)))],
    best: best(p.best, false),
    last: p.last && validRead(`${p.last.lesson}-${p.last.section}`, lessons) ? p.last : undefined,
    legacy: {
      reads: [...new Set([...reads, ...(Array.isArray(p.legacy?.reads) ? p.legacy.reads : [])]
        .filter((r) => typeof r === "string" && oldCode.test(r.split("-")[0]) && !validRead(r, lessons)))],
      best: { ...best(p.best, true), ...best(p.legacy?.best, true) },
      ...(archiveLast ? {last:archiveLast} : {}),
    },
    pendingReads: Array.isArray(p.pendingReads) ? [...new Set(p.pendingReads.filter((r) => validRead(r, lessons) || retiredRead(r)))] : [],
  };
}

export function mergeRemote(local: Progress, remoteReads: string[], remoteBest: Record<string, number>, lessons: Lesson[]): Progress {
  const remote = normalizeProgress({ reads: remoteReads, best: remoteBest }, lessons);
  return {
    ...local,
    reads: [...new Set([...remote.reads, ...local.reads])],
    legacy: {
      ...local.legacy,
      reads: [...new Set([...local.legacy.reads, ...remote.legacy.reads])],
      best: Object.fromEntries([...new Set([...Object.keys(local.legacy.best), ...Object.keys(remote.legacy.best)])]
        .map((code) => [code, Math.max(local.legacy.best[code] ?? 0, remote.legacy.best[code] ?? 0)])),
    },
  };
}

export function readPercent(reads: string[], lessons: Lesson[]): number {
  const keys = lessons.filter((l) => l.available).flatMap((l) => l.sections.map((s) => `${lessonStorageCode(l)}-${s.no}`));
  return keys.length ? Math.round(keys.filter((key) => reads.includes(key)).length / keys.length * 100) : 0;
}

export type MemberRow = { member_key: string; nickname: string; lesson_code: string | null; sections_read: number; is_me?: boolean };
export function memberReadPercent(rows: MemberRow[], lessons: Lesson[]): number {
  const open = lessons.filter((l) => l.available);
  const total = open.reduce((n, l) => n + l.sections.length, 0);
  const read = open.reduce((n, l) => n + Math.max(0, Math.min(rows.find((r) => r.lesson_code === lessonStorageCode(l))?.sections_read ?? 0, l.sections.length)), 0);
  return total ? Math.round(read / total * 100) : 0;
}
