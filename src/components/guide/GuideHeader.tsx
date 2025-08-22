import { Shield, Target, Calendar, TrendingUp } from "lucide-react";

export default function GuideHeader() {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6 shadow-lg">
        <Shield className="w-10 h-10 text-white" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
        전세 계약 위험 예방 가이드
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        체계적인 위험 관리로 안전한 전세 생활을 시작하세요
      </p>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mb-3">
            <Target className="w-6 h-6 text-red-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">5</div>
          <div className="text-sm text-gray-600">핵심 예방 단계</div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-3">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">30일</div>
          <div className="text-sm text-gray-600">권장 점검 주기</div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-3">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">80%</div>
          <div className="text-sm text-gray-600">위험도 감소 효과</div>
        </div>
      </div>
    </div>
  );
}
