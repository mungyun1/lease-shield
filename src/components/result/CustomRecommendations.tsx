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

  // 보증금 관련 권고
  if (data.deposit > 10000) {
    recommendations.push({
      title: "보증금 분할 납부 협의",
      description:
        "높은 보증금으로 인한 위험을 줄이기 위해 임대인과 협의하세요",
      priority: "high",
      actions: [
        "임대인과 보증금 분할 납부 협의",
        "보증금을 낮추고 월세로 조정",
        "대출금 상환 계획 수립",
        "보증 한도 조정 검토",
      ],
      icon: <DollarSign className="w-6 h-6 text-red-500" />,
    });
  }

  // LTV(대출비율) 관련 권고
  if (data.loanAmount > data.deposit * 0.7) {
    recommendations.push({
      title: "대출비율(LTV) 조정",
      description: "보증금 대비 높은 대출금으로 인한 위험을 관리하세요",
      priority: "high",
      actions: [
        "대출금 상환 계획 수립",
        "보증금 추가 납입 고려",
        "대출 조건 재협상",
        "월 상환액 조정",
      ],
      icon: <TrendingUp className="w-6 h-6 text-orange-500" />,
    });
  }

  // 선순위 채권 관련 권고
  if (data.hasPriorityDebt) {
    recommendations.push({
      title: "등기부등본 확인 및 보증금 회수 가능성 점검",
      description:
        "선순위 채권이 있는 경우 담보권 설정 현황을 반드시 확인하세요",
      priority: "high",
      actions: [
        "등기부등본 열람 및 분석",
        "담보권자 정보 확인",
        "보증금 회수 가능성 점검",
        "법률 상담을 통한 권리 보호 방안 검토",
      ],
      icon: <Shield className="w-6 h-6 text-purple-500" />,
    });
  }

  // 임차권 등기 관련 권고
  if (!data.hasTenancyRegistration) {
    recommendations.push({
      title: "임차권 등기 신청",
      description: "임차권을 등기부에 등록하여 우선순위를 확보하세요",
      priority: "medium",
      actions: [
        "등기신청서 작성",
        "필요 서류 준비 (임대차계약서, 등기원인 등)",
        "법원 방문 또는 온라인 신청",
        "등기 완료 후 등기부등본 확인",
      ],
      icon: <CheckCircle className="w-6 h-6 text-blue-500" />,
    });
  }

  // 지역별 추가 권고
  if (data.region === "seoul" || data.region === "gyeonggi") {
    recommendations.push({
      title: "수도권 특화 위험 관리",
      description: "수도권 지역의 높은 부동산 가격 변동성에 대비하세요",
      priority: "medium",
      actions: [
        "정기적인 시세 모니터링",
        "임대차 계약 갱신 조건 사전 협의",
        "보증금 인상 제한 조항 검토",
        "지역 부동산 정책 변화 주시",
      ],
      icon: <MapPin className="w-6 h-6 text-green-500" />,
    });
  }

  // 주택 유형별 추가 권고
  if (data.housingType === "apartment" || data.housingType === "officetel") {
    recommendations.push({
      title: "공동주택 특화 관리",
      description:
        "공동주택의 관리비, 공용시설 사용료 등 추가 비용을 고려하세요",
      priority: "low",
      actions: [
        "관리비 및 공용시설 사용료 확인",
        "입주자 대표회의 참여",
        "공용시설 사용 규정 숙지",
        "관리사무소와의 원활한 소통",
      ],
      icon: <Home className="w-6 h-6 text-indigo-500" />,
    });
  }

  return recommendations;
};

export default function CustomRecommendations({
  contractData,
}: CustomRecommendationsProps) {
  const recommendations = generateCustomRecommendations(contractData);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="mb-12"
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
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
                  구체적인 행동 단계
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
