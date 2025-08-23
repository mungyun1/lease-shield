"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { PreventionGuide } from "@/types";

interface GuideModalProps {
  guide: PreventionGuide;
  onClose: () => void;
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-gradient-to-r from-red-500 to-pink-500";
    case "medium":
      return "bg-gradient-to-r from-yellow-500 to-orange-500";
    case "low":
      return "bg-gradient-to-r from-green-500 to-emerald-500";
    default:
      return "bg-gradient-to-r from-gray-500 to-slate-500";
  }
};

const getPriorityText = (priority: string) => {
  switch (priority) {
    case "high":
      return "높은 우선순위";
    case "medium":
      return "중간 우선순위";
    case "low":
      return "낮은 우선순위";
    default:
      return "알 수 없음";
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "legal":
      return "📚";
    case "financial":
      return "📈";
    case "other":
      return "👥";
    default:
      return "ℹ️";
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "legal":
      return "text-blue-600 bg-blue-50";
    case "financial":
      return "text-green-600 bg-green-50";
    case "other":
      return "text-purple-600 bg-purple-50";
    default:
      return "text-gray-600 bg-gray-50";
  }
};

export default function GuideModal({ guide, onClose }: GuideModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 헤더 */}
        <div className="relative">
          <div className="p-8 pb-6">
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center">
                <div
                  className={`p-4 rounded-2xl mr-6 ${getCategoryColor(guide.category)}`}
                >
                  <span className="text-3xl">
                    {getCategoryIcon(guide.category)}
                  </span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-3">
                    {guide.title}
                  </h2>
                  <span
                    className={`text-sm px-4 py-2 rounded-full font-medium ${getPriorityColor(guide.priority)} text-white`}
                  >
                    {getPriorityText(guide.priority)}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-3 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* 상세 설명 */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="text-blue-600 mr-2">ℹ️</span>
                상세 설명
              </h3>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-r-2xl">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {guide.details}
                </p>
              </div>
            </div>

            {/* 구체적인 행동 단계 */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="text-green-600 mr-2">🎯</span>
                구체적인 행동 단계
              </h3>
              <div className="space-y-4">
                {guide.actions.map((action, index) => (
                  <div
                    key={index}
                    className="flex items-start bg-gray-50 p-4 rounded-xl"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-gray-700 text-lg leading-relaxed">
                      {action}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 추가 정보 */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="text-purple-600 mr-2">📚</span>
                추가 정보
              </h3>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 p-6 rounded-r-2xl">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {guide.details}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
