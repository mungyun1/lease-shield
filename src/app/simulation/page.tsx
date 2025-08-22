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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
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
            className="lg:col-span-2"
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
  );
}
