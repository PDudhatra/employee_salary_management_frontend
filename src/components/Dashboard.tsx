import { Card, CardContent, Grid, Typography } from "@mui/material";

import type { DashboardData } from "../services/dashboardApi";

interface DashboardProps {
  data: DashboardData;
}

function Dashboard({ data }: DashboardProps) {
  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Salary Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">Total Employees</Typography>

              <Typography variant="h4">
                {data.total_employees.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {Object.entries(data.payroll_by_currency).map(([currency, payroll]) => (
          <Grid key={currency} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Typography color="text.secondary">
                  Annual Payroll ({currency})
                </Typography>

                <Typography variant="h5">
                  {currency} {payroll.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
        Salary Metrics
      </Typography>

      <Grid container spacing={3}>
        {Object.entries(data.salary_metrics_by_currency).map(
          ([currency, metrics]) => (
            <Grid key={currency} size={{ xs: 12, md: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{currency}</Typography>

                  <Typography>
                    Average: {metrics.average?.toLocaleString() ?? "-"}
                  </Typography>

                  <Typography>
                    Minimum: {metrics.minimum?.toLocaleString() ?? "-"}
                  </Typography>

                  <Typography>
                    Maximum: {metrics.maximum?.toLocaleString() ?? "-"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ),
        )}
      </Grid>

      <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
        Employees by Country
      </Typography>

      <Grid container spacing={2}>
        {Object.entries(data.employees_by_country).map(([country, count]) => (
          <Grid key={country} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Typography color="text.secondary">{country}</Typography>

                <Typography variant="h6">{count.toLocaleString()}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Dashboard;
