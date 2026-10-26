
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <header className="navbar">
      <Link className="navbar-brand" to="/">
        Header
      </Link>

      <nav className="navbar-links">
        {isAuthenticated ? (
          <>
            <Link to="/profile">Profile</Link>
            <button
              type="button"
              className="nav-logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
}
