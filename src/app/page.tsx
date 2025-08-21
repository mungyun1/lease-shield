"use client";

import {
  Header,
  Hero,
  Features,
  Benefits,
  HowItWorks,
  CTA,
  Footer,
} from "@/components";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50 relative overflow-hidden">
      {/* 배경 장식 요소들 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 그라데이션 원형 요소들 */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-300/10 to-cyan-300/10 rounded-full blur-3xl"></div>

        {/* 그리드 패턴 */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10">
        <Header />
        <Hero />
        <Features />
        <Benefits />
        <HowItWorks />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}
