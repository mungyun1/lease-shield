import { DollarSign } from "lucide-react";
import { ContractData } from "@/types";

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
        <h2 className="text-2xl font-bold text-gray-800 mb-2">금융 정보</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            <DollarSign className="w-4 h-4 inline mr-2 text-emerald-600" />
            보증금 (만원)
          </label>
          <div className="relative">
            <input
              type="number"
              value={contractData.deposit}
              onChange={(e) =>
                setContractData({
                  ...contractData,
                  deposit: parseInt(e.target.value) || 0,
                })
              }
              className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-gray-700 bg-gray-50 hover:bg-white"
              placeholder="예: 5000"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">
              ₩
            </span>
          </div>
          <p className="text-sm text-gray-500">
            보증금은 임대인이 보관하는 금액입니다
          </p>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            <DollarSign className="w-4 h-4 inline mr-2 text-purple-600" />
            대출금 (만원)
          </label>
          <div className="relative">
            <input
              type="number"
              value={contractData.loanAmount}
              onChange={(e) =>
                setContractData({
                  ...contractData,
                  loanAmount: parseInt(e.target.value) || 0,
                })
              }
              className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-700 bg-gray-50 hover:bg-white"
              placeholder="예: 3000"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">
              ₩
            </span>
          </div>
          <p className="text-sm text-gray-500">전세 대출을 받은 금액입니다</p>
        </div>
      </div>
    </div>
  );
}
