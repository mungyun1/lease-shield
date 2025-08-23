"use client";

import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* 브랜드 섹션 */}
          <div className="col-span-1 sm:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold">LeaseShield</span>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed text-sm sm:text-base">
              AI 기반 전세 계약 위험 진단 서비스로 안전한 전세 계약을 체결할 수
              있도록 도와드립니다.
            </p>
          </div>

          {/* 서비스 섹션 */}
          <div className="col-span-1">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">
              서비스
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 text-gray-400 text-sm sm:text-base">
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">
                위험 진단
              </li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">
                예방 가이드
              </li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">
                시뮬레이션
              </li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">
                리포트
              </li>
            </ul>
          </div>

          {/* 지원 섹션 */}
          <div className="col-span-1">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">
              지원
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 text-gray-400 text-sm sm:text-base">
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">
                고객센터
              </li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">
                자주 묻는 질문
              </li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">
                문의하기
              </li>
            </ul>
          </div>
        </div>

        {/* 구분선 및 저작권 */}
        <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400">
          <p className="text-sm sm:text-base">
            &copy; LeaseShield. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
