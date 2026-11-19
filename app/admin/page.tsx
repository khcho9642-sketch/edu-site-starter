import Link from "next/link";
import { ALL_LESSONS, getLesson, lessonPublicCode, lessonStorageCode } from "@/lib/courses";
import { getServerSupabase } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type Row = {
  user_id: string;
  email: string;
  nickname: string | null;
  lesson_code: string;
  sections_read: number;
  best_score: number | null;
};

export default async function AdminPage() {
  const sb = await getServerSupabase();
  if (!sb) return <Notice text="회원 기능(Supabase)이 연결되면 관리자 화면을 쓸 수 있습니다." />;

  const { data: auth } = await sb.auth.getUser();
  if (!auth.user) return <Notice text="관리자 계정으로 로그인해 주세요." link />;

  const { data: me } = await sb.from("profiles").select("role").eq("id", auth.user.id).single();
  if (me?.role !== "admin") return <Notice text="관리자만 볼 수 있는 화면입니다." />;

  // 권한 검사는 DB 규칙(RLS)에서도 한 번 더 합니다.
  const { data, error } = await sb.from("lesson_progress").select("*");
  if (error) return <Notice text={`기록을 불러오지 못했습니다: ${error.message}`} />;
  const rows = (data ?? []) as Row[];
  const users = Array.from(new Set(rows.map((r) => r.user_id)));

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <h1 className="text-3xl font-bold">관리자 · 회원 진행 현황</h1>
      <p className="text-muted mt-2">회원 {users.length}명</p>
      <div className="mt-8 overflow-x-auto">
        <table className="text-sm bg-white border border-line rounded-xl">
          <thead className="bg-paper">
            <tr>
              <th className="p-3 text-left">회원</th>
              {ALL_LESSONS.filter((l) => l.available).map((l) => (
                <th key={l.code} className="p-3">{lessonPublicCode(getLesson(l.code)!.course, l)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((id) => {
              const member = rows.find((x) => x.user_id === id)!;
              const { nickname, email } = member;
              return (
              <tr key={id} className="border-t border-line">
                <td className="p-3">{nickname ? `${nickname} (${email})` : email}</td>
                {ALL_LESSONS.filter((l) => l.available).map((l) => {
                  const r = rows.find((x) => x.user_id === id && x.lesson_code === lessonStorageCode(l));
                  const read = Math.min(r?.sections_read ?? 0, l.sections.length);
                  const done = read >= l.sections.length;
                  return (
                    <td key={l.code} className="p-3 text-center tabular-nums">
                      {`${read}/${l.sections.length}${done ? " ✓" : ""}`}
                    </td>
                  );
                })}
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Notice({ text, link }: { text: string; link?: boolean }) {
  return (
    <div className="mx-auto max-w-md px-5 py-16">
      <h1 className="text-2xl font-bold">관리자</h1>
      <p className="text-muted mt-3">{text}</p>
      {link && <Link href="/login" className="inline-block mt-4 underline">로그인</Link>}
    </div>
  );
}
