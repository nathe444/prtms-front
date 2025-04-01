import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/auth/Login";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import RequireAuth from "./components/CheckAuth";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col  items-center h-screen w-full">
        <Routes>
          <Route element={<RequireAuth/>}>
          <Route element={<Layout />}>
            <Route path="*" element={<NotFound />} />
            <Route path="/dashboard" element={<Dashboard/>}/>
          </Route>
          </Route>
          <Route path='/login' element={<LoginPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}
