import { DollarSign } from "lucide-react";
import { ContractData } from "@/types";
import { convertMonthToYyyymm, convertYyyymmToMonth } from "@/utils";

interface FinancialInfoStepProps {
  contractData: ContractData;
  setContractData: (data: ContractData) => void;
}

export default function FinancialInfoStep({
  contractData,
  setContractData,
}: FinancialInfoStepProps) {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">금융 정보</h2>
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 rounded-2xl blur-sm opacity-20"></div>
          <div className="relative bg-white border border-gray-200 rounded-2xl px-6 py-4 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full animate-pulse"></div>
                <div
                  className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
              <span className="text-sm font-semibold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                계약 전세금, 주택가액, 보증 기간을 입력해주세요
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            <DollarSign className="w-4 h-4 inline mr-2 text-emerald-600" />
            계약 전세금 (만원)
          </label>
          <div className="relative">
            <input
              type="number"
              value={contractData.jeonseDepositAmount || ""}
              onChange={(e) =>
                setContractData({
                  ...contractData,
                  jeonseDepositAmount: e.target.value
                    ? parseInt(e.target.value)
                    : null,
                })
              }
              className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-gray-700 bg-gray-50 hover:bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="ex) 5000"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">
              ₩
            </span>
          </div>
          <p className="text-sm text-gray-500">
            계약서에 명시된 전세금액입니다
          </p>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            <DollarSign className="w-4 h-4 inline mr-2 text-purple-600" />
            주택가액 (만원)
          </label>
          <div className="relative">
            <input
              type="number"
              value={contractData.propertyValue || ""}
              onChange={(e) =>
                setContractData({
                  ...contractData,
                  propertyValue: e.target.value
                    ? parseInt(e.target.value)
                    : null,
                })
              }
              className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-700 bg-gray-50 hover:bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="ex) 30000"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">
              ₩
            </span>
          </div>
          <p className="text-sm text-gray-500">해당 주택의 시장가치입니다</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            <span className="w-4 h-4 inline mr-2 text-blue-600">📅</span>
            보증 시작월
          </label>
          <input
            type="month"
            value={convertYyyymmToMonth(contractData.coverageStartYyyymm)}
            onChange={(e) =>
              setContractData({
                ...contractData,
                coverageStartYyyymm: convertMonthToYyyymm(e.target.value),
              })
            }
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 bg-gray-50 hover:bg-white"
          />
          <p className="text-sm text-gray-500">보증이 시작되는 월입니다</p>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            <span className="w-4 h-4 inline mr-2 text-indigo-600">📅</span>
            보증 완료월
          </label>
          <input
            type="month"
            value={convertYyyymmToMonth(contractData.coverageEndYyyymm)}
            onChange={(e) =>
              setContractData({
                ...contractData,
                coverageEndYyyymm: convertMonthToYyyymm(e.target.value),
              })
            }
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-700 bg-gray-50 hover:bg-white"
          />
          <p className="text-sm text-gray-500">보증이 종료되는 월입니다</p>
        </div>
      </div>
    </div>
  );
}
