import { safeRedirectTarget } from "./redirect.ts";

const protectedRoots = [
  "/lessons", "/comics", "/materials", "/desktop-materials",
  "/chatgpt-materials", "/archive/chatgpt/materials", "/setup",
];

export function requiresLearningLogin(pathname: string): boolean {
  let path = pathname;
  try {
    for (let i = 0; i < 3; i++) {
      const decoded = decodeURIComponent(path);
      if (decoded === path) break;
      path = decoded;
    }
    path = new URL(path.replace(/\\/g, "/").replace(/\/{2,}/g, "/"), "https://learning.invalid").pathname;
  } catch { /* Invalid paths cannot name a lesson. */ }
  return protectedRoots.some((root) => path === root || path.startsWith(`${root}/`));
}

export function learningLoginPath(next: string): string {
  const target = safeRedirectTarget(next, "https://learning.invalid");
  return `/login?next=${encodeURIComponent(target.pathname + target.search + target.hash)}`;
}

// The shared image optimizer must never publish a cached copy of a private comic.
export function isProtectedImageSource(source: string | null): boolean {
  if (!source) return false;
  try { return requiresLearningLogin(new URL(source, "https://learning.invalid").pathname); }
  catch { return false; }
}
