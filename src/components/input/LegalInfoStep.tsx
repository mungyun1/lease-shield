import { ContractData } from "@/types";

interface LegalInfoStepProps {
  contractData: ContractData;
  setContractData: (data: ContractData) => void;
}

export default function LegalInfoStep({
  contractData,
  setContractData,
}: LegalInfoStepProps) {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          법적 보호 정보
        </h2>
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl blur-sm opacity-20"></div>
          <div className="relative bg-white border border-gray-200 rounded-2xl px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full animate-pulse"></div>
                <div
                  className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
              <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                법적 정보를 확인하고 진단을 시작하세요
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="p-6 border-2 border-gray-100 rounded-xl hover:border-blue-200 transition-all duration-200">
          <label className="flex items-start cursor-pointer group">
            <input
              type="checkbox"
              checked={contractData.hasPriorityDebt}
              onChange={(e) =>
                setContractData({
                  ...contractData,
                  hasPriorityDebt: e.target.checked,
                })
              }
              className="mr-4 mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all duration-200"
            />
            <div className="flex-1">
              <span className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                선순위 채권이 있나요?
              </span>
              <p className="text-gray-600 mt-2 leading-relaxed">
                임대인이 다른 채권자에게 담보권을 설정한 경우, 임차인의 권리가
                제한될 수 있습니다. 이는 전세 보증금 반환에 영향을 줄 수 있는
                중요한 정보입니다.
              </p>
            </div>
          </label>
        </div>

        <div className="p-6 border-2 border-gray-100 rounded-xl hover:border-purple-200 transition-all duration-200">
          <label className="flex items-start cursor-pointer group">
            <input
              type="checkbox"
              checked={contractData.hasTenancyRegistration}
              onChange={(e) =>
                setContractData({
                  ...contractData,
                  hasTenancyRegistration: e.target.checked,
                })
              }
              className="mr-4 mt-1 h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded transition-all duration-200"
            />
            <div className="flex-1">
              <span className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition-colors duration-200">
                임차권 등기를 했나요?
              </span>
              <p className="text-gray-600 mt-2 leading-relaxed">
                임차권을 등기부에 등록하면 제3자에게 대항할 수 있는 권리를
                가지게 됩니다. 이는 전세 보증금 우선변제권을 확보하는 중요한
                절차입니다.
              </p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
