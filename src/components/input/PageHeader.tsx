import { motion } from "framer-motion";
import { Home } from "lucide-react";

export default function PageHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6 shadow-lg">
        <Home className="w-10 h-10 text-white" />
      </div>
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        전세 계약 위험 진단
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        안전한 전세 계약을 위한 AI 위험 진단 서비스입니다
      </p>
    </motion.div>
  );
}
