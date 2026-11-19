"use client";
import Link from "next/link";
import { useProgress } from "@/lib/progress";
import { getSupabase, supabaseEnabled } from "@/lib/supabase/client";

export default function Header() {
  const { user, profile } = useProgress();
  const logout = async () => {
    await getSupabase()?.auth.signOut();
    location.href = "/";
  };
  return (
    <header className="sticky top-0 z-20 bg-paper/90 backdrop-blur border-b border-line">
      <div className="mx-auto flex min-h-14 max-w-7xl flex-col items-start justify-between px-4 py-1 md:flex-row md:flex-wrap md:items-center md:gap-3 md:px-8 md:py-2">
        <Link href="/" className="inline-flex min-h-11 shrink-0 items-center text-xl font-extrabold tracking-tight focus-visible:outline-2 focus-visible:outline-accent md:text-2xl">
          <span>개발 <span className="text-accent">쉽게</span> 배우기</span>
        </Link>
        <nav className="flex w-full flex-wrap items-center justify-between gap-1 text-sm md:w-auto md:justify-start md:gap-3" aria-label="주 메뉴">
          <Link href="/dashboard" className="inline-flex min-h-11 min-w-11 items-center justify-center px-2 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent md:px-0">내 학습</Link>
          <Link href="/members" className="inline-flex min-h-11 min-w-11 items-center justify-center px-2 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent md:px-0">회원 진도</Link>
          <Link href="/comics" className="inline-flex min-h-11 min-w-11 items-center justify-center px-2 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent md:px-0">만화</Link>
          {user ? (
            <>
              <Link href="/account" className="hidden min-h-11 items-center text-muted hover:text-accent focus-visible:outline-2 focus-visible:outline-accent md:inline-flex">
                {profile?.nickname ?? "닉네임 설정"}
              </Link>
              <button onClick={logout} className="inline-flex min-h-11 min-w-11 items-center justify-center px-2 text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-accent md:px-0">로그아웃</button>
            </>
          ) : (
            <Link
              href="/login"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-ink px-4 py-1.5 text-white transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {supabaseEnabled ? "로그인" : "시작하기"}
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
