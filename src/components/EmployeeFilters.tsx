import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

interface EmployeeFiltersProps {
  country: string;
  department: string;
  status: string;
  onCountryChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onClear: () => void;
}

const countries = [
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

const departments = [
  "Engineering",
  "Product",
  "Sales",
  "Marketing",
  "Finance",
  "Human Resources",
  "Operations",
  "Customer Support",
];

const statuses = ["active", "inactive"];

function EmployeeFilters({
  country,
  department,
  status,
  onCountryChange,
  onDepartmentChange,
  onStatusChange,
  onClear,
}: EmployeeFiltersProps) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        mb: 3,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <FormControl sx={{ minWidth: 180 }}>
        <InputLabel>Country</InputLabel>
        <Select
          value={country}
          label="Country"
          onChange={(event) => onCountryChange(event.target.value)}
        >
          <MenuItem value="">All Countries</MenuItem>

          {countries.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 180 }}>
        <InputLabel>Department</InputLabel>
        <Select
          value={department}
          label="Department"
          onChange={(event) => onDepartmentChange(event.target.value)}
        >
          <MenuItem value="">All Departments</MenuItem>

          {departments.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 180 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          label="Status"
          onChange={(event) => onStatusChange(event.target.value)}
        >
          <MenuItem value="">All Statuses</MenuItem>

          {statuses.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="outlined" onClick={onClear}>
        Clear Filters
      </Button>
    </Box>
  );
}

export default EmployeeFilters;
