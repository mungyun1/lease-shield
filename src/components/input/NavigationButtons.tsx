import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onPrevStep: () => void;
  onNextStep: () => void;
  onSubmit: () => void;
  isStepValid: boolean;
}

export default function NavigationButtons({
  currentStep,
  totalSteps,
  onPrevStep,
  onNextStep,
  onSubmit,
  isStepValid,
}: NavigationButtonsProps) {
  return (
    <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-100">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onPrevStep}
        disabled={currentStep === 1}
        className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
          currentStep === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-600 text-white hover:bg-gray-700 shadow-lg hover:shadow-xl"
        }`}
      >
        <ChevronLeft className="w-5 h-5 mr-2" />
        이전
      </motion.button>

      {currentStep < totalSteps ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNextStep}
          disabled={!isStepValid}
          className={`flex items-center px-8 py-3 rounded-xl font-medium transition-all duration-200 ${
            isStepValid
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          다음
          <ChevronRight className="w-5 h-5 ml-2" />
        </motion.button>
      ) : (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSubmit}
          className="px-10 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
        >
          위험 진단 시작하기
        </motion.button>
      )}
    </div>
  );
}
