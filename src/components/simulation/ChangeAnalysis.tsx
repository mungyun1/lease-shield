import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  BarChart3,
} from "lucide-react";
import { SimulationData } from "@/types";
import { motion } from "framer-motion";

interface ChangeAnalysisProps {
  currentData: SimulationData;
  originalData: SimulationData;
}

export default function ChangeAnalysis({
  currentData,
  originalData,
}: ChangeAnalysisProps) {
  const scoreChange = currentData.score - originalData.score;
  const depositChange =
    (currentData.jeonseDepositAmount || 0) -
    (originalData.jeonseDepositAmount || 0);
  const propertyChange =
    (currentData.propertyValue || 0) - (originalData.propertyValue || 0);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
      {/* 헤더 */}
      <div className="flex items-center mb-8">
        <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl mr-4">
          <BarChart3 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800">변화량 분석</h3>
          <p className="text-gray-500 text-sm">
            변수 조정에 따른 구체적인 변화를 확인하세요
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 점수 변화 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`text-center p-6 rounded-2xl border-2 ${
            scoreChange > 0
              ? "bg-red-50 border-red-200"
              : "bg-green-50 border-green-200"
          }`}
        >
          <div className="mb-4">
            {scoreChange > 0 ? (
              <div className="p-3 bg-red-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-red-600" />
              </div>
            ) : (
              <div className="p-3 bg-green-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                <TrendingDown className="w-8 h-8 text-green-600" />
              </div>
            )}
          </div>

          <div
            className={`text-3xl font-bold mb-2 ${
              scoreChange > 0 ? "text-red-600" : "text-green-600"
            }`}
          >
            {scoreChange > 0 ? "+" : ""}
            {scoreChange}
          </div>
          <div className="text-lg font-semibold text-gray-700 mb-3">
            점수 변화
          </div>

          <div
            className={`p-3 rounded-xl text-sm font-medium ${
              scoreChange > 0
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {scoreChange > 0 ? (
              <div className="flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 mr-2" />
                위험도 증가: 예방 조치 필요
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                위험도 감소: 안전한 상태
              </div>
            )}
          </div>
        </motion.div>

        {/* 전세보증금 변화 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`text-center p-6 rounded-2xl border-2 ${
            depositChange > 0
              ? "bg-red-50 border-red-200"
              : "bg-green-50 border-green-200"
          }`}
        >
          <div className="mb-4">
            {depositChange > 0 ? (
              <div className="p-3 bg-red-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-red-600" />
              </div>
            ) : (
              <div className="p-3 bg-green-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                <TrendingDown className="w-8 h-8 text-green-600" />
              </div>
            )}
          </div>

          <div
            className={`text-3xl font-bold mb-2 ${
              depositChange > 0 ? "text-red-600" : "text-green-600"
            }`}
          >
            {depositChange > 0 ? "+" : ""}
            {depositChange.toLocaleString()}
          </div>
          <div className="text-lg font-semibold text-gray-700 mb-3">
            전세보증금 변화
          </div>

          <div
            className={`p-3 rounded-xl text-sm font-medium ${
              depositChange > 0
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {depositChange > 0 ? (
              <div className="flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 mr-2" />
                위험도 증가: 전세보증금 낮춤 필요
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                위험도 감소: 안전한 설정
              </div>
            )}
          </div>
        </motion.div>

        {/* 재산가치 변화 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`text-center p-6 rounded-2xl border-2 ${
            propertyChange > 0
              ? "bg-red-50 border-red-200"
              : "bg-green-50 border-green-200"
          }`}
        >
          <div className="mb-4">
            {propertyChange > 0 ? (
              <div className="p-3 bg-red-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-red-600" />
              </div>
            ) : (
              <div className="p-3 bg-green-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                <TrendingDown className="w-8 h-8 text-green-600" />
              </div>
            )}
          </div>

          <div
            className={`text-3xl font-bold mb-2 ${
              propertyChange > 0 ? "text-red-600" : "text-green-600"
            }`}
          >
            {propertyChange > 0 ? "+" : ""}
            {propertyChange.toLocaleString()}
          </div>
          <div className="text-lg font-semibold text-gray-700 mb-3">
            재산가치 변화
          </div>

          <div
            className={`p-3 rounded-xl text-sm font-medium ${
              propertyChange > 0
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {propertyChange > 0 ? (
              <div className="flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 mr-2" />
                위험도 증가: 재산가치 조정 필요
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                위험도 감소: 안전한 설정
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* 요약 정보 */}
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
        <h4 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          종합 분석 결과
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-blue-700 mb-2">
              <strong>전체 위험도:</strong> {scoreChange > 0 ? "증가" : "감소"}
            </p>
            <p className="text-blue-600">
              {Math.abs(scoreChange)}점 {scoreChange > 0 ? "악화" : "개선"}
              되었습니다.
            </p>
          </div>
          <div>
            <p className="text-blue-700 mb-2">
              <strong>권장 조치:</strong>
            </p>
            <p className="text-blue-600">
              {scoreChange > 0
                ? "위험 요소를 줄이고 안전한 조건으로 조정하세요."
                : "현재 설정이 안전합니다. 추가 개선을 고려해보세요."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
