"use client";

interface GuideFilterProps {
  filter: "all" | "high" | "medium" | "low";
  onFilterChange: (filter: "all" | "high" | "medium" | "low") => void;
}

const getPriorityText = (priority: string) => {
  switch (priority) {
    case "high":
      return "높은 우선순위";
    case "medium":
      return "중간 우선순위";
    case "low":
      return "낮은 우선순위";
    default:
      return "알 수 없음";
  }
};

export default function GuideFilter({
  filter,
  onFilterChange,
}: GuideFilterProps) {
  return (
    <div className="mb-10">
      <div className="flex flex-wrap gap-3 justify-center">
        {(["all", "high", "medium", "low"] as const).map((category) => (
          <button
            key={category}
            onClick={() => onFilterChange(category)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
              filter === category
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                : "bg-white/80 backdrop-blur-sm text-gray-600 border border-gray-200 hover:border-blue-300 hover:bg-white"
            }`}
          >
            {category === "all" ? "전체 보기" : getPriorityText(category)}
          </button>
        ))}
      </div>
    </div>
  );
}
