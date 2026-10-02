import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from "./components/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import EmployeesPage from "./pages/EmployeesPage";
import SalaryExplorerPage from "./pages/SalaryExplorerPage";
import AddEmployeePage from "./pages/AddEmployeePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/employees/new" element={<AddEmployeePage />} />
          <Route path="/salary-explorer" element={<SalaryExplorerPage />} />
          <Route path="/employees/new" element={<AddEmployeePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
