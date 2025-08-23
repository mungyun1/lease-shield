import { motion, AnimatePresence } from "framer-motion";
import { ContractData } from "@/types";
import BasicInfoStep from "./BasicInfoStep";
import FinancialInfoStep from "./FinancialInfoStep";
import LegalInfoStep from "./LegalInfoStep";
import NavigationButtons from "./NavigationButtons";
import AIAnalysisUI from "./AIAnalysisUI";

interface StepFormProps {
  currentStep: number;
  contractData: ContractData;
  setContractData: (data: ContractData) => void;
  onPrevStep: () => void;
  onNextStep: () => void;
  onSubmit: () => void;
  isStepValid: boolean;
  totalSteps: number;
  isSubmitting?: boolean;
}

export default function StepForm({
  currentStep,
  contractData,
  setContractData,
  onPrevStep,
  onNextStep,
  onSubmit,
  isStepValid,
  totalSteps,
  isSubmitting = false,
}: StepFormProps) {
  return (
    <div className="relative">
      {/* 배경 그라데이션 효과 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl -z-10" />

      {/* 메인 컨테이너 */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden relative">
        {/* 상단 장식 요소 */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

        {isSubmitting ? (
          <AIAnalysisUI />
        ) : (
          <>
            {/* 스텝 인디케이터 */}
            <div className="px-8 pt-6 pb-4">
              <div className="flex items-center justify-center space-x-2">
                {Array.from({ length: totalSteps }, (_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index + 1 === currentStep
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 scale-125 shadow-lg"
                        : index + 1 < currentStep
                          ? "bg-green-400 scale-100"
                          : "bg-gray-300 scale-100"
                    }`}
                  />
                ))}
              </div>
              <div className="text-center mt-2">
                <span className="text-sm font-medium text-gray-600">
                  {currentStep} / {totalSteps}
                </span>
              </div>
            </div>

            {/* 폼 컨텐츠 */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1],
                  scale: { duration: 0.3 },
                }}
                className="px-8 pb-6"
              >
                {/* 스텝별 컨텐츠 */}
                <div className="min-h-[450px] flex items-center justify-center">
                  {currentStep === 1 && (
                    <BasicInfoStep
                      contractData={contractData}
                      setContractData={setContractData}
                    />
                  )}

                  {currentStep === 2 && (
                    <FinancialInfoStep
                      contractData={contractData}
                      setContractData={setContractData}
                    />
                  )}

                  {currentStep === 3 && (
                    <LegalInfoStep
                      contractData={contractData}
                      setContractData={setContractData}
                    />
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* 하단 네비게이션 */}
            <div className="border-t border-gray-100 bg-gray-50/50">
              <NavigationButtons
                currentStep={currentStep}
                totalSteps={totalSteps}
                onPrevStep={onPrevStep}
                onNextStep={onNextStep}
                onSubmit={onSubmit}
                isStepValid={isStepValid}
                isSubmitting={isSubmitting}
              />
            </div>
          </>
        )}
      </div>

      {/* 장식 요소들 */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl" />
      <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-tr from-pink-400/20 to-purple-400/20 rounded-full blur-xl" />
    </div>
  );
}
