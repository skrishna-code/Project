
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://dummyjson.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.trim(),
            password,
            expiresInMins: 30,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials.");
      }

      const accessToken = data.accessToken || data.token;

      if (!accessToken || !data.id) {
        throw new Error("Login response is missing user information.");
      }

      login(accessToken, data.id);
      navigate("/profile", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to log in. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-container">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        {error && (
          <p className="message error" role="alert">
            {error}
          </p>
        )}

        <button className="submit-btn" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="auth-switch">
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </main>
  );
}
