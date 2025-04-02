import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/auth/Login";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import RequireAuth from "./components/CheckAuth";
import CreateStaff from "./pages/staff/CreateStaff";
import GetStaffs from "./pages/staff/GetStaffs";
import StaffDetail from "./pages/staff/StaffDetail";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col items-center h-screen w-full">
        <Routes>
          <Route element={<RequireAuth />}>
            <Route element={<Layout />}>
              <Route path="*" element={<NotFound />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/staff/create" element={<CreateStaff />} />
              <Route path="/staffs" element={<GetStaffs />} />
              <Route path="/staff/:id" element={<StaffDetail />} />
            </Route>
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}
