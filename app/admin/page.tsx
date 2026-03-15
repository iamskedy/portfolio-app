"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

const endpoints = [
  { method: "POST", path: "/api/admin", description: "Admin register / login with action, email, password" },
  { method: "GET", path: "/api/portfolio", description: "Pull the entire portfolio payload" },
  { method: "POST", path: "/api/portfolio", description: "Create content for a specific section" },
];

type StatusState = {
  type: "idle" | "loading" | "success" | "error";
  message?: string;
  payload?: Record<string, unknown>;
};

export default function AdminLoginPage() {
  const [action, setAction] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<StatusState>({ type: "idle" });

  const statusCopy = useMemo(() => {
    if (status.type === "loading") return "Talking to the admin endpoint...";
    if (status.type === "success") return status.message ?? "Success";
    if (status.type === "error") return status.message ?? "Something went wrong";
    return "Provide credentials to continue.";
  }, [status]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus({ type: "loading" });
    try {
      const response = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, email, password }),
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error ?? "Unable to reach admin service");
      }
      setStatus({
        type: "success",
        message: json.data ? "Admin ready for the dashboard" : "Action queued",
        payload: json.data,
      });
    } catch (error) {
      setStatus({ type: "error", message: (error as Error).message });
    }
  };

  return (
    <main className="page-shell admin-shell">
      <section className="section hero admin-hero">
        <div className="hero-content">
          <p className="eyebrow">Secure admin portal</p>
          <h1>Control the portfolio backend</h1>
          <p className="lead">
            Use the API endpoints to sync content, onboard new admins, and keep the story updated.
          </p>
          <div className="hero-actions">
            <Link className="btn outline" href="/">
              Return home
            </Link>
          </div>
        </div>
        <div className="hero-card admin-card">
          <p className="tiny">Quick links</p>
          {endpoints.map((endpoint) => (
            <div key={endpoint.path} className="endpoint-row">
              <span className="badge">{endpoint.method}</span>
              <div>
                <p className="muted">{endpoint.path}</p>
                <p className="tiny">{endpoint.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>Sign in / Register</h2>
          <p>Choose an action and submit the credentials tied to MongoDB admins.</p>
        </div>
        <form className="form-grid" onSubmit={handleSubmit}>
          <label className="form-control">
            <span>Action</span>
            <select value={action} onChange={(event) => setAction(event.target.value as "login" | "register")}>
              <option value="login">Login</option>
              <option value="register">Register</option>
            </select>
          </label>

          <label className="form-control">
            <span>Email</span>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </label>

          <label className="form-control">
            <span>Password</span>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </label>

          <button type="submit" className="btn primary">
            {action === "login" ? "Sign in" : "Create admin"}
          </button>
        </form>
        <p className={`feedback ${status.type}`}>{statusCopy}</p>
        {status.payload && (
          <div className="payload">
            <p className="tiny">Last response</p>
            <pre>{JSON.stringify(status.payload, null, 2)}</pre>
          </div>
        )}
      </section>
    </main>
  );
}
