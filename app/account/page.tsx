"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useProgress } from "@/lib/progress";
import { supabaseEnabled } from "@/lib/supabase/client";
import { suggestNicknames } from "@/lib/nickname";

export default function AccountPage() {
  const { user, profile, ready, setNickname } = useProgress();
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [msg, setMsg] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setSuggestions(suggestNicknames(3));
  }, []);

  useEffect(() => {
    if (profile?.nickname) setValue(profile.nickname);
  }, [profile?.nickname]);

  if (!supabaseEnabled) return <div className="mx-auto max-w-md px-5 py-16 text-muted">회원 기능 준비 중입니다.</div>;
  if (!ready) return <div className="mx-auto max-w-md px-5 py-16 text-muted">불러오는 중…</div>;
  if (!user) {
    return (
      <div className="mx-auto max-w-md px-5 py-16">
        <h1 className="text-2xl font-bold">내 정보</h1>
        <p className="text-muted mt-3">로그인 후 닉네임을 설정할 수 있어요.</p>
        <Link href="/login" className="inline-block mt-6 rounded-full bg-ink text-white px-6 py-3 font-semibold">
          로그인하기
        </Link>
      </div>
    );
  }

  const save = async (nickname: string) => {
    setSaving(true);
    setMsg(null);
    const { error } = await setNickname(nickname);
    setSaving(false);
    setMsg(error ?? "닉네임을 저장했습니다.");
  };

  const reroll = () => setSuggestions(suggestNicknames(3));

  return (
    <div className="mx-auto max-w-md px-5 py-16 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">내 정보</h1>
        <p className="text-muted mt-2 text-sm">{user.email}</p>
      </div>

      <div>
        <label htmlFor="nickname" className="text-sm font-semibold block mb-2">
          닉네임 {profile?.nickname && <span className="text-muted font-normal">· 현재 &quot;{profile.nickname}&quot;</span>}
        </label>
        <div className="flex gap-2">
          <input
            id="nickname"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            maxLength={20}
            placeholder="사용할 닉네임을 입력하세요"
            className="flex-1 rounded-xl border border-line bg-white px-4 py-3"
          />
          <button
            onClick={() => save(value)}
            disabled={saving || !value.trim()}
            className="rounded-xl bg-ink text-white px-5 py-3 font-semibold disabled:opacity-50"
          >
            저장
          </button>
        </div>
        {msg && <p className="text-sm mt-2">{msg}</p>}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold">닉네임 자동추천</span>
          <button onClick={reroll} className="text-xs text-muted hover:text-ink underline">
            다시 추천받기
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => {
                setValue(s);
                save(s);
              }}
              disabled={saving}
              className="rounded-full border border-line bg-white px-4 py-2 text-sm hover:border-accent hover:text-accent transition disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
