import axios from "axios";
import React, { useState } from 'react';



const AddTicket = () => {
  const [formData, setFormData] = useState({
    username: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileno: '',
    department: '',
    designation: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? e.target.files : value,
    }));
  };

  function handleUserSubmit(event) {
    event.preventDefault();
    axios.post('https://localhost:7217/api/Tickets', formData)
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="container mt-5">
      <div className='text-center mb-9'>
        <h4>Add User</h4>
        
      </div>

      <form onSubmit={handleUserSubmit}>
        {/* Username */}
        <div className="row mb-3">
          <label htmlFor="username" className="col-sm-3 col-form-label text-end">
            Username:
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="Enter username"
              required
              onChange={handleInputChange}
            />
          </div>

          {/* Lastname */}
          <label htmlFor="lastname" className="col-sm-3 col-form-label text-end">
            Lastname:
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="lastname"
              name="lastname"
              placeholder="Enter lastname"
              required
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Email */}
        <div className="row mb-3">
          <label htmlFor="email" className="col-sm-3 col-form-label text-end">
            Email:
          </label>
          <div className="col-sm-3">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter email"
              required
              onChange={handleInputChange}
            />
          </div>

          {/* Mobile Number */}
          <label htmlFor="mobileno" className="col-sm-3 col-form-label text-end">
            Mobile Number:
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="mobileno"
              name="mobileno"
              placeholder="Enter mobile number"
              required
              onChange={handleInputChange}
            />
          </div>

        </div>

        {/* Password */}
        <div className="row mb-3">
          <label htmlFor="password" className="col-sm-3 col-form-label text-end">
            Password:
          </label>
          <div className="col-sm-3">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter password"
              required
              onChange={handleInputChange}
            />
          </div>

          {/* Confirm Password */}
          <label htmlFor="confirmPassword" className="col-sm-3 col-form-label text-end">
            Confirm Password:
          </label>
          <div className="col-sm-3">
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm password"
              required
              onChange={handleInputChange}
            />
          </div>
        </div>

        
        {/* Department */}
        <div className="row mb-3">
          
          <label htmlFor="department" className="col-sm-3 col-form-label text-end">
            Department:
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="department"
              name="department"
              placeholder="Enter department"
              required
              onChange={handleInputChange}
            />
          </div>
          {/* Designation */}
          <label htmlFor="designation" className="col-sm-3 col-form-label text-end">
            Designation:
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="designation"
              name="designation"
              placeholder="Enter designation"
              required
              onChange={handleInputChange}
            />
          </div>
        </div>

        
        

        <div className="row mb-3">
          <div className="col-sm-3"></div>
          <div className="col-sm-9 text-center">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTicket;
