import { motion } from "framer-motion";
import { RotateCcw, Download, Settings, AlertTriangle } from "lucide-react";
import { SimulationData } from "@/types";

interface SimulationControlsProps {
  currentData: SimulationData;
  onInputChange: (
    field: keyof Omit<SimulationData, "score" | "grade">,
    value: number | boolean
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
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sticky top-4">
        {/* 헤더 */}
        <div className="flex items-center mb-8">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mr-4">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">변수 조정</h2>
            <p className="text-gray-500 text-sm">
              실시간으로 위험도를 조정해보세요
            </p>
          </div>
        </div>

        {/* 실시간 피드백 표시 */}
        {activeFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl"
          >
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-full mr-3">
                <AlertTriangle className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-sm text-blue-800 font-medium">
                {activeFeedback}
              </p>
            </div>
          </motion.div>
        )}

        {/* 보증금 슬라이더 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-700">
              보증금
            </label>
            <span className="text-lg font-bold text-blue-600">
              {currentData.deposit
                ? `${currentData.deposit.toLocaleString()}만원`
                : "정보 없음"}
            </span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="1000"
              max="20000"
              step="500"
              value={currentData.deposit || 0}
              onChange={(e) =>
                onInputChange("deposit", parseInt(e.target.value))
              }
              className="w-full h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>1,000만원</span>
              <span>20,000만원</span>
            </div>
          </div>
          <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <p className="text-xs text-blue-700 leading-relaxed">
              💡 보증금이 높을수록 위험도가 증가합니다. 보증금을 낮추면 위험
              점수가 개선되고 등급이 조정됩니다.
            </p>
          </div>
        </div>

        {/* 대출금 슬라이더 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-700">
              대출금
            </label>
            <span className="text-lg font-bold text-purple-600">
              {currentData.loanAmount
                ? `${currentData.loanAmount.toLocaleString()}만원`
                : "정보 없음"}
            </span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="10000"
              step="500"
              value={currentData.loanAmount || 0}
              onChange={(e) =>
                onInputChange("loanAmount", parseInt(e.target.value))
              }
              className="w-full h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>0만원</span>
              <span>10,000만원</span>
            </div>
          </div>
          <div className="mt-3 p-3 bg-purple-50 rounded-lg border-l-4 border-purple-400">
            <p className="text-xs text-purple-700 leading-relaxed">
              💡 대출금이 높을수록 위험도가 증가합니다. 대출금을 줄이면 위험
              점수가 개선되고 등급이 조정됩니다.
            </p>
          </div>
        </div>

        {/* 체크박스 옵션들 */}
        <div className="space-y-6 mb-8">
          <div className="p-4 bg-red-50 rounded-xl border border-red-200">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={currentData.hasPriorityDebt}
                onChange={(e) =>
                  onInputChange("hasPriorityDebt", e.target.checked)
                }
                className="mr-3 mt-1 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <div>
                <span className="text-sm font-semibold text-red-800">
                  선순위 채권 존재
                </span>
                <p className="text-xs text-red-700 mt-1 leading-relaxed">
                  ⚠️ 선순위 채권이 있으면 위험도가 크게 증가합니다. 선순위
                  채권이 없는 계약을 선택하면 위험 점수가 크게 개선됩니다.
                </p>
              </div>
            </label>
          </div>

          <div className="p-4 bg-green-50 rounded-xl border border-green-200">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={currentData.hasTenancyRegistration}
                onChange={(e) =>
                  onInputChange("hasTenancyRegistration", e.target.checked)
                }
                className="mr-3 mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <div>
                <span className="text-sm font-semibold text-green-800">
                  임차권 등기 완료
                </span>
                <p className="text-xs text-green-700 mt-1 leading-relaxed">
                  ✅ 임차권 등기를 완료하면 위험도가 크게 감소합니다. 이는 권리
                  보호에 가장 중요한 요소입니다.
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* 액션 버튼들 */}
        <div className="space-y-4">
          <button
            onClick={onReset}
            className="w-full px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 font-semibold flex items-center justify-center transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            원래대로 복원
          </button>
          <button
            onClick={onSave}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 font-semibold flex items-center justify-center transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Download className="w-5 h-5 mr-2" />
            현재 상태 저장
          </button>
        </div>
      </div>
    </motion.div>
  );
}
