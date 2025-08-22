import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { SimulationData } from "@/types";
import { generateChartData } from "@/utils/simulation";

interface ComparisonChartProps {
  currentData: SimulationData;
  originalData: SimulationData;
}

export default function ComparisonChart({
  currentData,
  originalData,
}: ComparisonChartProps) {
  const chartData = generateChartData(currentData, originalData);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        변수별 비교 차트
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => `${value}만원`} />
          <Bar dataKey="original" fill="#6b7280" name="원래 상태" />
          <Bar dataKey="current" fill="#3b82f6" name="현재 상태" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
