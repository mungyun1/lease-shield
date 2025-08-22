import { motion } from "framer-motion";
import { BookOpen, Play, Download } from "lucide-react";
import { useRouter } from "next/navigation";

interface ActionButtonsProps {
  onDownloadReport: () => void;
}

export default function ActionButtons({
  onDownloadReport,
}: ActionButtonsProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="text-center"
    >
      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        <motion.button
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/guide")}
          className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform"
        >
          <BookOpen className="w-6 h-6 mr-3" />
          예방 가이드 보기
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/simulation")}
          className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform"
        >
          <Play className="w-6 h-6 mr-3" />
          시뮬레이션 해보기
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={onDownloadReport}
          className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform"
        >
          <Download className="w-6 h-6 mr-3" />
          리포트 다운로드
        </motion.button>
      </div>
    </motion.div>
  );
}
