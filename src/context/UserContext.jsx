import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

// Helper function to retrieve user from local storage
const getUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
};

// Creating a context to manage user-related information
const UserContext = createContext();



// A provider component that wraps the entire application to provide user context
export const UserProvider = ({ children }) => {
  
  UserProvider.propTypes = {
    children: PropTypes.node.isRequired, // Add this line for 'children' prop validation
    value: PropTypes.any.isRequired,    // Add any other prop validations you may need
  };
  // Initialize user state using the helper function
  const [user, setUser] = useState(getUserFromLocalStorage());

  // Function to handle user login
  const login = (userData) => {
    setUser(userData);
    // Save user data to local storage for persistence
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Function to handle user logout
  const logout = () => {
    setUser(null);
    // Remove user data from local storage on logout
    localStorage.removeItem('user');
  };

  // Provide the user context to the entire application
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// A custom hook to easily access user context within components
export const useUser = () => {
  // Retrieve user context from the nearest UserProvider
  const context = useContext(UserContext);

  // Throw an error if useUser is not used within a UserProvider
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  // Return user context, including user data and login/logout functions
  return context;
};