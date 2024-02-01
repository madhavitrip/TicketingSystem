import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "src/context/UserContext";
import PropTypes from 'prop-types';

const PrivateRoute = ({ element }) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return element;
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default PrivateRoute;
