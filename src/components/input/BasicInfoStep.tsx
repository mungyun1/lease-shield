import { MapPin, Home } from "lucide-react";
import { ContractData } from "@/types";

interface BasicInfoStepProps {
  contractData: ContractData;
  setContractData: (data: ContractData) => void;
}

export default function BasicInfoStep({
  contractData,
  setContractData,
}: BasicInfoStepProps) {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          지역 및 주택 정보
        </h2>
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl blur-sm opacity-20"></div>
          <div className="relative bg-white border border-gray-200 rounded-2xl px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-pulse"></div>
                <div
                  className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                지역과 주택 유형을 선택해주세요
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            <MapPin className="w-4 h-4 inline mr-2 text-blue-600" />
            지역
          </label>
          <select
            value={contractData.region}
            onChange={(e) =>
              setContractData({
                ...contractData,
                region: e.target.value,
              })
            }
            className="cursor-pointer w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 bg-gray-50 hover:bg-white"
          >
            <option value="">지역을 선택하세요</option>
            <option value="seoul">서울</option>
            <option value="gyeonggi">경기</option>
            <option value="incheon">인천</option>
            <option value="busan">부산</option>
            <option value="daegu">대구</option>
            <option value="daejeon">대전</option>
            <option value="gwangju">광주</option>
            <option value="ulsan">울산</option>
            <option value="sejong">세종</option>
            <option value="jeju">제주</option>
          </select>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            <Home className="w-4 h-4 inline mr-2 text-emerald-600" />
            주택 유형
          </label>
          <select
            value={contractData.housingType}
            onChange={(e) =>
              setContractData({
                ...contractData,
                housingType: e.target.value,
              })
            }
            className="cursor-pointer w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-gray-700 bg-gray-50 hover:bg-white"
          >
            <option value="">주택 유형을 선택하세요</option>
            <option value="apartment">아파트</option>
            <option value="villa">빌라</option>
            <option value="house">단독주택</option>
            <option value="officetel">오피스텔</option>
            <option value="studio">원룸/투룸</option>
          </select>
        </div>
      </div>
    </div>
  );
}
