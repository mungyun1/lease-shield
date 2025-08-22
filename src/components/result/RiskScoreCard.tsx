import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle, Shield } from "lucide-react";
import { getGradeColor, getGradeText } from "@/utils";

interface RiskScoreCardProps {
  score: number;
  grade: string;
  animatedScore: number;
}

const getGradeIcon = (grade: string) => {
  switch (grade) {
    case "safe":
      return <CheckCircle className="w-8 h-8 text-green-500" />;
    case "moderate":
      return <AlertTriangle className="w-8 h-8 text-yellow-500" />;
    case "danger":
      return <Shield className="w-8 h-8 text-red-500" />;
    default:
      return null;
  }
};

export default function RiskScoreCard({
  score,
  grade,
  animatedScore,
}: RiskScoreCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, x: -50 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="lg:col-span-1"
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">위험 점수</h2>

          {/* 게이지 차트 */}
          <div className="relative w-56 h-56 mx-auto mb-8">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* 배경 원 */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#f1f5f9"
                strokeWidth="10"
              />
              {/* 진행률 원 */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="10"
                strokeDasharray={`${(animatedScore / 100) * 283} 283`}
                strokeDashoffset="0"
                transform="rotate(-90 50 50)"
                className="transition-all duration-1000 ease-out"
                strokeLinecap="round"
              />
              {/* 그라데이션 정의 */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>

            {/* 중앙 점수 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.8,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                  {animatedScore}
                </motion.div>
                <div className="text-sm text-gray-500 font-medium">점</div>
              </div>
            </div>
          </div>

          {/* 등급 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className={`inline-flex items-center px-6 py-3 rounded-full ${getGradeColor(grade)} shadow-lg`}
          >
            {getGradeIcon(grade)}
            <span className="ml-3 font-bold text-lg">
              {getGradeText(grade)}
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
