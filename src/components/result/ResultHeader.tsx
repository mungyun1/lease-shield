import { motion } from "framer-motion";
import { NavigationButtons } from "@/components/ui";

export default function ResultHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <NavigationButtons className="mb-8" />

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
      >
        계약 분석 결과
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-xl text-gray-600 max-w-2xl mx-auto"
      >
        입력하신 정보를 바탕으로 계약의 위험도를 분석하고 맞춤형 권장사항을
        제공합니다
      </motion.p>
    </motion.div>
  );
}
