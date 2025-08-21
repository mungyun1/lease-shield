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
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          법적 보호 정보
        </h2>
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
