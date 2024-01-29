import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';



const EditTicket = () => {
  const [message, setMessage] = useState(null);
  const { ticketId } = useParams();
  setMessage('Ticket updated successfully!');
  const [formData, setFormData] = useState({
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

 

  useEffect(() => {
    axios.get(`https://localhost:7217/api/Tickets/${ticketId}`)
      .then(res => {
        setFormData(res.data);
      })
      .catch(err => console.log(err));
      setMessage('Error updating ticket. Please try again.');
  }, [ticketId]);

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
    axios.put(`https://localhost:7217/api/Tickets/${ticketId}`, formData)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="container mt-5">
      <h4>Edit Ticket</h4>

      {message && (
        <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`} role="alert">
          {message}
        </div>
      )}

      <form onSubmit={handleUserSubmit}>
        {/* TicketID */}
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
              value={formData.ticketId}
              required
              readOnly
            />
          </div>

          {/* Priority */}
          <label htmlFor="priority" className="col-sm-3 col-form-label text-end">
            Priority:
          </label>
          <div className="col-sm-3">
            <select
              className="form-select"
              id="priority"
              name="priority"
              value={formData.priority}
              required
              onChange={handleInputChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        {/* Title */}
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
              value={formData.title}
              required
              onChange={handleInputChange}
            />
          </div>
          {/* Department */}
          <label htmlFor="department" className="col-sm-3 col-form-label text-end">
            Department:
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="department"
              name="department"
              value={formData.department}
              required
              readOnly
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
              value={formData.ticketType}
              required
              onChange={handleInputChange}
            />
          </div>
          {/* Status */}
          <label htmlFor="status" className="col-sm-3 col-form-label text-end">
            Status:
          </label>
          <div className="col-sm-3">
            <select
              className="form-select"
              id="status"
              name="status"
              value={formData.status}
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

        {/* Project Type */}
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
              value={formData.userId}
              required
              readOnly
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
              value={formData.assignedTo}
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
              value={formData.projectType}
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
              value={formData.dueDate}
              required
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Description */}
        <div className="row mb-3">
          <label htmlFor="description" className="col-sm-3 col-form-label text-end">
            Description:
          </label>
          <div className="col-sm-9">
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
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
              Update Ticket
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditTicket;
