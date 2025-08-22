import { PreventionGuide } from "@/types";

export const guideItems: PreventionGuide[] = [
  {
    id: "1",
    title: "임차권 등기 신청",
    description: "임차권을 등기부에 등록하여 우선순위를 확보하세요",
    category: "legal",
    priority: "high",
    actions: [
      "등기신청서 작성",
      "필요 서류 준비",
      "법원 방문 또는 온라인 신청",
    ],
    details:
      "임차권 등기는 임대인이 파산하거나 집을 팔 때도 계속 거주할 수 있는 권리를 보장합니다. 특히 선순위 채권이 있는 경우 반드시 필요합니다.",
  },
  {
    id: "2",
    title: "보증금 분할 납부 협의",
    description: "대출금을 줄이고 보증금을 낮춰보세요",
    category: "financial",
    priority: "high",
    actions: ["임대인과 협의", "계약서 수정", "대출 상환 계획 수립"],
    details:
      "보증금이 높을수록 위험도가 증가합니다. 임대인과 협의하여 보증금을 낮추고 월세로 조정하는 것을 고려해보세요.",
  },
  {
    id: "3",
    title: "선순위 채권 확인",
    description: "등기부등본을 확인하여 담보권 설정 현황을 파악하세요",
    category: "legal",
    priority: "medium",
    actions: ["등기부등본 열람", "담보권자 정보 확인", "법률 상담 고려"],
    details:
      "선순위 채권이 있는 경우 임대인이 파산하면 집을 잃을 수 있습니다. 등기부등본을 통해 담보권 설정 현황을 반드시 확인하세요.",
  },
  {
    id: "4",
    title: "보험 가입 검토",
    description: "임차인 보험에 가입하여 위험을 분산하세요",
    category: "financial",
    priority: "medium",
    actions: ["보험사 상담", "보장 내용 비교", "가입 신청"],
    details:
      "임차인 보험은 보증금 반환 보장, 이사비용 지원 등 다양한 혜택을 제공합니다. 연간 보험료는 보통 10만원 내외입니다.",
  },
  {
    id: "5",
    title: "정기적인 계약 상태 점검",
    description: "월 1회 계약 조건과 임대인 상태를 확인하세요",
    category: "other",
    priority: "low",
    actions: ["월세 납부 확인", "임대인 연락처 유지", "계약서 보관"],
    details:
      "정기적인 점검을 통해 문제를 조기에 발견하고 대응할 수 있습니다. 계약서와 관련 서류는 안전한 곳에 보관하세요.",
  },
];
