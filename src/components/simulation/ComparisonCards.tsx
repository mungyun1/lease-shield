import { motion } from "framer-motion";
import { SimulationData } from "@/types";
import { getScoreColor } from "@/utils/simulation";
import { getGradeColor, getGradeText } from "@/utils";
import { Clock, Zap, TrendingUp, TrendingDown } from "lucide-react";

interface ComparisonCardsProps {
  currentData: SimulationData;
  originalData: SimulationData;
}

export default function ComparisonCards({
  currentData,
  originalData,
}: ComparisonCardsProps) {
  const scoreChange = currentData.score - originalData.score;
  const isImproved = scoreChange < 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      {/* Before */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 relative overflow-hidden"
      >
        {/* 헤더 */}
        <div className="flex items-center mb-6 relative z-10">
          <div className="p-3 bg-blue-100 rounded-xl mr-4">
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">원래 상태</h3>
            <p className="text-gray-500 text-sm">시뮬레이션 시작 시점</p>
          </div>
        </div>

        {/* 점수 표시 */}
        <div className="text-center mb-6 relative z-10">
          <div className="text-6xl font-bold text-blue-600 mb-3">
            {originalData.score}
          </div>
          <div
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${getGradeColor(originalData.grade)}`}
          >
            {getGradeText(originalData.grade)}
          </div>
        </div>

        {/* 상세 정보 */}
        <div className="space-y-3 text-sm relative z-10">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-600 font-medium">보증금:</span>
            <span className="font-bold text-gray-800">
              {originalData.deposit
                ? `${originalData.deposit.toLocaleString()}만원`
                : "정보 없음"}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-600 font-medium">대출금:</span>
            <span className="font-bold text-gray-800">
              {originalData.loanAmount
                ? `${originalData.loanAmount.toLocaleString()}만원`
                : "정보 없음"}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-600 font-medium">선순위 채권:</span>
            <span
              className={`font-bold ${originalData.hasPriorityDebt ? "text-red-600" : "text-green-600"}`}
            >
              {originalData.hasPriorityDebt ? "있음" : "없음"}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-600 font-medium">임차권 등기:</span>
            <span
              className={`font-bold ${originalData.hasTenancyRegistration ? "text-green-600" : "text-red-600"}`}
            >
              {originalData.hasTenancyRegistration ? "완료" : "미완료"}
            </span>
          </div>
        </div>
      </motion.div>

      {/* After */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 relative overflow-hidden"
      >
        {/* 헤더 */}
        <div className="flex items-center mb-6 relative z-10">
          <div className="p-3 bg-green-100 rounded-xl mr-4">
            <Zap className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">현재 상태</h3>
            <p className="text-gray-500 text-sm">변수 조정 후 결과</p>
          </div>
        </div>

        {/* 점수 표시 */}
        <div className="text-center mb-6 relative z-10">
          <motion.div
            key={currentData.score}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-6xl font-bold mb-3"
            style={{ color: getScoreColor(currentData.score) }}
          >
            {currentData.score}
          </motion.div>
          <div
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${getGradeColor(currentData.grade)}`}
          >
            {getGradeText(currentData.grade)}
          </div>
        </div>

        {/* 변화량 표시 */}
        <div className="text-center mb-6 relative z-10">
          <div
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
              isImproved
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {isImproved ? (
              <TrendingDown className="w-4 h-4 mr-2" />
            ) : (
              <TrendingUp className="w-4 h-4 mr-2" />
            )}
            {isImproved ? "개선됨" : "악화됨"} ({Math.abs(scoreChange)}점)
          </div>
        </div>

        {/* 상세 정보 */}
        <div className="space-y-3 text-sm relative z-10">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-600 font-medium">보증금:</span>
            <span className="font-bold text-gray-800">
              {currentData.deposit
                ? `${currentData.deposit.toLocaleString()}만원`
                : "정보 없음"}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-600 font-medium">대출금:</span>
            <span className="font-bold text-gray-800">
              {currentData.loanAmount
                ? `${currentData.loanAmount.toLocaleString()}만원`
                : "정보 없음"}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-600 font-medium">선순위 채권:</span>
            <span
              className={`font-bold ${currentData.hasPriorityDebt ? "text-red-600" : "text-green-600"}`}
            >
              {currentData.hasPriorityDebt ? "있음" : "없음"}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-600 font-medium">임차권 등기:</span>
            <span
              className={`font-bold ${currentData.hasTenancyRegistration ? "text-green-600" : "text-red-600"}`}
            >
              {currentData.hasTenancyRegistration ? "완료" : "미완료"}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
