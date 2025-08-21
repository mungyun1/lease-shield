import { motion, AnimatePresence } from "framer-motion";
import { ContractData } from "@/types";
import BasicInfoStep from "./BasicInfoStep";
import FinancialInfoStep from "./FinancialInfoStep";
import LegalInfoStep from "./LegalInfoStep";
import NavigationButtons from "./NavigationButtons";

interface StepFormProps {
  currentStep: number;
  contractData: ContractData;
  setContractData: (data: ContractData) => void;
  onPrevStep: () => void;
  onNextStep: () => void;
  onSubmit: () => void;
  isStepValid: boolean;
  totalSteps: number;
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
}: StepFormProps) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 30, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -30, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="p-8 min-h-[500px] flex items-center justify-center"
        >
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
        </motion.div>
      </AnimatePresence>

      <NavigationButtons
        currentStep={currentStep}
        totalSteps={totalSteps}
        onPrevStep={onPrevStep}
        onNextStep={onNextStep}
        onSubmit={onSubmit}
        isStepValid={isStepValid}
      />
    </div>
  );
}
