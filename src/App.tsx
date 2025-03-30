import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col  items-center h-screen w-full">
        <nav className="p-4 bg-gray-200 w-full">
          <Link className="mr-4" to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}
