"use client";
import { useEffect, useState } from "react";

const FIELDS = [
  { key: "store_name", label: "Store Name" },
  { key: "support_phone", label: "Support Phone" },
  { key: "support_email", label: "Support Email" },
  { key: "address", label: "Store Address" },
  { key: "delivery_slot_text", label: "Delivery Slot Text (shown in header)" },
  { key: "festive_banner_text", label: "Festive Banner Text (homepage)" },
];

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setSettings(data.settings);
        else setError(data.error || "Could not load settings.");
      })
      .catch(() => setError("Network error."));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    const data = await res.json();
    setSaving(false);
    if (data.ok) setSaved(true);
    else alert(data.error || "Could not save settings.");
  };

  if (error) return <div className="gd-card"><div className="gd-card-body" style={{ color: "#ef4444" }}>{error}</div></div>;
  if (!settings) return <p style={{ color: "var(--gray-500)" }}>Loading…</p>;

  return (
    <div>
      <div className="section-label"><i className="fas fa-building" /> Business Settings</div>

      <form onSubmit={handleSave} className="aform-card">
        {FIELDS.map((f) => (
          <div className="aform-group" key={f.key}>
            <label>{f.label}</label>
            <input
              type="text"
              value={settings[f.key] || ""}
              onChange={(e) => setSettings({ ...settings, [f.key]: e.target.value })}
            />
          </div>
        ))}

        {saved && <p style={{ color: "#10b981", fontSize: 13, marginBottom: 10 }}><i className="fas fa-check-circle" /> Settings saved successfully.</p>}
        <button type="submit" className="abtn abtn-primary" disabled={saving}>
          {saving ? "Saving…" : "Save Settings"}
        </button>
      </form>
    </div>
  );
}
