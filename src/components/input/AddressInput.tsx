import { useState, useEffect } from "react";
import { MapPin, Search } from "lucide-react";

interface AddressInputProps {
  zipCode: string;
  address: string;
  detailAddress: string;
  onAddressChange: (
    zipCode: string,
    address: string,
    detailAddress: string
  ) => void;
}

declare global {
  interface Window {
    daum: {
      Postcode: new (options: any) => any;
    };
  }
}

export default function AddressInput({
  zipCode,
  address,
  detailAddress,
  onAddressChange,
}: AddressInputProps) {
  const [isDaumLoaded, setIsDaumLoaded] = useState(false);

  useEffect(() => {
    // 다음 우편번호 API 스크립트 로드
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.onload = () => setIsDaumLoaded(true);
    script.onerror = () => console.error("다음 우편번호 API 로드 실패");
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleAddressSearch = () => {
    if (!isDaumLoaded) {
      alert("주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    new window.daum.Postcode({
      oncomplete: function (data: any) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드
        let fullAddress = data.address; // 도로명 주소 변수
        let extraAddress = ""; // 참고항목 변수

        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddress += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddress +=
            extraAddress !== "" ? ", " + data.buildingName : data.buildingName;
        } else if (data.buildingName !== "") {
          extraAddress +=
            extraAddress !== "" ? ", " + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraAddress !== "") {
          extraAddress = " (" + extraAddress + ")";
        }
        // 조합된 참고항목을 해당 필드에 넣는다.
        fullAddress += extraAddress;

        onAddressChange(data.zonecode, fullAddress, "");
      },
      theme: {
        searchBgColor: "#0B65C8",
        queryTextColor: "#FFFFFF",
      },
    }).open();
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        <MapPin className="w-4 h-4 inline mr-2 text-blue-600" />
        주소
      </label>

      {/* 우편번호 입력 */}
      <div className="flex gap-2">
        <input
          type="text"
          value={zipCode}
          placeholder="우편번호"
          readOnly
          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-100 text-gray-700 cursor-not-allowed"
        />
        <button
          type="button"
          onClick={handleAddressSearch}
          disabled={!isDaumLoaded}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          주소 검색
        </button>
      </div>

      {/* 주소 입력 */}
      <input
        type="text"
        value={address}
        placeholder="주소를 검색해주세요"
        readOnly
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-100 text-gray-700 cursor-not-allowed"
      />

      {/* 상세주소 입력 */}
      <div className="flex gap-2">
        <input
          type="text"
          value={detailAddress}
          onChange={(e) => onAddressChange(zipCode, address, e.target.value)}
          placeholder="상세주소를 입력하세요 (동, 호수 등)"
          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 bg-gray-50 hover:bg-white"
        />
      </div>

      {!isDaumLoaded && (
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          주소 검색 서비스를 불러오는 중입니다...
        </div>
      )}
    </div>
  );
}
