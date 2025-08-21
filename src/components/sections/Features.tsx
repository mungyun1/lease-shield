"use client";

import { motion } from "framer-motion";
import {
  Shield,
  BarChart3,
  Lightbulb,
  TrendingUp,
  CheckCircle,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: "AI 위험 진단",
    description:
      "계약 정보를 입력하면 AI가 실시간으로 위험도를 분석하고 등급을 매깁니다",
    color: "text-blue-600 bg-blue-100",
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-50 to-blue-100/50",
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "LLM 기반 설명",
    description:
      "복잡한 법적 개념을 쉽게 이해할 수 있도록 AI가 상세히 설명합니다",
    color: "text-green-600 bg-green-100",
    gradient: "from-green-500 to-green-600",
    bgGradient: "from-green-50 to-green-100/50",
  },
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: "예방 가이드",
    description: "위험 요인별로 구체적인 예방 조치와 행동 가이드를 제공합니다",
    color: "text-purple-600 bg-purple-100",
    gradient: "from-purple-500 to-purple-600",
    bgGradient: "from-purple-50 to-purple-100/50",
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "What-if 시뮬레이션",
    description:
      "주요 변수를 조정하여 위험도 변화를 실시간으로 확인할 수 있습니다",
    color: "text-orange-600 bg-orange-100",
    gradient: "from-orange-500 to-orange-600",
    bgGradient: "from-orange-50 to-orange-100/50",
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: "리포트 생성",
    description:
      "진단 결과를 바탕으로 전문적인 리포트를 생성하고 PDF로 다운로드합니다",
    color: "text-red-600 bg-red-100",
    gradient: "from-red-500 to-red-600",
    bgGradient: "from-red-50 to-red-100/50",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "실시간 분석",
    description:
      "계약 조건 변경 시 즉시 위험도가 재계산되어 최적의 선택을 도와줍니다",
    color: "text-indigo-600 bg-indigo-100",
    gradient: "from-indigo-500 to-indigo-600",
    bgGradient: "from-indigo-50 to-indigo-100/50",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-24 bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30 relative overflow-hidden"
    >
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            AI가 제공하는{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              6가지 핵심 기능
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            전세 계약의 모든 위험 요소를 체계적으로 분석하고 실질적인 해결책을
            제시합니다
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div
                className={`bg-gradient-to-br ${feature.bgGradient} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform border border-gray-100/50 backdrop-blur-sm relative overflow-hidden`}
              >
                {/* 카드 배경 그라데이션 */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>

                {/* 상단 아이콘 */}
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {feature.icon}
                </motion.div>

                {/* 콘텐츠 */}
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
