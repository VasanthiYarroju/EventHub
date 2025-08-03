import React, { createContext, useState, useContext } from 'react';

// Create the context
const AuthContext = createContext(null);

// Create a Provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // The login function sets the state to true
  const login = () => {
    setIsLoggedIn(true);
  };

  // The logout function sets the state to false
  const logout = () => {
    setIsLoggedIn(false);
  };

  // The value that will be available to all children
  const value = { isLoggedIn, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create a custom hook to use the auth context easily
export const useAuth = () => {
  return useContext(AuthContext);
};