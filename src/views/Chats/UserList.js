// UserList.js
import React from "react";
import PropTypes from 'prop-types';
import { Col, ListGroup } from 'react-bootstrap'
import './UserList.css';


const UserList = ({ users,selectReceiver }) => {
  return (
    <Col md={3} className="user-list-container blue-bg">
      <h3>Users Online</h3>
      <ListGroup variant="flush">
      
        {users.map((user) => (
          <ListGroup.Item key={user.userId} action onClick={() => selectReceiver(user.userId)}className="user-list-item border-blue">
            {user.firstName}
          </ListGroup.Item>
        ))}
        </ListGroup>
      </Col>
  );
};
UserList.propTypes = {
    users: PropTypes.array.isRequired,
    selectReceiver: PropTypes.func.isRequired,
  };
export default UserList;