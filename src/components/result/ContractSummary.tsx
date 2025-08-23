import { motion } from "framer-motion";
import {
  MapPin,
  Home,
  DollarSign,
  TrendingUp,
  Shield,
  CheckCircle,
} from "lucide-react";
import { ContractData } from "@/types";

interface ContractSummaryProps {
  contractData: ContractData;
}

// 주택 유형을 한국어로 변환하는 함수
const getKoreanHousingType = (housingType: string): string => {
  const housingTypeMap: { [key: string]: string } = {
    multifamily: "다가구 주택",
    multigeneration: "다세대 주택",
    house: "단독주택",
    apartment: "아파트",
    officetel: "오피스텔",
    commercial: "주상복합",
  };
  return housingTypeMap[housingType.toLowerCase()] || housingType;
};

export default function ContractSummary({
  contractData,
}: ContractSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="w-full"
    >
      <div className="bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/30 p-8">
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
            <div className="text-gray-500 text-sm mb-1 font-medium">주소</div>
            <div className="font-bold text-gray-800 text-lg">
              {contractData.address || "주소 정보 없음"}
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
              전세보증금
            </div>
            <div className="font-bold text-gray-800 text-lg">
              {contractData.jeonseDepositAmount
                ? `${contractData.jeonseDepositAmount.toLocaleString()}만원`
                : "정보 없음"}
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
              재산가치
            </div>
            <div className="text-gray-800 text-lg">
              {contractData.propertyValue
                ? `${contractData.propertyValue.toLocaleString()}만원`
                : "정보 없음"}
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
                <span className="text-sm text-gray-600">선순위 채권:</span>
                <span className="ml-2 font-semibold text-gray-800">
                  {contractData.seniorLienAmount ? "있음" : "없음"}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center p-3 bg-gradient-to-r from-gray-50 to-green-50 rounded-xl">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-gray-600 mr-2" />
                <span className="text-sm text-gray-600">보험 기간:</span>
                <span className="ml-2 font-semibold text-gray-800">
                  {contractData.coverageStartYyyymm} ~{" "}
                  {contractData.coverageEndYyyymm}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
