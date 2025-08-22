import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ResultHeader() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      {/* 네비게이션 버튼들 */}
      <div className="flex items-center justify-between mb-8">
        <motion.button
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/input")}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-white/80 rounded-xl transition-all duration-300 backdrop-blur-sm"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          입력 페이지로 돌아가기
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/")}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-white/80 rounded-xl transition-all duration-300 backdrop-blur-sm"
        >
          <Home className="w-5 h-5 mr-2" />
          홈으로
        </motion.button>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
      >
        전세 계약 위험 진단 결과
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl text-gray-600 mb-8"
      >
        AI가 분석한 당신의 계약 위험도입니다
      </motion.p>
    </motion.div>
  );
}
