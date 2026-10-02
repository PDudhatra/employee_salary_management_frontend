import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import type { Employee } from "../types/employee";

interface EmployeeDetailsDialogProps {
  employee: Employee | null;
  open: boolean;
  onClose: () => void;
}

function EmployeeDetailsDialog({
  employee,
  open,
  onClose,
}: EmployeeDetailsDialogProps) {
  if (!employee) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {employee.first_name} {employee.last_name}
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={3} sx={{ pt: 1 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="caption" color="text.secondary">
              Employee ID
            </Typography>

            <Typography>{employee.employee_code}</Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="caption" color="text.secondary">
              Email
            </Typography>

            <Typography>{employee.email}</Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="caption" color="text.secondary">
              Country
            </Typography>

            <Typography>{employee.country}</Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="caption" color="text.secondary">
              Department
            </Typography>

            <Typography>{employee.department}</Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="caption" color="text.secondary">
              Job Title
            </Typography>

            <Typography>{employee.job_title}</Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="caption" color="text.secondary">
              Employment Status
            </Typography>

            <Typography>{employee.employment_status}</Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="caption" color="text.secondary">
              Joining Date
            </Typography>

            <Typography>{employee.joining_date}</Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="caption" color="text.secondary">
              Annual Salary
            </Typography>

            <Typography>
              {employee.currency}{" "}
              {Number(employee.annual_salary).toLocaleString()}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 3 }} />
      </DialogContent>
    </Dialog>
  );
}

export default EmployeeDetailsDialog;
