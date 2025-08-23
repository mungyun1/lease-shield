"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { ContractData } from "@/types";
import { downloadReport } from "@/utils/riskAnalysis";
import {
  ContractSummary,
  RiskScoreCard,
  CustomRecommendations,
  ActionButtons,
  ResultHeader,
  LoadingSpinner,
  GlobalImportanceChart,
  FeatureComparisonChart,
} from "@/components/result";
import {
  APIResponse,
  createApiBasedAnalysis,
  generateCustomRecommendations,
  getRiskGrade,
  generateExplanation,
} from "@/utils/apiAnalysis";

export default function ResultPage() {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [contractData, setContractData] = useState<ContractData | null>(null);
  const [apiResponse, setApiResponse] = useState<APIResponse | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const savedContractData = localStorage.getItem("contractData");
    const savedApiResponse = localStorage.getItem("apiResponse");

    if (savedContractData) {
      try {
        const parsedData = JSON.parse(savedContractData);
        setContractData(parsedData);

        if (savedApiResponse) {
          try {
            const parsedApiResponse = JSON.parse(savedApiResponse);
            setApiResponse(parsedApiResponse);
          } catch (error) {
            console.error("API 응답 파싱 실패:", error);
          }
        }
      } catch (error) {
        console.error("계약 데이터 파싱 실패:", error);
        // 계약 데이터가 없으면 홈으로 리다이렉트
        window.location.href = "/";
        return;
      }
    } else {
      // 계약 데이터가 없으면 홈으로 리다이렉트
      window.location.href = "/";
      return;
    }
  }, []);

  useEffect(() => {
    if (apiResponse?.riskScore) {
      const timer = setInterval(() => {
        setAnimatedScore((prev) => {
          if (prev >= apiResponse.riskScore) {
            clearInterval(timer);
            return apiResponse.riskScore;
          }
          return prev + 1;
        });
      }, 20);
      return () => clearInterval(timer);
    }
  }, [apiResponse]);

  const handleDownloadReport = async () => {
    if (apiResponse && contractData) {
      setIsDownloading(true);
      try {
        const riskAnalysis = createApiBasedAnalysis(apiResponse);
        await downloadReport(riskAnalysis, contractData);
      } catch {
      } finally {
        setIsDownloading(false);
      }
    }
  };

  if (!apiResponse) {
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
            score={apiResponse.riskScore}
            grade={getRiskGrade(apiResponse.riskScore)}
            animatedScore={animatedScore}
          />

          {/* 전역 중요도 분석 차트 */}
          {apiResponse.explanations.topContributors && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <GlobalImportanceChart
                data={apiResponse.explanations.topContributors}
              />
            </motion.div>
          )}
        </div>

        {/* 막대 그래프 영역 */}
        {apiResponse.explanations.featureHistograms && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            <FeatureComparisonChart
              data={apiResponse.explanations.featureHistograms}
            />
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
                {generateExplanation(apiResponse)}
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
