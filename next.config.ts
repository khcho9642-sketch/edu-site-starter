import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel Supabase 마켓플레이스 연동이 NEXT_PUBLIC_SUPABASE_ANON_KEY 대신
  // SUPABASE_ANON_KEY / SUPABASE_PUBLISHABLE_KEY를 넣어주는 경우를 위한 폴백
  env: {
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.SUPABASE_ANON_KEY ||
      process.env.SUPABASE_PUBLISHABLE_KEY,
  },
};

export default nextConfig;
