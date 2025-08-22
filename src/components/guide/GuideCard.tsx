"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PreventionGuide } from "@/types";

interface GuideCardProps {
  item: PreventionGuide;
  index: number;
  onClick: (item: PreventionGuide) => void;
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

export default function GuideCard({ item, index, onClick }: GuideCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{
        scale: 1.03,
        y: -5,
        transition: { duration: 0.2 },
      }}
      className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden cursor-pointer border border-white/20 hover:shadow-2xl transition-all duration-300"
      onClick={() => onClick(item)}
    >
      {/* 우선순위 표시 바 */}
      <div className={`h-2 ${getPriorityColor(item.priority)}`}></div>

      <div className="p-8">
        {/* 헤더 */}
        <div className="flex items-start justify-between mb-6">
          <div className={`p-3 rounded-xl ${getCategoryColor(item.category)}`}>
            <span className="text-2xl">{getCategoryIcon(item.category)}</span>
          </div>
          <span
            className={`text-xs px-3 py-1.5 rounded-full font-medium ${getPriorityColor(item.priority)} text-white`}
          >
            {getPriorityText(item.priority)}
          </span>
        </div>

        {/* 제목과 설명 */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
          {item.title}
        </h3>
        <p className="text-gray-600 leading-relaxed mb-6">{item.description}</p>

        {/* 액션 아이템 */}
        <div className="space-y-3 mb-6">
          {item.actions.slice(0, 2).map((action, actionIndex) => (
            <div
              key={actionIndex}
              className="flex items-center text-sm text-gray-600"
            >
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></div>
              <span className="line-clamp-2">{action}</span>
            </div>
          ))}
          {item.actions.length > 2 && (
            <div className="text-sm text-blue-600 font-medium flex items-center">
              +{item.actions.length - 2}개 더 보기
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          )}
        </div>

        {/* 하단 액션 버튼 */}
        <div className="pt-4 border-t border-gray-100">
          <button className="w-full py-3 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 rounded-xl font-medium hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 group-hover:shadow-md">
            자세히 보기
          </button>
        </div>
      </div>
    </motion.div>
  );
}
