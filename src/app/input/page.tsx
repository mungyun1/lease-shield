"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, DollarSign } from "lucide-react";
import { ContractData } from "@/types";
import { PageHeader, StepForm, StepIndicator } from "@/components/input";
import { calculateRiskScore } from "@/lib/api";

const steps = [
  {
    id: 1,
    title: "기본 정보",
    icon: MapPin,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    title: "금융 정보",
    icon: DollarSign,
    color: "from-emerald-500 to-emerald-600",
  },
];

export default function InputPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contractData, setContractData] = useState<ContractData>({
    region: "",
    address: "",
    zipCode: "",
    detailAddress: "",
    housingType: "",
    seniorLienAmount: null,
    jeonseDepositAmount: null,
    propertyValue: null,
    coverageStartYyyymm: "",
    coverageEndYyyymm: "",
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

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      // API 요청용 데이터 필터링
      const apiRequestData = {
        region: contractData.region,
        housingType: contractData.housingType,
        seniorLienAmount: contractData.seniorLienAmount,
        jeonseDepositAmount: contractData.jeonseDepositAmount,
        propertyValue: contractData.propertyValue,
        coverageStartYyyymm: contractData.coverageStartYyyymm,
        coverageEndYyyymm: contractData.coverageEndYyyymm,
      };

      // 필터링된 데이터를 콘솔에 출력
      console.log("API 요청용 데이터:", apiRequestData);

      // API 요청 보내기
      try {
        const apiResponse = await calculateRiskScore(apiRequestData);
        console.log("API 응답:", apiResponse);

        // API 응답을 로컬 스토리지에 저장
        localStorage.setItem("apiResponse", JSON.stringify(apiResponse));
      } catch (apiError) {
        console.error("API 요청 실패:", apiError);
        // API 실패 시에도 계속 진행 (사용자 경험 향상)
      }

      // 계약 데이터를 로컬 스토리지에 저장 (결과 페이지에서 사용)
      localStorage.setItem("contractData", JSON.stringify(contractData));

      // 위험 진단 시작 시간 기록
      localStorage.setItem("diagnosisStartTime", new Date().toISOString());

      // 결과 페이지로 이동
      router.push("/result");
    } catch (error) {
      console.error("위험 진단 시작 중 오류 발생:", error);
      // 에러 처리 로직 추가 가능
    } finally {
      // 로딩 상태를 위한 지연 (사용자 경험 향상)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitting(false);
    }
  };

  const isStepValid = (): boolean => {
    switch (currentStep) {
      case 1:
        const step1Valid = Boolean(
          contractData.zipCode &&
            contractData.address &&
            contractData.detailAddress &&
            contractData.housingType
        );

        return step1Valid;
      case 2:
        const step2Valid = Boolean(
          contractData.jeonseDepositAmount &&
            contractData.jeonseDepositAmount > 0 &&
            contractData.propertyValue &&
            contractData.propertyValue > 0 &&
            contractData.coverageStartYyyymm &&
            contractData.coverageStartYyyymm !== "" &&
            contractData.coverageEndYyyymm &&
            contractData.coverageEndYyyymm !== ""
        );

        return step2Valid;
      default:
        console.log(contractData);
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50 relative overflow-hidden">
      {/* 배경 장식 요소들 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-indigo-300/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-200/20 to-blue-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-200/10 to-pink-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <PageHeader />
        <StepIndicator steps={steps} currentStep={currentStep} />
        <StepForm
          currentStep={currentStep}
          contractData={contractData}
          setContractData={setContractData}
          onPrevStep={prevStep}
          onNextStep={nextStep}
          onSubmit={handleSubmit}
          isStepValid={isStepValid()}
          totalSteps={steps.length}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}
