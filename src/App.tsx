import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/auth/Login";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import RequireAuth from "./components/CheckAuth";
import CreateStaff from "./pages/staff/CreateStaff";
import GetStaffs from "./pages/staff/GetStaffs";
import StaffDetail from "./pages/staff/StaffDetail";
import UpdateStaff from "./pages/staff/UpdateStaff";
import ChangeFirstPassword from "./pages/auth/ChangeFirstPassword";
import ChangePassword from "./pages/auth/ChangePassword";
import GetPersonalDetails from "./pages/staff/GetPersonalDetails";
import UpdatePersonalDetails from "./pages/staff/UpdatePersonalDetails";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col items-center h-screen w-full">
        <Routes>
          <Route element={<RequireAuth />}>
            <Route element={<Layout />}>
              {/* <Route path="*" element={<NotFound />} /> */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/staff/create" element={<CreateStaff />} />
              <Route path="/staffs" element={<GetStaffs />} />
              <Route path="/staff/:id" element={<StaffDetail />} />
              <Route path="/staff/:id/update" element={<UpdateStaff />} />
              <Route
                path="/staff/get-personal-details"
                element={<GetPersonalDetails />}
              />
              <Route
                path="/staff/update-personal-details"
                element={<UpdatePersonalDetails />}
              />
            </Route>
            <Route path="/staff/change-password" element={<ChangePassword />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/change-first-password"
            element={<ChangeFirstPassword />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}
