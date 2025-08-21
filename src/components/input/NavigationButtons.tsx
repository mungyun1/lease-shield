import { motion } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

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
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-t border-gray-200">
      <div className="flex justify-between items-center">
        {/* 이전 버튼 */}
        <motion.button
          whileHover={{ scale: 1.02, x: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onPrevStep}
          disabled={currentStep === 1}
          className={`flex items-center px-6 py-3.5 rounded-xl font-medium transition-all duration-300 cursor-pointer ${
            currentStep === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
              : "bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg border border-gray-200 hover:border-gray-300"
          }`}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          이전
        </motion.button>

        {/* 진행률 표시 */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 font-medium">
            {currentStep} / {totalSteps}
          </span>
          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
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
            className={`flex items-center px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${
              isStepValid
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5"
                : "bg-gray-200 text-gray-500 cursor-not-allowed opacity-60"
            }`}
          >
            다음
            <ChevronRight className="w-4 h-4 ml-2" />
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02, x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSubmit}
            className="flex items-center px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            위험 진단 시작하기
            <ArrowRight className="w-4 h-4 ml-2" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
