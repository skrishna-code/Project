
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated
    ? children
    : <Navigate to="/login" replace />;
}

function GuestRoute({ children }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated
    ? <Navigate to="/profile" replace />
    : children;
}

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <GuestRoute>
              <Signup />
            </GuestRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
