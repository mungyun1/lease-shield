"use client";

import { useState, useEffect } from "react";
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
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { RiskAnalysis } from "@/types";
import { getGradeColor, getGradeText } from "@/utils";

const mockData: RiskAnalysis = {
  score: 75,
  grade: "moderate",
  factors: [
    {
      name: "보증금",
      impact: 30,
      description: "지역 평균 대비 높음",
      category: "financial",
    },
    {
      name: "선순위 채권",
      impact: 25,
      description: "담보권 설정으로 인한 위험",
      category: "legal",
    },
    {
      name: "대출금",
      impact: 20,
      description: "적정 수준",
      category: "financial",
    },
  ],
  explanation:
    "현재 계약은 보증금이 지역 평균 대비 높고, 선순위 채권이 존재하여 중간 정도의 위험도를 보입니다. 임차권 등기를 통해 일부 위험을 완화할 수 있습니다.",
};

export default function ResultPage() {
  const [riskResult, setRiskResult] = useState<RiskAnalysis | null>(null);
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    // TODO: 실제 API 호출로 대체
    setRiskResult(mockData);
  }, []);

  useEffect(() => {
    if (riskResult) {
      const timer = setInterval(() => {
        setAnimatedScore((prev) => {
          if (prev >= riskResult.score) {
            clearInterval(timer);
            return riskResult.score;
          }
          return prev + 1;
        });
      }, 20);
      return () => clearInterval(timer);
    }
  }, [riskResult]);

  if (!riskResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">위험도를 분석하고 있습니다...</p>
        </div>
      </div>
    );
  }

  const getGradeIcon = (grade: string) => {
    switch (grade) {
      case "safe":
        return <CheckCircle className="w-6 h-6" />;
      case "moderate":
        return <AlertTriangle className="w-6 h-6" />;
      case "danger":
        return <Shield className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            전세 계약 위험 진단 결과
          </h1>
          <p className="text-gray-600">AI가 분석한 당신의 계약 위험도입니다</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 위험 점수 카드 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  위험 점수
                </h2>

                {/* 게이지 차트 */}
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* 배경 원 */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                    />
                    {/* 진행률 원 */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="8"
                      strokeDasharray={`${(animatedScore / 100) * 283} 283`}
                      strokeDashoffset="0"
                      transform="rotate(-90 50 50)"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>

                  {/* 중앙 점수 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600">
                        {animatedScore}
                      </div>
                      <div className="text-sm text-gray-500">점</div>
                    </div>
                  </div>
                </div>

                {/* 등급 */}
                <div
                  className={`inline-flex items-center px-4 py-2 rounded-full ${getGradeColor(riskResult.grade)}`}
                >
                  {getGradeIcon(riskResult.grade)}
                  <span className="ml-2 font-medium">
                    {getGradeText(riskResult.grade)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 위험 요인 차트 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                위험 요인별 영향도
              </h2>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={riskResult.factors}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="impact" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>

              {/* 요인별 설명 */}
              <div className="mt-6 space-y-3">
                {riskResult.factors.map((factor, index) => (
                  <motion.div
                    key={factor.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <span className="font-medium text-gray-800">
                        {factor.name}
                      </span>
                      <p className="text-sm text-gray-600">
                        {factor.description}
                      </p>
                    </div>
                    <div className="flex items-center">
                      {factor.impact > 25 ? (
                        <TrendingUp className="w-5 h-5 text-red-500" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-green-500" />
                      )}
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        {factor.impact}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* AI 설명 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Shield className="w-6 h-6 mr-2 text-blue-600" />
              AI 위험 분석 설명
            </h2>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-gray-700 leading-relaxed">
                {riskResult.explanation}
              </p>
            </div>
          </div>
        </motion.div>

        {/* 액션 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              예방 가이드 보기
            </button>
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
              시뮬레이션 해보기
            </button>
            <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">
              리포트 다운로드
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
