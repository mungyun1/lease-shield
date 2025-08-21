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
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "LLM 기반 설명",
    description:
      "복잡한 법적 개념을 쉽게 이해할 수 있도록 AI가 상세히 설명합니다",
    color: "text-green-600 bg-green-100",
    gradient: "from-green-500 to-green-600",
  },
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: "예방 가이드",
    description: "위험 요인별로 구체적인 예방 조치와 행동 가이드를 제공합니다",
    color: "text-purple-600 bg-purple-100",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "What-if 시뮬레이션",
    description:
      "주요 변수를 조정하여 위험도 변화를 실시간으로 확인할 수 있습니다",
    color: "text-orange-600 bg-orange-100",
    gradient: "from-orange-500 to-orange-600",
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: "리포트 생성",
    description:
      "진단 결과를 바탕으로 전문적인 리포트를 생성하고 PDF로 다운로드합니다",
    color: "text-red-600 bg-red-100",
    gradient: "from-red-500 to-red-600",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "실시간 분석",
    description:
      "계약 조건 변경 시 즉시 위험도가 재계산되어 최적의 선택을 도와줍니다",
    color: "text-indigo-600 bg-indigo-100",
    gradient: "from-indigo-500 to-indigo-600",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            AI가 제공하는 6가지 핵심 기능
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border border-gray-100"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
