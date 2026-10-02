import { useEffect, useState } from "react";
import { Alert, Typography } from "@mui/material";

import Dashboard from "../components/Dashboard";
import { fetchDashboard, type DashboardData } from "../services/dashboardApi";

function DashboardPage() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboard()
      .then(setDashboard)
      .catch(() => {
        setError("Failed to load dashboard.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Typography>Loading dashboard...</Typography>;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!dashboard) {
    return null;
  }

  return <Dashboard data={dashboard} />;
}

export default DashboardPage;
