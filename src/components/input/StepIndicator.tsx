import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface Step {
  id: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export default function StepIndicator({
  steps,
  currentStep,
}: StepIndicatorProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;

          return (
            <div key={step.id} className="">
              <div className="flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-lg transition-all duration-300 ${
                    isCompleted
                      ? "bg-gradient-to-r from-green-500 to-emerald-500"
                      : isActive
                        ? `bg-gradient-to-r ${step.color}`
                        : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-8 h-8" />
                  ) : (
                    <IconComponent className="w-6 h-6" />
                  )}
                </motion.div>
                <div className="mt-3 text-center">
                  <h3
                    className={`font-semibold text-sm ${
                      isActive ? "text-gray-800" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </h3>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div
                    className={`h-1 rounded-full transition-all duration-500 ${
                      isCompleted
                        ? "bg-gradient-to-r from-green-500 to-emerald-500"
                        : "bg-gray-200"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
