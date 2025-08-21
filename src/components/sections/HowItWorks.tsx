"use client";

import { motion } from "framer-motion";

const steps = [
  {
    step: "1",
    title: "계약 정보 입력",
    description: "지역, 주택 유형, 보증금, 대출금 등 기본 정보를 입력하세요",
  },
  {
    step: "2",
    title: "AI 위험 분석",
    description: "입력된 정보를 바탕으로 AI가 실시간으로 위험도를 분석합니다",
  },
  {
    step: "3",
    title: "결과 및 가이드",
    description: "상세한 분석 결과와 구체적인 예방 가이드를 확인하세요",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50"
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
            간단한 3단계로 위험 진단
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            복잡한 절차 없이 몇 번의 클릭만으로 전문가 수준의 위험 진단을 받을
            수 있습니다
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {item.step}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 transform translate-x-4"></div>
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
