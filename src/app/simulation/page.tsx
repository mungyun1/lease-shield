"use client";

import { motion } from "framer-motion";
import { useSimulation } from "@/hooks/useSimulation";
import {
  SimulationHeader,
  SimulationControls,
  ComparisonCards,
  ChangeAnalysis,
  ComparisonChart,
  SimulationInsights,
} from "@/components/simulation";

export default function SimulationPage() {
  const {
    currentData,
    originalData,
    activeFeedback,
    handleInputChange,
    resetToOriginal,
    saveOriginal,
  } = useSimulation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* 배경 장식 요소들 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* 헤더 */}
          <SimulationHeader />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 시뮬레이션 컨트롤 */}
            <SimulationControls
              currentData={currentData}
              originalData={originalData}
              onInputChange={handleInputChange}
              onReset={resetToOriginal}
              onSave={saveOriginal}
              activeFeedback={activeFeedback}
            />

            {/* 결과 비교 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Before/After 비교 */}
              <ComparisonCards
                currentData={currentData}
                originalData={originalData}
              />

              {/* 변화량 표시 */}
              <ChangeAnalysis
                currentData={currentData}
                originalData={originalData}
              />

              {/* 차트 */}
              <ComparisonChart
                currentData={currentData}
                originalData={originalData}
              />
            </motion.div>
          </div>

          {/* 인사이트 */}
          <SimulationInsights />
        </div>
      </div>
    </div>
  );
}
