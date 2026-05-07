import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Navbar() {
  const token = localStorage.getItem("token");

  const { darkMode, toggleTheme } =
    useContext(ThemeContext);

  let role = null;

  if (token) {
    const decoded = JSON.parse(
      atob(token.split(".")[1])
    );

    role = decoded.role;
  }

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminLogin");
    localStorage.removeItem("userLogin");

    window.location.href = "/";
  };

  return (
    <div
      style={{
        background: darkMode
          ? "#0f172a"
          : "#e2e8f0",

        padding: "18px 40px",

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        boxShadow:
          "0 4px 10px rgba(0,0,0,0.3)"
      }}
    >
      {/* LOGO */}
      <div
        style={{
          color: darkMode
            ? "white"
            : "black",

          fontSize: "24px",

          fontWeight: "bold"
        }}
      >
        CMS Portal
      </div>

      {/* MENU */}
      <div
        style={{
          display: "flex",

          gap: "25px",

          alignItems: "center"
        }}
      >
        <Link
          to="/"
          style={{
            color: darkMode
              ? "white"
              : "black",

            textDecoration: "none"
          }}
        >
          Home
        </Link>

        {/* USER MENU */}
        {role === "user" && (
          <>
            <Link
              to="/dashboard"
              style={{
                color: darkMode
                  ? "white"
                  : "black",

                textDecoration: "none"
              }}
            >
              Dashboard
            </Link>

            <Link
              to="/profile"
              style={{
                color: darkMode
                  ? "white"
                  : "black",

                textDecoration: "none"
              }}
            >
              Profile
            </Link>
          </>
        )}

        {/* ADMIN */}
        {role === "admin" && (
          <Link
            to="/admin"
            style={{
              color: darkMode
                ? "white"
                : "black",

              textDecoration: "none"
            }}
          >
            Admin Panel
          </Link>
        )}

        {/* LOGIN */}
        {!token && (
          <Link
            to="/login"
            style={{
              color: darkMode
                ? "white"
                : "black",

              textDecoration: "none"
            }}
          >
            Login
          </Link>
        )}

        {/* THEME BUTTON */}
        <button
          onClick={toggleTheme}
          style={{
            background: darkMode
              ? "#facc15"
              : "#0f172a",

            color: darkMode
              ? "black"
              : "white",

            border: "none",

            padding: "10px 15px",

            borderRadius: "8px",

            cursor: "pointer"
          }}
        >
          {darkMode
            ? "☀ Light"
            : "🌙 Dark"}
        </button>

        {/* LOGOUT */}
        {token && (
          <button
            onClick={logout}
            style={{
              background: "#ef4444",

              color: "white",

              border: "none",

              padding: "10px 18px",

              borderRadius: "8px",

              cursor: "pointer"
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;