import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isProtectedImageSource, learningLoginPath, requiresLearningLogin } from "@/lib/learning-access";

// Refresh verified sessions and protect direct learning-file requests as well as pages.
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/_next/image") {
    return isProtectedImageSource(request.nextUrl.searchParams.get("url"))
      ? new NextResponse(null, { status: 403, headers: { "Cache-Control": "private, no-store" } })
      : NextResponse.next();
  }

  const protectedPath = requiresLearningLogin(request.nextUrl.pathname);
  if (!protectedPath && /^\/(?:images|og)\//.test(request.nextUrl.pathname)) return NextResponse.next();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  let response = NextResponse.next({ request });
  let authenticated = false;

  if (url && key) {
    const sb = createServerClient(url, key, {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (list) => {
          list.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          list.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    });
    try {
      const { data, error } = await sb.auth.getClaims();
      authenticated = !error && Boolean(data?.claims?.sub);
    } catch { /* Fail closed for learning content; the public catalogue still works. */ }
  }

  if (protectedPath) {
    if (!authenticated) {
      const login = new URL(learningLoginPath(request.nextUrl.pathname + request.nextUrl.search), request.url);
      const denied = NextResponse.redirect(login);
      response.cookies.getAll().forEach((cookie) => denied.cookies.set(cookie));
      response = denied;
    }
    response.headers.set("Cache-Control", "private, no-store");
    response.headers.append("Vary", "Cookie");
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|favicon.ico).*)"],
};
