"use client";

import { motion } from "framer-motion";
import { PieChart } from "lucide-react";

interface TopContributor {
  feature: string;
  percent: number;
  direction: string;
  value: number;
  mean: number;
}

interface GlobalImportanceChartProps {
  data: TopContributor[];
}

export default function GlobalImportanceChart({
  data,
}: GlobalImportanceChartProps) {
  // 데이터를 배열로 변환하고 정렬
  const sortedData = data
    .map((item) => ({
      name: item.feature,
      value: item.percent,
      percentage: item.percent.toFixed(1),
      direction: item.direction,
      originalValue: item.value,
      mean: item.mean,
    }))
    .sort((a, b) => b.value - a.value);

  // 색상 팔레트 (사진과 유사한 색상)
  const colors = [
    "#3B82F6", // 파란색
    "#F97316", // 주황색
    "#10B981", // 초록색
    "#EF4444", // 빨간색
    "#8B5CF6", // 보라색
    "#F59E0B", // 노란색
    "#EC4899", // 분홍색
    "#06B6D4", // 청록색
  ];

  // 도넛 차트를 위한 SVG 경로 계산
  const radius = 150;
  const strokeWidth = 80;
  const total = data.reduce((sum, item) => sum + item.percent, 0);

  let currentAngle = -90; // 12시 방향부터 시작
  const paths: Array<{
    path: string;
    color: string;
    name: string;
    value: number;
    percentage: string;
    startAngle: number;
    endAngle: number;
    direction: string;
  }> = [];

  sortedData.forEach((item, index) => {
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;

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
      percentage: item.percentage,
      startAngle,
      endAngle,
      direction: item.direction,
    });

    currentAngle += angle;
  });

  // 텍스트 위치 계산 함수 - 원의 둘레에 배치
  const getTextPosition = (startAngle: number, endAngle: number) => {
    const midAngle = (startAngle + endAngle) / 2;
    // 텍스트를 원의 바깥쪽에 배치하여 더 잘 보이도록 조정
    const textRadius = radius - strokeWidth / 2 + 30;
    const x = textRadius * Math.cos((midAngle * Math.PI) / 180);
    const y = textRadius * Math.sin((midAngle * Math.PI) / 180);
    return { x, y };
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 p-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center justify-center">
        <PieChart className="w-7 h-7 mr-3 text-blue-600" />
        주요 위험 요인 분석
      </h3>

      <div className="flex flex-row items-start gap-8">
        {/* 도넛 차트 */}
        <div className="relative">
          <svg width="400" height="400" viewBox="-200 -200 400 400">
            {/* 배경 원 */}
            <circle
              cx="0"
              cy="0"
              r={radius}
              fill="#F8FAFC"
              stroke="#E2E8F0"
              strokeWidth="1"
            />

            {paths.map((pathData, index) => (
              <g key={index}>
                <path
                  d={pathData.path}
                  stroke={pathData.color}
                  strokeWidth={strokeWidth}
                  fill="none"
                  className="drop-shadow-sm"
                />
                {/* 퍼센티지 텍스트 - 원의 둘레에 배치 */}
                <text
                  x={getTextPosition(pathData.startAngle, pathData.endAngle).x}
                  y={getTextPosition(pathData.startAngle, pathData.endAngle).y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-bold"
                  style={{
                    fontSize: "14px",
                    fill: "#FFFFFF",
                    textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                    fontWeight: "600",
                  }}
                >
                  {pathData.percentage}%
                </text>
              </g>
            ))}
            {/* 중앙 원 */}
            <circle
              cx="0"
              cy="0"
              r={radius - strokeWidth / 2}
              fill="white"
              className="drop-shadow-sm"
            />
          </svg>
        </div>

        <div className="grid grid-cols-1 gap-1 text-sm min-w-[200px]">
          {sortedData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div
                className="w-4 h-4 rounded-sm flex-shrink-0 shadow-sm"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="text-gray-700 font-semibold min-w-0 flex-1 text-xs">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
