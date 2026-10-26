
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [redirectIn, setRedirectIn] = useState(3);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess(false);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSuccess(true);
    setRedirectIn(3);

    let remaining = 3;

    const timer = setInterval(() => {
      remaining -= 1;
      setRedirectIn(remaining);

      if (remaining <= 0) {
        clearInterval(timer);
        navigate("/login", { replace: true });
      }
    }, 1000);
  }

  return (
    <main className="auth-container">
      <h1>Signup</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            autoComplete="name"
            required
            disabled={success}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
            disabled={success}
          />
        </div>

        <div className="form-group">
          <label htmlFor="signupPassword">Password</label>
          <input
            id="signupPassword"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
            disabled={success}
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            required
            disabled={success}
          />
        </div>

        {error && (
          <p className="message error" role="alert">{error}</p>
        )}

        {success && (
          <p className="message success" role="status">
            Signup form validated! Redirecting to Login in {redirectIn}...
          </p>
        )}

        <button
          className="submit-btn"
          type="submit"
          disabled={success}
        >
          {success ? "Please wait..." : "Signup"}
        </button>
      </form>

      <p className="auth-switch">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </main>
  );
}
