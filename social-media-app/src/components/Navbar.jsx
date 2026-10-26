
import { NavLink } from "react-router-dom";
import {
  House,
  Bell,
  Bookmark,
  UserRound,
} from "lucide-react";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="logo">
          TravelMedia.in
        </NavLink>

        <nav className="nav-icons">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-icon ${isActive ? "active" : ""}`
            }
            aria-label="Home"
            title="Home"
          >
            <House size={19} />
          </NavLink>

          <span
            className="nav-icon muted"
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell size={19} />
          </span>

          <span
            className="nav-icon muted"
            title="Saved posts"
            aria-label="Saved posts"
          >
            <Bookmark size={19} />
          </span>

          <span
            className="nav-icon muted"
            title="Profile"
            aria-label="Profile"
          >
            <UserRound size={19} />
          </span>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
