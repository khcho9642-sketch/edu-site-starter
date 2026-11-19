import type { Metadata } from "next";
import "./globals.css";
import { ProgressProvider } from "@/lib/progress";
import Header from "@/components/Header";
import { COURSES, AVAILABLE_LESSONS } from "@/lib/courses";
import SyncNotice from "@/components/SyncNotice";

const siteOrigin = process.env.SITE_ORIGIN || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
const assetOrigin = process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : siteOrigin;
const shareTitle = "개발 쉽게 배우기 | AI·개발 무료 교육";
const shareDescription = `AI 시대, 살아남는 법을 함께 고민합니다. AI·개발 ${COURSES.length}개 과정, ${AVAILABLE_LESSONS.length}강. 목차는 누구나, 무료 교육은 로그인 후 이용하세요.`;
const shareImage = {
  url: "/og/education-share-cover-v5.png",
  width: 1734,
  height: 907,
  alt: "개발 쉽게 배우기 — AI·개발 무료 교육 시작하기",
};

export const metadata: Metadata = {
  metadataBase: new URL(assetOrigin),
  title: "개발 쉽게 배우기 — 코딩 몰라도 AI로 내 앱 만들기",
  description: `개발 기본개념·실무·클로드 앱·ChatGPT. ${COURSES.length}개 과정 ${AVAILABLE_LESSONS.length}강. 목차는 누구나 볼 수 있고, 강의·실습·퀴즈·만화는 로그인 후 무료로 이용합니다.`,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "개발 쉽게 배우기",
    title: shareTitle,
    description: shareDescription,
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description: shareDescription,
    images: [shareImage],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen antialiased">
        <ProgressProvider>
          <Header />
          <SyncNotice />
          <main>{children}</main>
        </ProgressProvider>
      </body>
    </html>
  );
}
