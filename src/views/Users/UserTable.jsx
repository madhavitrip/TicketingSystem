import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import $ from 'jquery';

const UserTable = ({ users }) => {
  const tableRef= useRef(null)
    useEffect(() =>{
      $(tableRef.current).DataTable();
    }, [])
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>User ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile Number</th>
          <th>Department</th>
          <th>Designation</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.userId}>
            <td>{user.userId}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.mobileNo}</td>
            <td>{user.departmentName}</td>
            <th>{user.roleName}</th>
            <td className="d-flex gap-3 text-primary">
              <Link >
                <i className="fa-solid fa-eye text-success"></i>
              </Link>
              <Link to={`../EditUser/${user.userId}`}><i className="fa-solid fa-pen-to-square"></i></Link>
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
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      mobileNo: PropTypes.string.isRequired,
      departmentName: PropTypes.string.isRequired,
      roleName: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default UserTable;
