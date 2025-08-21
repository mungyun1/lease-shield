"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="relative z-10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              LeaseShield
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center space-x-8"
          >
            <a
              href="#features"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              기능
            </a>
            <a
              href="#benefits"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              장점
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              사용법
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/input"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-md hover:shadow-lg"
            >
              시작하기
            </Link>
          </motion.div>
        </div>
      </nav>
    </header>
  );
}
