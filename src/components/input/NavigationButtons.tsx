import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onPrevStep: () => void;
  onNextStep: () => void;
  onSubmit: () => void;
  isStepValid: boolean;
  isSubmitting?: boolean;
}

export default function NavigationButtons({
  currentStep,
  totalSteps,
  onPrevStep,
  onNextStep,
  onSubmit,
  isStepValid,
  isSubmitting = false,
}: NavigationButtonsProps) {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-t border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        {/* 이전 버튼 */}
        <motion.button
          whileHover={{ scale: 1.02, x: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onPrevStep}
          disabled={currentStep === 1}
          className={`flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-medium transition-all duration-300 cursor-pointer ${
            currentStep === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
              : "bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg border border-gray-200 hover:border-gray-300"
          }`}
        >
          이전
        </motion.button>

        {/* 진행률 표시 */}
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 order-first sm:order-none">
          <span className="text-sm text-gray-500 font-medium">
            {currentStep} / {totalSteps}
          </span>
          <div className="w-32 sm:w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* 다음/제출 버튼 */}
        {currentStep < totalSteps ? (
          <motion.button
            whileHover={{ scale: 1.02, x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNextStep}
            disabled={!isStepValid}
            className={`flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${
              isStepValid
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5"
                : "bg-gray-200 text-gray-500 cursor-not-allowed opacity-60"
            }`}
          >
            다음
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02, x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSubmit}
            disabled={isSubmitting}
            className={`flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer ${
              isSubmitting
                ? "bg-gradient-to-r from-gray-400 to-gray-500 text-white cursor-not-allowed opacity-70"
                : "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:shadow-xl hover:from-emerald-600 hover:to-green-700"
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm sm:text-base">진단 중...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                <span className="text-sm sm:text-base">위험 진단 시작하기</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </motion.button>
        )}
      </div>
    </div>
  );
}
