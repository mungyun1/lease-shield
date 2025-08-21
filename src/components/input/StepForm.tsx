import { motion, AnimatePresence } from "framer-motion";
import { ContractData } from "@/types";
import BasicInfoStep from "./BasicInfoStep";
import FinancialInfoStep from "./FinancialInfoStep";
import LegalInfoStep from "./LegalInfoStep";

interface StepFormProps {
  currentStep: number;
  contractData: ContractData;
  setContractData: (data: ContractData) => void;
}

export default function StepForm({
  currentStep,
  contractData,
  setContractData,
}: StepFormProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 30, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -30, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"
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
  );
}
