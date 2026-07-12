"use client";

import { useEffect, useState } from "react";

function initials(name = "") {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase() || "U";
}

function UserCard({ user }) {
  const [open, setOpen] = useState(false);
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function savePassword(e) {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    const res = await fetch(`/api/admin/users/${user.id}/password`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) return setMsg(data.error || "Failed");
    setMsg("✓ Password updated");
    setPw("");
    setTimeout(() => { setMsg(""); setOpen(false); }, 2500);
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-sm font-extrabold text-brand-600">
          {initials(user.name)}
        </span>
        <div className="min-w-0">
          <p className="truncate font-bold text-slate-900">{user.name}</p>
          <p className="truncate text-sm text-slate-500">{user.email}</p>
        </div>
        <span className={`ml-auto shrink-0 rounded-full px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wide ${
          user.role === "admin" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600"
        }`}>
          {user.role}
        </span>
      </div>

      {user.createdAt && (
        <p className="mt-3 text-xs text-slate-400">
          Joined {new Date(user.createdAt).toLocaleDateString()}
        </p>
      )}

      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="mt-4 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
        >
          Set new password
        </button>
      ) : (
        <form onSubmit={savePassword} className="mt-4 flex flex-wrap items-center gap-2">
          <input
            type="text"
            required
            minLength={6}
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="New password (min 6)"
            className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-50"
          />
          <button type="submit" disabled={busy} className="rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-brand-700 disabled:opacity-60">
            {busy ? "Saving…" : "Save"}
          </button>
          <button type="button" onClick={() => { setOpen(false); setMsg(""); }} className="rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-100">
            Cancel
          </button>
          {msg && <span className={`w-full text-xs font-semibold ${msg.startsWith("✓") ? "text-green-600" : "text-red-600"}`}>{msg}</span>}
        </form>
      )}
    </div>
  );
}

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((d) => { setUsers(d.users || []); setLoading(false); });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900">Users</h1>
      <p className="mt-1 text-slate-500">
        {users.length} registered {users.length === 1 ? "account" : "accounts"}. Reset a
        password when a customer requests it.
      </p>

      {loading ? (
        <p className="mt-10 text-slate-500">Loading…</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((u) => <UserCard key={u.id} user={u} />)}
          {users.length === 0 && <p className="text-slate-400">No users yet.</p>}
        </div>
      )}
    </div>
  );
}
