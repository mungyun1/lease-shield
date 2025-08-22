import { motion } from "framer-motion";

export default function SimulationHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-8"
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        What-if 시뮬레이션
      </h1>
      <p className="text-gray-600">
        주요 변수를 조정하여 위험도 변화를 실시간으로 확인해보세요
      </p>
    </motion.div>
  );
}
