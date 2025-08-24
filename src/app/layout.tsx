import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// 로컬 폰트 설정을 정의합니다.
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

export const metadata: Metadata = {
  title: "Do It - Todo List",
  description: "A simple todo list application",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={nanumSquareNeo.className}>{children}</body>
    </html>
  );
}
