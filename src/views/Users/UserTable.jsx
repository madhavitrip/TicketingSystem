import React from "react";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserTable = ({ users }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>User ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Name</th>
          <th>Mobile Number</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.userId}>
            <td>{user.userId}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.name}</td>
            <td>{user.mobileNumber}</td>
            <td className="d-flex gap-3 text-primary">
              <Link><i className="fa-solid fa-eye text-success"></i></Link>
              <Link><i className="fa-solid fa-pen-to-square"></i></Link>
              <Link><i className="fa-solid fa-trash text-danger"></i></Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

UserTable.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      mobileNumber: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default UserTable;
