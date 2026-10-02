export interface Employee {
  id: number;
  employee_code: string;
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  department: string;
  job_title: string;
  employment_status: string;
  joining_date: string;
  annual_salary: string;
  currency: string;
}

export interface EmployeePagination {
  page: number;
  per_page: number;
  total_count: number;
  total_pages: number;
}

export interface EmployeeResponse {
  data: Employee[];
  pagination: EmployeePagination;
}
