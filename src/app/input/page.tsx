"use client";

import { useState } from "react";
import { MapPin, DollarSign, Shield } from "lucide-react";
import {
  StepIndicator,
  BasicInfoStep,
  FinancialInfoStep,
  LegalInfoStep,
  NavigationButtons,
  PageHeader,
  StepForm,
} from "@/components/input";
import { ContractData } from "@/types";

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
  {
    id: 3,
    title: "법적 정보",
    icon: Shield,
    color: "from-purple-500 to-purple-600",
  },
];

export default function InputPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [contractData, setContractData] = useState<ContractData>({
    region: "",
    housingType: "",
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
    console.log("계약 데이터:", contractData);
  };

  const isStepValid = (): boolean => {
    switch (currentStep) {
      case 1:
        return Boolean(contractData.region && contractData.housingType);
      case 2:
        return Boolean(contractData.deposit > 0 && contractData.loanAmount > 0);
      case 3:
        return true; // 체크박스는 선택사항
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-5xl mx-auto">
        <PageHeader />
        <StepIndicator steps={steps} currentStep={currentStep} />
        <StepForm
          currentStep={currentStep}
          contractData={contractData}
          setContractData={setContractData}
        />
        <NavigationButtons
          currentStep={currentStep}
          totalSteps={steps.length}
          onPrevStep={prevStep}
          onNextStep={nextStep}
          onSubmit={handleSubmit}
          isStepValid={isStepValid()}
        />
      </div>
    </div>
  );
}
