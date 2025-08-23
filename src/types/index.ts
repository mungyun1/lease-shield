// 계약 정보 타입
export interface ContractData {
  region: string;
  housingType: string;
  seniorLienAmount: number | null;
  jeonseDepositAmount: number | null;
  propertyValue: number | null;
  coverageStartYyyymm: string;
  coverageEndYyyymm: string;
}

// 위험 분석 결과 타입
export interface RiskAnalysis {
  score: number;
  grade: "safe" | "moderate" | "danger";
  factors: RiskFactor[];
  explanation: string;
}

// 위험 요인 타입
export interface RiskFactor {
  name: string;
  impact: number;
  description: string;
  category: "financial" | "legal" | "market" | "other";
}

// 예방 가이드 타입
export interface PreventionGuide {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  actions: string[];
  details: string;
  category: string;
}

// 시뮬레이션 데이터 타입
export interface SimulationData extends ContractData {
  score: number;
  grade: "safe" | "moderate" | "danger";
}

// 리포트 데이터 타입
export interface ReportData {
  contractInfo: ContractData;
  riskAnalysis: RiskAnalysis;
  recommendations: PreventionGuide[];
  generatedAt: string;
  reportId: string;
}

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// 지역 정보 타입
export interface RegionInfo {
  code: string;
  name: string;
  averageDeposit: number;
  averageMonthlyRent: number;
  riskLevel: "low" | "medium" | "high";
}

// 주택 유형 타입
export interface HousingType {
  code: string;
  name: string;
  description: string;
  typicalRiskFactors: string[];
}

// 사용자 설정 타입
export interface UserPreferences {
  language: "ko" | "en";
  theme: "light" | "dark" | "auto";
  notifications: boolean;
  autoSave: boolean;
}

// 검증 결과 타입
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ValidationWarning {
  field: string;
  message: string;
  suggestion?: string;
}

// 페이지네이션 타입
export interface PaginationParams {
  page: number;
  limit: number;
  total: number;
}

// 정렬 옵션 타입
export interface SortOption {
  field: string;
  direction: "asc" | "desc";
}

// 필터 옵션 타입
export interface FilterOption {
  field: string;
  value: unknown;
  operator: "eq" | "gt" | "lt" | "gte" | "lte" | "contains" | "in";
}

// 검색 쿼리 타입
export interface SearchQuery {
  query: string;
  filters: FilterOption[];
  sort: SortOption;
  pagination: PaginationParams;
}
