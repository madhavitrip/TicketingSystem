import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import $ from 'jquery';


const MediumPriorityTable = ({ tickets }) => {
    const tableRef = useRef(null)
  useEffect(() => {
    $(tableRef.current).DataTable();
  }, [])
  return (
    <div className='mt-6 table-responsive'>
      <Table striped bordered hover ref={tableRef} className='table-primary' >
        <thead>
          <tr>
            <th>S.No</th>
            {/* <th>TicketID</th> */}
            {/* <th>CreatorId</th> */}
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
            {/* <th>TicketType</th> */}
            <th>DueDate</th>
            {/* <th>Department</th>
          <th>ProjectType</th> */}
            {/* <th>AssignedTo</th> */}
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <tr key={ticket.ticketId}>
              <td>{index + 1}</td>
              {/* <td>{ticket.ticketId}</td> */}
              {/* <td>{ticket.userId}</td> */}
              <td>{ticket.title}</td>
              <td>{ticket.status}</td>
              <td>{ticket.priority}</td>
              {/* <td>{ticket.ticketType}</td> */}
              <td>{new Date(ticket.dueDate).toLocaleString()}</td>
              {/* <td>{ticket.department}</td>
            <td>{ticket.projectType}</td> */}
              {/* <td>{ticket.assignedTo}</td> */}
              
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

MediumPriorityTable.propTypes = {
    tickets: PropTypes.arrayOf(
      PropTypes.shape({
        // ticketId: PropTypes.number.isRequired,
        // userId: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        priority: PropTypes.string.isRequired,
        // ticketType: PropTypes.string.isRequired,
        dueDate: PropTypes.string.isRequired,
        // department: PropTypes.string.isRequired,
        // projectType: PropTypes.string.isRequired,
        // assignedTo: PropTypes.number.isRequired,
      })
    ).isRequired,
  };

export default MediumPriorityTable;