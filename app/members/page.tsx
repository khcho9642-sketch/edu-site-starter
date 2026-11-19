"use client";
import Link from "next/link";
import { useProgress } from "@/lib/progress";
import NicknameProgress from "@/components/NicknameProgress";

export default function Members() {
  const { user, ready } = useProgress();
  if (!ready) return <div className="mx-auto max-w-3xl px-5 py-16 text-muted">불러오는 중…</div>;
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="text-3xl font-bold">회원별 진행율</h1>
      {user ? (
        <NicknameProgress key={user.id} />
      ) : (
        <p className="text-muted mt-3">
          로그인하면 함께 학습하는 회원들의 진행율을 볼 수 있어요.{" "}
          <Link href="/login" className="underline">로그인</Link>
        </p>
      )}
    </div>
  );
}
