import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "김태영 | Backend Engineer",
  description:
    "아키텍처 설계와 인프라 구성을 직접 고민하며, AI 도구를 개발 워크플로에 녹여내는 백엔드 개발자",
  openGraph: {
    title: "김태영 | Backend Engineer",
    description:
      "아키텍처 설계와 인프라 구성을 직접 고민하며, AI 도구를 개발 워크플로에 녹여내는 백엔드 개발자",
    url: "https://taeyoungkim1213.github.io",
    siteName: "Taeyoung Kim Portfolio",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark">
      <body className="bg-[#0d1117] text-[#e6edf3] font-mono antialiased">
        {children}
      </body>
    </html>
  );
}
