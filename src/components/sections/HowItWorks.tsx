"use client";

import { motion } from "framer-motion";
import { FileText, Brain, CheckCircle } from "lucide-react";

const steps = [
  {
    step: "1",
    title: "계약 정보 입력",
    description: "지역, 주택 유형, 보증금, 대출금 등 기본 정보를 입력하세요",
    icon: <FileText className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-50 to-cyan-50",
  },
  {
    step: "2",
    title: "AI 위험 분석",
    description: "입력된 정보를 바탕으로 AI가 실시간으로 위험도를 분석합니다",
    icon: <Brain className="w-8 h-8" />,
    color: "from-purple-500 to-pink-500",
    bgColor: "from-purple-50 to-pink-50",
  },
  {
    step: "3",
    title: "결과 및 가이드",
    description: "상세한 분석 결과와 구체적인 예방 가이드를 확인하세요",
    icon: <CheckCircle className="w-8 h-8" />,
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-50 to-emerald-50",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 bg-gradient-to-br from-gray-50/50 via-white to-indigo-50/30 relative overflow-hidden"
    >
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-br from-blue-200/10 to-indigo-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-gradient-to-tl from-purple-200/10 to-pink-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            간단한{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              3단계 위험 진단
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            복잡한 절차 없이 몇 번의 클릭만으로 전문가 수준의 위험 진단을 받을
            수 있습니다
          </p>
        </motion.div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                {/* 단계별 카드 */}
                <div
                  className={`bg-gradient-to-br ${item.bgColor} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform border border-gray-100/50 backdrop-blur-sm relative overflow-hidden h-full`}
                >
                  {/* 상단 아이콘 */}
                  <motion.div
                    className={`w-20 h-20 bg-gradient-to-br ${item.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {item.icon}
                  </motion.div>

                  {/* 단계 번호 */}
                  <motion.div
                    className={`absolute top-6 right-6 w-12 h-12 bg-gradient-to-br ${item.color} text-white rounded-xl flex items-center justify-center text-lg font-bold shadow-lg`}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.2 + 0.3,
                      type: "spring",
                      stiffness: 200,
                    }}
                    viewport={{ once: true }}
                  >
                    {item.step}
                  </motion.div>

                  {/* 콘텐츠 */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
