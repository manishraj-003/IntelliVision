import { createContext, useState } from "react";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  const [token, setToken] = useState(storedToken);
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);

  const login = (token: string, user: any) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
