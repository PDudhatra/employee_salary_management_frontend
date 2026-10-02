import { useState } from "react";
import {
  Alert,
  Button,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  createEmployee,
  type CreateEmployeeParams,
} from "../services/employeeApi";

const COUNTRIES = [
  "India",
  "Singapore",
  "Malaysia",
  "Thailand",
  "Indonesia",
  "Philippines",
  "South Korea",
  "United Kingdom",
  "United States",
];

const CURRENCIES = [
  "INR",
  "SGD",
  "MYR",
  "THB",
  "IDR",
  "PHP",
  "KRW",
  "GBP",
  "USD",
];

const DEPARTMENTS = [
  "Engineering",
  "Product",
  "Sales",
  "Marketing",
  "Finance",
  "Human Resources",
  "Operations",
  "Customer Support",
];

const STATUSES = ["active", "inactive"];

const initialForm: CreateEmployeeParams = {
  employee_code: "",
  first_name: "",
  last_name: "",
  email: "",
  country: "India",
  department: "Engineering",
  job_title: "",
  employment_status: "active",
  joining_date: "",
  annual_salary: 0,
  currency: "INR",
};

function AddEmployeePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState<CreateEmployeeParams>(initialForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const updateField = (
    field: keyof CreateEmployeeParams,
    value: string | number,
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      await createEmployee(form);

      navigate("/employees");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unable to create employee.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Add Employee
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Create a new employee and add their salary information.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Employee Code"
              value={form.employee_code}
              onChange={(event) =>
                updateField("employee_code", event.target.value)
              }
              required
              fullWidth
              placeholder="EMP10001"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Email"
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              required
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="First Name"
              value={form.first_name}
              onChange={(event) =>
                updateField("first_name", event.target.value)
              }
              required
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Last Name"
              value={form.last_name}
              onChange={(event) => updateField("last_name", event.target.value)}
              required
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Country"
              value={form.country}
              onChange={(event) => updateField("country", event.target.value)}
              select
              required
              fullWidth
            >
              {COUNTRIES.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Currency"
              value={form.currency}
              onChange={(event) => updateField("currency", event.target.value)}
              select
              required
              fullWidth
            >
              {CURRENCIES.map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Department"
              value={form.department}
              onChange={(event) =>
                updateField("department", event.target.value)
              }
              select
              required
              fullWidth
            >
              {DEPARTMENTS.map((department) => (
                <MenuItem key={department} value={department}>
                  {department}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Job Title"
              value={form.job_title}
              onChange={(event) => updateField("job_title", event.target.value)}
              required
              fullWidth
              placeholder="Software Engineer"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Employment Status"
              value={form.employment_status}
              onChange={(event) =>
                updateField("employment_status", event.target.value)
              }
              select
              required
              fullWidth
            >
              {STATUSES.map((status) => (
                <MenuItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Joining Date"
              type="date"
              value={form.joining_date}
              onChange={(event) =>
                updateField("joining_date", event.target.value)
              }
              required
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Annual Salary"
              type="number"
              value={form.annual_salary}
              onChange={(event) =>
                updateField("annual_salary", Number(event.target.value))
              }
              required
              fullWidth
              slotProps={{
                htmlInput: {
                  min: 0,
                  step: "0.01",
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={saving}
            >
              {saving ? "Saving..." : "Create Employee"}
            </Button>

            <Button
              type="button"
              variant="outlined"
              size="large"
              sx={{ ml: 2 }}
              disabled={saving}
              onClick={() => navigate("/employees")}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default AddEmployeePage;
