"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { RiskAnalysis, ContractData } from "@/types";
import { analyzeRisk, downloadReport } from "@/utils/riskAnalysis";
import {
  ContractSummary,
  RiskScoreCard,
  RiskFactorsAnalysis,
  CustomRecommendations,
  ActionButtons,
  ResultHeader,
  LoadingSpinner,
} from "@/components/result";

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
  const [contractData, setContractData] = useState<ContractData | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 계약 데이터 불러오기
    const savedContractData = localStorage.getItem("contractData");
    if (savedContractData) {
      try {
        const parsedData = JSON.parse(savedContractData);
        setContractData(parsedData);

        // 계약 데이터를 기반으로 위험도 분석 수행
        const analysis = analyzeRisk(parsedData);
        setRiskResult(analysis);
      } catch (error) {
        console.error("계약 데이터 파싱 오류:", error);
        // 기본 데이터로 폴백
        setRiskResult(mockData);
      }
    } else {
      // 계약 데이터가 없으면 홈으로 리다이렉트
      window.location.href = "/";
      return;
    }
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

  const handleDownloadReport = async () => {
    if (riskResult && contractData) {
      setIsDownloading(true);
      try {
        await downloadReport(riskResult, contractData);
      } catch (error) {
        console.error("리포트 다운로드 오류:", error);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  if (!riskResult) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50 relative overflow-hidden">
      {/* 배경 장식 요소들 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-indigo-300/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-200/20 to-blue-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-200/10 to-pink-200/10 rounded-full blur-3xl"></div>
      </div>

      <div
        className="relative z-10 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8"
        data-result-container
      >
        {/* 헤더 */}
        <ResultHeader />

        {/* 계약 정보 요약 */}
        {contractData && <ContractSummary contractData={contractData} />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {/* 위험 점수 카드 */}
          <RiskScoreCard
            score={riskResult.score}
            grade={riskResult.grade}
            animatedScore={animatedScore}
          />

          {/* 위험 요인 분석 */}
          <RiskFactorsAnalysis factors={riskResult.factors} />
        </div>

        {/* AI 설명 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-12"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Shield className="w-7 h-7 mr-3 text-blue-600" />
              AI 위험 분석 설명
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-2xl">
              <p className="text-gray-700 leading-relaxed text-lg">
                {riskResult.explanation}
              </p>
            </div>
          </div>
        </motion.div>

        {/* 맞춤형 예방 조치 제안 */}
        {contractData && <CustomRecommendations contractData={contractData} />}

        {/* 액션 버튼 */}
        <ActionButtons
          onDownloadReport={handleDownloadReport}
          isDownloading={isDownloading}
        />
      </div>
    </div>
  );
}
