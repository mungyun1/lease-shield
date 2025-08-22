import { Shield, Info, CheckCircle } from "lucide-react";

export default function GuideResources() {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        추가 도움말 및 리소스
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-6 border border-gray-200 rounded-2xl hover:border-blue-300 hover:shadow-lg transition-all duration-300 group cursor-pointer">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2 text-lg">
            법률 상담
          </h3>
          <p className="text-gray-600">
            전문 변호사와 상담하여
            <br />
            법적 권리 보호
          </p>
        </div>
        <div className="text-center p-6 border border-gray-200 rounded-2xl hover:border-green-300 hover:shadow-lg transition-all duration-300 group cursor-pointer">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Info className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2 text-lg">
            공공 서비스
          </h3>
          <p className="text-gray-600">
            정부 지원 서비스와
            <br />
            무료 상담 안내
          </p>
        </div>
        <div className="text-center p-6 border border-gray-200 rounded-2xl hover:border-purple-300 hover:shadow-lg transition-all duration-300 group cursor-pointer">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2 text-lg">
            체크리스트
          </h3>
          <p className="text-gray-600">
            계약 전 필수 체크사항과
            <br />
            준비 서류 안내
          </p>
        </div>
      </div>
    </div>
  );
}
