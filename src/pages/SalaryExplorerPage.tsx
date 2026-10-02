import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {
  fetchSalaryInsights,
  type SalaryInsights,
} from "../services/salaryInsightsApi";

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

function SalaryExplorerPage() {
  const [country, setCountry] = useState("");
  const [department, setDepartment] = useState("");
  const [currency, setCurrency] = useState("");

  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  const [insights, setInsights] = useState<SalaryInsights | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadInsights = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await fetchSalaryInsights({
        country: country || undefined,
        department: department || undefined,
        currency: currency || undefined,
        min_salary: minSalary ? Number(minSalary) : undefined,
        max_salary: maxSalary ? Number(maxSalary) : undefined,
      });

      setInsights(result);
    } catch {
      setError("Failed to load salary insights.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInsights();
  }, []);

  const clearFilters = () => {
    setCountry("");
    setDepartment("");
    setCurrency("");
    setMinSalary("");
    setMaxSalary("");
  };

  useEffect(() => {
    loadInsights();
  }, []);

  const formatSalary = (value: number | null) => {
    if (value === null || !currency) {
      return value === null ? "—" : value.toLocaleString();
    }

    return `${currency} ${value.toLocaleString()}`;
  };

  return (
    <>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Salary Explorer
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Explore salary statistics using employee and salary filters.
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Salary statistics are calculated within the selected currency. Salaries
        across different currencies are not combined.
      </Alert>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Filters
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              label="Country"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              select
              fullWidth
            >
              <MenuItem value="">All Countries</MenuItem>

              {COUNTRIES.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              label="Department"
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
              select
              fullWidth
            >
              <MenuItem value="">All Departments</MenuItem>

              {DEPARTMENTS.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <TextField
              label="Currency"
              value={currency}
              onChange={(event) => setCurrency(event.target.value)}
              select
              fullWidth
            >
              <MenuItem value="">All Currencies</MenuItem>

              {CURRENCIES.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <TextField
              label="Min Salary"
              type="number"
              value={minSalary}
              onChange={(event) => setMinSalary(event.target.value)}
              fullWidth
              slotProps={{
                htmlInput: {
                  min: 0,
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <TextField
              label="Max Salary"
              type="number"
              value={maxSalary}
              onChange={(event) => setMaxSalary(event.target.value)}
              fullWidth
              slotProps={{
                htmlInput: {
                  min: 0,
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                onClick={loadInsights}
                disabled={loading}
              >
                {loading ? "Loading..." : "Apply Filters"}
              </Button>

              <Button
                variant="outlined"
                onClick={clearFilters}
                disabled={loading}
              >
                Clear Filters
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {insights && (
        <Grid container spacing={3}>
          <SalaryCard
            title="Employees"
            value={insights.employee_count.toLocaleString()}
          />

          <SalaryCard
            title="Average Salary"
            value={formatSalary(insights.average_salary)}
          />

          <SalaryCard
            title="Median Salary"
            value={formatSalary(insights.median_salary)}
          />

          <SalaryCard
            title="Minimum Salary"
            value={formatSalary(insights.minimum_salary)}
          />

          <SalaryCard
            title="Maximum Salary"
            value={formatSalary(insights.maximum_salary)}
          />
        </Grid>
      )}
    </>
  );
}

interface SalaryCardProps {
  title: string;
  value: string;
}

function SalaryCard({ title, value }: SalaryCardProps) {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Card>
        <CardContent>
          <Typography color="text.secondary" gutterBottom>
            {title}
          </Typography>

          <Typography variant="h5">{value}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default SalaryExplorerPage;
