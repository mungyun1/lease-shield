import { useState, useCallback } from "react";
import { SimulationData } from "@/types";
import {
  calculateRiskScore,
  getVariableImpact,
  getInitialSimulationData,
} from "@/utils/simulation";

export const useSimulation = () => {
  const [currentData, setCurrentData] = useState<SimulationData>(
    getInitialSimulationData()
  );
  const [originalData, setOriginalData] = useState<SimulationData>(
    getInitialSimulationData()
  );
  const [activeFeedback, setActiveFeedback] = useState<string | null>(null);

  const handleInputChange = useCallback(
    (
      field: keyof Omit<SimulationData, "score" | "grade">,
      value: number | boolean | string | null
    ) => {
      const newData = { ...currentData, [field]: value };
      const { score, grade } = calculateRiskScore(newData);
      setCurrentData({ ...newData, score, grade });

      // 실시간 피드백 표시
      const impact = getVariableImpact(field, newData, originalData);
      if (impact) {
        setActiveFeedback(impact.message);
        // 5초 후 피드백 숨김
        setTimeout(() => setActiveFeedback(null), 5000);
      }
    },
    [currentData, originalData]
  );

  const resetToOriginal = useCallback(() => {
    setCurrentData({ ...originalData });
  }, [originalData]);

  const saveOriginal = useCallback(() => {
    setOriginalData({ ...currentData });
  }, [currentData]);

  return {
    currentData,
    originalData,
    activeFeedback,
    handleInputChange,
    resetToOriginal,
    saveOriginal,
  };
};
