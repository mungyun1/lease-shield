"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, RotateCcw, Download } from "lucide-react";
import { SimulationData } from "@/types";
import { getGradeColor, getGradeText } from "@/utils";

export default function SimulationPage() {
  const [currentData, setCurrentData] = useState<SimulationData>({
    region: "seoul",
    housingType: "apartment",
    deposit: 5000,
    loanAmount: 3000,
    hasPriorityDebt: false,
    hasTenancyRegistration: false,
    score: 75,
    grade: "moderate",
  });

  const [originalData, setOriginalData] = useState<SimulationData>({
    ...currentData,
  });

  // 실시간 피드백 상태
  const [activeFeedback, setActiveFeedback] = useState<string | null>(null);

  // 위험도 계산 함수 (실제로는 API 호출)
  const calculateRiskScore = (
    data: Omit<SimulationData, "score" | "grade">
  ): { score: number; grade: "safe" | "moderate" | "danger" } => {
    let score = 50; // 기본 점수

    // 보증금 영향 (높을수록 위험)
    if (data.deposit > 10000) score += 25;
    else if (data.deposit > 5000) score += 15;
    else if (data.deposit > 3000) score += 5;

    // 대출금 영향 (높을수록 위험)
    if (data.loanAmount > 5000) score += 20;
    else if (data.loanAmount > 3000) score += 10;
    else if (data.loanAmount > 1000) score += 5;

    // 선순위 채권 영향
    if (data.hasPriorityDebt) score += 20;

    // 임차권 등기 영향 (등기 시 위험 감소)
    if (data.hasTenancyRegistration) score -= 15;

    // 점수 범위 조정
    score = Math.max(0, Math.min(100, score));

    // 등급 결정
    let grade: "safe" | "moderate" | "danger";
    if (score <= 30) grade = "safe";
    else if (score <= 70) grade = "moderate";
    else grade = "danger";

    return { score, grade };
  };

  // 변수별 영향도 분석 함수
  const getVariableImpact = (
    field: keyof Omit<SimulationData, "score" | "grade">
  ) => {
    const currentValue = currentData[field];
    const originalValue = originalData[field];

    if (field === "deposit") {
      const diff = (currentValue as number) - (originalValue as number);
      if (diff > 0) {
        return {
          type: "negative",
          message: `보증금이 ${diff.toLocaleString()}만원 증가하여 위험도가 상승했습니다. 보증금을 낮추면 위험 점수가 개선되고 등급이 조정됩니다.`,
          recommendation:
            "보증금을 낮추거나 월세를 높여 총 비용을 조정해보세요.",
        };
      } else if (diff < 0) {
        return {
          type: "positive",
          message: `보증금이 ${Math.abs(diff).toLocaleString()}만원 감소하여 위험도가 개선되었습니다!`,
          recommendation:
            "현재 설정이 안전합니다. 더 낮출 수 있다면 추가로 위험도를 줄일 수 있습니다.",
        };
      }
    }

    if (field === "loanAmount") {
      const diff = (currentValue as number) - (originalValue as number);
      if (diff > 0) {
        return {
          type: "negative",
          message: `대출금이 ${diff.toLocaleString()}만원 증가하여 위험도가 상승했습니다. 대출금을 줄이면 위험 점수가 개선되고 등급이 조정됩니다.`,
          recommendation:
            "수입의 30% 이하로 대출금을 유지하는 것이 안전합니다.",
        };
      } else if (diff < 0) {
        return {
          type: "positive",
          message: `대출금이 ${Math.abs(diff).toLocaleString()}만원 감소하여 위험도가 개선되었습니다!`,
          recommendation:
            "현재 설정이 안전합니다. 추가 대출이 필요하지 않다면 현재 상태를 유지하세요.",
        };
      }
    }

    if (field === "hasPriorityDebt") {
      if (currentValue && !originalValue) {
        return {
          type: "negative",
          message:
            "선순위 채권이 추가되어 위험도가 크게 상승했습니다. 선순위 채권이 없는 계약을 선택하면 위험 점수가 크게 개선됩니다.",
          recommendation: "가능하다면 선순위 채권이 없는 계약을 찾아보세요.",
        };
      } else if (!currentValue && originalValue) {
        return {
          type: "positive",
          message: "선순위 채권이 제거되어 위험도가 크게 개선되었습니다!",
          recommendation: "현재 설정이 매우 안전합니다. 이 상태를 유지하세요.",
        };
      }
    }

    if (field === "hasTenancyRegistration") {
      if (currentValue && !originalValue) {
        return {
          type: "positive",
          message:
            "임차권 등기가 완료되어 위험도가 크게 개선되었습니다! 임차권 등기는 권리 보호에 매우 중요합니다.",
          recommendation:
            "임차권 등기를 반드시 완료하세요. 이는 가장 효과적인 예방 방법입니다.",
        };
      } else if (!currentValue && originalValue) {
        return {
          type: "negative",
          message:
            "임차권 등기가 미완료되어 위험도가 크게 상승했습니다. 임차권 등기를 완료하면 위험 점수가 크게 개선됩니다.",
          recommendation:
            "가능한 빨리 임차권 등기를 완료하세요. 이는 권리 보호의 핵심입니다.",
        };
      }
    }

    return null;
  };

  const handleInputChange = (
    field: keyof Omit<SimulationData, "score" | "grade">,
    value: number | boolean
  ) => {
    const newData = { ...currentData, [field]: value };
    const { score, grade } = calculateRiskScore(newData);
    setCurrentData({ ...newData, score, grade });

    // 실시간 피드백 표시
    const impact = getVariableImpact(field);
    if (impact) {
      setActiveFeedback(impact.message);
      // 5초 후 피드백 숨김
      setTimeout(() => setActiveFeedback(null), 5000);
    }
  };

  const resetToOriginal = () => {
    setCurrentData({ ...originalData });
  };

  const saveOriginal = () => {
    setOriginalData({ ...currentData });
  };

  const getScoreColor = (score: number) => {
    if (score <= 30) return "text-green-600";
    if (score <= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const chartData = [
    {
      name: "보증금",
      current: currentData.deposit,
      original: originalData.deposit,
    },
    {
      name: "대출금",
      current: currentData.loanAmount,
      original: originalData.loanAmount,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            What-if 시뮬레이션
          </h1>
          <p className="text-gray-600">
            주요 변수를 조정하여 위험도 변화를 실시간으로 확인해보세요
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 시뮬레이션 컨트롤 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                변수 조정
              </h2>

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
                  onChange={(e) =>
                    handleInputChange("deposit", parseInt(e.target.value))
                  }
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
                    handleInputChange("loanAmount", parseInt(e.target.value))
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
                      handleInputChange("hasPriorityDebt", e.target.checked)
                    }
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">
                    선순위 채권 존재
                  </span>
                </label>
                <div className="ml-7 text-xs text-gray-600">
                  ⚠️ 선순위 채권이 있으면 위험도가 크게 증가합니다. 선순위
                  채권이 없는 계약을 선택하면 위험 점수가 크게 개선됩니다.
                </div>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={currentData.hasTenancyRegistration}
                    onChange={(e) =>
                      handleInputChange(
                        "hasTenancyRegistration",
                        e.target.checked
                      )
                    }
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">
                    임차권 등기 완료
                  </span>
                </label>
                <div className="ml-7 text-xs text-gray-600">
                  ✅ 임차권 등기를 완료하면 위험도가 크게 감소합니다. 이는 권리
                  보호에 가장 중요한 요소입니다.
                </div>
              </div>

              {/* 액션 버튼들 */}
              <div className="space-y-3">
                <button
                  onClick={resetToOriginal}
                  className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium flex items-center justify-center"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  원래대로 복원
                </button>
                <button
                  onClick={saveOriginal}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  현재 상태 저장
                </button>
              </div>
            </div>
          </motion.div>

          {/* 결과 비교 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            {/* Before/After 비교 */}
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

            {/* 변화량 표시 */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                변화량 분석
              </h3>
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
                    {(
                      currentData.deposit - originalData.deposit
                    ).toLocaleString()}
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
                    {currentData.loanAmount - originalData.loanAmount > 0
                      ? "+"
                      : ""}
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

            {/* 차트 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">
                변수별 비교 차트
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}만원`} />
                  <Bar dataKey="original" fill="#6b7280" name="원래 상태" />
                  <Bar dataKey="current" fill="#3b82f6" name="현재 상태" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* 인사이트 */}
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
                <h3 className="font-semibold text-blue-800 mb-2">
                  위험도 개선 팁
                </h3>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• 보증금을 낮추면 위험도가 감소합니다</li>
                  <li>• 임차권 등기를 완료하면 위험도가 크게 감소합니다</li>
                  <li>• 선순위 채권이 없는 계약을 선택하세요</li>
                  <li>• 대출금은 수입의 30% 이하로 유지하세요</li>
                </ul>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                <h3 className="font-semibold text-green-800 mb-2">
                  최적화 전략
                </h3>
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
                    <li>
                      • 등기 미완료 → 완료: 위험 점수 -15점, 등급 크게 개선
                    </li>
                    <li>• 선순위 채권 제거: 위험 점수 -20점, 등급 대폭 개선</li>
                    <li>• 대출금 30% 감소: 위험 점수 -10점, 등급 개선</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
