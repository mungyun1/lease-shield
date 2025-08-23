import { SimulationData } from "@/types";

// 위험도 계산 함수
export const calculateRiskScore = (
  data: Omit<SimulationData, "score" | "grade">
): { score: number; grade: "safe" | "moderate" | "danger" } => {
  let score = 50; // 기본 점수

  // 보증금 영향 (높을수록 위험)
  if (data.deposit && data.deposit > 10000) score += 25;
  else if (data.deposit && data.deposit > 5000) score += 15;
  else if (data.deposit && data.deposit > 3000) score += 5;

  // 대출금 영향 (높을수록 위험)
  if (data.loanAmount && data.loanAmount > 5000) score += 20;
  else if (data.loanAmount && data.loanAmount > 3000) score += 10;
  else if (data.loanAmount && data.loanAmount > 1000) score += 5;

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
export const getVariableImpact = (
  field: keyof Omit<SimulationData, "score" | "grade">,
  currentData: SimulationData,
  originalData: SimulationData
) => {
  const currentValue = currentData[field];
  const originalValue = originalData[field];

  if (field === "deposit") {
    if (currentValue === null || originalValue === null) return null;
    const diff = (currentValue as number) - (originalValue as number);
    if (diff > 0) {
      return {
        type: "negative" as const,
        message: `보증금이 ${diff.toLocaleString()}만원 증가하여 위험도가 상승했습니다. 보증금을 낮추면 위험 점수가 개선되고 등급이 조정됩니다.`,
        recommendation: "보증금을 낮추거나 월세를 높여 총 비용을 조정해보세요.",
      };
    } else if (diff < 0) {
      return {
        type: "positive" as const,
        message: `보증금이 ${Math.abs(diff).toLocaleString()}만원 감소하여 위험도가 개선되었습니다!`,
        recommendation:
          "현재 설정이 안전합니다. 더 낮출 수 있다면 추가로 위험도를 줄일 수 있습니다.",
      };
    }
  }

  if (field === "loanAmount") {
    if (currentValue === null || originalValue === null) return null;
    const diff = (currentValue as number) - (originalValue as number);
    if (diff > 0) {
      return {
        type: "negative" as const,
        message: `대출금이 ${diff.toLocaleString()}만원 증가하여 위험도가 상승했습니다. 대출금을 줄이면 위험 점수가 개선되고 등급이 조정됩니다.`,
        recommendation: "수입의 30% 이하로 대출금을 유지하는 것이 안전합니다.",
      };
    } else if (diff < 0) {
      return {
        type: "positive" as const,
        message: `대출금이 ${Math.abs(diff).toLocaleString()}만원 감소하여 위험도가 개선되었습니다!`,
        recommendation:
          "현재 설정이 안전합니다. 추가 대출이 필요하지 않다면 현재 상태를 유지하세요.",
      };
    }
  }

  if (field === "hasPriorityDebt") {
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

  if (field === "hasTenancyRegistration") {
    if (currentValue && !originalValue) {
      return {
        type: "positive" as const,
        message:
          "임차권 등기가 완료되어 위험도가 크게 개선되었습니다! 임차권 등기는 권리 보호에 매우 중요합니다.",
        recommendation:
          "임차권 등기를 반드시 완료하세요. 이는 가장 효과적인 예방 방법입니다.",
      };
    } else if (!currentValue && originalValue) {
      return {
        type: "negative" as const,
        message:
          "임차권 등기가 미완료되어 위험도가 크게 상승했습니다. 임차권 등기를 완료하면 위험 점수가 크게 개선됩니다.",
        recommendation:
          "가능한 빨리 임차권 등기를 완료하세요. 이는 권리 보호의 핵심입니다.",
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
    name: "보증금",
    current: currentData.deposit || 0,
    original: originalData.deposit || 0,
  },
  {
    name: "대출금",
    current: currentData.loanAmount || 0,
    original: originalData.loanAmount || 0,
  },
];

// 초기 시뮬레이션 데이터
export const getInitialSimulationData = (): SimulationData => ({
  region: "seoul",
  housingType: "apartment",
  deposit: null,
  loanAmount: null,
  hasPriorityDebt: false,
  hasTenancyRegistration: false,
  score: 75,
  grade: "moderate",
});
