export function safeRedirectTarget(next: string | null, origin: string): URL {
  const fallback = new URL("/dashboard", origin);
  if (!next || !next.startsWith("/") || /[\\\u0000-\u0020]/.test(next) || /%5c|%0[ad]/i.test(next)) return fallback;
  try {
    const target = new URL(next, origin);
    return target.origin === new URL(origin).origin ? target : fallback;
  } catch { return fallback; }
}
