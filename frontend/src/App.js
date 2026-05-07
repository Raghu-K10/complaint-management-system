import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        {/* 👇 FIRST PAGE */}
        <Route path="/" element={<Home />} />

        {/* 👇 LOGIN PAGE */}
        <Route path="/login" element={<Login />} />

        {/* 👇 OTHER PAGES */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />

      </Routes>
      <ToastContainer position="top-right" />
    </BrowserRouter>
  );
}

export default App;