import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/**
 * 나눔스퀘어 네오 폰트를 로컬에서 불러와 정의합니다.
 * src: 폰트 파일의 경로와 굵기를 지정합니다.
 * display: swap: 폰트가 로딩되는 동안 기본 폰트를 먼저 보여주어 사용자 경험을 개선합니다.
 */
const nanumSquareNeo = localFont({
  src: [
    {
      path: "../fonts/NanumSquareNeoRg.woff2",
      weight: "400", // Regular
      style: "normal",
    },
    {
      path: "../fonts/NanumSquareNeoBd.woff2",
      weight: "700", // Bold
      style: "normal",
    },
    {
      path: "../fonts/NanumSquareNeoHv.woff2",
      weight: "800", // ExtraBold
      style: "normal",
    },
  ],
  display: "swap",
});

/**
 * 페이지의 메타데이터를 정의합니다.
 * 이 정보는 브라우저 탭 제목, 검색 엔진 최적화(SEO) 등에 사용됩니다.
 */
export const metadata: Metadata = {
  title: "Do It - Todo List",
  description: "A simple todo list application",
  icons: {
    icon: "/favicon.svg",
  },
};

/**
 * 모든 페이지에 공통으로 적용되는 최상위 레이아웃 컴포넌트입니다.
 * {React.ReactNode} children - 이 레이아웃 안에 렌더링될 자식 페이지 또는 컴포넌트
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      {/* body 태그에 폰트 클래스를 적용하여 프로젝트 전체에 기본 폰트를 설정합니다. */}
      <body className={nanumSquareNeo.className}>{children}</body>
    </html>
  );
}
