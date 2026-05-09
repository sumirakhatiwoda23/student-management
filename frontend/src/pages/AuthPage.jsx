import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const REGISTER_FEATURES = [
  { icon: "🎓", title: "Student Management", desc: "Enroll, update, and track students in one place" },
  { icon: "📚", title: "20+ Courses", desc: "Access all available courses and manage enrollments" },
  { icon: "📊", title: "Analytics Dashboard", desc: "Real-time stats and insights at a glance" },
  { icon: "🔐", title: "Secure Access", desc: "Role-based permissions to protect your data" },
];

const LOGIN_FEATURES = [
  "Manage students effortlessly",
  "Role-based access control",
  "Real-time analytics dashboard",
  "Course enrollment tracking",
];

const AuthPage = () => {
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mode, setMode]         = useState("login");
  const [form, setForm]         = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (mode === "login") {
        if (!form.email.trim() || !form.password) {
          setError("Email and password are required");
          setLoading(false);
          return;
        }
        await login(form.email, form.password);
        navigate("/dashboard");
      } else {
        if (!form.name.trim()) { setError("Full name is required"); setLoading(false); return; }
        if (!form.email.trim()) { setError("Email address is required"); setLoading(false); return; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setError("Please enter a valid email address"); setLoading(false); return; }
        if (!form.password) { setError("Password is required"); setLoading(false); return; }
        if (form.password.length < 6) { setError("Password must be at least 6 characters"); setLoading(false); return; }
        if (form.password !== form.confirmPassword) { setError("Passwords do not match"); setLoading(false); return; }
        await register(form.name, form.email, form.password);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setError("");
    setForm({ name: "", email: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="auth-root">
      {/* Left Panel */}
      <div className="auth-left">
        <button className="auth-back" onClick={() => navigate("/")}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
            <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round"/>
          </svg>
          Back to Home
        </button>

        <div className="auth-left-content">
          <div className="auth-left-logo">
            <div className="logo-icon large">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1>Academia</h1>
            <p>Student Management System</p>
          </div>

          {mode === "login" ? (
            <div className="auth-left-features">
              {LOGIN_FEATURES.map((f) => (
                <div className="auth-feature" key={f}>
                  <span className="auth-feature-check">✓</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="auth-register-features">
              <p className="auth-register-features-title">What you get when you join:</p>
              {REGISTER_FEATURES.map((f) => (
                <div className="auth-register-feature" key={f.title}>
                  <div className="auth-register-feature-icon">{f.icon}</div>
                  <div>
                    <strong>{f.title}</strong>
                    <span>{f.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="auth-left-decoration">
          <div className="auth-blob blob1" />
          <div className="auth-blob blob2" />
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-right">
        <div className="auth-card-new">
          <div className="auth-card-header">
            <h2>{mode === "login" ? "Welcome back!" : "Create your account"}</h2>
            <p>{mode === "login" ? "Sign in to your Academia account" : "Join Academia and start managing students"}</p>
          </div>

          {/* Tabs */}
          <div className="auth-tabs-new">
            <button className={mode === "login" ? "active" : ""} onClick={() => switchMode("login")}>Sign In</button>
            <button className={mode === "register" ? "active" : ""} onClick={() => switchMode("register")}>Register</button>
            <div className="auth-tab-slider" style={{ transform: mode === "register" ? "translateX(100%)" : "translateX(0)" }} />
          </div>

          <form onSubmit={handleSubmit} noValidate className="auth-form-new">
            {mode === "register" && (
              <div className="auth-field">
                <label>Full Name</label>
                <div className="auth-input-wrap">
                  <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    autoComplete="name"
                    autoFocus
                  />
                </div>
              </div>
            )}

            <div className="auth-field">
              <label>Email Address</label>
              <div className="auth-input-wrap">
                <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  autoFocus={mode === "login"}
                />
              </div>
            </div>

            <div className="auth-field">
              <div className="auth-field-row">
                <label>Password</label>
                {mode === "login" && <a href="#" className="auth-forgot">Forgot password?</a>}
              </div>
              <div className="auth-input-wrap">
                <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder={mode === "register" ? "Minimum 6 characters" : "••••••••"}
                  autoComplete={mode === "register" ? "new-password" : "current-password"}
                />
                <button type="button" className="auth-toggle-pass" onClick={() => setShowPass(!showPass)}>
                  {showPass
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
              {mode === "register" && form.password && (
                <div className="password-strength">
                  <div className={`strength-bar ${form.password.length >= 6 ? (form.password.length >= 10 ? "strong" : "medium") : "weak"}`} />
                  <span className="strength-label">
                    {form.password.length >= 10 ? "Strong password" : form.password.length >= 6 ? "Medium password" : "Weak — min 6 characters"}
                  </span>
                </div>
              )}
            </div>

            {mode === "register" && (
              <div className="auth-field">
                <label>Confirm Password</label>
                <div className="auth-input-wrap">
                  <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <input
                    type={showConfirmPass ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                  />
                  <button type="button" className="auth-toggle-pass" onClick={() => setShowConfirmPass(!showConfirmPass)}>
                    {showConfirmPass
                      ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    }
                  </button>
                </div>
                {form.confirmPassword && form.password !== form.confirmPassword && (
                  <span className="form-error" style={{ marginTop: 4 }}>Passwords do not match</span>
                )}
                {form.confirmPassword && form.password === form.confirmPassword && form.password.length >= 6 && (
                  <span className="password-match">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
                      <polyline points="20 6 9 17 4 12" strokeLinecap="round"/>
                    </svg>
                    Passwords match
                  </span>
                )}
              </div>
            )}

            {error && (
              <div className="auth-error-new">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? (
                <><span className="spinner white" /> {mode === "login" ? "Signing in…" : "Creating account…"}</>
              ) : mode === "login" ? (
                <>Sign In <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round"/></svg></>
              ) : (
                <>Create Account <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round"/></svg></>
              )}
            </button>
          </form>

          {mode === "register" && (
            <p className="auth-terms">
              By creating an account you agree to our{" "}
              <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </p>
          )}

          <p className="auth-switch-new">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button onClick={() => switchMode(mode === "login" ? "register" : "login")}>
              {mode === "login" ? "Register for free" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;