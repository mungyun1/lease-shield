'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
  ExternalLink,
} from 'lucide-react';
import { PreventionGuide } from '@/types';

const guideItems: PreventionGuide[] = [
  {
    id: '1',
    title: '임차권 등기 신청',
    description: '임차권을 등기부에 등록하여 우선순위를 확보하세요',
    category: 'legal',
    priority: 'high',
    actions: [
      '등기신청서 작성',
      '필요 서류 준비',
      '법원 방문 또는 온라인 신청',
    ],
    details:
      '임차권 등기는 임대인이 파산하거나 집을 팔 때도 계속 거주할 수 있는 권리를 보장합니다. 특히 선순위 채권이 있는 경우 반드시 필요합니다.',
  },
  {
    id: '2',
    title: '보증금 분할 납부 협의',
    description: '대출금을 줄이고 보증금을 낮춰보세요',
    category: 'financial',
    priority: 'high',
    actions: ['임대인과 협의', '계약서 수정', '대출 상환 계획 수립'],
    details:
      '보증금이 높을수록 위험도가 증가합니다. 임대인과 협의하여 보증금을 낮추고 월세로 조정하는 것을 고려해보세요.',
  },
  {
    id: '3',
    title: '선순위 채권 확인',
    description: '등기부등본을 확인하여 담보권 설정 현황을 파악하세요',
    category: 'legal',
    priority: 'medium',
    actions: ['등기부등본 열람', '담보권자 정보 확인', '법률 상담 고려'],
    details:
      '선순위 채권이 있는 경우 임대인이 파산하면 집을 잃을 수 있습니다. 등기부등본을 통해 담보권 설정 현황을 반드시 확인하세요.',
  },
  {
    id: '4',
    title: '보험 가입 검토',
    description: '임차인 보험에 가입하여 위험을 분산하세요',
    category: 'financial',
    priority: 'medium',
    actions: ['보험사 상담', '보장 내용 비교', '가입 신청'],
    details:
      '임차인 보험은 보증금 반환 보장, 이사비용 지원 등 다양한 혜택을 제공합니다. 연간 보험료는 보통 10만원 내외입니다.',
  },
  {
    id: '5',
    title: '정기적인 계약 상태 점검',
    description: '월 1회 계약 조건과 임대인 상태를 확인하세요',
    category: 'other',
    priority: 'low',
    actions: ['월세 납부 확인', '임대인 연락처 유지', '계약서 보관'],
    details:
      '정기적인 점검을 통해 문제를 조기에 발견하고 대응할 수 있습니다. 계약서와 관련 서류는 안전한 곳에 보관하세요.',
  },
];

export default function GuidePage() {
  const [selectedGuide, setSelectedGuide] = useState<PreventionGuide | null>(
    null
  );
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>(
    'all'
  );

  const filteredItems =
    filter === 'all'
      ? guideItems
      : guideItems.filter((item) => item.priority === filter);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return '높은 우선순위';
      case 'medium':
        return '중간 우선순위';
      case 'low':
        return '낮은 우선순위';
      default:
        return '알 수 없음';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            전세 계약 위험 예방 가이드
          </h1>
          <p className="text-gray-600">
            위험도를 낮추기 위한 구체적인 행동 가이드입니다
          </p>
        </motion.div>

        {/* 필터 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {(['all', 'high', 'medium', 'low'] as const).map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full border-2 transition-all ${
                  filter === category
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-blue-300'
                }`}
              >
                {category === 'all' ? '전체' : getPriorityText(category)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 가이드 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
              onClick={() => setSelectedGuide(item)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-2 rounded-lg ${getPriorityColor(item.priority)}`}
                  >
                    {item.priority === 'high' ? (
                      <AlertTriangle className="w-6 h-6" />
                    ) : item.priority === 'medium' ? (
                      <Info className="w-6 h-6" />
                    ) : (
                      <CheckCircle className="w-6 h-6" />
                    )}
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(item.priority)}`}
                  >
                    {getPriorityText(item.priority)}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4">{item.description}</p>

                <div className="space-y-2">
                  {item.actions.slice(0, 2).map((action, actionIndex) => (
                    <div
                      key={actionIndex}
                      className="flex items-center text-sm text-gray-500"
                    >
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                      {action}
                    </div>
                  ))}
                  {item.actions.length > 2 && (
                    <div className="text-sm text-blue-600 font-medium">
                      +{item.actions.length - 2}개 더 보기
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 상세 모달 */}
        <AnimatePresence>
          {selectedGuide && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedGuide(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center">
                      <div
                        className={`p-3 rounded-lg mr-4 ${getPriorityColor(selectedGuide.priority)}`}
                      >
                        {selectedGuide.priority === 'high' ? (
                          <AlertTriangle className="w-6 h-6" />
                        ) : selectedGuide.priority === 'medium' ? (
                          <Info className="w-6 h-6" />
                        ) : (
                          <CheckCircle className="w-6 h-6" />
                        )}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                          {selectedGuide.title}
                        </h2>
                        <span
                          className={`text-sm px-3 py-1 rounded-full ${getPriorityColor(selectedGuide.priority)}`}
                        >
                          {getPriorityText(selectedGuide.priority)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedGuide(null)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      상세 설명
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedGuide.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      구체적인 행동 단계
                    </h3>
                    <div className="space-y-3">
                      {selectedGuide.actions.map((action, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                            {index + 1}
                          </div>
                          <span className="text-gray-700">{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      추가 정보
                    </h3>
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                      <p className="text-gray-700">{selectedGuide.details}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                      실행 계획 세우기
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      관련 정보 더 보기
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 추가 리소스 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            추가 도움말
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
              <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-800 mb-1">법률 상담</h3>
              <p className="text-sm text-gray-600">전문 변호사와 상담</p>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
              <Info className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-800 mb-1">공공 서비스</h3>
              <p className="text-sm text-gray-600">정부 지원 서비스 안내</p>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
              <CheckCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-800 mb-1">체크리스트</h3>
              <p className="text-sm text-gray-600">계약 전 체크사항</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

