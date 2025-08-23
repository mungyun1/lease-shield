import { SimulationData } from "@/types";

// 위험도 계산 함수
export const calculateRiskScore = (
  data: Omit<SimulationData, "score" | "grade">
): { score: number; grade: "safe" | "moderate" | "danger" } => {
  let score = 50; // 기본 점수

  // 전세보증금 영향 (높을수록 위험)
  if (data.jeonseDepositAmount && data.jeonseDepositAmount > 10000) score += 25;
  else if (data.jeonseDepositAmount && data.jeonseDepositAmount > 5000)
    score += 15;
  else if (data.jeonseDepositAmount && data.jeonseDepositAmount > 3000)
    score += 5;

  // 재산가치 영향 (높을수록 위험)
  if (data.propertyValue && data.propertyValue > 50000) score += 20;
  else if (data.propertyValue && data.propertyValue > 30000) score += 10;
  else if (data.propertyValue && data.propertyValue > 10000) score += 5;

  // 선순위 채권 영향
  if (data.seniorLienAmount) score += 20;

  // 보험 기간 영향 (기간 설정 시 위험 감소)
  if (data.coverageStartYyyymm && data.coverageEndYyyymm) score -= 10;

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
export const getVariableImpact = (
  field: keyof Omit<SimulationData, "score" | "grade">,
  currentData: SimulationData,
  originalData: SimulationData
) => {
  const currentValue = currentData[field];
  const originalValue = originalData[field];

  if (field === "jeonseDepositAmount") {
    if (currentValue === null || originalValue === null) return null;
    const diff = (currentValue as number) - (originalValue as number);
    if (diff > 0) {
      return {
        type: "negative" as const,
        message: `전세보증금이 ${diff.toLocaleString()}만원 증가하여 위험도가 상승했습니다. 전세보증금을 낮추면 위험 점수가 개선되고 등급이 조정됩니다.`,
        recommendation:
          "전세보증금을 낮추거나 월세를 높여 총 비용을 조정해보세요.",
      };
    } else if (diff < 0) {
      return {
        type: "positive" as const,
        message: `전세보증금이 ${Math.abs(diff).toLocaleString()}만원 감소하여 위험도가 개선되었습니다!`,
        recommendation:
          "현재 설정이 안전합니다. 더 낮출 수 있다면 추가로 위험도를 줄일 수 있습니다.",
      };
    }
  }

  if (field === "propertyValue") {
    if (currentValue === null || originalValue === null) return null;
    const diff = (currentValue as number) - (originalValue as number);
    if (diff > 0) {
      return {
        type: "negative" as const,
        message: `재산가치가 ${diff.toLocaleString()}만원 증가하여 위험도가 상승했습니다. 재산가치를 낮추면 위험 점수가 개선되고 등급이 조정됩니다.`,
        recommendation: "재산가치를 낮추거나 보험 범위를 조정해보세요.",
      };
    } else if (diff < 0) {
      return {
        type: "positive" as const,
        message: `재산가치가 ${Math.abs(diff).toLocaleString()}만원 감소하여 위험도가 개선되었습니다!`,
        recommendation:
          "현재 설정이 안전합니다. 추가 조정이 필요하지 않다면 현재 상태를 유지하세요.",
      };
    }
  }

  if (field === "seniorLienAmount") {
    if (currentValue && !originalValue) {
      return {
        type: "negative" as const,
        message:
          "선순위 채권이 추가되어 위험도가 크게 상승했습니다. 선순위 채권이 없는 계약을 선택하면 위험 점수가 크게 개선됩니다.",
        recommendation: "가능하다면 선순위 채권이 없는 계약을 찾아보세요.",
      };
    } else if (!currentValue && originalValue) {
      return {
        type: "positive" as const,
        message: "선순위 채권이 제거되어 위험도가 크게 개선되었습니다!",
        recommendation: "현재 설정이 매우 안전합니다. 이 상태를 유지하세요.",
      };
    }
  }

  if (field === "coverageStartYyyymm") {
    if (currentValue && !originalValue) {
      return {
        type: "positive" as const,
        message:
          "보험 시작일이 설정되어 위험도가 개선되었습니다! 보험 기간 설정은 권리 보호에 중요합니다.",
        recommendation:
          "보험 기간을 적절히 설정하세요. 이는 위험 관리의 핵심입니다.",
      };
    } else if (!currentValue && originalValue) {
      return {
        type: "negative" as const,
        message:
          "보험 시작일이 미설정되어 위험도가 상승했습니다. 보험 기간을 설정하면 위험 점수가 개선됩니다.",
        recommendation:
          "가능한 빨리 보험 기간을 설정하세요. 이는 위험 관리의 핵심입니다.",
      };
    }
  }

  return null;
};

// 점수 색상 반환 함수
export const getScoreColor = (score: number) => {
  if (score <= 30) return "text-green-600";
  if (score <= 70) return "text-yellow-600";
  return "text-red-600";
};

// 차트 데이터 생성 함수
export const generateChartData = (
  currentData: SimulationData,
  originalData: SimulationData
) => [
  {
    name: "전세보증금",
    current: currentData.jeonseDepositAmount || 0,
    original: originalData.jeonseDepositAmount || 0,
  },
  {
    name: "재산가치",
    current: currentData.propertyValue || 0,
    original: originalData.propertyValue || 0,
  },
];

// 초기 시뮬레이션 데이터
export const getInitialSimulationData = (): SimulationData => ({
  region: "",
  address: "서울특별시 강남구",
  zipCode: "06123",
  detailAddress: "",
  housingType: "apartment",
  seniorLienAmount: null,
  jeonseDepositAmount: null,
  propertyValue: null,
  coverageStartYyyymm: "",
  coverageEndYyyymm: "",
  score: 75,
  grade: "moderate",
});
