import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase/server";
import { safeRedirectTarget } from "@/lib/redirect";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const errorDescription = url.searchParams.get("error_description") || url.searchParams.get("error");
  const next = url.searchParams.get("next") ?? "/dashboard";
  const target = safeRedirectTarget(next, url.origin);
  const retryLogin = (message: string) => {
    const login = new URL("/login", url.origin);
    login.searchParams.set("auth_error", message);
    login.searchParams.set("next", target.pathname + target.search + target.hash);
    return NextResponse.redirect(login);
  };
  const sb = await getServerSupabase();

  if (errorDescription) {
    console.error("[auth/callback] provider returned error:", errorDescription);
    return retryLogin(errorDescription);
  }

  if (sb && code) {
    const { error } = await sb.auth.exchangeCodeForSession(code);
    if (error) {
      console.error("[auth/callback] exchangeCodeForSession error:", error.message);
      return retryLogin(error.message);
    }
  } else {
    return retryLogin(sb ? "no_code" : "로그인 연결을 준비하고 있습니다.");
  }

  // 같은 사이트 안의 경로로만 이동
  return NextResponse.redirect(target);
}
