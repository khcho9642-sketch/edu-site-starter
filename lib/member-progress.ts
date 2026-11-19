import type { MemberRow } from "./progress-model";

type RpcResult = { data: unknown; error: { code?: string } | null };
export async function loadMemberProgress(rpc: (name: string) => PromiseLike<RpcResult>) {
  let result = await rpc("nickname_progress_v2");
  let legacy = false;
  if (result.error?.code === "PGRST202" || result.error?.code === "42883") {
    result = await rpc("nickname_progress");
    legacy = true;
  }
  if (result.error) throw new Error("회원 진도를 불러오지 못했습니다.");
  return {
    // Old DBs cannot identify the caller reliably. Never infer identity from a nickname.
    rows: ((result.data ?? []) as MemberRow[]).map((row) => ({ ...row, is_me: !legacy && row.is_me === true })),
    legacy,
  };
}
