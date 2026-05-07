import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Home() {

  const { darkMode } =
    useContext(ThemeContext);

  return (

    <div
      style={{
        minHeight: "100vh",

        background: darkMode
          ? "linear-gradient(to right, #020617, #0f172a, #1e293b)"
          : "linear-gradient(to right, #dbeafe, #eff6ff, #ffffff)",

        color: darkMode
          ? "white"
          : "#0f172a",

        padding: "40px"
      }}
    >

      {/* TITLE */}
      <div
        style={{
          textAlign: "center",
          marginTop: "60px"
        }}
      >

        <h1
          style={{
            fontSize: "60px",
            fontWeight: "bold"
          }}
        >
          Complaint Management System
        </h1>

        <p
          style={{
            marginTop: "20px",
            fontSize: "28px",

            color: darkMode
              ? "#cbd5e1"
              : "#334155"
          }}
        >
          Manage complaints efficiently and track their status in real-time
        </p>

        {/* BUTTONS */}
        <div
          style={{
            marginTop: "35px"
          }}
        >

          <Link to="/login">

            <button
              style={{
                padding: "14px 30px",
                marginRight: "15px",

                background: "#3b82f6",

                color: "white",

                border: "none",

                borderRadius: "10px",

                cursor: "pointer",

                fontSize: "18px"
              }}
            >
              Login
            </button>

          </Link>

          <Link to="/register">

            <button
              style={{
                padding: "14px 30px",

                background: "transparent",

                color: darkMode
                  ? "white"
                  : "#0f172a",

                border: "1px solid #94a3b8",

                borderRadius: "10px",

                cursor: "pointer",

                fontSize: "18px"
              }}
            >
              Register
            </button>

          </Link>

        </div>

      </div>

      {/* FEATURE CARDS */}
      <div
        style={{
          display: "flex",

          justifyContent: "center",

          gap: "30px",

          marginTop: "90px",

          flexWrap: "wrap"
        }}
      >

        {/* SUBMIT */}
        <div

          onClick={() => {

            const token =
              localStorage.getItem("token");

            // NOT LOGGED IN
            if (!token) {

              localStorage.setItem(
                "userLogin",
                "true"
              );

              window.location.href =
                "/login";

              return;
            }

            const decoded =
              JSON.parse(
                atob(
                  token.split(".")[1]
                )
              );

            // ADMIN CANNOT SUBMIT
            if (
              decoded.role === "admin"
            ) {

              alert(
                "Admins cannot submit complaints"
              );

              return;
            }

            window.location.href =
              "/dashboard";

          }}

          style={{
            width: "280px",

            background: darkMode
              ? "#1e293b"
              : "white",

            padding: "35px",

            borderRadius: "16px",

            boxShadow:
              "0 10px 25px rgba(0,0,0,0.4)",

            cursor: "pointer"
          }}
        >

          <h2>
            📌 Submit Complaints
          </h2>

          <p
            style={{
              marginTop: "15px",

              color: darkMode
                ? "#e2e8f0"
                : "#334155"
            }}
          >
            Easily raise issues in seconds
          </p>

        </div>

        {/* TRACK STATUS */}
        <div

          onClick={() => {

            const token =
              localStorage.getItem("token");

            // NOT LOGGED IN
            if (!token) {

              localStorage.setItem(
                "userLogin",
                "true"
              );

              window.location.href =
                "/login";

              return;
            }

            const decoded =
              JSON.parse(
                atob(
                  token.split(".")[1]
                )
              );

            // ADMIN SHOULD NOT TRACK
            if (
              decoded.role === "admin"
            ) {

              alert(
                "Admins do not have complaint tracking"
              );

              return;
            }

            window.location.href =
              "/dashboard";

          }}

          style={{
            width: "280px",

            background: darkMode
              ? "#1e293b"
              : "white",

            padding: "35px",

            borderRadius: "16px",

            boxShadow:
              "0 10px 25px rgba(0,0,0,0.4)",

            cursor: "pointer"
          }}
        >

          <h2>
            📊 Track Status
          </h2>

          <p
            style={{
              marginTop: "15px",

              color: darkMode
                ? "#e2e8f0"
                : "#334155"
            }}
          >
            Monitor progress in real-time
          </p>

        </div>

        {/* ADMIN */}
        <div

          onClick={() => {

            localStorage.setItem(
              "adminLogin",
              "true"
            );

            window.location.href =
              "/login";

          }}

          style={{
            width: "280px",

            background: darkMode
              ? "#1e293b"
              : "white",

            padding: "35px",

            borderRadius: "16px",

            boxShadow:
              "0 10px 25px rgba(0,0,0,0.4)",

            cursor: "pointer"
          }}
        >

          <h2>
            👨‍💼 Admin Control
          </h2>

          <p
            style={{
              marginTop: "15px",

              color: darkMode
                ? "#e2e8f0"
                : "#334155"
            }}
          >
            Manage and resolve complaints
          </p>

        </div>

      </div>

    </div>
  );
}

export default Home;