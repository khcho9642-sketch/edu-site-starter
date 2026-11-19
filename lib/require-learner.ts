import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { getServerSupabase } from "@/lib/supabase/server";
import { learningLoginPath } from "@/lib/learning-access";

const currentLearner = cache(async () => {
  const sb = await getServerSupabase();
  if (!sb) return null;
  try {
    const { data, error } = await sb.auth.getUser();
    return error ? null : data.user;
  } catch { return null; }
});

/** Check before reading/serializing lesson content, including RSC requests. */
export async function requireLearner(next: string) {
  const user = await currentLearner();
  if (!user) redirect(learningLoginPath(next));
  return user;
}
