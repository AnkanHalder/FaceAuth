"use client"
import React, { createContext, useState } from "react";

export const LoginContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Define the context value object
  const contextValue = {
    user,
    setUser, // You can provide other context values here as needed
  };

  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
};

export default AuthProvider;
