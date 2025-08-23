"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { RiskAnalysis, ContractData } from "@/types";
import {
  analyzeRisk,
  downloadReport,
  generateExplanation,
} from "@/utils/riskAnalysis";
import {
  ContractSummary,
  RiskScoreCard,
  RiskFactorsAnalysis,
  CustomRecommendations,
  ActionButtons,
  ResultHeader,
  LoadingSpinner,
  GlobalImportanceChart,
} from "@/components/result";
import {
  APIResponse,
  createApiBasedAnalysis,
  generateCustomRecommendations,
} from "@/utils/apiAnalysis";

const mockData: Omit<RiskAnalysis, "explanation"> = {
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
};

export default function ResultPage() {
  const [riskResult, setRiskResult] = useState<RiskAnalysis | null>(null);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [contractData, setContractData] = useState<ContractData | null>(null);
  const [apiResponse, setApiResponse] = useState<APIResponse | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 계약 데이터와 API 응답 불러오기
    const savedContractData = localStorage.getItem("contractData");
    const savedApiResponse = localStorage.getItem("apiResponse");

    console.log("savedApiResponse", savedApiResponse);
    if (savedContractData) {
      try {
        const parsedData = JSON.parse(savedContractData);
        setContractData(parsedData);

        // API 응답이 있으면 사용, 없으면 기본 분석 수행
        if (savedApiResponse) {
          try {
            const parsedApiResponse = JSON.parse(savedApiResponse);

            setApiResponse(parsedApiResponse);

            // API 응답을 기반으로 위험도 분석 데이터 생성
            const apiBasedAnalysis = createApiBasedAnalysis(parsedApiResponse);
            setRiskResult(apiBasedAnalysis);
          } catch (error) {
            console.error("API 응답 파싱 실패:", error);
            // API 응답 파싱 실패 시 기본 분석 수행
            const analysis = analyzeRisk(parsedData);
            setRiskResult(analysis);
          }
        } else {
          console.log("저장된 API 응답이 없음");
          // API 응답이 없으면 기본 분석 수행
          const analysis = analyzeRisk(parsedData);
          setRiskResult(analysis);
        }
      } catch (error) {
        console.error("계약 데이터 파싱 실패:", error);
        // 기본 데이터로 폴백
        const mockDataWithExplanation: RiskAnalysis = {
          ...mockData,
          explanation: generateExplanation(mockData.score, mockData.factors),
        };
        setRiskResult(mockDataWithExplanation);
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

  // apiResponse 상태 변화 추적
  useEffect(() => {
    console.log("apiResponse 상태 변화:", apiResponse);
    if (apiResponse?.globalImportance) {
      console.log(
        "globalImportance 데이터 확인:",
        apiResponse.globalImportance
      );
    }
  }, [apiResponse]);

  const handleDownloadReport = async () => {
    if (riskResult && contractData) {
      setIsDownloading(true);
      try {
        await downloadReport(riskResult, contractData);
      } catch {
        // 리포트 다운로드 오류 처리
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

        {/* 전역 중요도 분석 차트 */}
        {apiResponse?.globalImportance && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <GlobalImportanceChart data={apiResponse.globalImportance} />
          </motion.div>
        )}

        {/* AI 설명 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-12"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-8 mt-12">
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
        {contractData && (
          <CustomRecommendations
            contractData={contractData}
            customRecommendations={
              apiResponse
                ? generateCustomRecommendations(apiResponse)
                : undefined
            }
          />
        )}

        {/* 액션 버튼 */}
        <ActionButtons
          onDownloadReport={handleDownloadReport}
          isDownloading={isDownloading}
        />
      </div>
    </div>
  );
}
