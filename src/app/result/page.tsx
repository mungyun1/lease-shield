"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
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
  ArrowLeft,
  Download,
  BookOpen,
  Play,
  Home,
  MapPin,
  DollarSign,
} from "lucide-react";
import { RiskAnalysis, ContractData, RiskFactor } from "@/types";
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
  const router = useRouter();
  const [riskResult, setRiskResult] = useState<RiskAnalysis | null>(null);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [contractData, setContractData] = useState<ContractData | null>(null);

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
      router.push("/");
      return;
    }
  }, [router]);

  // 계약 데이터를 기반으로 위험도 분석하는 함수
  const analyzeRisk = (data: ContractData): RiskAnalysis => {
    let score = 50; // 기본 점수
    const factors: RiskFactor[] = [];

    // 보증금 분석
    if (data.deposit > 10000) {
      score += 20;
      factors.push({
        name: "보증금",
        impact: 25,
        description: "높은 보증금으로 인한 위험",
        category: "financial",
      });
    } else if (data.deposit > 5000) {
      score += 10;
      factors.push({
        name: "보증금",
        impact: 15,
        description: "적정 수준의 보증금",
        category: "financial",
      });
    }

    // 대출금 분석
    if (data.loanAmount > data.deposit * 0.7) {
      score += 15;
      factors.push({
        name: "대출금",
        impact: 20,
        description: "보증금 대비 높은 대출금",
        category: "financial",
      });
    }

    // 선순위 채권 분석
    if (data.hasPriorityDebt) {
      score += 20;
      factors.push({
        name: "선순위 채권",
        impact: 30,
        description: "담보권 설정으로 인한 위험",
        category: "legal",
      });
    }

    // 임차권 등기 분석
    if (!data.hasTenancyRegistration) {
      score += 15;
      factors.push({
        name: "임차권 미등기",
        impact: 20,
        description: "임차권 보호 부족",
        category: "legal",
      });
    }

    // 점수 범위 조정 (0-100)
    score = Math.min(Math.max(score, 0), 100);

    // 등급 결정
    let grade: "safe" | "moderate" | "danger";
    if (score <= 30) grade = "safe";
    else if (score <= 70) grade = "moderate";
    else grade = "danger";

    // 설명 생성
    let explanation = "";
    if (grade === "safe") {
      explanation =
        "현재 계약은 비교적 안전한 수준입니다. 다만 임차권 등기 등 추가적인 보호 장치를 마련하는 것을 권장합니다.";
    } else if (grade === "moderate") {
      explanation =
        "현재 계약은 중간 정도의 위험도를 보입니다. 선순위 채권이나 높은 보증금 등에 주의가 필요합니다.";
    } else {
      explanation =
        "현재 계약은 높은 위험도를 보입니다. 전문가 상담을 통해 계약 조건을 재검토하는 것을 권장합니다.";
    }

    return {
      score,
      grade,
      factors,
      explanation,
    };
  };

  // 지역을 한국어로 변환하는 함수
  const getKoreanRegion = (region: string): string => {
    const regionMap: { [key: string]: string } = {
      seoul: "서울",
      busan: "부산",
      daegu: "대구",
      incheon: "인천",
      gwangju: "광주",
      daejeon: "대전",
      ulsan: "울산",
      sejong: "세종",
      gyeonggi: "경기도",
      gangwon: "강원도",
      chungbuk: "충청북도",
      chungnam: "충청남도",
      jeonbuk: "전라북도",
      jeonnam: "전라남도",
      gyeongbuk: "경상북도",
      gyeongnam: "경상남도",
      jeju: "제주도",
    };
    return regionMap[region.toLowerCase()] || region;
  };

  // 주택 유형을 한국어로 변환하는 함수
  const getKoreanHousingType = (housingType: string): string => {
    const housingTypeMap: { [key: string]: string } = {
      apartment: "아파트",
      house: "단독주택",
      villa: "빌라",
      officetel: "오피스텔",
      studio: "원룸",
      duplex: "듀플렉스",
      penthouse: "펜트하우스",
      townhouse: "타운하우스",
      condo: "콘도",
      loft: "로프트",
    };
    return housingTypeMap[housingType.toLowerCase()] || housingType;
  };

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gray-600 text-lg font-medium"
          >
            위험도를 분석하고 있습니다...
          </motion.p>
        </div>
      </div>
    );
  }

  const getGradeIcon = (grade: string) => {
    switch (grade) {
      case "safe":
        return <CheckCircle className="w-8 h-8 text-green-500" />;
      case "moderate":
        return <AlertTriangle className="w-8 h-8 text-yellow-500" />;
      case "danger":
        return <Shield className="w-8 h-8 text-red-500" />;
      default:
        return null;
    }
  };

  // 리포트 다운로드 함수
  const downloadReport = () => {
    if (!riskResult || !contractData) return;

    const reportContent = `
전세 계약 위험 진단 리포트

진단 일시: ${new Date().toLocaleString("ko-KR")}
계약 정보:
- 지역: ${contractData.region}
- 주택유형: ${contractData.housingType}
- 보증금: ${contractData.deposit.toLocaleString()}만원
- 대출금: ${contractData.loanAmount.toLocaleString()}만원
- 선순위 채권: ${contractData.hasPriorityDebt ? "있음" : "없음"}
- 임차권 등기: ${contractData.hasTenancyRegistration ? "등기됨" : "미등기"}

위험 진단 결과:
- 위험 점수: ${riskResult.score}점
- 위험 등급: ${getGradeText(riskResult.grade)}

위험 요인:
${riskResult.factors.map((factor) => `- ${factor.name}: ${factor.impact}% (${factor.description})`).join("\n")}

AI 분석 설명:
${riskResult.explanation}

권장사항:
1. 임차권 등기 신청을 통한 권리 보호
2. 전문가 상담을 통한 계약 조건 검토
3. 정기적인 계약 상태 모니터링
    `;

    const blob = new Blob([reportContent], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `전세계약_위험진단_리포트_${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50 relative overflow-hidden">
      {/* 배경 장식 요소들 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-indigo-300/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-200/20 to-blue-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-200/10 to-pink-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          {/* 네비게이션 버튼들 */}
          <div className="flex items-center justify-between mb-8">
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/input")}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-white/80 rounded-xl transition-all duration-300 backdrop-blur-sm"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              입력 페이지로 돌아가기
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/")}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-white/80 rounded-xl transition-all duration-300 backdrop-blur-sm"
            >
              <Home className="w-5 h-5 mr-2" />
              홈으로
            </motion.button>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
          >
            전세 계약 위험 진단 결과
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 mb-8"
          >
            AI가 분석한 당신의 계약 위험도입니다
          </motion.p>

          {/* 계약 정보 요약 */}
          {contractData && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="w-full"
            >
              <div className="bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 p-8">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    계약 정보 요약
                  </h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {/* 지역 정보 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-center group"
                  >
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-4 mb-3 group-hover:shadow-lg transition-all duration-300">
                      <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    </div>
                    <div className="text-gray-500 text-sm mb-1 font-medium">
                      지역
                    </div>
                    <div className="font-bold text-gray-800 text-lg">
                      {getKoreanRegion(contractData.region)}
                    </div>
                  </motion.div>

                  {/* 주택유형 정보 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center group"
                  >
                    <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl p-4 mb-3 group-hover:shadow-lg transition-all duration-300">
                      <Home className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                    </div>
                    <div className="text-gray-500 text-sm mb-1 font-medium">
                      주택유형
                    </div>
                    <div className="font-bold text-gray-800 text-lg">
                      {getKoreanHousingType(contractData.housingType)}
                    </div>
                  </motion.div>

                  {/* 보증금 정보 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-center group"
                  >
                    <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-4 mb-3 group-hover:shadow-lg transition-all duration-300">
                      <DollarSign className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    </div>
                    <div className="text-gray-500 text-sm mb-1 font-medium">
                      보증금
                    </div>
                    <div className="font-bold text-gray-800 text-lg">
                      {contractData.deposit.toLocaleString()}만원
                    </div>
                  </motion.div>

                  {/* 대출금 정보 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-center group"
                  >
                    <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-4 mb-3 group-hover:shadow-lg transition-all duration-300">
                      <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    </div>
                    <div className="text-gray-500 text-sm mb-1 font-medium">
                      대출금
                    </div>
                    <div className="font-bold text-gray-800 text-lg">
                      {contractData.loanAmount.toLocaleString()}만원
                    </div>
                  </motion.div>
                </div>

                {/* 추가 계약 정보 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mt-6 pt-6 border-t border-gray-200"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-center p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
                      <div className="flex items-center">
                        <Shield className="w-5 h-5 text-gray-600 mr-2" />
                        <span className="text-sm text-gray-600">
                          선순위 채권:
                        </span>
                        <span className="ml-2 font-semibold text-gray-800">
                          {contractData.hasPriorityDebt ? "있음" : "없음"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center p-3 bg-gradient-to-r from-gray-50 to-green-50 rounded-xl">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-gray-600 mr-2" />
                        <span className="text-sm text-gray-600">
                          임차권 등기:
                        </span>
                        <span className="ml-2 font-semibold text-gray-800">
                          {contractData.hasTenancyRegistration
                            ? "등기됨"
                            : "미등기"}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* 위험 점수 카드 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 h-full">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  위험 점수
                </h2>

                {/* 게이지 차트 */}
                <div className="relative w-56 h-56 mx-auto mb-8">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* 배경 원 */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#f1f5f9"
                      strokeWidth="10"
                    />
                    {/* 진행률 원 */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="10"
                      strokeDasharray={`${(animatedScore / 100) * 283} 283`}
                      strokeDashoffset="0"
                      transform="rotate(-90 50 50)"
                      className="transition-all duration-1000 ease-out"
                      strokeLinecap="round"
                    />
                    {/* 그라데이션 정의 */}
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* 중앙 점수 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.8,
                          type: "spring",
                          stiffness: 200,
                        }}
                        className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                      >
                        {animatedScore}
                      </motion.div>
                      <div className="text-sm text-gray-500 font-medium">
                        점
                      </div>
                    </div>
                  </div>
                </div>

                {/* 등급 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className={`inline-flex items-center px-6 py-3 rounded-full ${getGradeColor(riskResult.grade)} shadow-lg`}
                >
                  {getGradeIcon(riskResult.grade)}
                  <span className="ml-3 font-bold text-lg">
                    {getGradeText(riskResult.grade)}
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* 위험 요인 차트 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 h-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Shield className="w-7 h-7 mr-3 text-blue-600" />
                위험 요인별 영향도 분석
              </h2>

              {/* 위험 요인 요약 카드 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {riskResult.factors.map((factor, index) => (
                  <motion.div
                    key={factor.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 text-center border border-blue-100"
                  >
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {factor.impact}%
                    </div>
                    <div className="text-sm font-medium text-gray-700">
                      {factor.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {factor.category === "financial"
                        ? "금융적 위험"
                        : "법적 위험"}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* 차트 제목 및 설명 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  위험 요인별 상세 분석
                </h3>
                <p className="text-sm text-gray-600">
                  각 요인의 영향도를 시각적으로 확인하고, 상세 설명을 참고하세요
                </p>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={riskResult.factors}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: "#64748b", fontWeight: 600 }}
                    axisLine={{ stroke: "#e2e8f0" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#64748b" }}
                    axisLine={{ stroke: "#e2e8f0" }}
                    tickLine={false}
                    label={{
                      value: "영향도 (%)",
                      angle: -90,
                      position: "insideLeft",
                      style: { textAnchor: "middle", fill: "#64748b" },
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.98)",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                      padding: "12px 16px",
                    }}
                  />
                  <Bar
                    dataKey="impact"
                    fill="url(#barGradient)"
                    radius={[8, 8, 0, 0]}
                    maxBarSize={80}
                  />
                  <defs>
                    <linearGradient
                      id="barGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#1d4ed8" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>

              {/* 차트 범례 */}
              <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-b from-blue-400 to-blue-600 rounded mr-2"></div>
                  <span>영향도 높음 (25% 이상)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-b from-blue-300 to-blue-500 rounded mr-2"></div>
                  <span>영향도 보통 (15-24%)</span>
                </div>
              </div>

              {/* 요인별 상세 설명 */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
                  위험 요인 상세 분석
                </h3>
                <div className="space-y-4">
                  {riskResult.factors.map((factor, index) => (
                    <motion.div
                      key={factor.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="font-semibold text-gray-800 text-lg mr-3">
                            {factor.name}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              factor.category === "financial"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-purple-100 text-purple-700"
                            }`}
                          >
                            {factor.category === "financial"
                              ? "금융적 위험"
                              : "법적 위험"}
                          </span>
                        </div>
                        <p className="text-gray-600">{factor.description}</p>
                      </div>
                      <div className="flex items-center ml-4">
                        {factor.impact > 25 ? (
                          <TrendingUp className="w-6 h-6 text-red-500 mr-3" />
                        ) : (
                          <TrendingDown className="w-6 h-6 text-green-500 mr-3" />
                        )}
                        <div className="text-center">
                          <span className="text-2xl font-bold text-gray-700 block">
                            {factor.impact}%
                          </span>
                          <span className="text-xs text-gray-500">영향도</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* AI 설명 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-12"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
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

        {/* 액션 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/guide")}
              className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform"
            >
              <BookOpen className="w-6 h-6 mr-3" />
              예방 가이드 보기
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/simulation")}
              className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform"
            >
              <Play className="w-6 h-6 mr-3" />
              시뮬레이션 해보기
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => downloadReport()}
              className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform"
            >
              <Download className="w-6 h-6 mr-3" />
              리포트 다운로드
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
