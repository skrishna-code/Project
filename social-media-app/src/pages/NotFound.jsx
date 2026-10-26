
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="page-container not-found">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>
        The page you are looking for does not exist.
      </p>

      <Link to="/" className="primary-link">
        Go to Home
      </Link>
    </main>
  );
};

export default NotFound;
