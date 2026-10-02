import type { Employee, EmployeeResponse } from "../types/employee";

interface EmployeeQueryParams {
  page?: number;
  per_page?: number;
  search?: string;
  country?: string;
  department?: string;
  status?: string;
  currency?: string;
  sort?: string;
  direction?: "asc" | "desc";
}

export async function fetchEmployees(
  params: EmployeeQueryParams = {},
): Promise<EmployeeResponse> {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      query.set(key, String(value));
    }
  });

  const response = await fetch(`/api/v1/employees?${query.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }

  return response.json();
}

export async function fetchEmployee(id: number): Promise<Employee> {
  const response = await fetch(`/api/v1/employees/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch employee");
  }

  const result: { data: Employee } = await response.json();

  return result.data;
}

export interface CreateEmployeeParams {
  employee_code: string;
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  department: string;
  job_title: string;
  employment_status: string;
  joining_date: string;
  annual_salary: number;
  currency: string;
}

export async function createEmployee(
  employee: CreateEmployeeParams,
): Promise<Employee> {
  const response = await fetch("/api/v1/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      employee,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.errors?.join(", ") || "Failed to create employee");
  }

  return result.data;
}
