import { ContractData, RiskAnalysis, RiskFactor } from "@/types";

// 계약 데이터를 기반으로 위험도 분석하는 함수
export const analyzeRisk = (data: ContractData): RiskAnalysis => {
  let score = 50; // 기본 점수
  const factors: RiskFactor[] = [];

  // 보증금 분석
  if (data.deposit && data.deposit > 10000) {
    score += 20;
    factors.push({
      name: "보증금",
      impact: 25,
      description: "높은 보증금으로 인한 위험",
      category: "financial",
    });
  } else if (data.deposit && data.deposit > 5000) {
    score += 10;
    factors.push({
      name: "보증금",
      impact: 15,
      description: "적정 수준의 보증금",
      category: "financial",
    });
  }

  // 대출금 분석
  if (data.loanAmount && data.deposit && data.loanAmount > data.deposit * 0.7) {
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

// 리포트 다운로드 함수
export const downloadReport = (
  riskResult: RiskAnalysis,
  contractData: ContractData
) => {
  const reportContent = `
전세 계약 위험 진단 리포트

진단 일시: ${new Date().toLocaleString("ko-KR")}
계약 정보:
- 지역: ${contractData.region}
- 주택유형: ${contractData.housingType}
- 보증금: ${contractData.deposit?.toLocaleString()}만원
- 대출금: ${contractData.loanAmount?.toLocaleString()}만원
- 선순위 채권: ${contractData.hasPriorityDebt ? "있음" : "없음"}
- 임차권 등기: ${contractData.hasTenancyRegistration ? "등기됨" : "미등기"}

위험 진단 결과:
- 위험 점수: ${riskResult.score}점
- 위험 등급: ${riskResult.grade}

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
