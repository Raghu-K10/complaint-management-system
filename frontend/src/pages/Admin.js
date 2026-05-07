import React, {
  useEffect,
  useState,
  useContext
} from "react";

import { toast } from "react-toastify";

import { ThemeContext }
from "../context/ThemeContext";

function Admin() {

  const { darkMode } =
    useContext(ThemeContext);

  const [complaints, setComplaints] =
    useState([]);

  // ADMIN PROTECTION
  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    const decoded = JSON.parse(
      atob(token.split(".")[1])
    );

    if (decoded.role !== "admin") {

      toast.error("Access Denied");

      window.location.href = "/";

      return;
    }

    fetchAllComplaints();

  }, []);

  // FETCH ALL
  const fetchAllComplaints =
    async () => {

    const token =
      localStorage.getItem("token");

    const res = await fetch(
      "http://localhost:5000/api/complaint/all",
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    const data =
      await res.json();

    setComplaints(data);
  };

  // UPDATE STATUS
  const updateStatus =
    async (id, status) => {

    const token =
      localStorage.getItem("token");

    await fetch(
      `http://localhost:5000/api/complaint/update/${id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`
        },

        body: JSON.stringify({
          status
        })
      }
    );

    toast.success(
      "Status updated"
    );

    fetchAllComplaints();
  };

  // DELETE
  const deleteComplaint =
    async (id) => {

    const token =
      localStorage.getItem("token");

    await fetch(
      `http://localhost:5000/api/complaint/delete/${id}`,
      {
        method: "DELETE",

        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    toast.success(
      "Complaint deleted"
    );

    fetchAllComplaints();
  };

  return (

    <div
      style={{
        display: "flex",

        minHeight: "100vh",

        background: darkMode
          ? "#0f172a"
          : "#f1f5f9"
      }}
    >

      {/* SIDEBAR */}
      <div
        style={{
          width: "260px",

          background: darkMode
            ? "#020617"
            : "#cbd5e1",

          color: darkMode
            ? "white"
            : "black",

          padding: "30px 20px"
        }}
      >

        <h2
          style={{
            marginBottom: "40px"
          }}
        >
          Admin Panel
        </h2>

        <div
          style={{
            display: "flex",

            flexDirection: "column",

            gap: "20px"
          }}
        >

          <div>
            📊 Dashboard
          </div>

          <div>
            📌 Complaints
          </div>

          <div>
            👥 Users
          </div>

          <div>
            ⚙ Settings
          </div>

        </div>
      </div>

      {/* MAIN */}
      <div
        style={{
          flex: 1,

          padding: "40px",

          color: darkMode
            ? "white"
            : "black"
        }}
      >

        <h1
          style={{
            marginBottom: "30px"
          }}
        >
          Complaint Analytics
        </h1>

        {/* STATS */}
        <div
          style={{
            display: "flex",

            gap: "20px",

            flexWrap: "wrap",

            marginBottom: "35px"
          }}
        >

          {/* TOTAL */}
          <div
            style={{
              background: darkMode
                ? "#1e293b"
                : "white",

              padding: "25px",

              width: "220px",

              borderRadius: "14px",

              boxShadow:
                "0 4px 12px rgba(0,0,0,0.1)"
            }}
          >

            <h3>
              Total Complaints
            </h3>

            <h1>
              {complaints.length}
            </h1>

          </div>

          {/* PENDING */}
          <div
            style={{
              background: darkMode
                ? "#1e293b"
                : "white",

              padding: "25px",

              width: "220px",

              borderRadius: "14px",

              boxShadow:
                "0 4px 12px rgba(0,0,0,0.1)"
            }}
          >

            <h3>
              Pending
            </h3>

            <h1
              style={{
                color: "red"
              }}
            >
              {
                complaints.filter(
                  (c) =>
                    c.status ===
                    "Pending"
                ).length
              }
            </h1>

          </div>

          {/* RESOLVED */}
          <div
            style={{
              background: darkMode
                ? "#1e293b"
                : "white",

              padding: "25px",

              width: "220px",

              borderRadius: "14px",

              boxShadow:
                "0 4px 12px rgba(0,0,0,0.1)"
            }}
          >

            <h3>
              Resolved
            </h3>

            <h1
              style={{
                color: "green"
              }}
            >
              {
                complaints.filter(
                  (c) =>
                    c.status ===
                    "Resolved"
                ).length
              }
            </h1>

          </div>

        </div>

        {/* COMPLAINTS */}
        <div>

          <h2>
            All Complaints
          </h2>

          {complaints.map((c) => (

            <div
              key={c._id}

              style={{
                background: darkMode
                  ? "#1e293b"
                  : "white",

                padding: "25px",

                borderRadius: "14px",

                marginTop: "20px",

                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.1)"
              }}
            >

              <h2>
                {c.title}
              </h2>

              <p
                style={{
                  marginTop: "10px"
                }}
              >
                {c.description}
              </p>

              <p
                style={{
                  marginTop: "12px"
                }}
              >
                <b>User:</b>
                {" "}
                {c.user?.email}
              </p>

              <p
                style={{
                  marginTop: "10px",

                  fontWeight: "bold",

                  color:
                    c.status ===
                    "Resolved"
                      ? "green"
                      : c.status ===
                        "Pending"
                      ? "red"
                      : "orange"
                }}
              >
                Status: {c.status}
              </p>

              {/* SELECT */}
              <select
                value={c.status}

                onChange={(e) =>
                  updateStatus(
                    c._id,
                    e.target.value
                  )
                }

                style={{
                  marginTop: "15px",

                  padding: "10px",

                  borderRadius: "8px"
                }}
              >

                <option value="Pending">
                  Pending
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Resolved">
                  Resolved
                </option>

              </select>

              <br />

              {/* DELETE */}
              <button
                onClick={() =>
                  deleteComplaint(c._id)
                }

                style={{
                  marginTop: "18px",

                  background: "#ef4444",

                  color: "white",

                  border: "none",

                  padding: "10px 18px",

                  borderRadius: "8px",

                  cursor: "pointer"
                }}
              >
                Delete Complaint
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Admin;