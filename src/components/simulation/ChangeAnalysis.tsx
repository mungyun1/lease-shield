import { TrendingUp, TrendingDown } from "lucide-react";
import { SimulationData } from "@/types";

interface ChangeAnalysisProps {
  currentData: SimulationData;
  originalData: SimulationData;
}

export default function ChangeAnalysis({
  currentData,
  originalData,
}: ChangeAnalysisProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">변화량 분석</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {currentData.score - originalData.score > 0 ? "+" : ""}
            {currentData.score - originalData.score}
          </div>
          <div className="text-sm text-gray-600">점수 변화</div>
          <div
            className={`mt-2 ${currentData.score > originalData.score ? "text-red-500" : "text-green-500"}`}
          >
            {currentData.score > originalData.score ? (
              <TrendingUp className="w-5 h-5 mx-auto" />
            ) : (
              <TrendingDown className="w-5 h-5 mx-auto" />
            )}
          </div>
          {/* 점수 변화에 대한 구체적인 설명 추가 */}
          <div className="mt-2 text-xs text-gray-600">
            {currentData.score > originalData.score ? (
              <span className="text-red-600">
                ⚠️ 위험도 증가: 예방 조치가 필요합니다
              </span>
            ) : (
              <span className="text-green-600">
                ✅ 위험도 감소: 안전한 상태입니다
              </span>
            )}
          </div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {currentData.deposit - originalData.deposit > 0 ? "+" : ""}
            {(currentData.deposit - originalData.deposit).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">보증금 변화</div>
          {/* 보증금 변화에 대한 구체적인 설명 추가 */}
          <div className="mt-2 text-xs text-gray-600">
            {currentData.deposit > originalData.deposit ? (
              <span className="text-red-600">
                ⚠️ 위험도 증가: 보증금을 낮추면 개선됩니다
              </span>
            ) : (
              <span className="text-green-600">
                ✅ 위험도 감소: 안전한 설정입니다
              </span>
            )}
          </div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {currentData.loanAmount - originalData.loanAmount > 0 ? "+" : ""}
            {(
              currentData.loanAmount - originalData.loanAmount
            ).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">대출금 변화</div>
          {/* 대출금 변화에 대한 구체적인 설명 추가 */}
          <div className="mt-2 text-xs text-gray-600">
            {currentData.loanAmount > originalData.loanAmount ? (
              <span className="text-red-600">
                ⚠️ 위험도 증가: 대출금을 줄이면 개선됩니다
              </span>
            ) : (
              <span className="text-green-600">
                ✅ 위험도 감소: 안전한 설정입니다
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
