import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message }) => {
  return <div className="notification">{message}</div>;
};

// Update prop type to allow string or array for message
Notification.propTypes = {
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
};

export default Notification;
