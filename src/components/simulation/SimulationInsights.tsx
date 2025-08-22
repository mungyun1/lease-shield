import { motion } from "framer-motion";

export default function SimulationInsights() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-8"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          시뮬레이션 인사이트
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <h3 className="font-semibold text-blue-800 mb-2">위험도 개선 팁</h3>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• 보증금을 낮추면 위험도가 감소합니다</li>
              <li>• 임차권 등기를 완료하면 위험도가 크게 감소합니다</li>
              <li>• 선순위 채권이 없는 계약을 선택하세요</li>
              <li>• 대출금은 수입의 30% 이하로 유지하세요</li>
            </ul>
          </div>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
            <h3 className="font-semibold text-green-800 mb-2">최적화 전략</h3>
            <ul className="text-green-700 text-sm space-y-1">
              <li>• 보증금과 월세의 적절한 균형을 찾으세요</li>
              <li>• 대출금은 수입의 30% 이하로 유지하세요</li>
              <li>• 정기적으로 계약 조건을 재검토하세요</li>
              <li>• 임차권 등기는 반드시 완료하세요</li>
            </ul>
          </div>
        </div>

        {/* 구체적인 예시 섹션 추가 */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-3 flex items-center">
            💡 구체적인 예시
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-yellow-800 mb-2">
                보증금 조정 예시:
              </h4>
              <ul className="text-yellow-700 space-y-1">
                <li>• 5,000만원 → 3,000만원: 위험 점수 -10점, 등급 개선</li>
                <li>
                  • 10,000만원 → 5,000만원: 위험 점수 -15점, 등급 크게 개선
                </li>
                <li>
                  • 15,000만원 → 8,000만원: 위험 점수 -20점, 등급 대폭 개선
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-yellow-800 mb-2">
                임차권 등기 효과:
              </h4>
              <ul className="text-yellow-700 space-y-1">
                <li>• 등기 미완료 → 완료: 위험 점수 -15점, 등급 크게 개선</li>
                <li>• 선순위 채권 제거: 위험 점수 -20점, 등급 대폭 개선</li>
                <li>• 대출금 30% 감소: 위험 점수 -10점, 등급 개선</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
