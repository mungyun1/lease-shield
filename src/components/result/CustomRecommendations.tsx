import { motion } from "framer-motion";
import {
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Shield,
  CheckCircle,
  MapPin,
  Home,
  Info,
} from "lucide-react";
import { ContractData } from "@/types";

interface CustomRecommendationsProps {
  contractData: ContractData;
  customRecommendations?: Array<{
    title: string;
    description: string;
    priority: "high" | "medium" | "low";
    actions: string[];
  }>;
}

// 맞춤형 예방 조치 제안을 생성하는 함수
const generateCustomRecommendations = (data: ContractData) => {
  const recommendations: Array<{
    title: string;
    description: string;
    priority: "high" | "medium" | "low";
    actions: string[];
    icon: React.ReactNode;
  }> = [];

  // 전세보증금 관련 권고
  if (data.jeonseDepositAmount && data.jeonseDepositAmount > 10000) {
    recommendations.push({
      title: "전세보증금 위험 관리 강화",
      description: `현재 전세보증금 ${data.jeonseDepositAmount.toLocaleString()}만원으로 높은 수준입니다. 임대인 파산 시 보증금 회수 위험이 있어 적극적인 관리가 필요합니다.`,
      priority: "high",
      actions: [
        "전세보증금 분할 납부 협의 (월세 전환 검토)",
        "전세보증보험 가입으로 위험 분산",
        "임대인 재정상태 사전 점검",
        "등기부등본 열람으로 담보권 현황 확인",
        "전문가 상담을 통한 계약 조건 개선",
      ],
      icon: <DollarSign className="w-6 h-6 text-red-500" />,
    });
  }

  // 재산가치 관련 권고
  if (data.propertyValue && data.propertyValue > 50000) {
    recommendations.push({
      title: "고가 부동산 특화 위험 관리",
      description: `부동산 가치 ${data.propertyValue.toLocaleString()}만원으로 높은 수준입니다. 시세 변동에 따른 위험과 보험 한도 초과 가능성이 있어 체계적인 관리가 필요합니다.`,
      priority: "high",
      actions: [
        "정기적인 부동산 가치 재평가 (연 1-2회)",
        "보험 한도 및 범위 최적화 검토",
        "지역 부동산 시장 동향 모니터링",
        "투자 분산을 위한 포트폴리오 검토",
        "부동산 전문가 상담 및 컨설팅",
      ],
      icon: <TrendingUp className="w-6 h-6 text-orange-500" />,
    });
  }

  // 선순위 채권 관련 권고
  if (data.seniorLienAmount) {
    recommendations.push({
      title: "선순위 채권 위험 대응 방안",
      description: `선순위 채권 ${data.seniorLienAmount.toLocaleString()}만원이 존재합니다. 임대인 파산 시 보증금 회수 순위가 낮아 상당한 위험이 내포되어 있습니다.`,
      priority: "high",
      actions: [
        "등기부등본 상세 분석 및 담보권자 정보 파악",
        "담보권 설정 현황 및 우선순위 확인",
        "보증금 회수 가능성 및 위험도 평가",
        "법률 전문가 상담을 통한 권리 보호 방안 수립",
        "대체 거주지 및 계약 조건 재검토",
        "전세보증보험 가입으로 위험 완화",
      ],
      icon: <Shield className="w-6 h-6 text-purple-500" />,
    });
  }

  // 보험 기간 관련 권고
  if (!data.coverageStartYyyymm || !data.coverageEndYyyymm) {
    recommendations.push({
      title: "보험 기간 설정 및 관리 체계화",
      description:
        "보험 기간이 명확히 설정되지 않아 보험 효력 및 보장 범위에 불확실성이 있습니다. 체계적인 보험 관리가 필요합니다.",
      priority: "medium",
      actions: [
        "보험 시작일 및 종료일 명확히 설정",
        "보험 범위 및 보장 한도 상세 검토",
        "보험료 납부 방법 및 주기 설정",
        "보험 갱신 조건 및 자동 갱신 여부 확인",
        "보험사별 견적 비교 및 최적 조건 선택",
        "정기적인 보험 상품 점검 및 업그레이드",
      ],
      icon: <CheckCircle className="w-6 h-6 text-blue-500" />,
    });
  }

  // 주소별 추가 권고 (수도권 지역)
  if (
    data.address &&
    (data.address.includes("서울") || data.address.includes("경기"))
  ) {
    recommendations.push({
      title: "수도권 부동산 특화 위험 관리",
      description:
        "수도권 지역의 높은 부동산 가격 변동성과 정책 변화에 따른 위험을 체계적으로 관리해야 합니다.",
      priority: "medium",
      actions: [
        "월 1회 지역 시세 및 거래 동향 모니터링",
        "임대차 계약 갱신 조건 사전 협의 및 문서화",
        "보증금 인상 제한 조항 및 상한선 설정",
        "지역 부동산 정책 변화 및 규제 동향 주시",
        "수도권 특화 보험 상품 검토 및 가입",
        "정기적인 임대차 시장 동향 리포트 구독",
      ],
      icon: <MapPin className="w-6 h-6 text-green-500" />,
    });
  }

  // 주택 유형별 추가 권고
  if (data.housingType === "apartment" || data.housingType === "officetel") {
    recommendations.push({
      title: "공동주택 특화 관리 및 비용 관리",
      description:
        "공동주택의 관리비, 공용시설 사용료, 입주자 대표회의 참여 등 공동 관리 요소를 체계적으로 관리해야 합니다.",
      priority: "low",
      actions: [
        "월별 관리비 및 공용시설 사용료 상세 내역 확인",
        "입주자 대표회의 정기 참여 및 의사결정 과정 모니터링",
        "공용시설 사용 규정 숙지 및 준수",
        "관리사무소와의 원활한 소통 채널 구축",
        "공동주택 특화 보험 상품 검토",
        "정기적인 공동시설 점검 및 유지보수 현황 파악",
      ],
      icon: <Home className="w-6 h-6 text-indigo-500" />,
    });
  }

  return recommendations;
};

