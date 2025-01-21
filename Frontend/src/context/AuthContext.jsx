import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [jwtToken, setJwtToken] = useState(localStorage.getItem("jwtToken"));

  const login = (token) => {
    setJwtToken(token);
    localStorage.setItem("jwtToken", token);
  };

  const logout = () => {
    setJwtToken(null);
    localStorage.removeItem("jwtToken");
  };

  return (
    <AuthContext.Provider value={{ jwtToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
