import { motion } from "framer-motion";
import { Shield, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { RiskFactor } from "@/types";

interface RiskFactorsAnalysisProps {
  factors: RiskFactor[];
}

export default function RiskFactorsAnalysis({
  factors,
}: RiskFactorsAnalysisProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="lg:col-span-2"
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 h-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Shield className="w-7 h-7 mr-3 text-blue-600" />
          위험 요인별 영향도 분석
        </h2>

        {/* 위험 요인 요약 카드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {factors.map((factor, index) => (
            <motion.div
              key={factor.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 text-center border border-blue-100"
            >
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {factor.impact}%
              </div>
              <div className="text-sm font-medium text-gray-700">
                {factor.name}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {factor.category === "financial" ? "금융적 위험" : "법적 위험"}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 차트 제목 및 설명 */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            위험 요인별 상세 분석
          </h3>
          <p className="text-sm text-gray-600">
            각 요인의 영향도를 시각적으로 확인하고, 상세 설명을 참고하세요
          </p>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={factors}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "#64748b", fontWeight: 600 }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
              label={{
                value: "영향도 (%)",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle", fill: "#64748b" },
              }}
            />

            <Bar
              dataKey="impact"
              fill="url(#barGradient)"
              radius={[8, 8, 0, 0]}
              maxBarSize={80}
            />
            <defs>
              <linearGradient
                id="barGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>

        {/* 차트 범례 */}
        <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gradient-to-b from-blue-400 to-blue-600 rounded mr-2"></div>
            <span>영향도 높음 (25% 이상)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gradient-to-b from-blue-300 to-blue-500 rounded mr-2"></div>
            <span>영향도 보통 (15-24%)</span>
          </div>
        </div>

        {/* 요인별 상세 설명 */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
            위험 요인 상세 분석
          </h3>
          <div className="space-y-4">
            {factors.map((factor, index) => (
              <motion.div
                key={factor.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-300"
              >
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="font-semibold text-gray-800 text-lg mr-3">
                      {factor.name}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        factor.category === "financial"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {factor.category === "financial"
                        ? "금융적 위험"
                        : "법적 위험"}
                    </span>
                  </div>
                  <p className="text-gray-600">{factor.description}</p>
                </div>
                <div className="flex items-center ml-4">
                  {factor.impact > 25 ? (
                    <TrendingUp className="w-6 h-6 text-red-500 mr-3" />
                  ) : (
                    <TrendingDown className="w-6 h-6 text-green-500 mr-3" />
                  )}
                  <div className="text-center">
                    <span className="text-2xl font-bold text-gray-700 block">
                      {factor.impact}%
                    </span>
                    <span className="text-xs text-gray-500">영향도</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
