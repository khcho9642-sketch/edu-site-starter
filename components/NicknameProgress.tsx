"use client";
import { useEffect, useState } from "react";
import { COURSES } from "@/lib/courses";
import { getSupabase } from "@/lib/supabase/client";
import { memberReadPercent, type MemberRow } from "@/lib/progress-model";
import { loadMemberProgress } from "@/lib/member-progress";

export default function NicknameProgress() {
  const [rows, setRows] = useState<MemberRow[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [retry, setRetry] = useState(0);
  const [legacy, setLegacy] = useState(false);
  useEffect(() => {
    let active = true;
    const sb = getSupabase();
    if (!sb) { setFailed(true); return; }
    setFailed(false);
    setRows(null);
    loadMemberProgress((name) => sb.rpc(name)).then(({ rows, legacy }) => {
      if (!active) return;
      setRows(rows);
      setLegacy(legacy);
    }, () => { if (active) setFailed(true); });
    return () => { active = false; };
  }, [retry]);
  if (failed) return <p role="status" className="mt-6 text-muted">회원 진도를 불러오지 못했습니다.<button className="ml-2 underline" onClick={() => setRetry((n) => n + 1)}>다시 시도</button></p>;
  if (!rows) return <p role="status" className="mt-6 text-muted">회원 진도를 불러오는 중…</p>;
  const members = [...new Set(rows.map((r) => r.member_key))].map((key) => {
    const mine = rows.filter((r) => r.member_key === key);
    return { key, nickname: mine[0].nickname, isMe: mine.some((r) => r.is_me === true), rates: COURSES.map((c) => memberReadPercent(mine, c.lessons)) };
  });
  members.sort((a, b) => b.rates.reduce((s, v) => s + v, 0) - a.rates.reduce((s, v) => s + v, 0));
  return (
    <>
      <h2 className="text-xl font-bold mt-6 mb-1">닉네임별 읽기 진도율</h2>
      <p className="text-sm text-muted mb-4">닉네임을 설정한 회원을 표시합니다. 공개된 단원 중 읽은 비율이며, 퀴즈 점수는 포함하지 않습니다.</p>
      {legacy && <p className="text-sm text-muted mb-4">일부 회원 기록과 본인 표시는 업데이트 후 표시됩니다.</p>}
      {members.length === 0 ? <p className="text-muted">아직 표시할 회원이 없습니다.</p> : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm bg-white border border-line">
            <caption className="sr-only">회원별 공개 강의 읽기 진도율</caption>
            <thead className="bg-paper text-left"><tr><th scope="col" className="p-3">닉네임</th>{COURSES.map((c) => <th scope="col" key={c.code} className="p-3 text-center">{c.displayCode ?? c.code}. {c.title}</th>)}</tr></thead>
            <tbody>{members.map((m) => <tr key={m.key} className={`border-t border-line ${m.isMe ? "bg-accent-soft" : ""}`}>
              <th scope="row" className="p-3 text-left font-normal">{m.nickname}{m.isMe && <span className="ml-2 text-xs text-accent font-semibold">나</span>}</th>
              {m.rates.map((v, i) => <td key={i} className="p-3 text-center tabular-nums">{COURSES[i].lessons.some((l) => l.available) ? `${v}%` : "준비 중"}</td>)}
            </tr>)}</tbody>
          </table>
        </div>
      )}
    </>
  );
}
