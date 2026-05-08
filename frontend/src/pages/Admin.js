import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FONT_LINK = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
`;

const CSS = `
  :root {
    --bg-deep: #050609;
    --bg-surface: #0f111a;
    --accent: #00f2d3;
    --accent-dim: rgba(0, 242, 211, 0.1);
    --text-main: #f1f5f9;
    --text-dim: #94a3b8;
    --border: rgba(255, 255, 255, 0.06);
    --glass: rgba(15, 17, 26, 0.7);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .ad-root {
    display: flex;
    min-height: 100vh;
    background: var(--bg-deep);
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: var(--text-main);
    position: relative;
    overflow: hidden;
  }

  /* Grid Background */
  .ad-root::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: 
      radial-gradient(circle at 2px 2px, rgba(255,255,255,0.02) 1px, transparent 0);
    background-size: 24px 24px;
    pointer-events: none;
    z-index: 0;
  }

  .ad-glow {
    position: absolute;
    top: -10%;
    right: -5%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(0, 242, 211, 0.08) 0%, transparent 70%);
    pointer-events: none;
    filter: blur(60px);
  }

  /* ── Sidebar ── */
  .ad-sidebar {
    position: relative;
    z-index: 10;
    width: 280px;
    background: var(--bg-surface);
    border-right: 1px solid var(--border);
    padding: 32px 20px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .ad-sidebar-brand {
    padding: 0 12px 32px;
    font-weight: 800;
    font-size: 20px;
    color: var(--accent);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .ad-sidebar-title {
    font-size: 11px;
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--text-dim);
    margin: 12px 0 8px 12px;
  }

  .ad-nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 12px;
    color: var(--text-dim);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .ad-nav-item:hover {
    background: rgba(255, 255, 255, 0.03);
    color: var(--text-main);
    transform: translateX(4px);
  }

  .ad-nav-item.active {
    background: var(--accent-dim);
    color: var(--accent);
    box-shadow: inset 0 0 0 1px rgba(0, 242, 211, 0.2);
  }

  .ad-nav-logout {
    margin-top: auto;
    color: #ff5f5f;
    border: 1px solid rgba(255, 95, 95, 0.1);
  }

  .ad-nav-logout:hover {
    background: rgba(255, 95, 95, 0.1);
    border-color: rgba(255, 95, 95, 0.3);
  }

  /* ── Main Content ── */
  .ad-main {
    position: relative;
    z-index: 1;
    flex: 1;
    padding: 40px 60px;
    overflow-y: auto;
    height: 100vh;
    scroll-behavior: smooth;
  }

  .ad-header {
    margin-bottom: 40px;
    animation: fadeIn 0.6s ease-out;
  }

  .ad-eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    color: var(--accent);
    margin-bottom: 8px;
    display: block;
  }

  .ad-heading {
    font-size: 36px;
    font-weight: 800;
    letter-spacing: -0.03em;
  }

  /* ── Cards ── */
  .ad-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 24px;
    margin-bottom: 48px;
  }

  .ad-stat-card {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 28px;
    transition: transform 0.3s ease;
  }

  .ad-stat-card:hover {
    transform: translateY(-5px);
    border-color: rgba(255,255,255,0.12);
  }

  .ad-stat-label {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-dim);
    margin-bottom: 16px;
    display: block;
  }

  .ad-stat-value {
    font-size: 42px;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  /* ── Lists ── */
  .ad-item {
    background: var(--glass);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    margin-bottom: 16px;
    backdrop-filter: blur(12px);
    animation: slideIn 0.5s ease-out both;
  }

  .ad-item-title {
    font-size: 17px;
    font-weight: 700;
    margin-bottom: 6px;
  }

  .ad-item-desc {
    font-size: 14px;
    color: var(--text-dim);
    line-height: 1.6;
    max-width: 600px;
    margin-bottom: 12px;
  }

  .ad-meta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    padding: 6px 12px;
    background: rgba(255,255,255,0.04);
    border-radius: 6px;
    color: var(--text-dim);
  }

  /* ── Form Elements ── */
  .ad-select {
    background: #000;
    border: 1px solid var(--border);
    color: #fff;
    padding: 10px 16px;
    border-radius: 10px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    cursor: pointer;
    min-width: 140px;
  }

  .ad-search {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    color: white;
    padding: 14px 20px;
    border-radius: 14px;
    width: 100%;
    font-size: 15px;
    margin-bottom: 30px;
    transition: 0.3s;
  }

  .ad-search:focus {
    border-color: var(--accent);
    outline: none;
    box-shadow: 0 0 0 4px var(--accent-dim);
  }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideIn { 
    from { opacity: 0; transform: translateY(20px); } 
    to { opacity: 1; transform: translateY(0); } 
  }

  @media (max-width: 1024px) {
    .ad-main { padding: 30px; }
    .ad-sidebar { width: 240px; }
  }
