import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/auth/Login";
import Layout from "./Layout";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col  items-center h-screen w-full">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
            <Route path='/login' element={<LoginPage/>}/>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}
