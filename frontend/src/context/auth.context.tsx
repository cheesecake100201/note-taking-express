import React, { useState, createContext, useEffect } from "react";

export type AuthContextType = {
  isAuthenticated: boolean;
  authToken: string | null;
  login: (token: string) => Promise<any>;
  logout: () => Promise<any>;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  authToken: null,
  login: async (token: string) => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const storedAuth = localStorage.getItem("auth");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    storedAuth ? true : false
  );
  const [authToken, setAuthToken] = useState<string | null>(storedAuth);

  useEffect(() => {
    // Check if user is authenticated on page load

    console.log(storedAuth);
    if (storedAuth) {
      setIsAuthenticated(true);
      setAuthToken(storedAuth);
    }
  }, []);

  const login = async (token: string) => {
    // Save token to local storage
    localStorage.setItem("auth", token);
    setIsAuthenticated(true);
    setAuthToken(token);
  };

  const logout = async () => {
    // Remove token from local storage
    localStorage.removeItem("auth");
    setIsAuthenticated(false);
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, authToken }}>
      {children}
    </AuthContext.Provider>
  );
};
