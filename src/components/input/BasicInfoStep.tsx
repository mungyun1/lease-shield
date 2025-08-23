import { Home } from "lucide-react";
import { ContractData } from "@/types";
import AddressInput from "./AddressInput";

interface BasicInfoStepProps {
  contractData: ContractData;
  setContractData: (data: ContractData) => void;
}

export default function BasicInfoStep({
  contractData,
  setContractData,
}: BasicInfoStepProps) {
  const handleAddressChange = (
    zipCode: string,
    address: string,
    detailAddress: string
  ) => {
    setContractData({
      ...contractData,
      zipCode,
      address,
      detailAddress,
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          주소 및 주택 정보
        </h2>
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl blur-sm opacity-20"></div>
          <div className="relative bg-white border border-gray-200 rounded-2xl px-6 py-4 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
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
                주소와 주택 유형을 입력해주세요
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <AddressInput
            zipCode={contractData.zipCode || ""}
            address={contractData.address || ""}
            detailAddress={contractData.detailAddress || ""}
            onAddressChange={handleAddressChange}
          />
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
            <option value="multifamily">다가구 주택</option>
            <option value="multigeneration">다세대 주택</option>
            <option value="house">단독주택</option>
            <option value="apartment">아파트</option>
            <option value="officetel">오피스텔</option>
            <option value="commercial">주상복합</option>
          </select>

          <label className="block text-sm font-semibold text-gray-700 mb-3">
            <span className="w-4 h-4 inline mr-2 text-red-600">💰</span>
            선순위채권
          </label>
          <input
            type="number"
            value={contractData.seniorLienAmount || ""}
            onChange={(e) =>
              setContractData({
                ...contractData,
                seniorLienAmount: e.target.value
                  ? Number(e.target.value)
                  : null,
              })
            }
            placeholder="금액을 입력하세요"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-gray-700 bg-gray-50 hover:bg-white"
          />
        </div>
      </div>
    </div>
  );
}
