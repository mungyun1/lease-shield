'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { ContractData } from '@/types';

const steps = [
  { id: 1, title: '기본 정보', description: '지역과 주택 유형을 선택하세요' },
  { id: 2, title: '금융 정보', description: '보증금과 대출금을 입력하세요' },
  {
    id: 3,
    title: '법적 정보',
    description: '선순위 채권과 임차권 등록 여부를 확인하세요',
  },
];

export default function InputPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [contractData, setContractData] = useState<ContractData>({
    region: '',
    housingType: '',
    deposit: 0,
    loanAmount: 0,
    hasPriorityDebt: false,
    hasTenancyRegistration: false,
  });

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // TODO: API 호출하여 위험 진단 시작
    console.log('계약 데이터:', contractData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            전세 계약 위험 진단
          </h1>
          <p className="text-gray-600">
            계약 정보를 입력하고 위험도를 진단해보세요
          </p>
        </motion.div>

        {/* 진행률 표시 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    step.id <= currentStep
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step.id}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      step.id < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-gray-600">
              {steps[currentStep - 1].description}
            </p>
          </div>
        </div>

        {/* 단계별 폼 */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  지역
                </label>
                <select
                  value={contractData.region}
                  onChange={(e) =>
                    setContractData({ ...contractData, region: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">지역을 선택하세요</option>
                  <option value="seoul">서울</option>
                  <option value="gyeonggi">경기</option>
                  <option value="incheon">인천</option>
                  <option value="busan">부산</option>
                  <option value="daegu">대구</option>
                  <option value="daejeon">대전</option>
                  <option value="gwangju">광주</option>
                  <option value="ulsan">울산</option>
                  <option value="sejong">세종</option>
                  <option value="jeju">제주</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  주택 유형
                </label>
                <select
                  value={contractData.housingType}
                  onChange={(e) =>
                    setContractData({
                      ...contractData,
                      housingType: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">주택 유형을 선택하세요</option>
                  <option value="apartment">아파트</option>
                  <option value="villa">빌라</option>
                  <option value="house">단독주택</option>
                  <option value="officetel">오피스텔</option>
                  <option value="studio">원룸/투룸</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  보증금 (만원)
                </label>
                <input
                  type="number"
                  value={contractData.deposit}
                  onChange={(e) =>
                    setContractData({
                      ...contractData,
                      deposit: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 5000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  대출금 (만원)
                </label>
                <input
                  type="number"
                  value={contractData.loanAmount}
                  onChange={(e) =>
                    setContractData({
                      ...contractData,
                      loanAmount: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 3000"
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={contractData.hasPriorityDebt}
                    onChange={(e) =>
                      setContractData({
                        ...contractData,
                        hasPriorityDebt: e.target.checked,
                      })
                    }
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    선순위 채권이 있나요?
                  </span>
                </label>
                <p className="text-sm text-gray-500 ml-7 mt-1">
                  임대인이 다른 채권자에게 담보권을 설정한 경우
                </p>
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={contractData.hasTenancyRegistration}
                    onChange={(e) =>
                      setContractData({
                        ...contractData,
                        hasTenancyRegistration: e.target.checked,
                      })
                    }
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    임차권 등기를 했나요?
                  </span>
                </label>
                <p className="text-sm text-gray-500 ml-7 mt-1">
                  임차권을 등기부에 등록한 경우
                </p>
              </div>
            </div>
          )}

          {/* 네비게이션 버튼 */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center px-4 py-2 rounded-md ${
                currentStep === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              이전
            </button>

            {currentStep < steps.length ? (
              <button
                onClick={nextStep}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                다음
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-8 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
              >
                위험 진단 시작
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

