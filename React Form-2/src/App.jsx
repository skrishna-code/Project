import { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("Invalid email format");
  const [passwordError, setPasswordError] = useState(
    "Password must be at least 8 characters"
  );
  const [confirmPasswordError, setConfirmPasswordError] = useState(
    "Passwords do not match"
  );

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);

  const validateEmail = (value) => {
    setEmail(value);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(value)) {
      setEmailValid(true);
      setEmailError("");
    } else {
      setEmailValid(false);
      setEmailError("Invalid email format");
    }
  };

  const validatePassword = (value) => {
    setPassword(value);

    if (value.length >= 8) {
      setPasswordValid(true);
      setPasswordError("");
    } else {
      setPasswordValid(false);
      setPasswordError("Password must be at least 8 characters");
    }

    if (confirmPassword !== value) {
      setConfirmPasswordValid(false);
      setConfirmPasswordError("Passwords do not match");
    } else if (value !== "" && confirmPassword !== "") {
      setConfirmPasswordValid(true);
      setConfirmPasswordError("");
    }
  };

  const validateConfirmPassword = (value) => {
    setConfirmPassword(value);

    if (value === password && value !== "") {
      setConfirmPasswordValid(true);
      setConfirmPasswordError("");
    } else {
      setConfirmPasswordValid(false);
      setConfirmPasswordError("Passwords do not match");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (emailValid && passwordValid && confirmPasswordValid) {
      alert("Form submitted successfully!");
    } else {
      alert("Can't submit the form");
    }
  };

  return (
    <div className="page">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => validateEmail(event.target.value)}
            className={emailValid ? "valid" : "invalid"}
          />

          {!emailValid && (
            <p className="error-message">{emailError}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => validatePassword(event.target.value)}
            className={passwordValid ? "valid" : "invalid"}
          />

          {!passwordValid && (
            <p className="error-message">{passwordError}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">
            Confirm Password:
          </label>

          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(event) =>
              validateConfirmPassword(event.target.value)
            }
            className={confirmPasswordValid ? "valid" : "invalid"}
          />

          {!confirmPasswordValid && (
            <p className="error-message">
              {confirmPasswordError}
            </p>
          )}
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default App;