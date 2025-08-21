"use client";

import { motion } from "framer-motion";
import { Users, Award, CheckCircle, Shield, Zap, Heart } from "lucide-react";

const benefits = [
  {
    title: "전문 지식 없이도",
    description: "복잡한 법적 개념을 AI가 쉽게 설명해드립니다",
    icon: <Users className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-50 to-cyan-50",
    feature: "AI 번역기",
  },
  {
    title: "실시간 위험 평가",
    description: "계약 조건 변경 시 즉시 위험도를 확인할 수 있습니다",
    icon: <Award className="w-8 h-8" />,
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-50 to-emerald-50",
    feature: "실시간 분석",
  },
  {
    title: "구체적 행동 가이드",
    description: "이론이 아닌 실질적인 예방 조치를 제시합니다",
    icon: <CheckCircle className="w-8 h-8" />,
    color: "from-purple-500 to-pink-500",
    bgColor: "from-purple-50 to-pink-50",
    feature: "실용적 조언",
  },
  {
    title: "전문가 수준 진단",
    description: "부동산 전문가와 동일한 수준의 정확한 분석을 제공합니다",
    icon: <Shield className="w-8 h-8" />,
    color: "from-orange-500 to-red-500",
    bgColor: "from-orange-50 to-red-50",
    feature: "전문가급",
  },
  {
    title: "빠른 처리 속도",
    description:
      "복잡한 분석도 3초 내에 완료하여 즉시 결과를 확인할 수 있습니다",
    icon: <Zap className="w-8 h-8" />,
    color: "from-indigo-500 to-blue-500",
    bgColor: "from-indigo-50 to-blue-50",
    feature: "초고속",
  },
  {
    title: "사용자 중심 설계",
    description:
      "누구나 쉽게 사용할 수 있도록 직관적인 인터페이스를 제공합니다",
    icon: <Heart className="w-8 h-8" />,
    color: "from-pink-500 to-rose-500",
    bgColor: "from-pink-50 to-rose-50",
    feature: "친화적 UI",
  },
];

export default function Benefits() {
  return (
    <section
      id="benefits"
      className="py-24 bg-gradient-to-br from-white via-gray-50/30 to-blue-50/20 relative overflow-hidden"
    >
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-200/10 to-indigo-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-purple-200/10 to-pink-200/10 rounded-full blur-3xl"></div>
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
            LeaseShield를 선택해야 하는{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              6가지 이유
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            기존 서비스와는 차별화된 혁신적인 기능으로 당신의 전세 계약을
            안전하게 보호합니다
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
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
                className={`bg-gradient-to-br ${benefit.bgColor} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform border border-gray-100/50 backdrop-blur-sm relative overflow-hidden h-full`}
              >
                {/* 상단 배지 */}
                <div className="inline-flex items-center gap-2 bg-white/80 text-gray-700 px-3 py-1 rounded-full text-xs font-medium mb-6 backdrop-blur-sm border border-gray-200/50">
                  {benefit.feature}
                </div>

                {/* 아이콘 */}
                <motion.div
                  className={`w-20 h-20 bg-gradient-to-br ${benefit.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {benefit.icon}
                </motion.div>

                {/* 콘텐츠 */}
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {benefit.description}
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
