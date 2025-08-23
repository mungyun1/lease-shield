import {
  ContractData,
  RiskAnalysis,
  PreventionGuide,
  SimulationData,
  ReportData,
  ApiResponse,
} from "@/types";
import { RiskScoreResponse } from "../types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// API 클라이언트 설정
const apiClient = {
  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API request failed:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  },

  // GET 요청
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "GET" });
  },

  // POST 요청
  async post<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // PUT 요청
  async put<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  // DELETE 요청
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE" });
  },
};

// 위험 진단 API
export const riskAssessmentApi = {
  // 계약 정보를 기반으로 위험도 분석
  async analyzeRisk(
    contractData: ContractData
  ): Promise<ApiResponse<RiskAnalysis>> {
    return apiClient.post<RiskAnalysis>(
      "/risk-assessment/analyze",
      contractData
    );
  },

  // 위험 요인 상세 분석
  async getRiskFactors(
    contractData: ContractData
  ): Promise<ApiResponse<RiskAnalysis["factors"]>> {
    return apiClient.post("/risk-assessment/factors", contractData);
  },

  // LLM 기반 위험 설명 생성
  async generateExplanation(
    contractData: ContractData,
    riskFactors: RiskAnalysis["factors"]
  ): Promise<ApiResponse<string>> {
    return apiClient.post("/risk-assessment/explanation", {
      contractData,
      riskFactors,
    });
  },
};

// 예방 가이드 API
export const preventionGuideApi = {
  // 위험 요인별 예방 가이드 조회
  async getPreventionGuides(
    riskFactors: RiskAnalysis["factors"]
  ): Promise<ApiResponse<PreventionGuide[]>> {
    return apiClient.post("/prevention-guides", { riskFactors });
  },

  // 카테고리별 예방 가이드 조회
  async getGuidesByCategory(
    category: string
  ): Promise<ApiResponse<PreventionGuide[]>> {
    return apiClient.get<PreventionGuide[]>(
      `/prevention-guides/category/${category}`
    );
  },

  // 우선순위별 예방 가이드 조회
  async getGuidesByPriority(
    priority: "high" | "medium" | "low"
  ): Promise<ApiResponse<PreventionGuide[]>> {
    return apiClient.get<PreventionGuide[]>(
      `/prevention-guides/priority/${priority}`
    );
  },
};

// 시뮬레이션 API
export const simulationApi = {
  // 변수 조정 시뮬레이션
  async simulateChanges(
    originalData: ContractData,
    changes: Partial<ContractData>
  ): Promise<ApiResponse<SimulationData>> {
    return apiClient.post("/simulation/simulate", {
      originalData,
      changes,
    });
  },

  // 시나리오별 시뮬레이션
  async simulateScenario(
    baseData: ContractData,
    scenario: string
  ): Promise<ApiResponse<SimulationData>> {
    return apiClient.post("/simulation/scenario", {
      baseData,
      scenario,
    });
  },

  // 최적화 제안
  async getOptimizationSuggestions(contractData: ContractData): Promise<
    ApiResponse<{
      suggestions: Array<{
        action: string;
        expectedScore: number;
        description: string;
      }>;
    }>
  > {
    return apiClient.post("/simulation/optimize", contractData);
  },
};

// 리포트 API
export const reportApi = {
  // 위험 진단 리포트 생성
  async generateReport(
    contractData: ContractData,
    riskAnalysis: RiskAnalysis,
    recommendations: PreventionGuide[]
  ): Promise<ApiResponse<ReportData>> {
    return apiClient.post("/reports/generate", {
      contractData,
      riskAnalysis,
      recommendations,
    });
  },

  // 리포트 조회
  async getReport(reportId: string): Promise<ApiResponse<ReportData>> {
    return apiClient.get<ReportData>(`/reports/${reportId}`);
  },

  // PDF 다운로드
  async downloadPDF(
    reportId: string
  ): Promise<ApiResponse<{ downloadUrl: string }>> {
    return apiClient.get<{ downloadUrl: string }>(`/reports/${reportId}/pdf`);
  },

  // 리포트 공유
  async shareReport(
    reportId: string,
    shareOptions: {
      email?: string;
      message?: string;
    }
  ): Promise<ApiResponse<{ shareUrl: string }>> {
    return apiClient.post(`/reports/${reportId}/share`, shareOptions);
  },
};

