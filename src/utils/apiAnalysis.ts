import { RiskAnalysis } from "@/types";

// API 응답 데이터 타입 정의
export interface APIResponse {
  probability: number;
  riskScore: number;
  finalPrice: number;
  ltv: number;
  modelVersion: string;
  explanations: {
    topContributors: TopContributor[];
    globalImportanceTop3: { [key: string]: number };
    featureHistograms: { [key: string]: FeatureHistogram };
  };
}

export interface TopContributor {
  feature: string;
  percent: number;
  direction: "up" | "down";
  value: number;
  mean: number;
}

export interface FeatureHistogram {
  binEdges: number[];
  binCounts: number[];
  currentValue: number;
  mean: number;
  currentBinIndex: number;
}

// 위험도 등급 계산 (0-100 스케일 기준)
export const getRiskGrade = (
  riskScore: number
): "safe" | "moderate" | "danger" => {
  // undefined나 null 체크
  if (riskScore == null || isNaN(riskScore)) return "moderate";

  if (riskScore <= 20) return "safe";
  if (riskScore <= 60) return "moderate";
  return "danger";
};

// API 응답을 기반으로 위험 요인 생성
export const generateRiskFactors = (apiData: APIResponse) => {
  const factors = [];

  // 안전한 값 추출 (undefined 체크)
  const ltv = apiData.ltv ?? 0;
  const riskScore = apiData.riskScore ?? 0;
  const probability = apiData.probability ?? 0;

  // LTV 기반 위험 요인
  if (ltv > 3) {
    factors.push({
      name: "LTV 비율",
      impact: 35,
      description: `LTV ${ltv.toFixed(2)}로 높은 수준`,
      category: "financial" as const,
    });
  } else if (ltv > 2) {
    factors.push({
      name: "LTV 비율",
      impact: 25,
      description: `LTV ${ltv.toFixed(2)}로 보통 수준`,
      category: "financial" as const,
    });
  }

  // 위험 점수 기반 요인
  if (riskScore > 60) {
    factors.push({
      name: "전체 위험도",
      impact: 30,
      description: `위험 점수 ${riskScore.toFixed(1)}로 높음`,
      category: "other" as const,
    });
  }

  // 확률 기반 요인
  if (probability > 0.1) {
    factors.push({
      name: "위험 발생 확률",
      impact: 20,
      description: `${(probability * 100).toFixed(1)}%의 위험 발생 가능성`,
      category: "other" as const,
    });
  }

  return factors;
};

// API 응답을 기반으로 설명 생성
export const generateExplanation = (apiData: APIResponse) => {
  // 안전한 값 추출 (undefined 체크)
  const riskScore = apiData.riskScore ?? 0;
  const probability = apiData.probability ?? 0;
  const ltv = apiData.ltv ?? 0;
  const finalPrice = apiData.finalPrice ?? 0;
  const modelVersion = apiData.modelVersion ?? "v1.0";

  const riskLevel = getRiskGrade(riskScore);
  const probabilityPercent = (probability * 100).toFixed(1);

  let explanation = `AI 모델(${modelVersion}) 분석 결과, 현재 계약의 위험 점수는 ${riskScore.toFixed(1)}점입니다. `;

  if (riskLevel === "safe") {
    explanation += `이는 낮은 위험도를 의미하며, 위험 발생 확률은 ${probabilityPercent}%입니다. `;
  } else if (riskLevel === "moderate") {
    explanation += `이는 중간 위험도를 의미하며, 위험 발생 확률은 ${probabilityPercent}%입니다. `;
  } else {
    explanation += `이는 높은 위험도를 의미하며, 위험 발생 확률은 ${probabilityPercent}%입니다. `;
  }

  explanation += `LTV 비율은 ${ltv.toFixed(2)}이며, 권장 보험료는 ${finalPrice.toLocaleString()}원입니다. `;

  if (ltv > 3) {
    explanation += "LTV가 높아 추가적인 관리가 필요합니다.";
  } else {
    explanation += "현재 수준의 관리로 충분합니다.";
  }

  return explanation;
};

// API 응답을 기반으로 맞춤형 권장사항 생성
export const generateCustomRecommendations = (apiData: APIResponse) => {
  const recommendations = [];

  // 안전한 값 추출 (undefined 체크)
  const ltv = apiData.ltv ?? 0;
  const riskScore = apiData.riskScore ?? 0;
  const probability = apiData.probability ?? 0;
  const finalPrice = apiData.finalPrice ?? 0;

  // LTV 기반 권장사항
  if (ltv > 3) {
    recommendations.push({
      title: "LTV 비율 관리",
      description: `현재 LTV ${ltv.toFixed(2)}로 높은 수준입니다.`,
      actions: [
        "추가 담보 제공 고려",
        "대출금 상환 계획 수립",
        "부동산 가치 상승 모니터링",
      ],
      priority: "high" as const,
    });
  }

  // 위험 점수 기반 권장사항
  if (riskScore > 60) {
    recommendations.push({
      title: "위험 관리 강화",
      description: `위험 점수 ${riskScore.toFixed(1)}로 높은 수준입니다.`,
      actions: [
        "보험 가입 확대 검토",
        "정기적인 위험 평가",
        "전문가 상담 고려",
      ],
      priority: "high" as const,
    });
  }

  // 확률 기반 권장사항
  if (probability > 0.1) {
    recommendations.push({
      title: "위험 발생 대비",
      description: `${(probability * 100).toFixed(1)}%의 위험 발생 가능성이 있습니다.`,
      actions: [
        "비상 자금 확보",
        "대체 거주지 계획",
        "법적 권리 보호 방안 검토",
      ],
      priority: "medium" as const,
    });
  }

  // 보험료 기반 권장사항
  if (finalPrice > 50000) {
    recommendations.push({
      title: "보험료 최적화",
      description: `권장 보험료 ${finalPrice.toLocaleString()}원으로 높은 수준입니다.`,
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
export const createApiBasedAnalysis = (apiData: APIResponse): RiskAnalysis => {
  // 안전한 값 추출 (undefined 체크)
  const riskScore = apiData.riskScore ?? 0;

  return {
    score: riskScore, // 반올림 없이 원래 점수 그대로 사용
    grade: getRiskGrade(riskScore),
    factors: generateRiskFactors(apiData),
    explanation: generateExplanation(apiData),
  };
};
