import { motion, AnimatePresence } from "framer-motion";
import { ContractData } from "@/types";
import BasicInfoStep from "./BasicInfoStep";
import FinancialInfoStep from "./FinancialInfoStep";
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
        {isSubmitting ? (
          <AIAnalysisUI />
        ) : (
          <>
            {/* 폼 컨텐츠 - 여백 최적화 */}
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
                className="px-6 min-h-[550px] flex items-center justify-center"
              >
                {/* 스텝별 컨텐츠 - 높이 조정 */}
                <div className="min-h-[380px] flex items-center justify-center">
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
                </div>
              </motion.div>
            </AnimatePresence>

            {/* 하단 네비게이션 - 여백 축소 */}
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

      {/* 장식 요소들 - 크기 조정 */}
      <div className="absolute -top-3 -right-3 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl" />
      <div className="absolute -bottom-3 -left-3 w-16 h-16 bg-gradient-to-tr from-pink-400/20 to-purple-400/20 rounded-full blur-xl" />
    </div>
  );
}
