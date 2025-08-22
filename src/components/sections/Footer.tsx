"use client";

import { Shield } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">LeaseShield</span>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              AI 기반 전세 계약 위험 진단 서비스로 안전한 전세 계약을 체결할 수
              있도록 도와드립니다.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">서비스</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/input"
                  className="hover:text-white transition-colors duration-200"
                >
                  위험 진단
                </Link>
              </li>
              <li>
                <Link
                  href="/guide"
                  className="hover:text-white transition-colors duration-200"
                >
                  예방 가이드
                </Link>
              </li>
              <li>
                <Link
                  href="/simulation"
                  className="hover:text-white transition-colors duration-200"
                >
                  시뮬레이션
                </Link>
              </li>
              <li>
                <Link
                  href="/report"
                  className="hover:text-white transition-colors duration-200"
                >
                  리포트
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">지원</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  고객센터
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  문의하기
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 LeaseShield. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
