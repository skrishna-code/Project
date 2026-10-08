import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../redux/authSlice";
import Header from "../components/Header";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.auth.accessToken);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (accessToken) {
      navigate("/profile");
    }
  }, [accessToken, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const {
      fullName,
      email,
      password,
      confirmPassword,
    } = formData;

    // Mandatory field validation
    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("Error: All the fields are mandatory");
      return;
    }

    // Password validation
    if (password !== confirmPassword) {
      setError("Error: Passwords do not match");
      return;
    }

    // Generate random access token
    const accessToken =
      Math.random().toString(36).substring(2) +
      Date.now().toString(36);

    const user = {
      fullName,
      email,
      password,
    };

    dispatch(
      signup({
        user,
        accessToken,
      })
    );

    setSuccess("Successfully Signed Up!");

    setTimeout(() => {
      navigate("/profile");
    }, 1000);
  };

  return (
    <div className="page">
      <Header />

      <main className="signup-container">
        <h1>Signup</h1>

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          {error && (
            <p className="error">
              {error}
            </p>
          )}

          {success && (
            <p className="success">
              {success}
            </p>
          )}

          <button type="submit">
            Signup
          </button>
        </form>
      </main>
    </div>
  );
}

export default Signup;