`;

/* ─── SVG Icons ─────────────────────────────────────────────────────────── */
const IconChart = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>;
const IconList = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>;
const IconUsers = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IconTrash = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>;

function Admin() {
  const [complaints, setComplaints] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      if (decoded.role !== "admin") {
        toast.error("Access Denied");
        navigate("/");
        return;
      }
    } catch (e) { navigate("/login"); return; }
    fetchAllComplaints();
    fetchAllUsers();
  }, [navigate]);

  const fetchAllComplaints = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/complaint/all", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setComplaints(Array.isArray(data) ? data : []);
    } catch (error) { toast.error("Failed to load complaints"); }
  };

  const fetchAllUsers = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/auth/all-users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) { toast.error("Failed to load users"); }
    finally { setLoading(false); }
  };

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`http://localhost:5000/api/complaint/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status })
      });
      toast.success("Status updated");
      setComplaints(prev => prev.map(c => c._id === id ? { ...c, status } : c));
    } catch (error) { toast.error("Failed to update status"); }
  };

  const deleteComplaint = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`http://localhost:5000/api/complaint/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Complaint deleted");
      setComplaints(prev => prev.filter(c => c._id !== id));
    } catch (error) { toast.error("Failed to delete complaint"); }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Stats Logic
  const total = complaints.length;
  const pending = complaints.filter(c => c.status === "Pending").length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;
  
  const recentComplaints = [...complaints]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <>
      <style>{FONT_LINK}</style>
      <style>{CSS}</style>

      <div className="ad-root">
        <div className="ad-glow" />

        <aside className="ad-sidebar">
          <div className="ad-sidebar-brand">
            <div style={{width: 32, height: 32, background: 'var(--accent)', borderRadius: 8}}></div>
            Nexus Admin
          </div>
          
          <p className="ad-sidebar-title">Menu</p>
          <div className={`ad-nav-item ${activeTab === "overview" ? "active" : ""}`} onClick={() => setActiveTab("overview")}>
            <IconChart /> Analytics
          </div>
          <div className={`ad-nav-item ${activeTab === "manage" ? "active" : ""}`} onClick={() => setActiveTab("manage")}>
            <IconList /> Global Queue
          </div>
          <div className={`ad-nav-item ${activeTab === "users" ? "active" : ""}`} onClick={() => setActiveTab("users")}>
            <IconUsers /> User Directory
          </div>

          <div className="ad-nav-item ad-nav-logout" onClick={handleLogout} style={{marginTop: 'auto'}}>
            Logout System
          </div>
        </aside>

        <main className="ad-main">
          <header className="ad-header">
            <span className="ad-eyebrow">// Control Panel</span>
            <h1 className="ad-heading">
              {activeTab === "overview" ? "System Analytics" : activeTab === "manage" ? "Complaints Manager" : "User Database"}
            </h1>
          </header>

          {activeTab === "overview" && (
            <>
              <div className="ad-stats">
                <div className="ad-stat-card">
                  <span className="ad-stat-label">Total Volume</span>
                  <div className="ad-stat-value" style={{color: 'var(--accent)'}}>{total}</div>
                </div>
                <div className="ad-stat-card">
                  <span className="ad-stat-label">Pending</span>
                  <div className="ad-stat-value" style={{color: '#FFB432'}}>{pending}</div>
                </div>
                <div className="ad-stat-card">
                  <span className="ad-stat-label">Resolved</span>
                  <div className="ad-stat-value" style={{color: '#50C878'}}>{resolved}</div>
                </div>
              </div>

              <h2 style={{fontSize: '20px', marginBottom: '24px'}}>Recent Activity</h2>
              <div className="ad-list">
                {recentComplaints.map(c => (
                  <div key={c._id} className="ad-item">
                    <div>
                      <h3 className="ad-item-title">{c.title}</h3>
                      <p className="ad-item-desc">{c.description.substring(0, 100)}...</p>
                      <div className="ad-meta">{c.user?.email || "System User"}</div>
                    </div>
                    <div style={{textAlign: 'right'}}>
                       <div className="ad-meta" style={{background: 'var(--accent-dim)', color: 'var(--accent)'}}>{c.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "manage" && (
            <div className="ad-list">
              {complaints.map(c => (
                <div key={c._id} className="ad-item">
                  <div style={{flex: 1}}>
                    <h3 className="ad-item-title">{c.title}</h3>
                    <p className="ad-item-desc">{c.description}</p>
                    <div className="ad-meta">{c.user?.email}</div>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <select 
                      className="ad-select" 
                      value={c.status} 
                      onChange={(e) => updateStatus(c._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                    <button className="ad-btn-delete" onClick={() => deleteComplaint(c._id)} style={{
                      background: 'rgba(255,95,95,0.1)', border: '1px solid rgba(255,95,95,0.2)', color: '#ff5f5f', padding: '8px', borderRadius: '8px', cursor: 'pointer'
                    }}>
                      <IconTrash /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "users" && (
            <>
              <input 
                type="text" 
                className="ad-search" 
                placeholder="Filter users by name or identity..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="ad-list">
                {users.filter(u => u.email.includes(searchQuery)).map(u => (
                  <div key={u._id} className="ad-item">
                    <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                      <div style={{width: 40, height: 40, background: '#1e212e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px'}}>
                        {u.name?.[0] || 'U'}
                      </div>
                      <div>
                        <h3 className="ad-item-title">{u.name}</h3>
                        <div className="ad-meta">{u.email}</div>
                      </div>
                    </div>
                    <span className="ad-meta" style={{color: u.role === 'admin' ? 'var(--accent)' : 'inherit'}}>
                      {u.role === 'admin' ? 'SYSTEM ADMIN' : 'STANDARD USER'}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}

export default Admin;