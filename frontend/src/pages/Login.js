import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);

      const decoded = JSON.parse(
        atob(data.token.split(".")[1])
      );

      toast.success("Login successful");

      // ✅ ADMIN → ADMIN PANEL
      const adminTrying = localStorage.getItem("adminLogin");

if (adminTrying === "true") {

  if (decoded.role === "admin") {
    localStorage.removeItem("adminLogin");
    window.location.href = "/admin";
  } else {
    alert("Access Denied");
    localStorage.removeItem("adminLogin");
  }

} else {

  if (decoded.role === "admin") {
    window.location.href = "/admin";
  } else {
    window.location.href = "/dashboard";
  }

}

    } else {
      toast.error("Invalid email or password");
    }
  }; // ✅ YOU MISSED THIS

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a"
      }}
    >
      <div
        style={{
          width: "360px",
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)"
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "10px",
            color: "#1e293b"
          }}
        >
          Complaint Management System
        </h2>

        <p
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#64748b"
          }}
        >
          Welcome back 👋
        </p>

        <input
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          style={{
            marginBottom: "10px",
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />

        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          style={{
            marginBottom: "15px",
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "10px",
            background: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Login
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "15px"
          }}
        >
          Don’t have an account?{" "}
          <Link
            to="/register"
            style={{ color: "#3b82f6" }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;