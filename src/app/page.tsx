'use client';

import { motion } from 'framer-motion';
import {
  Shield,
  BarChart3,
  Lightbulb,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Users,
  Award,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'AI 위험 진단',
    description:
      '계약 정보를 입력하면 AI가 실시간으로 위험도를 분석하고 등급을 매깁니다',
    color: 'text-blue-600 bg-blue-100',
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: 'LLM 기반 설명',
    description:
      '복잡한 법적 개념을 쉽게 이해할 수 있도록 AI가 상세히 설명합니다',
    color: 'text-green-600 bg-green-100',
  },
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: '예방 가이드',
    description: '위험 요인별로 구체적인 예방 조치와 행동 가이드를 제공합니다',
    color: 'text-purple-600 bg-purple-100',
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: 'What-if 시뮬레이션',
    description:
      '주요 변수를 조정하여 위험도 변화를 실시간으로 확인할 수 있습니다',
    color: 'text-orange-600 bg-orange-100',
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: '리포트 생성',
    description:
      '진단 결과를 바탕으로 전문적인 리포트를 생성하고 PDF로 다운로드합니다',
    color: 'text-red-600 bg-red-100',
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: '실시간 분석',
    description:
      '계약 조건 변경 시 즉시 위험도가 재계산되어 최적의 선택을 도와줍니다',
    color: 'text-indigo-600 bg-indigo-100',
  },
];

const benefits = [
  {
    title: '전문 지식 없이도',
    description: '복잡한 법적 개념을 AI가 쉽게 설명해드립니다',
    icon: <Users className="w-6 h-6" />,
  },
  {
    title: '실시간 위험 평가',
    description: '계약 조건 변경 시 즉시 위험도를 확인할 수 있습니다',
    icon: <Award className="w-6 h-6" />,
  },
  {
    title: '구체적 행동 가이드',
    description: '이론이 아닌 실질적인 예방 조치를 제시합니다',
    icon: <CheckCircle className="w-6 h-6" />,
  },
];

const stats = [
  { number: '95%', label: '정확도' },
  { number: '3초', label: '분석 시간' },
  { number: '24/7', label: '이용 가능' },
  { number: '무료', label: '서비스' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* 헤더 */}
      <header className="relative z-10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                LeaseShield
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex items-center space-x-8"
            >
              <a
                href="#features"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                기능
              </a>
              <a
                href="#benefits"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                장점
              </a>
              <a
                href="#how-it-works"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                사용법
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/input"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                시작하기
              </Link>
            </motion.div>
          </div>
        </nav>
      </header>

      {/* 히어로 섹션 */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              전세 계약의{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                위험을 미리
              </span>{' '}
              알 수 있습니다
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              AI가 당신의 전세 계약을 분석하여 잠재적 위험을 진단하고, 구체적인
              예방 조치를 제시합니다. 복잡한 법적 개념도 쉽게 이해할 수 있어요.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/input"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 font-medium text-lg flex items-center justify-center"
              >
                무료로 위험 진단하기
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors font-medium text-lg">
                데모 보기
              </button>
            </motion.div>
          </div>
        </div>

        {/* 배경 장식 */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* 통계 섹션 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 주요 기능 섹션 */}
      <section id="features" className="py-20 bg-gray-50">
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
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div
                  className={`w-16 h-16 ${feature.color} rounded-lg flex items-center justify-center mb-6`}
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

      {/* 장점 섹션 */}
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
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 사용법 섹션 */}
      <section id="how-it-works" className="py-20 bg-gray-50">
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
            {[
              {
                step: '1',
                title: '계약 정보 입력',
                description:
                  '지역, 주택 유형, 보증금, 대출금 등 기본 정보를 입력하세요',
              },
              {
                step: '2',
                title: 'AI 위험 분석',
                description:
                  '입력된 정보를 바탕으로 AI가 실시간으로 위험도를 분석합니다',
              },
              {
                step: '3',
                title: '결과 및 가이드',
                description:
                  '상세한 분석 결과와 구체적인 예방 가이드를 확인하세요',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              지금 바로 시작하세요
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              무료로 제공되는 AI 위험 진단으로 안전한 전세 계약을 체결하세요
            </p>
            <Link
              href="/input"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg inline-flex items-center"
            >
              무료 진단 시작하기
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">LeaseShield</span>
              </div>
              <p className="text-gray-400 mb-4">
                AI 기반 전세 계약 위험 진단 서비스로 안전한 전세 계약을 체결할
                수 있도록 도와드립니다.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">서비스</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/input"
                    className="hover:text-white transition-colors"
                  >
                    위험 진단
                  </Link>
                </li>
                <li>
                  <Link
                    href="/guide"
                    className="hover:text-white transition-colors"
                  >
                    예방 가이드
                  </Link>
                </li>
                <li>
                  <Link
                    href="/simulation"
                    className="hover:text-white transition-colors"
                  >
                    시뮬레이션
                  </Link>
                </li>
                <li>
                  <Link
                    href="/report"
                    className="hover:text-white transition-colors"
                  >
                    리포트
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">지원</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    고객센터
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    자주 묻는 질문
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    문의하기
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LeaseShield. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
