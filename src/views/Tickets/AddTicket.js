import axios from "axios";
import React, { useState } from 'react';



const onClickViewTicket = () => {
  window.location.href = './ViewAllTickets';
}

const AddTicket = () => {
  const initialFormData = {
    ticketId: '',
    userId: '',
    priority: 'low',
    title: '',
    department: '',
    ticketType: '',
    status: 'Active',
    projectType: '',
    dueDate: '',
    description: '',
    assignedTo: '',
  };


  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? e.target.files : value,
    }));
  };

  function handleUserSubmit(event) {
    event.preventDefault();
    const currentDate = new Date().toISOString().split('T')[0];
    if (formData.dueDate < currentDate) {
      setMessage('Due Date must be greater than or equal to the current date.');
      return;
    }


    axios.post('https://localhost:7217/api/Tickets', formData)
      .then(res => {
        console.log(res)
        setMessage('Ticket added successfully!');
        setFormData({
          ticketId: '',
          userId: '',
          priority: 'low',
          title: '',
          department: '',
          ticketType: '',
          status: 'Active',
          projectType: '',
          dueDate: '',
          description: '',
          assignedTo: '',
        });

      }).catch(err => console.log(err))
    setMessage('Error adding ticket. Please try again.');

  }

  return (
    <div className="container mt-5">
      <div className='d-flex justify-content-between'>
        <h4>Add Ticket</h4>

        <button type="button" className="btn btn-primary mb-3 " onClick={onClickViewTicket}>
          View Tickets
        </button>
      </div>

      {message && (
        <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`} role="alert">
          {message}
        </div>
      )}

      <form onSubmit={handleUserSubmit}>
        {/* ticketId */}
        <div className="row mb-3">
          <label htmlFor="ticketId" className="col-sm-3 col-form-label text-end">
            Ticket ID:
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="ticketId"
              name="ticketId"
              placeholder="Ticket ID"
              required
              onChange={handleInputChange}
            />
          </div>

          {/* priority */}
          <label htmlFor="priority" className="col-sm-3 col-form-label text-end">
            Priority:
          </label>
          <div className="col-sm-3">
            <select
              className="form-select"
              id="priority"
              name="priority"
              placeholder="Select priority"
              required
              onChange={handleInputChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        {/* title */}
        <div className="row mb-3">
          <label htmlFor="title" className="col-sm-3 col-form-label text-end">
            Title:
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              placeholder="Enter title"
              required
              onChange={handleInputChange}
            />
          </div>
          {/* department */}
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
        </div>

        {/* Ticket Type */}
        <div className="row mb-3">
          <label htmlFor="ticketType" className="col-sm-3 col-form-label text-end">
            Ticket Type:
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="ticketType"
              name="ticketType"
              placeholder="Enter Ticket Type"
              required
              onChange={handleInputChange}
            />
          </div>
          {/* status */}
          <label htmlFor="status" className="col-sm-3 col-form-label text-end">
            Status:
          </label>
          <div className="col-sm-3">
            <select
              className="form-select"
              id="status"
              name="status"
              placeholder="Select status"
              required
              onChange={handleInputChange}
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Unassigned">Unassigned</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Creator ID */}
        <div className="row mb-3">
          <label htmlFor="userId" className="col-sm-3 col-form-label text-end">
            CreatorID:
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="userId"
              name="userId"
              placeholder="Enter CreatorID"
              required
              onChange={handleInputChange}
            />
          </div>



          {/* Assigned To */}
          <label htmlFor="assignedTo" className="col-sm-3 col-form-label text-end">
            Assigned To:
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="assignedTo"
              name="assignedTo"
              placeholder="Enter Assignee Id"
              required
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* Project Type */}
        <div className="row mb-3">
          <label htmlFor="projectType" className="col-sm-3 col-form-label text-end">
            Project Type:
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="projectType"
              name="projectType"
              placeholder="Enter Project Type"
              required
              onChange={handleInputChange}
            />
          </div>






          {/* Due Date */}
          <label htmlFor="dueDate" className="col-sm-3 col-form-label text-end">
            Due Date:
          </label>
          <div className="col-sm-3">
            <input
              type="date"
              className="form-control"
              id="dueDate"
              name="dueDate"
              placeholder="Select Due Date"
              required
              onChange={handleInputChange}
            />
          </div>

        </div>

        {/* description */}
        <div className="row mb-3">
          <label htmlFor="description" className="col-sm-3 col-form-label text-end">
            Description:
          </label>
          <div className="col-sm-9">
            <textarea
              className="form-control"
              id="description"
              name="description"
              placeholder="Enter description"
              rows="4"
              required
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>

        {/* Attachments */}
        <div className="row mb-3">
          <label htmlFor="attachments" className="col-sm-3 col-form-label text-end">
            Attachments:
          </label>
          <div className="col-sm-9">
            <input
              type="file"
              className="form-control"
              id="attachments"
              name="attachments"
              multiple
              onChange={handleInputChange}
            />

          </div>


        </div>

        <div className="row mb-3">
          <div className="col-sm-3"></div>
          <div className="col-sm-9 text-end">
            <button type="submit" className="btn btn-primary">
              Add Ticket
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTicket;