export default function CustomRecommendations({
  contractData,
  customRecommendations,
}: CustomRecommendationsProps) {
  // 권장사항 제목에 따른 아이콘 반환 함수
  const getRecommendationIcon = (title: string) => {
    if (title.includes("LTV") || title.includes("비율"))
      return <TrendingUp className="w-6 h-6 text-red-500" />;
    if (title.includes("위험 관리") || title.includes("위험 발생"))
      return <AlertTriangle className="w-6 h-6 text-orange-500" />;
    if (title.includes("보험료"))
      return <DollarSign className="w-6 h-6 text-blue-500" />;
    return <Shield className="w-6 h-6 text-purple-500" />;
  };

  // API 응답 기반 권장사항이 있으면 사용, 없으면 기본 생성
  const recommendations = customRecommendations
    ? customRecommendations.map((rec) => ({
        ...rec,
        icon: getRecommendationIcon(rec.title),
      }))
    : generateCustomRecommendations(contractData);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="mb-12"
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <AlertTriangle className="w-7 h-7 mr-3 text-orange-600" />
          맞춤형 예방 조치 제안
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          AI가 당신의 계약 상황을 분석하여 구체적인 예방 조치를 제안합니다
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {recommendations.map((recommendation, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
                recommendation.priority === "high"
                  ? "border-red-200 bg-gradient-to-br from-red-50 to-red-100"
                  : recommendation.priority === "medium"
                    ? "border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-100"
                    : "border-green-200 bg-gradient-to-br from-green-50 to-green-100"
              }`}
            >
              <div className="flex items-start mb-4">
                <div className="p-2 rounded-lg bg-white/80 mr-4">
                  {recommendation.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {recommendation.title}
                  </h3>
                  <p className="text-gray-700 mb-3">
                    {recommendation.description}
                  </p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      recommendation.priority === "high"
                        ? "bg-red-100 text-red-700"
                        : recommendation.priority === "medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                    }`}
                  >
                    {recommendation.priority === "high"
                      ? "높은 우선순위"
                      : recommendation.priority === "medium"
                        ? "중간 우선순위"
                        : "낮은 우선순위"}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800 text-sm mb-2">
                  체크 리스트
                </h4>
                {recommendation.actions.map((action, actionIndex) => (
                  <div
                    key={actionIndex}
                    className="flex items-start text-sm text-gray-700"
                  >
                    <div className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">
                      {actionIndex + 1}
                    </div>
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 추가 도움말 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <Info className="w-5 h-5 mr-2 text-blue-600" />
            추가 도움말
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/80 rounded-xl">
              <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-medium text-gray-800 mb-1">법률 상담</h4>
              <p className="text-sm text-gray-600">
                전문 변호사와 상담하여 권리 보호
              </p>
            </div>
            <div className="text-center p-4 bg-white/80 rounded-xl">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium text-gray-800 mb-1">예방 가이드</h4>
              <p className="text-sm text-gray-600">
                상세한 예방 방법과 체크리스트
              </p>
            </div>
            <div className="text-center p-4 bg-white/80 rounded-xl">
              <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-medium text-gray-800 mb-1">시뮬레이션</h4>
              <p className="text-sm text-gray-600">
                다양한 시나리오로 위험도 테스트
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
