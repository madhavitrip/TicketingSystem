import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message) => {
    // Logic to add a notification to the state
    setNotifications((prevNotifications) => [...prevNotifications, { id: Date.now(), message }]);
  };

  const removeNotification = (id) => {
    // Logic to remove a notification from the state
    setNotifications((prevNotifications) => prevNotifications.filter((notification) => notification.id !== id));
  };

  const value = {
    notifications,
    addNotification,
    removeNotification,
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired, // Include children in prop types as a required prop
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
