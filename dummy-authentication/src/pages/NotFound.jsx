
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="state-container">
      <h1>404 - Page Not Found</h1>
      <p>The page you requested does not exist.</p>
      <Link to="/login">Return to Login</Link>
    </main>
  );
}
