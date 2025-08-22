import { motion } from "framer-motion";
import { RotateCcw, Download } from "lucide-react";
import { SimulationData } from "@/types";
import { getVariableImpact } from "@/utils/simulation";

interface SimulationControlsProps {
  currentData: SimulationData;
  originalData: SimulationData;
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
  originalData,
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
      <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">변수 조정</h2>

        {/* 실시간 피드백 표시 */}
        {activeFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg"
          >
            <p className="text-sm text-blue-800">{activeFeedback}</p>
          </motion.div>
        )}

        {/* 보증금 슬라이더 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            보증금: {currentData.deposit.toLocaleString()}만원
          </label>
          <input
            type="range"
            min="1000"
            max="20000"
            step="500"
            value={currentData.deposit}
            onChange={(e) => onInputChange("deposit", parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1,000만원</span>
            <span>20,000만원</span>
          </div>
          <div className="mt-2 text-xs text-gray-600">
            💡 보증금이 높을수록 위험도가 증가합니다. 보증금을 낮추면 위험
            점수가 개선되고 등급이 조정됩니다.
          </div>
        </div>

        {/* 대출금 슬라이더 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            대출금: {currentData.loanAmount.toLocaleString()}만원
          </label>
          <input
            type="range"
            min="0"
            max="10000"
            step="500"
            value={currentData.loanAmount}
            onChange={(e) =>
              onInputChange("loanAmount", parseInt(e.target.value))
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0만원</span>
            <span>10,000만원</span>
          </div>
          <div className="mt-2 text-xs text-gray-600">
            💡 대출금이 높을수록 위험도가 증가합니다. 대출금을 줄이면 위험
            점수가 개선되고 등급이 조정됩니다.
          </div>
        </div>

        {/* 체크박스 옵션들 */}
        <div className="space-y-4 mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={currentData.hasPriorityDebt}
              onChange={(e) =>
                onInputChange("hasPriorityDebt", e.target.checked)
              }
              className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">선순위 채권 존재</span>
          </label>
          <div className="ml-7 text-xs text-gray-600">
            ⚠️ 선순위 채권이 있으면 위험도가 크게 증가합니다. 선순위 채권이 없는
            계약을 선택하면 위험 점수가 크게 개선됩니다.
          </div>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={currentData.hasTenancyRegistration}
              onChange={(e) =>
                onInputChange("hasTenancyRegistration", e.target.checked)
              }
              className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">임차권 등기 완료</span>
          </label>
          <div className="ml-7 text-xs text-gray-600">
            ✅ 임차권 등기를 완료하면 위험도가 크게 감소합니다. 이는 권리 보호에
            가장 중요한 요소입니다.
          </div>
        </div>

        {/* 액션 버튼들 */}
        <div className="space-y-3">
          <button
            onClick={onReset}
            className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium flex items-center justify-center"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            원래대로 복원
          </button>
          <button
            onClick={onSave}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center"
          >
            <Download className="w-4 h-4 mr-2" />
            현재 상태 저장
          </button>
        </div>
      </div>
    </motion.div>
  );
}
