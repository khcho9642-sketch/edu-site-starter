"use client";
import { useState } from "react";
import { useProgress } from "@/lib/progress";

export default function SyncNotice() {
  const { syncError, retrySync, progress } = useProgress();
  const [busy, setBusy] = useState(false);
  if (!syncError && progress.pendingReads.length === 0) return null;
  return (
    <div role="status" className="mx-auto max-w-5xl px-5 py-3 text-sm bg-amber-50 border-b border-amber-200">
      {syncError ?? "이 브라우저에 저장했습니다. 계정에 동기화 중입니다."}
      {syncError && <button disabled={busy} className="ml-3 underline disabled:opacity-50" onClick={async () => {
        setBusy(true);
        try { await retrySync(); } finally { setBusy(false); }
      }}>{busy ? "확인 중…" : "다시 시도"}</button>}
    </div>
  );
}