// 지역 정보 API
export const regionApi = {
  // 지역별 평균 정보 조회
  async getRegionInfo(regionCode: string): Promise<
    ApiResponse<{
      averageDeposit: number;
      averageMonthlyRent: number;
      riskLevel: "low" | "medium" | "high";
      marketTrend: "rising" | "stable" | "declining";
    }>
  > {
    return apiClient.get(`/regions/${regionCode}/info`);
  },

  // 지역별 위험도 비교
  async compareRegions(regions: string[]): Promise<
    ApiResponse<
      Array<{
        region: string;
        riskScore: number;
        riskLevel: "low" | "medium" | "high";
        factors: string[];
      }>
    >
  > {
    return apiClient.post("/regions/compare", { regions });
  },
};

// 주택 유형 API
export const housingTypeApi = {
  // 주택 유형별 정보 조회
  async getHousingTypeInfo(housingTypeCode: string): Promise<
    ApiResponse<{
      description: string;
      typicalRiskFactors: string[];
      averageDeposit: number;
      marketTrend: "rising" | "stable" | "declining";
    }>
  > {
    return apiClient.get(`/housing-types/${housingTypeCode}/info`);
  },

  // 주택 유형별 위험도 비교
  async compareHousingTypes(types: string[]): Promise<
    ApiResponse<
      Array<{
        type: string;
        riskScore: number;
        riskLevel: "low" | "medium" | "high";
        factors: string[];
      }>
    >
  > {
    return apiClient.post("/housing-types/compare", { types });
  },
};

// 사용자 설정 API
export const userPreferencesApi = {
  // 사용자 설정 조회
  async getUserPreferences(): Promise<
    ApiResponse<{
      language: "ko" | "en";
      theme: "light" | "dark" | "auto";
      notifications: boolean;
      autoSave: boolean;
    }>
  > {
    return apiClient.get("/user/preferences");
  },

  // 사용자 설정 업데이트
  async updateUserPreferences(preferences: {
    language?: "ko" | "en";
    theme?: "light" | "dark" | "auto";
    notifications?: boolean;
    autoSave?: boolean;
  }): Promise<ApiResponse<{ message: string }>> {
    return apiClient.put("/user/preferences", preferences);
  },
};

// 검증 API
export const validationApi = {
  // 계약 정보 검증
  async validateContractData(contractData: ContractData): Promise<
    ApiResponse<{
      isValid: boolean;
      errors: Array<{
        field: string;
        message: string;
        code: string;
      }>;
      warnings: Array<{
        field: string;
        message: string;
        suggestion?: string;
      }>;
    }>
  > {
    return apiClient.post("/validation/contract", contractData);
  },

  // 위험도 점수 검증
  async validateRiskScore(score: number): Promise<
    ApiResponse<{
      isValid: boolean;
      message: string;
    }>
  > {
    return apiClient.post("/validation/risk-score", { score });
  },
};

// 통계 API
export const statisticsApi = {
  // 전체 통계 조회
  async getOverallStatistics(): Promise<
    ApiResponse<{
      totalAssessments: number;
      averageRiskScore: number;
      riskDistribution: {
        safe: number;
        moderate: number;
        danger: number;
      };
      topRiskFactors: Array<{
        factor: string;
        frequency: number;
        averageImpact: number;
      }>;
    }>
  > {
    return apiClient.get("/statistics/overall");
  },

  // 지역별 통계 조회
  async getRegionalStatistics(): Promise<
    ApiResponse<
      Array<{
        region: string;
        averageRiskScore: number;
        totalAssessments: number;
        riskTrend: "rising" | "stable" | "declining";
      }>
    >
  > {
    return apiClient.get("/statistics/regional");
  },
};

// 에러 처리 유틸리티
export const handleApiError = (error: unknown): string => {
  if (error && typeof error === "object" && "response" in error) {
    const response = (error as { response: { data: { message: string } } })
      .response;
    if (response?.data?.message) {
      return response.data.message;
    }
  }
  if (error && typeof error === "object" && "message" in error) {
    return (error as { message: string }).message;
  }
  return "알 수 없는 오류가 발생했습니다.";
};

// API 상태 확인
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
};

/**
 * 위험 점수 계산을 위한 API 요청
 */
export async function calculateRiskScore(data: {
  region: string;
  housingType: string;
  seniorLienAmount: number;
  jeonseDepositAmount: number;
  propertyValue: number;
  coverageStartYyyymm: string;
  coverageEndYyyymm: string;
}): Promise<RiskScoreResponse> {
  try {
    console.log(
      "process.env.NEXT_PUBLIC_API_KE",
      process.env.NEXT_PUBLIC_API_KEY
    );
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://10.10.1.34:8000/score";
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.NEXT_PUBLIC_API_KEY || "",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(
        `API 요청 실패: ${response.status} ${response.statusText}`
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("위험 점수 계산 API 요청 중 오류:", error);
    throw error;
  }
}
