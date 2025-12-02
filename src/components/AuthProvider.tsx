import type { User } from "../types/auth";
import { useState, type ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";

// 2. Define props for the provider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
    // Add localStorage logic here
  };

  const logout = () => {
    setUser(null);
    // Clear localStorage here
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
