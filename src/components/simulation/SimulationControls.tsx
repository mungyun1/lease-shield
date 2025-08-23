import { motion } from "framer-motion";
import { RotateCcw, Download, Settings, AlertTriangle } from "lucide-react";
import { SimulationData } from "@/types";

interface SimulationControlsProps {
  currentData: SimulationData;
  onInputChange: (
    field: keyof Omit<SimulationData, "score" | "grade">,
    value: number | boolean | string | null
  ) => void;
  onReset: () => void;
  onSave: () => void;
  activeFeedback: string | null;
}

export default function SimulationControls({
  currentData,
  onInputChange,
  onReset,
  onSave,
  activeFeedback,
}: SimulationControlsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="lg:col-span-1"
    >
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-4">
        {/* 헤더 */}
        <div className="flex items-center mb-6">
          <div className="p-2.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mr-3">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">변수 조정</h2>
            <p className="text-gray-500 text-xs">실시간 위험도 조정</p>
          </div>
        </div>

        {/* 실시간 피드백 표시 */}
        {activeFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg"
          >
            <div className="flex items-center">
              <div className="p-1.5 bg-blue-100 rounded-full mr-2">
                <AlertTriangle className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <p className="text-xs text-blue-800 font-medium">
                {activeFeedback}
              </p>
            </div>
          </motion.div>
        )}

        {/* 보증금 슬라이더 */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-gray-700">
              전세보증금
            </label>
            <span className="text-base font-bold text-blue-600">
              {currentData.jeonseDepositAmount
                ? `${currentData.jeonseDepositAmount.toLocaleString()}만원`
                : "정보 없음"}
            </span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="1000"
              max="20000"
              step="500"
              value={currentData.jeonseDepositAmount || 0}
              onChange={(e) =>
                onInputChange("jeonseDepositAmount", parseInt(e.target.value))
              }
              className="w-full h-2.5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1.5">
              <span>1,000만원</span>
              <span>20,000만원</span>
            </div>
          </div>
          <div className="mt-2 p-2.5 bg-blue-50 rounded-lg border-l-3 border-blue-400">
            <p className="text-xs text-blue-700">💡 높을수록 위험도 증가</p>
          </div>
        </div>

        {/* 재산가치 슬라이더 */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-gray-700">
              재산가치
            </label>
            <span className="text-base font-bold text-purple-600">
              {currentData.propertyValue
                ? `${currentData.propertyValue.toLocaleString()}만원`
                : "정보 없음"}
            </span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="10000"
              max="100000"
              step="1000"
              value={currentData.propertyValue || 0}
              onChange={(e) =>
                onInputChange("propertyValue", parseInt(e.target.value))
              }
              className="w-full h-2.5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1.5">
              <span>10,000만원</span>
              <span>100,000만원</span>
            </div>
          </div>
          <div className="mt-2 p-2.5 bg-purple-50 rounded-lg border-l-3 border-purple-400">
            <p className="text-xs text-purple-700">💡 높을수록 위험도 증가</p>
          </div>
        </div>

        {/* 체크박스 옵션들 */}
        <div className="space-y-4 mb-6">
          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={!!currentData.seniorLienAmount}
                onChange={(e) =>
                  onInputChange(
                    "seniorLienAmount",
                    e.target.checked ? 1000 : null
                  )
                }
                className="mr-2.5 mt-0.5 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <div>
                <span className="text-sm font-semibold text-red-800">
                  선순위 채권 존재
                </span>
                <p className="text-xs text-red-700 mt-1">⚠️ 위험도 크게 증가</p>
              </div>
            </label>
          </div>

          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={
                  !!(
                    currentData.coverageStartYyyymm &&
                    currentData.coverageEndYyyymm
                  )
                }
                onChange={(e) =>
                  onInputChange(
                    "coverageStartYyyymm",
                    e.target.checked ? "2024-01" : ""
                  )
                }
                className="mr-2.5 mt-0.5 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <div>
                <span className="text-sm font-semibold text-green-800">
                  보험 기간 설정
                </span>
                <p className="text-xs text-green-700 mt-1">✅ 위험도 감소</p>
              </div>
            </label>
          </div>
        </div>

        {/* 액션 버튼들 */}
        <div className="space-y-3">
          <button
            onClick={onReset}
            className="w-full px-5 py-2.5 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 font-semibold flex items-center justify-center transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            복원
          </button>
          <button
            onClick={onSave}
            className="w-full px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 font-semibold flex items-center justify-center transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Download className="w-4 h-4 mr-2" />
            저장
          </button>
        </div>
      </div>
    </motion.div>
  );
}
