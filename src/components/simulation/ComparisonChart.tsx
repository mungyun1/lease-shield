import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { SimulationData } from "@/types";
import { generateChartData } from "@/utils/simulation";
import { BarChart3, TrendingUp, TrendingDown } from "lucide-react";

interface ComparisonChartProps {
  currentData: SimulationData;
  originalData: SimulationData;
}

export default function ComparisonChart({
  currentData,
  originalData,
}: ComparisonChartProps) {
  const chartData = generateChartData(currentData, originalData);

  // 커스텀 툴팁
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{ name: string; value: number; color: string }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <p className="text-gray-800 font-semibold mb-2">{label}</p>
          {payload.map((entry, index: number) => (
            <div key={index} className="flex items-center mb-1">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-gray-600 mr-2">{entry.name}:</span>
              <span className="font-semibold text-gray-800">
                {entry.value.toLocaleString()}만원
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl mr-4">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              변수별 비교 차트
            </h3>
            <p className="text-gray-500 text-sm">
              원래 상태와 현재 상태를 시각적으로 비교하세요
            </p>
          </div>
        </div>

        {/* 변화 요약 */}
        <div className="text-right">
          <div className="text-sm text-gray-500 mb-1">전체 변화</div>
          <div
            className={`text-2xl font-bold ${
              currentData.score < originalData.score
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {currentData.score < originalData.score ? (
              <div className="flex items-center">
                <TrendingDown className="w-5 h-5 mr-1" />
                {Math.abs(currentData.score - originalData.score)}점 개선
              </div>
            ) : (
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-1" />
                {Math.abs(currentData.score - originalData.score)}점 악화
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 차트 */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={{ stroke: "#e5e7eb" }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={{ stroke: "#e5e7eb" }}
              tickFormatter={(value) => `${value}만원`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              formatter={(value) => (
                <span className="text-gray-700 font-medium">{value}</span>
              )}
            />
            <Bar
              dataKey="original"
              fill="#6b7280"
              name="원래 상태"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="current"
              fill="#3b82f6"
              name="현재 상태"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 차트 설명 */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <div className="w-4 h-4 bg-gray-500 rounded-full mx-auto mb-2"></div>
          <div className="text-sm font-semibold text-gray-700">원래 상태</div>
          <div className="text-xs text-gray-500">시뮬레이션 시작 시점의 값</div>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-xl">
          <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto mb-2"></div>
          <div className="text-sm font-semibold text-blue-700">현재 상태</div>
          <div className="text-xs text-blue-500">변수 조정 후의 값</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
          <div className="w-4 h-4 bg-gradient-to-r from-gray-500 to-blue-500 rounded-full mx-auto mb-2"></div>
          <div className="text-sm font-semibold text-gray-700">변화량</div>
          <div className="text-xs text-gray-500">두 상태 간의 차이</div>
        </div>
      </div>
    </div>
  );
}
