"use client";

import { motion } from "framer-motion";
import { Users, Award, CheckCircle } from "lucide-react";

const benefits = [
  {
    title: "전문 지식 없이도",
    description: "복잡한 법적 개념을 AI가 쉽게 설명해드립니다",
    icon: <Users className="w-6 h-6" />,
  },
  {
    title: "실시간 위험 평가",
    description: "계약 조건 변경 시 즉시 위험도를 확인할 수 있습니다",
    icon: <Award className="w-6 h-6" />,
  },
  {
    title: "구체적 행동 가이드",
    description: "이론이 아닌 실질적인 예방 조치를 제시합니다",
    icon: <CheckCircle className="w-6 h-6" />,
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            LeaseShield를 선택해야 하는 이유
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            기존 서비스와는 차별화된 혁신적인 기능으로 당신의 전세 계약을
            안전하게 보호합니다
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
