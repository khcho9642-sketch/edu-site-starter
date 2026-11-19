"use client";
import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getSupabase, supabaseEnabled } from "@/lib/supabase/client";
import { safeRedirectTarget } from "@/lib/redirect";

function LoginInner() {
  const params = useSearchParams();
  const authError = params.get("auth_error");
  const [pending, setPending] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  if (!supabaseEnabled) {
    return (
      <div className="mx-auto max-w-md px-5 py-16">
        <h1 className="text-2xl font-bold">로그인 준비 중</h1>
        <p className="text-muted mt-3 leading-relaxed">
          현재 로그인 연결을 준비하고 있습니다. 과정 목차는 먼저 둘러볼 수 있으며, 강의·퀴즈·실습 자료는 로그인 연결 후 이용할 수 있습니다.
        </p>
        <Link href="/" className="inline-block mt-6 rounded-full bg-accent text-white px-6 py-3 font-semibold">
          교육 과정 둘러보기
        </Link>
      </div>
    );
  }

  const sb = getSupabase()!;
  const google = async () => {
    setPending(true);
    setLoginError(null);
    const origin = window.location.origin;
    const next = safeRedirectTarget(params.get("next"), origin);
    const callback = new URL("/auth/callback", origin);
    callback.searchParams.set("next", next.pathname + next.search + next.hash);
    try {
      const { error } = await sb.auth.signInWithOAuth({ provider: "google", options: { redirectTo: callback.href } });
      if (error) {
        setLoginError("로그인을 시작하지 못했습니다. 잠시 후 다시 시도해 주세요.");
        setPending(false);
      }
    } catch {
      setLoginError("연결을 확인하고 다시 시도해 주세요.");
      setPending(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-5 py-16">
      <h1 className="text-2xl font-bold">로그인</h1>
      <p className="text-muted mt-2 text-sm leading-relaxed">목차는 누구나 볼 수 있습니다. 로그인하면 강의·퀴즈·실습 자료를 무료로 이용하고 진행 기록도 이어갈 수 있습니다.</p>

      {(authError || loginError) && (
        <div role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 break-words">
          {loginError ?? `로그인에 실패했습니다: ${authError}`}
        </div>
      )}

      <button
        onClick={google}
        disabled={pending}
        className="mt-6 min-h-11 w-full rounded-xl border border-line bg-white py-3 font-semibold hover:border-ink disabled:opacity-60"
      >
        {pending ? "로그인 화면으로 이동 중…" : "Google 계정으로 계속하기"}
      </button>

      <Link href="/" className="mt-5 inline-flex min-h-11 items-center text-sm text-muted hover:text-accent">← 교육 과정·목차 둘러보기</Link>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}
