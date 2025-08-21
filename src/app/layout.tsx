import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LeaseShield - 전세 계약 위험 진단",
  description: "AI가 분석하는 전세 계약 위험 진단 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
