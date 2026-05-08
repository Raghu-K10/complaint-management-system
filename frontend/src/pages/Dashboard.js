import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { ThemeContext } from "../context/ThemeContext";

function Dashboard() {
  const { darkMode } = useContext(ThemeContext);
  const [complaints, setComplaints] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchComplaints = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/complaint/my", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setComplaints(data);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const createComplaint = async () => {
    const token = localStorage.getItem("token");
    await fetch("http://localhost:5000/api/complaint/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description }),
    });
    setTitle("");
    setDescription("");
    toast.success("Complaint submitted");
    fetchComplaints();
  };

  const deleteComplaint = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:5000/api/complaint/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Complaint deleted");
    fetchComplaints();
  };

  // Professional Theme Variables
  const colors = {
    bg: darkMode ? "#0f172a" : "#f8fafc",
    sidebar: darkMode ? "#1e293b" : "#ffffff",
    card: darkMode ? "#1e293b" : "#ffffff",
    textPrimary: darkMode ? "#f8fafc" : "#1e293b",
    textSecondary: darkMode ? "#94a3b8" : "#64748b",
    accent: "#3b82f6",
    border: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: colors.bg,
        color: colors.textPrimary,
        fontFamily: "'Inter', system-ui, sans-serif",
        transition: "all 0.3s ease",
      }}
    >
      {/* SIDEBAR */}
      <div
        style={{
          width: "280px",
          background: colors.sidebar,
          borderRight: `1px solid ${colors.border}`,
          padding: "40px 24px",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "40px", color: colors.accent }}>
          CMS Portal
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {["📊 Dashboard", "📌 My Complaints", "👤 Profile", "⚙ Settings"].map((item, idx) => (
            <div
              key={idx}
              style={{
                padding: "12px 16px",
                borderRadius: "12px",
                cursor: "pointer",
                background: idx === 0 ? (darkMode ? "rgba(59,130,246,0.2)" : "#eff6ff") : "transparent",
                color: idx === 0 ? colors.accent : colors.textSecondary,
                fontWeight: idx === 0 ? "600" : "400",
                transition: "0.2s",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, padding: "48px", maxWidth: "1200px", margin: "0 auto" }}>
        <header style={{ marginBottom: "40px" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "800", letterSpacing: "-0.025em" }}>
            Complaint Dashboard
          </h1>
          <p style={{ color: colors.textSecondary, marginTop: "8px" }}>
            Manage and track your service requests in real-time.
          </p>
        </header>

        {/* STATS CARDS */}
        <div style={{ display: "flex", gap: "24px", marginBottom: "48px", flexWrap: "wrap" }}>
          {[
            { label: "Total Complaints", value: complaints.length, color: colors.accent },
            { label: "Pending", value: complaints.filter((c) => c.status === "Pending").length, color: "#ef4444" },
            { label: "Resolved", value: complaints.filter((c) => c.status === "Resolved").length, color: "#10b981" },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                background: colors.card,
                padding: "24px",
                borderRadius: "20px",
                flex: "1",
                minWidth: "200px",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)",
                border: `1px solid ${colors.border}`,
              }}
            >
              <h3 style={{ color: colors.textSecondary, fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {stat.label}
              </h3>
              <h1 style={{ fontSize: "2.25rem", fontWeight: "700", marginTop: "12px", color: stat.color }}>
                {stat.value}
              </h1>
            </div>
          ))}
        </div>

        {/* CREATE FORM */}
        <div
          style={{
            background: colors.card,
            padding: "32px",
            borderRadius: "20px",
            marginBottom: "48px",
            boxShadow: "0 20px 25px -5px rgba(0,0,0,0.05)",
            border: `1px solid ${colors.border}`,
          }}
        >
          <h2 style={{ marginBottom: "24px", fontSize: "1.25rem", fontWeight: "600" }}>Create New Complaint</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <input
              type="text"
              placeholder="What's the issue?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 18px",
                borderRadius: "12px",
                border: `1px solid ${colors.border}`,
                background: darkMode ? "#0f172a" : "#f8fafc",
                color: colors.textPrimary,
                outline: "none",
                fontSize: "1rem",
              }}
            />
            <textarea
              placeholder="Provide more details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 18px",
                height: "120px",
                borderRadius: "12px",
                border: `1px solid ${colors.border}`,
                background: darkMode ? "#0f172a" : "#f8fafc",
                color: colors.textPrimary,
                outline: "none",
                fontSize: "1rem",
                resize: "none",
              }}
            />
            <button
              onClick={createComplaint}
              style={{
                alignSelf: "flex-start",
                background: colors.accent,
                color: "white",
                border: "none",
                padding: "14px 28px",
                borderRadius: "12px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "transform 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
              onMouseLeave={(e) => (e.target.style.opacity = "1")}
            >
              Submit Complaint
            </button>
          </div>
        </div>

        {/* LIST SECTION */}
        <div>
          <h2 style={{ marginBottom: "24px", fontSize: "1.25rem", fontWeight: "600" }}>Recent Activity</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100%, 1fr))", gap: "20px" }}>
            {complaints.length === 0 && (
              <p style={{ color: colors.textSecondary, textAlign: "center", padding: "40px" }}>No complaints found.</p>
            )}
            {complaints.map((c) => (
              <div
                key={c._id}
                style={{
                  background: colors.card,
                  padding: "24px",
                  borderRadius: "16px",
                  border: `1px solid ${colors.border}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  transition: "transform 0.2s",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: "600" }}>{c.title}</h3>
                    <span
                      style={{
                        padding: "4px 12px",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        background: c.status === "Resolved" ? "#dcfce7" : "#fee2e2",
                        color: c.status === "Resolved" ? "#166534" : "#991b1b",
                      }}
                    >
                      {c.status}
                    </span>
                  </div>
                  <p style={{ color: colors.textSecondary, lineHeight: "1.5" }}>{c.description}</p>
                </div>
                <button
                  onClick={() => deleteComplaint(c._id)}
                  style={{
                    marginLeft: "20px",
                    background: "transparent",
                    color: "#ef4444",
                    border: "1px solid #fee2e2",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;