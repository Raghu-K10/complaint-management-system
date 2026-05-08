import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import SubmitComplaint from "./pages/SubmitComplaint";
import TrackComplaint from "./pages/TrackComplaint";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemeProvider, { ThemeContext } from "./context/ThemeContext";
import { useContext } from "react";

function Footer() {
  const { darkMode } = useContext(ThemeContext);
  return (
    <footer style={{
      background: darkMode ? "#07080C" : "#f8fafc",
      color: darkMode ? "#A0A5B5" : "#64748b",
      textAlign: "center",
      padding: "16px 20px",
      borderTop: darkMode ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #e2e8f0",
      fontSize: "13px",
      fontFamily: "'Syne', sans-serif"
    }}>
      © 2026 CMS Portal. Secure complaint tracking for your community.
    </footer>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRoutes />
        <Footer />
        {/* Updated ToastContainer to match the Dark Glass UI 
        */}
        <ToastContainer 
          position="top-right" 
          autoClose={3000}
          theme="dark"
          toastStyle={{
            background: "rgba(12, 13, 19, 0.85)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "12px",
            color: "#E8E6E0",
            fontFamily: "'Syne', sans-serif",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)"
          }}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}

function parseTokenPayload(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

function AppRoutes() {
  const token = localStorage.getItem("token");
  const payload = token ? parseTokenPayload(token) : null;
  const isAdmin = payload?.role === "admin";
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            token ? (isAdmin ? <Navigate to="/admin" replace /> : <Home />) : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/login"
          element={
            token ? (isAdmin ? <Navigate to="/admin" replace /> : <Navigate to="/" replace />) : <Login />
          }
        />
        <Route
          path="/register"
          element={
            token ? (isAdmin ? <Navigate to="/admin" replace /> : <Navigate to="/" replace />) : <Register />
          }
        />
        <Route path="/dashboard" element={<Navigate to="/submit-complaint" replace />} />
        
        <Route
          path="/submit-complaint"
          element={token ? <SubmitComplaint /> : <Navigate to="/login" replace />}
        />
        
        <Route
          path="/track-complaint"
          element={token ? <TrackComplaint /> : <Navigate to="/login" replace />}
        />
        
        <Route 
          path="/profile" 
          element={token ? <Profile /> : <Navigate to="/login" replace />} 
        />
        
        <Route 
          path="/admin" 
          element={token && isAdmin ? <Admin /> : <Navigate to="/login" replace />} 
        />
      </Routes>
    </>
  );
}

export default App;