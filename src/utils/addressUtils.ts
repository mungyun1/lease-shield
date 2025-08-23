/**
 * 주소에서 지역(시/도)을 추출하는 함수
 * @param address 전체 주소 문자열
 * @returns 추출된 지역 문자열 (예: "서울", "부산", "경남" 등)
 */
export function extractRegionFromAddress(address: string): string {
  if (!address || typeof address !== "string") {
    return "";
  }

  // 한국의 주요 시/도 목록
  const regions = [
    "서울",
    "부산",
    "대구",
    "인천",
    "광주",
    "대전",
    "울산",
    "세종",
    "경기",
    "강원",
    "충북",
    "충남",
    "전북",
    "전남",
    "경북",
    "경남",
    "제주",
  ];

  // 주소에서 지역 찾기
  for (const region of regions) {
    if (address.includes(region)) {
      return region;
    }
  }

  // 특수한 경우 처리 (예: "서울특별시" -> "서울")
  if (address.includes("서울특별시")) return "서울";
  if (address.includes("부산광역시")) return "부산";
  if (address.includes("대구광역시")) return "대구";
  if (address.includes("인천광역시")) return "인천";
  if (address.includes("광주광역시")) return "광주";
  if (address.includes("대전광역시")) return "대전";
  if (address.includes("울산광역시")) return "울산";
  if (address.includes("세종특별자치시")) return "세종";
  if (address.includes("경기도")) return "경기";
  if (address.includes("강원도")) return "강원";
  if (address.includes("충청북도")) return "충북";
  if (address.includes("충청남도")) return "충남";
  if (address.includes("전라북도")) return "전북";
  if (address.includes("전라남도")) return "전남";
  if (address.includes("경상북도")) return "경북";
  if (address.includes("경상남도")) return "경남";
  if (address.includes("제주특별자치도")) return "제주";

  return "";
}
