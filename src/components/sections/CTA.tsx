"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            지금 바로{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
              시작하세요
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            무료로 제공되는 AI 위험 진단으로{" "}
            <span className="font-semibold text-white">안전한 전세 계약</span>을
            체결하세요
          </p>

          {/* 기능 하이라이트 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            <div className="flex items-center gap-2 text-blue-100">
              <Shield className="w-5 h-5 text-green-300" />
              <span className="text-sm font-medium">실시간 분석</span>
            </div>
            <div className="flex items-center gap-2 text-blue-100">
              <Zap className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-medium">3초 내 완료</span>
            </div>
            <div className="flex items-center gap-2 text-blue-100">
              <Sparkles className="w-5 h-5 text-purple-300" />
              <span className="text-sm font-medium">무료 서비스</span>
            </div>
          </motion.div>

          {/* CTA 버튼 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/input"
              className="group bg-gradient-to-r from-white to-gray-100 text-blue-600 px-10 py-5 rounded-2xl hover:from-gray-100 hover:to-white transition-all font-semibold text-lg inline-flex items-center shadow-2xl hover:shadow-white/25 transform hover:scale-105 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                무료 진단 시작하기
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Link>

            <button className="group border-2 border-white/30 text-white px-10 py-5 rounded-2xl hover:border-white/50 hover:bg-white/10 transition-all font-semibold text-lg backdrop-blur-sm">
              <span className="flex items-center">
                데모 보기
                <motion.div
                  className="ml-2 w-2 h-2 bg-yellow-300 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
