import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

interface APIResponse {
  probability: number;
  riskScore: number;
  finalPrice: number;
  midLtv: number;
  modelVersion: string;
}

interface APIResponseDisplayProps {
  apiResponse: APIResponse;
  getRiskGrade: (riskScore: number) => "safe" | "moderate" | "danger";
}

export default function APIResponseDisplay({
  apiResponse,
  getRiskGrade,
}: APIResponseDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mb-8"
    >
      <div className="mt-12 bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <TrendingUp className="w-7 h-7 mr-3 text-green-600" />
          AI 위험 분석 결과
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 위험 점수 */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {apiResponse.riskScore.toFixed(1)}
            </div>
            <div className="text-sm text-red-700 font-medium">위험 점수</div>
            <div className="text-xs text-red-600 mt-1">
              {getRiskGrade(apiResponse.riskScore) === "safe"
                ? "낮음"
                : getRiskGrade(apiResponse.riskScore) === "moderate"
                  ? "보통"
                  : "높음"}
            </div>
          </div>

          {/* 위험 발생 확률 */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {(apiResponse.probability * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-orange-700 font-medium">
              위험 발생 확률
            </div>
            <div className="text-xs text-orange-600 mt-1">
              {apiResponse.probability > 0.1
                ? "높음"
                : apiResponse.probability > 0.05
                  ? "보통"
                  : "낮음"}
            </div>
          </div>

          {/* 권장 보험료 */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {apiResponse.finalPrice.toLocaleString()}
            </div>
            <div className="text-sm text-blue-700 font-medium">
              권장 보험료 (원)
            </div>
            <div className="text-xs text-blue-600 mt-1">연간 기준</div>
          </div>

          {/* LTV 비율 */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {apiResponse.midLtv.toFixed(2)}
            </div>
            <div className="text-sm text-purple-700 font-medium">LTV 비율</div>
            <div className="text-xs text-purple-600 mt-1">
              {apiResponse.midLtv > 3
                ? "높음"
                : apiResponse.midLtv > 2
                  ? "보통"
                  : "낮음"}
            </div>
          </div>
        </div>

        {/* 모델 정보 */}
        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <div className="text-sm text-gray-600">
            <span className="font-medium">사용 모델:</span>{" "}
            {apiResponse.modelVersion}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
