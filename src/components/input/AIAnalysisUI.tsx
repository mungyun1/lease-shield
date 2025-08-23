import { motion } from "framer-motion";

export default function AIAnalysisUI() {
  return (
    <div className="px-8 pb-6">
      <div className="min-h-[450px] flex items-center justify-center">
        <div className="text-center">
          {/* AI 분석 중 애니메이션 */}
          <div className="mb-8">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          </div>

          {/* 메인 텍스트 */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            AI가 계약서를 분석하고 있습니다
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            입력하신 정보를 바탕으로 계약서의 위험 요소를 종합적으로 분석하고
            있습니다. 잠시만 기다려 주세요.
          </p>

          {/* 진행 상태 표시 */}
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3 text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>계약 정보 검증 완료</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-sm text-gray-500">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>법적 위험 요소 분석 중...</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-sm text-gray-500">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <span>맞춤형 권고사항 생성 대기</span>
            </div>
          </div>

          {/* 로딩 바 */}
          <div className="mt-8 w-full max-w-md mx-auto">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
