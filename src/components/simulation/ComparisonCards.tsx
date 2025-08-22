import { motion } from "framer-motion";
import { SimulationData } from "@/types";
import { getScoreColor } from "@/utils/simulation";
import { getGradeColor, getGradeText } from "@/utils";

interface ComparisonCardsProps {
  currentData: SimulationData;
  originalData: SimulationData;
}

export default function ComparisonCards({
  currentData,
  originalData,
}: ComparisonCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Before */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
          원래 상태
        </h3>
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {originalData.score}
          </div>
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getGradeColor(originalData.grade)}`}
          >
            {getGradeText(originalData.grade)}
          </div>
        </div>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">보증금:</span>
            <span className="font-medium">
              {originalData.deposit.toLocaleString()}만원
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">대출금:</span>
            <span className="font-medium">
              {originalData.loanAmount.toLocaleString()}만원
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">선순위 채권:</span>
            <span className="font-medium">
              {originalData.hasPriorityDebt ? "있음" : "없음"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">임차권 등기:</span>
            <span className="font-medium">
              {originalData.hasTenancyRegistration ? "완료" : "미완료"}
            </span>
          </div>
        </div>
      </div>

      {/* After */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
          현재 상태
        </h3>
        <div className="text-center">
          <motion.div
            key={currentData.score}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-4xl font-bold mb-2"
            style={{ color: getScoreColor(currentData.score) }}
          >
            {currentData.score}
          </motion.div>
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getGradeColor(currentData.grade)}`}
          >
            {getGradeText(currentData.grade)}
          </div>
        </div>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">보증금:</span>
            <span className="font-medium">
              {currentData.deposit.toLocaleString()}만원
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">대출금:</span>
            <span className="font-medium">
              {currentData.loanAmount.toLocaleString()}만원
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">선순위 채권:</span>
            <span className="font-medium">
              {currentData.hasPriorityDebt ? "있음" : "없음"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">임차권 등기:</span>
            <span className="font-medium">
              {currentData.hasTenancyRegistration ? "완료" : "미완료"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
