export interface SalaryInsights {
  employee_count: number;
  average_salary: number | null;
  minimum_salary: number | null;
  maximum_salary: number | null;
  median_salary: number | null;
}

interface SalaryInsightsResponse {
  data: SalaryInsights;
}

export interface SalaryInsightsParams {
  country?: string;
  department?: string;
  currency?: string;
  min_salary?: number;
  max_salary?: number;
}

export async function fetchSalaryInsights(
  params: SalaryInsightsParams = {},
): Promise<SalaryInsights> {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      query.set(key, String(value));
    }
  });

  const response = await fetch(`/api/v1/salary_insights?${query.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch salary insights");
  }

  const result: SalaryInsightsResponse = await response.json();

  return result.data;
}
