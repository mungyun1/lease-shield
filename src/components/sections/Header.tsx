"use client";

import { motion } from "framer-motion";
import { Shield, Lock } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="relative z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* 로고 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center space-x-3 group cursor-pointer"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-md">
                <Lock className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                LeaseShield
              </span>
            </div>
          </motion.div>

          {/* 네비게이션 메뉴 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="hidden md:flex items-center space-x-1"
          >
            <Link
              href="#features"
              className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium rounded-xl hover:bg-blue-50 relative group"
            >
              기능
            </Link>
            <Link
              href="#benefits"
              className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium rounded-xl hover:bg-blue-50 relative group"
            >
              장점
            </Link>
            <Link
              href="#how-it-works"
              className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium rounded-xl hover:bg-blue-50 relative group"
            >
              사용법
            </Link>
          </motion.div>
        </div>
      </nav>
    </header>
  );
}
