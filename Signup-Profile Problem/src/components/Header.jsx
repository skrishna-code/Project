import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div>Header</div>

      <nav>
        <Link to="/">Signup</Link>
        <Link to="/profile">Profile</Link>
      </nav>
    </header>
  );
}

export default Header;