import { motion } from "framer-motion";
import { TrendingUp, Target, Zap } from "lucide-react";
import { NavigationButtons } from "@/components/ui";

export default function SimulationHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      {/* 네비게이션 버튼들 */}
      <NavigationButtons className="mb-8" />

      {/* 메인 제목 */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          What-if 시뮬레이션
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
      </motion.div>

      {/* 서브 설명 */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
      >
        주요 변수를 조정하여 위험도 변화를 실시간으로 확인해보세요
      </motion.p>

      {/* 특징 아이콘들 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center items-center space-x-12 text-gray-600"
      >
        <div className="flex flex-col items-center space-y-2">
          <div className="p-3 bg-blue-100 rounded-full">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-sm font-medium">실시간 분석</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="p-3 bg-purple-100 rounded-full">
            <Target className="w-6 h-6 text-purple-600" />
          </div>
          <span className="text-sm font-medium">정확한 예측</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="p-3 bg-indigo-100 rounded-full">
            <Zap className="w-6 h-6 text-indigo-600" />
          </div>
          <span className="text-sm font-medium">빠른 결과</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
