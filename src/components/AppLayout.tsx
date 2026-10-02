import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            ACME Salary Management
          </Typography>

          <Button color="inherit" component={Link} to="/">
            Dashboard
          </Button>

          <Button color="inherit" component={Link} to="/employees">
            Employees
          </Button>

          <Button color="inherit" component={Link} to="/salary-explorer">
            Salary Explorer
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Outlet />
      </Box>
    </>
  );
}

export default AppLayout;
