import React, { createContext, useState } from 'react';

export const AuthenticatedContext = createContext();

export const AuthenticatedProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  return (
    <AuthenticatedContext.Provider value={{ isAuthenticated, setIsAuthenticated, userId, setUserId }}>
      {children}
    </AuthenticatedContext.Provider>
  );
};