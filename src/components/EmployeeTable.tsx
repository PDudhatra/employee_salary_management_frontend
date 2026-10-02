import {
  Chip,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";

import type { Employee } from "../types/employee";
import { formatCurrency } from "../utils/formatCurrency";

interface EmployeeTableProps {
  employees: Employee[];
  sort: string;
  direction: "asc" | "desc";
  onSortChange: (field: string) => void;
  onEmployeeClick?: (employee: Employee) => void;
}

function EmployeeTable({
  employees,
  sort,
  direction,
  onSortChange,
  onEmployeeClick,
}: EmployeeTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={sort === "employee_code"}
                direction={sort === "employee_code" ? direction : "asc"}
                onClick={() => onSortChange("employee_code")}
              >
                Employee ID
              </TableSortLabel>
            </TableCell>

            <TableCell>
              <TableSortLabel
                active={sort === "first_name"}
                direction={sort === "first_name" ? direction : "asc"}
                onClick={() => onSortChange("first_name")}
              >
                Name
              </TableSortLabel>
            </TableCell>

            <TableCell>Email</TableCell>

            <TableCell>Country</TableCell>

            <TableCell>Department</TableCell>

            <TableCell>Job Title</TableCell>

            <TableCell>Status</TableCell>

            <TableCell align="right">
              <TableSortLabel
                active={sort === "annual_salary"}
                direction={sort === "annual_salary" ? direction : "asc"}
                onClick={() => onSortChange("annual_salary")}
              >
                Salary
              </TableSortLabel>
            </TableCell>

            <TableCell>
              <TableSortLabel
                active={sort === "joining_date"}
                direction={sort === "joining_date" ? direction : "asc"}
                onClick={() => onSortChange("joining_date")}
              >
                Joining Date
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id} hover>
              <TableCell>{employee.employee_code}</TableCell>

              <TableCell>
                <Link
                  component="button"
                  underline="hover"
                  onClick={() => onEmployeeClick?.(employee)}
                >
                  {employee.first_name} {employee.last_name}
                </Link>
              </TableCell>

              <TableCell>{employee.email}</TableCell>

              <TableCell>{employee.country}</TableCell>

              <TableCell>{employee.department}</TableCell>

              <TableCell>{employee.job_title}</TableCell>

              <TableCell>
                <Chip
                  label={
                    employee.employment_status === "active"
                      ? "Active"
                      : "Inactive"
                  }
                  size="small"
                  color={
                    employee.employment_status === "active"
                      ? "success"
                      : "default"
                  }
                  variant="outlined"
                />
              </TableCell>

              <TableCell align="right">
                {formatCurrency(employee.annual_salary, employee.currency)}
              </TableCell>

              <TableCell>{employee.joining_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EmployeeTable;
