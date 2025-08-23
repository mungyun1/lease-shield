import { RiskAnalysis, ContractData } from "@/types";

// API 응답 데이터 타입 정의
export interface APIResponse {
  probability: number;
  riskScore: number;
  finalPrice: number;
  midLtv: number;
  modelVersion: string;
}

// 위험도 등급 계산
export const getRiskGrade = (
  riskScore: number
): "safe" | "moderate" | "danger" => {
  if (riskScore <= 3) return "safe";
  if (riskScore <= 6) return "moderate";
  return "danger";
};

// API 응답을 기반으로 위험 요인 생성
export const generateRiskFactors = (
  apiData: APIResponse,
  contractData: ContractData
) => {
  const factors = [];

  // LTV 기반 위험 요인
  if (apiData.midLtv > 3) {
    factors.push({
      name: "LTV 비율",
      impact: 35,
      description: `LTV ${apiData.midLtv.toFixed(2)}로 높은 수준`,
      category: "financial" as const,
    });
  } else if (apiData.midLtv > 2) {
    factors.push({
      name: "LTV 비율",
      impact: 25,
      description: `LTV ${apiData.midLtv.toFixed(2)}로 보통 수준`,
      category: "financial" as const,
    });
  }

  // 위험 점수 기반 요인
  if (apiData.riskScore > 7) {
    factors.push({
      name: "전체 위험도",
      impact: 30,
      description: `위험 점수 ${apiData.riskScore.toFixed(1)}로 높음`,
      category: "other" as const,
    });
  }

  // 확률 기반 요인
  if (apiData.probability > 0.1) {
    factors.push({
      name: "위험 발생 확률",
      impact: 20,
      description: `${(apiData.probability * 100).toFixed(1)}%의 위험 발생 가능성`,
      category: "other" as const,
    });
  }

  return factors;
};

// API 응답을 기반으로 설명 생성
export const generateExplanation = (
  apiData: APIResponse,
  contractData: ContractData
) => {
  const riskLevel = getRiskGrade(apiData.riskScore);
  const probabilityPercent = (apiData.probability * 100).toFixed(1);

  let explanation = `AI 모델(${apiData.modelVersion}) 분석 결과, 현재 계약의 위험 점수는 ${apiData.riskScore.toFixed(1)}점입니다. `;

  if (riskLevel === "safe") {
    explanation += `이는 낮은 위험도를 의미하며, 위험 발생 확률은 ${probabilityPercent}%입니다. `;
  } else if (riskLevel === "moderate") {
    explanation += `이는 중간 위험도를 의미하며, 위험 발생 확률은 ${probabilityPercent}%입니다. `;
  } else {
    explanation += `이는 높은 위험도를 의미하며, 위험 발생 확률은 ${probabilityPercent}%입니다. `;
  }

  explanation += `LTV 비율은 ${apiData.midLtv.toFixed(2)}이며, 권장 보험료는 ${apiData.finalPrice.toLocaleString()}원입니다. `;

  if (apiData.midLtv > 3) {
    explanation += "LTV가 높아 추가적인 위험 관리가 필요합니다.";
  } else {
    explanation += "현재 수준의 위험 관리로 충분합니다.";
  }

  return explanation;
};

// API 응답을 기반으로 맞춤형 권장사항 생성
export const generateCustomRecommendations = (
  apiData: APIResponse,
  contractData: ContractData
) => {
  const recommendations = [];

  // LTV 기반 권장사항
  if (apiData.midLtv > 3) {
    recommendations.push({
      title: "LTV 비율 관리",
      description: `현재 LTV ${apiData.midLtv.toFixed(2)}로 높은 수준입니다.`,
      actions: [
        "추가 담보 제공 고려",
        "대출금 상환 계획 수립",
        "부동산 가치 상승 모니터링",
      ],
      priority: "high" as const,
    });
  }

  // 위험 점수 기반 권장사항
  if (apiData.riskScore > 7) {
    recommendations.push({
      title: "위험 관리 강화",
      description: `위험 점수 ${apiData.riskScore.toFixed(1)}로 높은 수준입니다.`,
      actions: [
        "보험 가입 확대 검토",
        "정기적인 위험 평가",
        "전문가 상담 고려",
      ],
      priority: "high" as const,
    });
  }

  // 확률 기반 권장사항
  if (apiData.probability > 0.1) {
    recommendations.push({
      title: "위험 발생 대비",
      description: `${(apiData.probability * 100).toFixed(1)}%의 위험 발생 가능성이 있습니다.`,
      actions: [
        "비상 자금 확보",
        "대체 거주지 계획",
        "법적 권리 보호 방안 검토",
      ],
      priority: "medium" as const,
    });
  }

  // 보험료 기반 권장사항
  if (apiData.finalPrice > 50000) {
    recommendations.push({
      title: "보험료 최적화",
      description: `권장 보험료 ${apiData.finalPrice.toLocaleString()}원으로 높은 수준입니다.`,
      actions: [
        "다른 보험사 견적 비교",
        "담보 범위 조정 검토",
        "할인 혜택 활용",
      ],
      priority: "medium" as const,
    });
  }

  return recommendations;
};

// API 응답을 기반으로 위험도 분석 데이터 생성
export const createApiBasedAnalysis = (
  apiData: APIResponse,
  contractData: ContractData
): RiskAnalysis => {
  return {
    score: Math.round(apiData.riskScore * 10), // 0-100 스케일로 변환
    grade: getRiskGrade(apiData.riskScore),
    factors: generateRiskFactors(apiData, contractData),
    explanation: generateExplanation(apiData, contractData),
  };
};
