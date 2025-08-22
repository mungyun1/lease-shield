import { motion } from "framer-motion";
import {
  Lightbulb,
  TrendingUp,
  Shield,
  Target,
  Zap,
  AlertTriangle,
  CheckCircle,
  TrendingDown,
} from "lucide-react";

export default function SimulationInsights() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-12"
    >
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        {/* 메인 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-6">
            <Lightbulb className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            시뮬레이션 인사이트
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            변수 조정을 통해 얻은 인사이트를 바탕으로 더 나은 계약 조건을
            찾아보세요
          </p>
        </div>

        {/* 주요 인사이트 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* 위험도 개선 팁 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-100 border-l-4 border-blue-500 p-6 rounded-2xl"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-500 rounded-xl mr-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-blue-800">
                위험도 개선 팁
              </h3>
            </div>
            <ul className="text-blue-700 text-sm space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>보증금을 낮추면 위험도가 감소합니다</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>임차권 등기를 완료하면 위험도가 크게 감소합니다</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>선순위 채권이 없는 계약을 선택하세요</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>대출금은 수입의 30% 이하로 유지하세요</span>
              </li>
            </ul>
          </motion.div>

          {/* 최적화 전략 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-green-50 to-emerald-100 border-l-4 border-green-500 p-6 rounded-2xl"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-green-500 rounded-xl mr-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-green-800">최적화 전략</h3>
            </div>
            <ul className="text-green-700 text-sm space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>보증금과 월세의 적절한 균형을 찾으세요</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>대출금은 수입의 30% 이하로 유지하세요</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>정기적으로 계약 조건을 재검토하세요</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>임차권 등기는 반드시 완료하세요</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* 구체적인 예시 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-yellow-50 to-amber-100 border border-yellow-200 rounded-2xl p-8"
        >
          <div className="flex items-center mb-6">
            <div className="p-3 bg-yellow-500 rounded-xl mr-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-yellow-800">
              구체적인 예시
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 보증금 조정 예시 */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center">
                <TrendingDown className="w-5 h-5 mr-2 text-yellow-600" />
                보증금 조정 예시
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="text-sm text-yellow-700">
                    5,000만원 → 3,000만원
                  </span>
                  <span className="text-sm font-semibold text-green-600">
                    -10점, 등급 개선
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="text-sm text-yellow-700">
                    10,000만원 → 5,000만원
                  </span>
                  <span className="text-sm font-semibold text-green-600">
                    -15점, 등급 크게 개선
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="text-sm text-yellow-700">
                    15,000만원 → 8,000만원
                  </span>
                  <span className="text-sm font-semibold text-green-600">
                    -20점, 등급 대폭 개선
                  </span>
                </div>
              </div>
            </div>

            {/* 임차권 등기 효과 */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-yellow-600" />
                임차권 등기 효과
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="text-sm text-yellow-700">
                    등기 미완료 → 완료
                  </span>
                  <span className="text-sm font-semibold text-green-600">
                    -15점, 등급 크게 개선
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="text-sm text-yellow-700">
                    선순위 채권 제거
                  </span>
                  <span className="text-sm font-semibold text-green-600">
                    -20점, 등급 대폭 개선
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="text-sm text-yellow-700">
                    대출금 30% 감소
                  </span>
                  <span className="text-sm font-semibold text-green-600">
                    -10점, 등급 개선
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 추가 권장사항 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl border border-purple-200">
            <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold text-purple-800 mb-2">
              정기 모니터링
            </h4>
            <p className="text-sm text-purple-700">
              계약 조건 변화를 주기적으로 확인하세요
            </p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-red-50 to-pink-100 rounded-xl border border-red-200">
            <div className="w-12 h-12 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold text-red-800 mb-2">위험 신호</h4>
            <p className="text-sm text-red-700">
              위험도가 급격히 증가하면 즉시 조치하세요
            </p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-100 rounded-xl border border-emerald-200">
            <div className="w-12 h-12 bg-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold text-emerald-800 mb-2">목표 설정</h4>
            <p className="text-sm text-emerald-700">
              안전한 위험도 목표를 설정하고 달성하세요
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
