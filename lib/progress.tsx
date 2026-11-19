"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { getSupabase } from "./supabase/client";
import { ALL_LESSONS, getLesson, lessonStorageCode } from "./courses";
import { emptyProgress, mergeRemote, normalizeProgress, readPercent, validRead, type Progress } from "./progress-model";
export type { Progress } from "./progress-model";

const storageKey = (id?: string) => `edu-progress-v2:${id ?? "guest"}`;
function loadLocal(id?: string): Progress {
  try {
    // v1 is left intact. Only the guest scope imports it; account caches are isolated.
    const raw = localStorage.getItem(storageKey(id)) ?? (!id ? localStorage.getItem("edu-progress-v1") : null);
    return normalizeProgress(raw ? JSON.parse(raw) : null, ALL_LESSONS);
  } catch { return emptyProgress(); }
}
function saveLocal(p: Progress, id?: string): boolean {
  try { localStorage.setItem(storageKey(id), JSON.stringify(p)); return true; }
  catch { return false; }
}

export type Profile = { nickname: string | null; role: string };
type Ctx = {
  progress: Progress;
  user: User | null;
  profile: Profile | null;
  ready: boolean;
  syncError: string | null;
  markRead: (lesson: string, section: number) => Promise<void>;
  setLast: (lesson: string, section: number) => void;
  recordQuiz: (lesson: string, score: number) => void;
  retrySync: () => Promise<void>;
  setNickname: (nickname: string) => Promise<{ error?: string }>;
};
const ProgressCtx = createContext<Ctx | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<Progress>(emptyProgress);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [ready, setReady] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const current = useRef<Progress>(emptyProgress());
  const identity = useRef<User | null>(null);
  const generation = useRef(0);
  const storageFailed = useRef(false);

  const commit = useCallback((p: Progress) => {
    current.current = p;
    setProgress(p);
    storageFailed.current = !saveLocal(p, identity.current?.id);
    if (storageFailed.current) setSyncError("이 브라우저에 기록을 저장하지 못했습니다. 저장 공간 설정을 확인해 주세요.");
  }, []);

  const syncRemote = useCallback(async (u: User) => {
    const requestGeneration = generation.current;
    const active = () => identity.current?.id === u.id && generation.current === requestGeneration;
    const sb = getSupabase();
    if (!sb) return;
    try {
      const pending = [...current.current.pendingReads];
      if (pending.length) {
        const { error } = await sb.from("section_reads").upsert(pending.map((key) => {
          const [lesson_code, section] = key.split("-");
          return { user_id: u.id, lesson_code, section_no: Number(section) };
        }));
        if (error) throw error;
        if (!active()) return;
        commit({ ...current.current, pendingReads: current.current.pendingReads.filter((r) => !pending.includes(r)) });
      }
      const [reads, attempts, prof] = await Promise.all([
        sb.from("section_reads").select("lesson_code, section_no").eq("user_id", u.id),
        // Old scores remain available as historical records; new practice scores stay local.
        sb.from("quiz_attempts").select("lesson_code, score").eq("user_id", u.id),
        sb.from("profiles").select("nickname, role").eq("id", u.id).single(),
      ]);
      if (!active()) return;
      if (reads.error || attempts.error || prof.error) throw reads.error ?? attempts.error ?? prof.error;
      const best: Record<string, number> = {};
      (attempts.data ?? []).forEach((a) => { best[a.lesson_code] = Math.max(best[a.lesson_code] ?? 0, a.score); });
      commit(mergeRemote(current.current, (reads.data ?? []).map((r) => `${r.lesson_code}-${r.section_no}`), best, ALL_LESSONS));
      setProfile(prof.data);
      if (!storageFailed.current) setSyncError(null);
    } catch {
      if (active()) setSyncError(storageFailed.current
        ? "계정 동기화와 브라우저 저장에 실패했습니다. 페이지를 닫기 전에 연결과 저장 공간을 확인해 주세요."
        : "계정과 동기화하지 못했습니다. 이 브라우저의 기록은 보관됩니다. 다시 시도해 주세요.");
    }
  }, [commit]);

  useEffect(() => {
    const sb = getSupabase();
    let disposed = false;
    const switchUser = (u: User | null) => {
      generation.current += 1;
      identity.current = u;
      setUser(u);
      setProfile(null);
      setSyncError(null);
      commit(loadLocal(u?.id));
      setReady(true);
      if (u) void syncRemote(u);
    };
    if (!sb) { switchUser(null); return; }
    let authEventReceived = false;
    const { data: sub } = sb.auth.onAuthStateChange((event, session) => {
      if (disposed || event === "TOKEN_REFRESHED" || event === "INITIAL_SESSION") return;
      authEventReceived = true;
      // Run outside the auth callback to avoid blocking the client's auth lock.
      setTimeout(() => { if (!disposed) switchUser(session?.user ?? null); }, 0);
    });
    sb.auth.getUser().then(({ data, error }) => {
      if (disposed || authEventReceived) return;
      switchUser(data.user);
      if (error && error.name !== "AuthSessionMissingError") setSyncError("로그인 상태를 확인하지 못했습니다. 현재는 이 브라우저에 기록합니다.");
    }).catch(() => {
      if (!disposed && !authEventReceived) { switchUser(null); setSyncError("로그인 상태를 확인하지 못했습니다."); }
    });
    return () => { disposed = true; generation.current += 1; sub.subscription.unsubscribe(); };
  }, [commit, syncRemote]);

  const markRead = async (lesson: string, section: number) => {
    const entry = getLesson(lesson)?.lesson;
    if (!entry) return;
    lesson = lessonStorageCode(entry);
    const key = `${lesson}-${section}`;
    if (!ready || !validRead(key, ALL_LESSONS)) return;
    const p = current.current;
    const u = identity.current;
    commit({ ...p, reads: [...new Set([...p.reads, key])], pendingReads: u ? [...new Set([...p.pendingReads, key])] : [] });
    if (u) await syncRemote(u);
  };
  const setLast = useCallback((lesson: string, section: number) => {
    const entry = getLesson(lesson)?.lesson;
    if (!entry) return;
    lesson = lessonStorageCode(entry);
    if (!ready || !validRead(`${lesson}-${section}`, ALL_LESSONS)) return;
    const last = current.current.last;
    if (last?.lesson !== lesson || last?.section !== section) commit({ ...current.current, last: { lesson, section } });
  }, [ready, commit]);
  const recordQuiz = (lesson: string, score: number) => {
    const entry = getLesson(lesson)?.lesson;
    if (!ready || !entry?.available || entry.archived || !Number.isFinite(score) || score < 0 || score > 100) return;
    lesson = lessonStorageCode(entry);
    const p = current.current;
    commit({ ...p, best: { ...p.best, [lesson]: Math.max(p.best[lesson] ?? 0, score) } });
  };
  const retrySync = async () => {
    if (identity.current) await syncRemote(identity.current);
    else if (saveLocal(current.current)) setSyncError(null);
  };
  const setNickname = async (nickname: string) => {
    const sb = getSupabase();
    const u = identity.current;
    if (!sb || !u) return { error: "로그인 후 이용할 수 있어요." };
    const trimmed = nickname.trim();
    if (!trimmed || trimmed.length > 20) return { error: "닉네임은 1~20자로 입력해 주세요." };
    try {
      const { data, error } = await sb.from("profiles").update({ nickname: trimmed }).eq("id", u.id).select("nickname, role").single();
      if (error || !data) return { error: "저장하지 못했습니다. 다시 시도해 주세요." };
      if (identity.current?.id === u.id) setProfile(data);
      return {};
    } catch { return { error: "연결을 확인하고 다시 시도해 주세요." }; }
  };

  return (
    <ProgressCtx.Provider value={{ progress, user, profile, ready, syncError, markRead, setLast, recordQuiz, retrySync, setNickname }}>
      {children}
    </ProgressCtx.Provider>
  );
}
export function useProgress() {
  const ctx = useContext(ProgressCtx);
  if (!ctx) throw new Error("useProgress outside provider");
  return ctx;
}
/** Completion is based on reading; practice scores are not certification. */
export function lessonStatus(p: Progress, code: string): 0 | 1 | 2 {
  const l = ALL_LESSONS.find((l) => l.available && l.code === code);
  if (!l) return 0;
  const key = lessonStorageCode(l);
  const read = l.sections.filter((s) => p.reads.includes(`${key}-${s.no}`)).length;
  if (l.sections.length > 0 && read === l.sections.length) return 2;
  return read > 0 || p.best[key] !== undefined ? 1 : 0;
}
export function lessonPercent(p: Progress, code: string) {
  return readPercent(p.reads, ALL_LESSONS.filter((l) => l.code === code));
}
