import { guideItems } from "@/data/guideData";
import { GuideHeader } from "@/components/guide";
import GuidePageClient from "./GuidePageClient";

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="relative max-w-7xl mx-auto p-6">
        <GuideHeader />
        <GuidePageClient guideItems={guideItems} />
      </div>
    </div>
  );
}
