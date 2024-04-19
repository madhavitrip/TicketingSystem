import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useUser } from './../../context/UserContext';
import { Spinner } from 'react-bootstrap';
import { Form, useNavigate } from "react-router-dom";
import Select from 'react-select';
import addNotification from "react-push-notification";
import greentick from './images/greentick.jpg';
// import NotificationService from '../Nots/NotificationService';
import * as signalR from '@microsoft/signalr'; // Import SignalR


const dashboardapi = process.env.REACT_APP_MY_SERVER;
const userapi = process.env.REACT_APP_API_USERS;
const TicketTypeapi = process.env.REACT_APP_API_TICKETTYPE;
const ProjectTypeapi = process.env.REACT_APP_API_PROJECTTYPE;
const Ticketapi = process.env.REACT_APP_API_TICKET;

const AddTicket = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [ticketType, setTicketType] = useState([]);
  const [projectType, setProjectType] = useState([]);
  const [Assignee, setAssignee] = useState([]);
  const [formData, setFormData] = useState({
    email: user.email,
    priority: 'low',
    title: '',
    departmentId: '',
    ticketTypeId: '',
    status: 'Open',
    projectId: '',
    dueDate: '',
    description: '',
    assigneeEmail: '',
    attachments: null
  });
  const [message, setMessage] = useState(null);
  // const [hubConnection, setHubConnection] = useState(null); // State for SignalR connection

  const ClickToNotify = () => {


    addNotification({
      title: 'Ticket',
      message: 'New ticket has been assigned',
      duration: 11000,
      icon: greentick,
      native: true,
      onClick: () => window.location = `${dashboardapi}`,

    });
  }

  // useEffect(() => {
  //   // Initialize SignalR connection
  //   const connection = new signalR.HubConnectionBuilder()
  //     .withUrl('https://localhost:7217/notificationHub/')
  //     .build();

  //   setHubConnection(connection);

  //   connection
  //     .start()
  //     .then(() => console.log('SignalR Connected'))
  //     .catch((error) => console.error('SignalR Connection Error: ', error));

  //   return () => {
  //     connection.stop();
  //   };
  // }, []);


  useEffect(() => {
    async function fetchAssignee() {
      try {
        const response = await axios.get(userapi);
        setAssignee(response.data);
      } catch (error) {
        console.error('Error fetching Assignee:', error);
      }
    }

    fetchAssignee();
  }, []);

  useEffect(() => {
    async function fetchTickettype() {
      try {
        const response = await axios.get(TicketTypeapi);
        setTicketType(response.data);
      } catch (error) {
        console.error('Error fetching Ticket Type:', error);
      }
    }
    console.log('Ticket Type:', ticketType);
    fetchTickettype();
  }, []);

  useEffect(() => {
    console.log('Ticket Type:', ticketType); // Moved inside the useEffect
  }, [ticketType]); // Added ticketType to the dependency array

  useEffect(() => {
    async function fetchProjecttype() {
      try {
        const response = await axios.get(ProjectTypeapi);
        setProjectType(response.data);
      } catch (error) {
        console.error('Error fetching Project Type:', error);
      }
    }

    fetchProjecttype();
  }, []);

  // Modify handleInputChange function
  const handleInputChange = (e) => {
    const { name, value } = e.target || e;

    if (name === 'assigneeEmail') {
      const selectedAssignee = Assignee.find(assignee => assignee.email === value);
      console.log(selectedAssignee);
      const isSelfAssign = value.toLowerCase() === user.email.toLowerCase();
      const newDepartment = isSelfAssign ? selectedAssignee.departmentName : (selectedAssignee?.departmentName || '');

      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        departmentId: selectedAssignee?.departmentId || '', // Update departmentId as well
        department: newDepartment,
        status: isSelfAssign ? 'Self-Assigned' : 'Open',
      }));
      console.log(formData.departmentId)
    } else if (name === 'departmentId') {
      setFormData((prevData) => ({
        ...prevData,
        departmentId: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };


  // ...

  // Modify useEffect function for handling assignee changes
  useEffect(() => {
    const selectedAssignee = Assignee.find((assignee) => assignee.email === formData.assigneeEmail);
    const isSelfAssign = formData.assigneeEmail.toLowerCase() === user.email.toLowerCase();
    const newDepartment = isSelfAssign ? selectedAssignee.departmentname : (selectedAssignee?.departmentname || '');

    setFormData((prevData) => ({
      ...prevData,
      department: newDepartment,
      status: isSelfAssign ? 'Self-Assigned' : 'Open',
    }));
  }, [formData.assigneeEmail, Assignee, user]);


  const handleFileChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      attachments: e.target.files
    }));
  };

  const handleTicketSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formattedParams = Object.entries(formData)
    .filter(([key, value]) => key !== 'department') // Exclude departmentName
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'attachments') {
        if (value) {
          for (let i = 0; i < value.length; i++) {
            formDataToSend.append('attachments', value[i]);
          }
        }
      } else {
        formDataToSend.append(key, value);
      }
    });

    try {
      const res = await axios.post(`${Ticketapi}?${formattedParams}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(res);
      setMessage('Ticket added successfully!');
      setLoading(false);

      // Send notification using SignalR after successful ticket addition
      //  if (hubConnection) {
      //   hubConnection.invoke('SendTicketAssignmentNotification', formData.assigneeEmail, `New ticket added: ${formData.title}`);
      // }
      ClickToNotify();


      setFormData({
        email: user.email,
        priority: 'low',
        title: '',
        departmentId: '',
        ticketTypeId: '',
        status: 'Open',
        projectId: '',
        dueDate: '',
        description: '',
        assigneeEmail: '',
        attachments: null
      });
      navigate(`/Tickets/AddTicket/${res.data.userId}`);
    } catch (err) {
      console.error(err);
      setMessage('Error adding ticket. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className='d-flex justify-content-between'></div>

      {message && (
        <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`} role="alert">
          {message}
        </div>
      )}

      <form onSubmit={handleTicketSubmit}>
        {/* ticketId */}
        <div className="row mb-3">

          <label htmlFor="email" className="col-sm-3 col-form-label text-end">
            Creator
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your Email"
              required
              value={user.email}
              onChange={handleInputChange}
              disabled
            />

          </div>

          {/* priority */}
          <label htmlFor="assigneeEmail" className="col-sm-3 col-form-label text-end">
            Assignee Email<span className="text-danger"> * </span>
          </label>
          <div className="col-sm-3">
            <Select
              options={Assignee.map((Setas) => ({
                label: Setas.email,
                value: Setas.email,
              }))}
              value={{
                label: formData.assigneeEmail,
                value: formData.assigneeEmail,
              }}
              onChange={(selectedOption) =>
                handleInputChange({
                  target: { name: 'assigneeEmail', value: selectedOption.value },
                })
              }
              isSearchable
              placeholder="Select Assignee"
            />
          </div>
        </div>

        {/* title */}
        <div className="row mb-3">
          <label htmlFor="title" className="col-sm-3 col-form-label text-end">
            Title<span className="text-danger"> * </span>
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
          <label htmlFor="priority" className="col-sm-3 col-form-label text-end">
            Priority<span className="text-danger"> * </span>
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
              <option defaultValue>Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        {/* Ticket Type */}
        <div className="row mb-3">
          <label htmlFor="ticketTypeId" className="col-sm-3 col-form-label text-end">
            Ticket Type<span className="text-danger"> * </span>
          </label>
          <div className="col-sm-3">
            <Select
              options={ticketType.map((TT) => ({
                label: TT.ticketType,
                value: TT.ticketTypeId,
              }))}
              value={formData.ticketTypeId ? { label: ticketType.find(t => t.ticketTypeId === formData.ticketTypeId).ticketType, value: formData.ticketTypeId } : null}
              onChange={(selectedOption) =>
                handleInputChange({
                  target: { name: 'ticketTypeId', value: selectedOption.value },
                })
              }
              isSearchable
              placeholder="Select Ticket Type"
            />
          </div>
          {/* status */}
          <label htmlFor="status" className="col-sm-3 col-form-label text-end">
            Status
          </label>
          <div className="col-sm-3">
            <input
              className="form-control"
              id="status"
              name="status"
              value={formData.status}
              required
              onChange={handleInputChange}
              readOnly
              disabled
            />
          </div>
        </div>


        {/* Project Type */}
        <div className="row mb-3">

          <label htmlFor="projectId" className="col-sm-3 col-form-label text-end">
            Project Type<span className="text-danger"> * </span>
          </label>
          <div className="col-sm-3">
            <Select
              options={projectType.map((pt) => ({
                label: pt.projectTypes,
                value: pt.projectId,
              }))}
              value={formData.projectId ? { label: projectType.find((pt) => pt.projectId === formData.projectId).projectTypes, value: formData.projectId } : null}
              onChange={(selectedOption) => handleInputChange
                ({
                  target: { name: 'projectId', value: selectedOption.value }
                })}
              isSearchable
              placeholder="Select Project Type"
              required
            />


          </div>
          {/* Due Date */}
          <label htmlFor="dueDate" className="col-sm-3 col-form-label text-end">
            Due Date<span className="text-danger"> * </span>
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

        {/* Creator ID */}
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
              disabled
              value='0'
            />
          </div>

          {/* Assigned To */}
          <label htmlFor="department" className="col-sm-3 col-form-label text-end">
            Department
          </label>
          <div className="col-sm-3">
            {/* <input
              className="form-control"
              id="department"
              name="department"
              value={formData.departmentId || ''}
              required
              onChange={handleInputChange}
              readOnly
              disabled
            /> */}
            <Select
              value={{ value: formData.departmentId, label: formData.department }}
              components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
              isDisabled
            />
          </div>

        </div>


        {/* description */}
        <div className="row mb-3">
          <label htmlFor="description" className="col-sm-3 col-form-label text-end">
            Description<span className="text-danger"> * </span>
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
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-3"></div>
          <div className="col-sm-9 text-end">
            <button type="submit" className="btn btn-primary" disabled={loading} >
              {loading ? <><Spinner animation="border" size='sm' /> Adding Ticket...</> : "Add Ticket"}
            </button>
          </div>
        </div>
      </form >

    </div >
  );
};

export default AddTicket;
