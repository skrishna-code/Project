import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import Header from "../components/Header";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, accessToken } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="page">
      <Header />

      <main className="profile-container">
        <h1>Profile</h1>

        <div className="profile-details">
          <p>
            <strong>Full Name :</strong> {user.fullName}
          </p>

          <p>
            <strong>Email :</strong> {user.email}
          </p>

          <p>
            <strong>Password :</strong> {user.password}
          </p>
        </div>

        <button onClick={handleLogout}>
          Logout
        </button>
      </main>
    </div>
  );
}

export default Profile;