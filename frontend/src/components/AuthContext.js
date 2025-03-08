import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Create the AuthProvider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if the user is already logged in (e.g., from localStorage)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify the token and fetch user data (you can add this logic later)
      setUser({ token });
    }
  }, []);

  // Login function
  const login = (token) => {
    localStorage.setItem('token', token); // Save the token to localStorage
    setUser({ token }); // Update the user state
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    setUser(null); // Clear the user state
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
