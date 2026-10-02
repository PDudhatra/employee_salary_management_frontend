import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  TablePagination,
  TextField,
  Typography,
  Button,
} from "@mui/material";

import EmployeeTable from "../components/EmployeeTable";
import { fetchEmployees } from "../services/employeeApi";
import type { Employee, EmployeePagination } from "../types/employee";
import EmployeeFilters from "../components/EmployeeFilters";
import EmployeeDetailsDialog from "../components/EmployeeDetailsDialog";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
// import { Alert, CircularProgress, Stack } from "@mui/material";

function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [pagination, setPagination] = useState<EmployeePagination>({
    page: 1,
    per_page: 25,
    total_count: 0,
    total_pages: 0,
  });
  const handleSortChange = (field: string) => {
    if (sort === field) {
      setDirection((current) => (current === "asc" ? "desc" : "asc"));
    } else {
      setSort(field);
      setDirection("asc");
    }

    setPagination((current) => ({
      ...current,
      page: 1,
    }));
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("employee_code");
  const [direction, setDirection] = useState<"asc" | "desc">("asc");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );

  useEffect(() => {
    setLoading(true);
    setError("");

    fetchEmployees({
      page: pagination.page,
      per_page: pagination.per_page,
      search,
      country,
      department,
      status,
      sort,
      direction,
    })
      .then((response) => {
        setEmployees(response.data);
        setPagination(response.pagination);
      })
      .catch(() => {
        setError("Unable to load employees.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [
    pagination.page,
    pagination.per_page,
    search,
    country,
    department,
    status,
    sort,
    direction,
  ]);

  const handlePageChange = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPagination((current) => ({
      ...current,
      page: newPage + 1,
    }));
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPagination((current) => ({
      ...current,
      page: 1,
      per_page: Number(event.target.value),
    }));
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          ACME Salary Management
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            mb: 3,
          }}
        >
          <Box sx={{ textAlign: "left" }}>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Employees
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Manage employee information and compensation details
            </Typography>
          </Box>

          <Button
            variant="contained"
            component={Link}
            to="/employees/new"
            startIcon={<AddIcon />}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 2.5,
            }}
          >
            Add Employee
          </Button>
        </Box>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Search employees"
            placeholder="Search by name, email or employee ID"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPagination((current) => ({
                ...current,
                page: 1,
              }));
            }}
          />
        </Box>

        <EmployeeFilters
          country={country}
          department={department}
          status={status}
          onCountryChange={(value) => {
            setCountry(value);
            setPagination((current) => ({
              ...current,
              page: 1,
            }));
          }}
          onDepartmentChange={(value) => {
            setDepartment(value);
            setPagination((current) => ({
              ...current,
              page: 1,
            }));
          }}
          onStatusChange={(value) => {
            setStatus(value);
            setPagination((current) => ({
              ...current,
              page: 1,
            }));
          }}
          onClear={() => {
            setCountry("");
            setDepartment("");
            setStatus("");
            setPagination((current) => ({
              ...current,
              page: 1,
            }));
          }}
        />

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
            <CircularProgress />
          </Box>
        )}

        {error && <Alert severity="error">{error}</Alert>}

        {!loading && !error && (
          <>
            <EmployeeTable
              employees={employees}
              sort={sort}
              direction={direction}
              onSortChange={handleSortChange}
              onEmployeeClick={setSelectedEmployee}
            />

            <TablePagination
              component="div"
              count={pagination.total_count}
              page={pagination.page - 1}
              onPageChange={handlePageChange}
              rowsPerPage={pagination.per_page}
              onRowsPerPageChange={handleRowsPerPageChange}
              rowsPerPageOptions={[10, 25, 50, 100]}
            />
            <EmployeeDetailsDialog
              employee={selectedEmployee}
              open={selectedEmployee !== null}
              onClose={() => setSelectedEmployee(null)}
            />
          </>
        )}

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {!loading && !error && employees.length === 0 && (
          <Alert severity="info">
            No employees found for the selected filters.
          </Alert>
        )}

        {!loading && !error && employees.length > 0 && (
          <EmployeeTable
            employees={employees}
            sort={sort}
            direction={direction}
            onSortChange={handleSortChange}
          />
        )}
      </Box>
    </Container>
  );
}

export default EmployeesPage;
