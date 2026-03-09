import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { trackLogin } from "../components/utils/trackLogin";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [allUser, setAllUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser && storedUser !== "undefined"
      ? JSON.parse(storedUser)
      : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const storedCurrentUser = localStorage.getItem("CurrentUser");
    return storedCurrentUser && storedCurrentUser !== "undefined"
      ? JSON.parse(storedCurrentUser)
      : null;
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(allUser));
  }, [allUser]);

  const register = (userData) => {
    const existingUser = allUser.find((u) => u.email === userData.email);

    if (existingUser) {
      alert("User with this email already exists");
      return;
    }

    setAllUser((prev) => [...prev, userData]);
  };

  const login = (userData) => {
    const existingUser = allUser.find(
      (u) => u.email === userData.email && u.password === userData.password,
    );

    if (existingUser) {
      trackLogin(existingUser);
      localStorage.setItem("CurrentUser", JSON.stringify(existingUser));
      setCurrentUser(existingUser);
      console.log("Login successful", existingUser);
      navigate("/event");
      return true;
    }

    return false;
  };

  const logout = () => {
    localStorage.removeItem("CurrentUser");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ allUser, login, register, logout, currentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
