"use client";
import { useEffect, useState } from "react";

export default function AdminActivityLogsPage() {
  const [logs, setLogs] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/activity-logs")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setLogs(data.logs);
        else setError(data.error || "Could not load logs.");
      })
      .catch(() => setError("Network error."));
  }, []);

  if (error) return <div className="gd-card"><div className="gd-card-body" style={{ color: "#ef4444" }}>{error}</div></div>;
  if (!logs) return <p style={{ color: "var(--gray-500)" }}>Loading…</p>;

  return (
    <div>
      <div className="section-label"><i className="fas fa-history" /> Activity Logs ({logs.length})</div>

      <div className="gd-card">
        <div className="gd-card-body">
          {logs.length === 0 ? (
            <p style={{ color: "var(--gray-500)" }}>No activity recorded yet. Actions like adding products, updating orders, and managing customers will show up here.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="atable">
                <thead>
                  <tr><th>Admin</th><th>Action</th><th>Details</th><th>Date</th></tr>
                </thead>
                <tbody>
                  {logs.map((l) => (
                    <tr key={l.id}>
                      <td>{l.admin_name}</td>
                      <td>{l.action}</td>
                      <td>{l.details || "—"}</td>
                      <td>{new Date(l.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
