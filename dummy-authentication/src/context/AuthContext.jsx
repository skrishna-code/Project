
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () => localStorage.getItem("token")
  );

  const [userId, setUserId] = useState(
    () => localStorage.getItem("userId")
  );

  function login(accessToken, id) {
    localStorage.setItem("token", accessToken);
    localStorage.setItem("userId", String(id));

    setToken(accessToken);
    setUserId(String(id));
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    setToken(null);
    setUserId(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        isAuthenticated: Boolean(token && userId),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
