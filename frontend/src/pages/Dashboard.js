import React, {
  useEffect,
  useState,
  useContext
} from "react";

import { toast } from "react-toastify";

import { ThemeContext }
from "../context/ThemeContext";

function Dashboard() {

  const { darkMode } =
    useContext(ThemeContext);

  const [complaints, setComplaints] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  // FETCH COMPLAINTS
  const fetchComplaints = async () => {

    const token =
      localStorage.getItem("token");

    const res = await fetch(
      "http://localhost:5000/api/complaint/my",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await res.json();

    setComplaints(data);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // CREATE
  const createComplaint = async () => {

    const token =
      localStorage.getItem("token");

    await fetch(
      "http://localhost:5000/api/complaint/create",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({
          title,
          description
        })
      }
    );

    setTitle("");
    setDescription("");

    toast.success(
      "Complaint submitted"
    );

    fetchComplaints();
  };

  // DELETE
  const deleteComplaint = async (id) => {

    const token =
      localStorage.getItem("token");

    await fetch(
      `http://localhost:5000/api/complaint/delete/${id}`,
      {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    toast.success(
      "Complaint deleted"
    );

    fetchComplaints();
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
          width: "250px",

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
          CMS Portal
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
            📌 My Complaints
          </div>

          <div>
            👤 Profile
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
          Complaint Dashboard
        </h1>

        {/* STATS */}
        <div
          style={{
            display: "flex",

            gap: "20px",

            marginBottom: "30px",

            flexWrap: "wrap"
          }}
        >

          {/* TOTAL */}
          <div
            style={{
              background: darkMode
                ? "#1e293b"
                : "white",

              padding: "25px",

              borderRadius: "14px",

              width: "220px",

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

              borderRadius: "14px",

              width: "220px",

              boxShadow:
                "0 4px 12px rgba(0,0,0,0.1)"
            }}
          >

            <h3>
              Pending
            </h3>

            <h1>
              {
                complaints.filter(
                  (c) =>
                    c.status === "Pending"
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

              borderRadius: "14px",

              width: "220px",

              boxShadow:
                "0 4px 12px rgba(0,0,0,0.1)"
            }}
          >

            <h3>
              Resolved
            </h3>

            <h1>
              {
                complaints.filter(
                  (c) =>
                    c.status === "Resolved"
                ).length
              }
            </h1>

          </div>

        </div>

        {/* CREATE FORM */}
        <div
          style={{
            background: darkMode
              ? "#1e293b"
              : "white",

            padding: "25px",

            borderRadius: "14px",

            marginBottom: "30px",

            boxShadow:
              "0 4px 12px rgba(0,0,0,0.1)"
          }}
        >

          <h2>
            Create Complaint
          </h2>

          <input
            type="text"

            placeholder="Title"

            value={title}

            onChange={(e) =>
              setTitle(e.target.value)
            }

            style={{
              width: "100%",

              padding: "12px",

              marginTop: "15px",

              marginBottom: "15px",

              borderRadius: "8px",

              border:
                "1px solid #ccc"
            }}
          />

          <textarea
            placeholder="Description"

            value={description}

            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }

            style={{
              width: "100%",

              padding: "12px",

              height: "120px",

              borderRadius: "8px",

              border:
                "1px solid #ccc"
            }}
          />

          <button
            onClick={createComplaint}

            style={{
              marginTop: "20px",

              background: "#2563eb",

              color: "white",

              border: "none",

              padding: "12px 20px",

              borderRadius: "8px",

              cursor: "pointer"
            }}
          >
            Submit Complaint
          </button>

        </div>

        {/* COMPLAINTS */}
        <div>

          <h2>
            My Complaints
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
                  marginTop: "15px",

                  fontWeight: "bold",

                  color:
                    c.status === "Resolved"
                      ? "green"
                      : c.status ===
                        "Pending"
                      ? "red"
                      : "orange"
                }}
              >
                Status: {c.status}
              </p>

              <button
                onClick={() =>
                  deleteComplaint(c._id)
                }

                style={{
                  marginTop: "15px",

                  background: "#ef4444",

                  color: "white",

                  border: "none",

                  padding: "10px 18px",

                  borderRadius: "8px",

                  cursor: "pointer"
                }}
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
}

export default Dashboard;