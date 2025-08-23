"use client";

import { motion } from "framer-motion";
import { PieChart, BarChart3 } from "lucide-react";

interface GlobalImportanceData {
  [key: string]: number;
}

interface GlobalImportanceChartProps {
  data: GlobalImportanceData;
}

export default function GlobalImportanceChart({
  data,
}: GlobalImportanceChartProps) {
  // 데이터를 배열로 변환하고 정렬
  const sortedData = Object.entries(data)
    .map(([key, value]) => ({
      name: key,
      value: value,
      percentage: (
        (value / Object.values(data).reduce((a, b) => a + b, 0)) *
        100
      ).toFixed(1),
    }))
    .sort((a, b) => b.value - a.value);

  // 색상 팔레트
  const colors = [
    "#3B82F6",
    "#EF4444",
    "#10B981",
    "#F59E0B",
    "#8B5CF6",
    "#EC4899",
    "#06B6D4",
    "#84CC16",
    "#F97316",
    "#6366F1",
    "#14B8A6",
    "#F43F5E",
  ];

  // 도넛 차트를 위한 SVG 경로 계산
  const radius = 60;
  const strokeWidth = 12;
  const total = Object.values(data).reduce((a, b) => a + b, 0);

  let currentAngle = -90; // 12시 방향부터 시작
  const paths: Array<{
    path: string;
    color: string;
    name: string;
    value: number;
  }> = [];

  sortedData.forEach((item, index) => {
    const angle = (item.value / total) * 360;
    const x1 = radius * Math.cos((currentAngle * Math.PI) / 180);
    const y1 = radius * Math.sin((currentAngle * Math.PI) / 180);
    const x2 = radius * Math.cos(((currentAngle + angle) * Math.PI) / 180);
    const y2 = radius * Math.sin(((currentAngle + angle) * Math.PI) / 180);

    const largeArcFlag = angle > 180 ? 1 : 0;

    const path = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;

    paths.push({
      path,
      color: colors[index % colors.length],
      name: item.name,
      value: item.value,
    });

    currentAngle += angle;
  });

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <PieChart className="w-6 h-6 mr-2 text-blue-600" />
        전역 중요도 분석
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 도넛 차트 */}
        <div className="flex flex-col items-center">
          <h4 className="text-lg font-semibold text-gray-700 mb-4">
            도넛 차트
          </h4>
          <div className="relative">
            <svg width="140" height="140" viewBox="-70 -70 140 140">
              {paths.map((pathData, index) => (
                <g key={index}>
                  <path
                    d={pathData.path}
                    stroke={pathData.color}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                  />
                </g>
              ))}
              <circle cx="0" cy="0" r={radius - strokeWidth / 2} fill="white" />
              <text
                x="0"
                y="0"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-sm font-semibold text-gray-600"
              >
                중요도
              </text>
            </svg>
          </div>

          {/* 범례 */}
          <div className="mt-4 grid grid-cols-1 gap-2 text-xs">
            {sortedData.slice(0, 8).map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                <span className="text-gray-600 min-w-0 flex-1">
                  {item.name}
                </span>
                <span className="font-medium text-gray-800 flex-shrink-0">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 가로 히스토그램 */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">
            가로 히스토그램
          </h4>
          <div className="space-y-3">
            {sortedData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-1"
              >
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 min-w-0 flex-1 mr-2">
                    {item.name}
                  </span>
                  <span className="font-medium text-gray-800 flex-shrink-0">
                    {item.value.toFixed(2)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="h-2 rounded-full"
                    style={{ backgroundColor: colors[index % colors.length] }}
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(item.value / sortedData[0].value) * 100}%`,
                    }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
