"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PreventionGuide } from "@/types";
import {
  GuideFilter,
  GuideCard,
  GuideModal,
  GuideResources,
} from "@/components/guide";

interface GuidePageClientProps {
  guideItems: PreventionGuide[];
}

export default function GuidePageClient({ guideItems }: GuidePageClientProps) {
  const [selectedGuide, setSelectedGuide] = useState<PreventionGuide | null>(
    null
  );
  const [filter, setFilter] = useState<"all" | "high" | "medium" | "low">(
    "all"
  );

  const filteredItems =
    filter === "all"
      ? guideItems
      : guideItems.filter((item) => item.priority === filter);

  return (
    <>
      {/* 필터 섹션 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <GuideFilter filter={filter} onFilterChange={setFilter} />
      </motion.div>

      {/* 가이드 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {filteredItems.map((item, index) => (
          <GuideCard
            key={item.id}
            item={item}
            index={index}
            onClick={setSelectedGuide}
          />
        ))}
      </div>

      {/* 상세 모달 */}
      <AnimatePresence>
        {selectedGuide && (
          <GuideModal
            guide={selectedGuide}
            onClose={() => setSelectedGuide(null)}
          />
        )}
      </AnimatePresence>

      {/* 추가 리소스 섹션 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <GuideResources />
      </motion.div>
    </>
  );
}
