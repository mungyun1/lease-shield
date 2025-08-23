/**
 * "2025-12" 형식을 "202512" 형식으로 변환
 * @param monthString "YYYY-MM" 형식의 문자열
 * @returns "YYYYMM" 형식의 문자열
 */
export function convertMonthToYyyymm(monthString: string): string {
  if (!monthString || typeof monthString !== "string") {
    return "";
  }

  // "2025-12" -> "202512"
  return monthString.replace("-", "");
}

/**
 * "202512" 형식을 "2025-12" 형식으로 변환
 * @param yyyymm "YYYYMM" 형식의 문자열
 * @returns "YYYY-MM" 형식의 문자열
 */
export function convertYyyymmToMonth(yyyymm: string): string {
  if (!yyyymm || typeof yyyymm !== "string" || yyyymm.length !== 6) {
    return "";
  }

  // "202512" -> "2025-12"
  return `${yyyymm.substring(0, 4)}-${yyyymm.substring(4, 6)}`;
}
