import axios from "axios";
import React, { useState, useEffect } from 'react';
import './AddUser.css';
import { Spinner, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const onClickViewUser = () => {
  window.location.href = './AllUsers';
}

const AddUser = () => {
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [Roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    autoGenPass: true,
    mobileNo: '',
    departmentName: '',
    role: '',
    address: '',
    dateOfBirth: '',
    profilePicturePath: null,
  });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const response = await axios.get('https://localhost:7217/api/Departments');
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    }

    fetchDepartments();
  }, []);

  useEffect(() => {
    async function fetchRoles() {
      try {
        const response = await axios.get('https://localhost:7217/api/Roles');
        setRoles(response.data);
      } catch (error) {
        console.error('Error fetching Roles:', error);
      }
    }

    fetchRoles();
  }, []);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? e.target.files : value,
    }));
  };

  

  function handleUserSubmit(event) {
    event.preventDefault();
    setLoading(true);
    console.log(formData);

    // Validate Date of Birth
    const currentDate = new Date().toISOString().split('T')[0];
    if (formData.dateOfBirth > currentDate) {
      setMessage('Date of Birth must be smaller than the current date.');
      return;
    }

    axios.post('https://localhost:7217/api/Users', formData)
      .then(res => {
        console.log(res)
        setMessage('User added successfully!');
        setLoading(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          autoGenPass: true,
          mobileNo: '',
          departmentName: '',
          role: '',
          address: '',
          dateOfBirth: '',
          profilePicturePath: null,
        });
        // Redirect to the notification page after user is added
        navigate(`/Users/AddPermissions/${res.data.userId}`);
      })
      .catch(err => {
        console.log(err);
        if (err.response && err.response.status === 409) {
          setMessage('Error: Email already in use. Please choose a different email.');
        } else {
          setMessage('Error adding User. Please try again.');
        }
        setLoading(false);
      });
  }

  return (
    <div className=" au container mt-2">
      <div className='text-start mb-12 d-flex justify-content-between'>
        {/* <h4>Add User</h4>
        <button type="button" className="btn btn-primary mb-3 " onClick={onClickViewUser}>
          View Users
        </button> */}
      </div>

      {message && (
        <div className= {`alert ${message.includes('successfully')? 'alert-success' : 'alert-danger'}`} role="alert">
          {message}
        </div>
      )}

<form onSubmit={handleUserSubmit}>
  {/* FirstName */}
  <div className="row mb-3">
    <div className="col-sm-6">
      <Col>
      <label htmlFor="firstName" className="form-label">
        First Name:<span className="text-danger"> *</span>
      </label>
      </Col>
      <Col>
      <input
        type="text"
        className="form-control"
        id="firstName"
        name="firstName"
        placeholder="Enter First Name"
        required
        onChange={handleInputChange}
      />
      </Col>
      
     
    </div>
  </div>

  {/* LastName */}
  <div className="row mb-3">
    <div className="col-sm-6">
      <label htmlFor="lastName" className="form-label">
        Last Name<span className="text-danger"> *</span>
      </label>
      <input
        type="text"
        className="form-control"
        id="lastName"
        name="lastName"
        placeholder="Enter Last Name"
        required
        onChange={handleInputChange}
      />
    </div>
  </div>

  {/* Mobile Number */}
  <div className="row mb-3">
    <div className="col-sm-6">
      <label htmlFor="mobileNo" className="form-label">
        Mobile Number<span className="text-danger"> *</span>
      </label>
      <input
        type="text"
        className="form-control"
        id="mobileNo"
        name="mobileNo"
        placeholder="Enter Mobile Number"
        required
        onChange={handleInputChange}
      />
    </div>
  </div>

  {/* Address */}
  <div className="row mb-3">
    <div className="col-sm-6">
      <label htmlFor="address" className="form-label">
        Address<span className="text-danger"> *</span>
      </label>
      <input
        type="text"
        className="form-control"
        id="address"
        name="address"
        placeholder="Enter Address"
        required
        onChange={handleInputChange}
      />
    </div>
  </div>

  {/* Date of Birth */}
  <div className="row mb-3">
    <div className="col-sm-6">
      <label htmlFor="dateOfBirth" className="form-label">
        Date of Birth<span className="text-danger"> *</span>
      </label>
      <input
        type="date"
        className="form-control"
        id="dateOfBirth"
        name="dateOfBirth"
        placeholder="Enter Date Of Birth"
        required
        onChange={handleInputChange}
      />
    </div>
  </div>

  {/* Email */}
  <div className="row mb-3">
    <div className="col-sm-6">
      <label htmlFor="email" className="form-label">
        Email<span className="text-danger"> *</span>
      </label>
      <input
        type="text"
        className="form-control"
        id="email"
        name="email"
        placeholder="Enter Email"
        required
        onChange={handleInputChange}
      />
    </div>
  </div>

  {/* Department */}
  <div className="row mb-3">
    <div className="col-sm-6">
      <label htmlFor="departmentName" className="form-label">
        Department<span className="text-danger"> *</span>
      </label>
      <select
        className="form-select"
        id="departmentName"
        name="departmentName"
        required
        onChange={handleInputChange}
      >
        <option value="">Select Department</option>
        {departments.map((dep) => (
          <option key={dep.id} value={dep.departmentName}>
            {dep.departmentName}
          </option>
        ))}
      </select>
    </div>
  </div>

  {/* Designation */}
  <div className="row mb-3">
    <div className="col-sm-6">
      <label htmlFor="role" className="form-label">
        Designation<span className="text-danger"> *</span>
      </label>
      <select
        className="form-select"
        id="role"
        name="role"
        required
        onChange={handleInputChange}
      >
        <option value="">Select Designation</option>
        {Roles.map((role) => (
          <option key={role.roleId} value={role.role}>
            {role.role}
          </option>
        ))}
      </select>
    </div>
  </div>

  <div className="row mb-3">
    <div className="col-sm-6 text-end">
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? (
          <>
            <Spinner animation="border" size="sm" /> Adding User...
          </>
        ) : (
          'Add User'
        )}
      </button>
    </div>
  </div>
</form>;

    </div>
  );
};

export default AddUser;
