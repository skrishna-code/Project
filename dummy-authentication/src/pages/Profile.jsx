
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function formatLabel(key) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase());
}

function UserValue({ value }) {
  if (value === null || value === undefined || value === "") {
    return <span className="empty-value">Not available</span>;
  }

  if (Array.isArray(value)) {
    if (!value.length) return <span>None</span>;

    return (
      <ul className="profile-array">
        {value.map((item, index) => (
          <li key={index}>
            <UserValue value={item} />
          </li>
        ))}
      </ul>
    );
  }

  if (typeof value === "object") {
    return (
      <div className="nested-object">
        {Object.entries(value).map(([key, child]) => (
          <div className="nested-field" key={key}>
            <span className="field-label">{formatLabel(key)}</span>
            <UserValue value={child} />
          </div>
        ))}
      </div>
    );
  }

  if (typeof value === "boolean") {
    return <span>{value ? "Yes" : "No"}</span>;
  }

  return <span>{String(value)}</span>;
}

export default function Profile() {
  const navigate = useNavigate();
  const { token, userId, logout } = useAuth();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  const fetchProfile = useCallback(async (signal) => {
    if (!token || !userId) {
      navigate("/login", { replace: true });
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://dummyjson.com/users/${encodeURIComponent(userId)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal,
        }
      );

      if (!response.ok) {
        throw new Error(
          `Unable to fetch profile. Server returned ${response.status}.`
        );
      }

      const data = await response.json();

      if (!data?.id) {
        throw new Error("No user profile was returned.");
      }

      if (!signal.aborted) {
        setUser(data);
      }
    } catch (err) {
      if (err.name !== "AbortError" && !signal.aborted) {
        setError(err.message || "Unable to load profile.");
      }
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  }, [token, userId, navigate]);

  useEffect(() => {
    const controller = new AbortController();
    fetchProfile(controller.signal);

    return () => controller.abort();
  }, [fetchProfile, retry]);

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  if (loading) {
    return (
      <main className="state-container">
        <p>Loading profile...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="state-container">
        <h1>Unable to load profile</h1>
        <p className="message error">{error}</p>

        <button
          className="submit-btn"
          onClick={() => setRetry((value) => value + 1)}
        >
          Try Again
        </button>

        <button className="submit-btn" onClick={handleLogout}>
          Back to Login
        </button>
      </main>
    );
  }

  if (!user) return null;

  const fullName = [user.firstName, user.lastName]
    .filter(Boolean)
    .join(" ");

  return (
    <main className="profile-container">
      <div className="profile-header">
        <div>
          <h1>Profile</h1>
          <p>{fullName || user.username}</p>
        </div>

        {user.image && (
          <img
            className="profile-avatar"
            src={user.image}
            alt={`${fullName || "User"} avatar`}
          />
        )}
      </div>

      <section className="profile-grid">
        {Object.entries(user).map(([key, value]) => (
          <article className="profile-field" key={key}>
            <span className="field-label">{formatLabel(key)}</span>
            <UserValue value={value} />
          </article>
        ))}
      </section>

      <button
        className="submit-btn logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>
    </main>
  );
}
