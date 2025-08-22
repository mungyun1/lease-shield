"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { useRouter } from "next/navigation";

interface NavigationButtonsProps {
  showBackButton?: boolean;
  showHomeButton?: boolean;
  className?: string;
}

export default function NavigationButtons({
  showBackButton = true,
  showHomeButton = true,
  className = "",
}: NavigationButtonsProps) {
  const router = useRouter();

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {showBackButton && (
        <motion.button
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.back()}
          className="cursor-pointer flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:transition-all duration-300 backdrop-blur-sm"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          뒤로가기
        </motion.button>
      )}

      {showHomeButton && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/")}
          className="cursor-pointer flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:transition-all duration-300 backdrop-blur-sm"
        >
          <Home className="w-5 h-5 mr-2" />
          홈으로
        </motion.button>
      )}
    </div>
  );
}
