"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, TrendingDown } from "lucide-react";

interface FeatureHistogram {
  binEdges: number[];
  binCounts: number[];
  currentValue: number;
  mean: number;
  currentBinIndex: number;
}

interface FeatureHistograms {
  [key: string]: FeatureHistogram;
}

interface FeatureComparisonChartProps {
  data: FeatureHistograms;
}

export default function FeatureComparisonChart({
  data,
}: FeatureComparisonChartProps) {
  const features = Object.entries(data);

  // 값들을 백만 단위로 변환하는 함수
  const formatValue = (value: number) => {
    if (value >= 100000000) {
      return (value / 100000000).toFixed(1) + "억";
    } else if (value >= 10000) {
      return (value / 10000).toFixed(1) + "만";
    }
    return value.toLocaleString();
  };

  // 백분율 차이 계산
  const calculateDifference = (current: number, mean: number) => {
    return ((current - mean) / mean) * 100;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-12 bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-8"
    >
      <div className="flex items-center mb-6">
        <BarChart3 className="w-7 h-7 mr-3 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">
          특성별 현재값 vs 평균값 비교
        </h2>
      </div>

      <div className="space-y-6">
        {features.map(([featureName, values], index) => {
          const difference = calculateDifference(
            values.currentValue,
            values.mean
          );
          const isHigher = values.currentValue > values.mean;

          return (
            <motion.div
              key={featureName}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {featureName}
                </h3>
                <div className="flex items-center space-x-2">
                  {isHigher ? (
                    <TrendingUp className="w-5 h-5 text-red-500" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-green-500" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      isHigher ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {isHigher ? "+" : ""}
                    {difference.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {/* 현재값 */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">현재값</span>
                  <span className="text-lg font-bold text-blue-600">
                    {formatValue(values.currentValue)}
                  </span>
                </div>

                {/* 막대 그래프 */}
                <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.min((values.currentValue / Math.max(values.currentValue, values.mean)) * 100, 100)}%`,
                    }}
                    transition={{ duration: 1, delay: 0.2 * index }}
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                  />
                </div>

                {/* 평균값 */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">평균값</span>
                  <span className="text-lg font-bold text-gray-600">
                    {formatValue(values.mean)}
                  </span>
                </div>

                {/* 평균값 막대 */}
                <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.min((values.mean / Math.max(values.currentValue, values.mean)) * 100, 100)}%`,
                    }}
                    transition={{ duration: 1, delay: 0.2 * index + 0.3 }}
                    className="h-full bg-gradient-to-r from-gray-400 to-gray-500 rounded-full"
                  />
                </div>
              </div>

              {/* 범례 */}
              <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-sm text-gray-600">현재값</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-500 rounded"></div>
                  <span className="text-sm text-gray-600">평균값</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
