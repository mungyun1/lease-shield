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
      <div className="flex items-center justify-between mb-8 relative">
        {/* Background line for visual continuity */}
        <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-100 -z-10" />

        {steps.map((step, index) => {
          const IconComponent = step.icon;
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;

          return (
            <div
              key={step.id}
              className="relative z-10 flex-1 flex flex-col items-center"
            >
              <div className="flex flex-col items-center">
                {/* Step Circle */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-lg transition-all duration-300 relative ${
                    isCompleted
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 shadow-green-200"
                      : isActive
                        ? `bg-gradient-to-r ${step.color} shadow-blue-200`
                        : "bg-gray-200 text-gray-400 shadow-gray-100"
                  }`}
                >
                  {/* Active step indicator ring */}
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute inset-0 rounded-full border-4 border-blue-200 animate-pulse"
                    />
                  )}

                  {isCompleted ? (
                    <CheckCircle className="w-8 h-8" />
                  ) : (
                    <IconComponent className="w-6 h-6" />
                  )}
                </motion.div>

                {/* Step Title */}
                <div className="mt-3 text-center">
                  <h3
                    className={`font-semibold text-sm transition-colors duration-300 ${
                      isActive
                        ? "text-gray-800"
                        : isCompleted
                          ? "text-green-600"
                          : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </h3>
                  {isActive && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      className="h-0.5 rounded-full mt-1"
                    />
                  )}
                </div>
              </div>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="absolute top-8 left-1/2 w-full h-0.5 -z-10">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-in-out ${
                      isCompleted
                        ? "bg-gradient-to-r from-green-500 via-green-400 to-emerald-500"
                        : "bg-gray-200"
                    }`}
                  />
                  {/* Animated progress line for active step */}
                  {isActive && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      className="h-full bg-gradient-to-r rounded-full absolute top-0 left-0"
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
