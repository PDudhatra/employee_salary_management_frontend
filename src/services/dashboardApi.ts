export interface DashboardData {
  total_employees: number;
  employees_by_status: Record<string, number>;
  payroll_by_currency: Record<string, number>;
  salary_metrics_by_currency: Record<
    string,
    {
      average: number | null;
      minimum: number | null;
      maximum: number | null;
    }
  >;
  employees_by_country: Record<string, number>;
  employees_by_department: Record<string, number>;
}

interface DashboardResponse {
  data: DashboardData;
}

export async function fetchDashboard(): Promise<DashboardData> {
  const response = await fetch("/api/v1/dashboard");

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard");
  }

  const result: DashboardResponse = await response.json();

  return result.data;
}
