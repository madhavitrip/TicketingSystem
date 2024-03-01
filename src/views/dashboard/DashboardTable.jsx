import React, { useEffect, useRef,useCallback } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import $ from 'jquery';




const DashboardTable = ({ tickets,onUpdateStatus }) => {
  const tableRef = useRef(null)
  

  const handleUpdateStatus = useCallback(
    (updatedTickets) => {
      onUpdateStatus(updatedTickets);
    },
    [onUpdateStatus]
  );
  

 
   

  useEffect(() => {

    $(tableRef.current).DataTable();
    // Update status to "Pending" if due date is exceeded
    const updatedTickets = tickets.map((ticket) => {
      const isDueDatePassed = new Date(ticket.dueDate) < new Date();
      const isNotCompleted = ticket.status !== 'Completed';
  
      if (isDueDatePassed && isNotCompleted) {
        // You may want to update the status in your data source here
        return { ...ticket, status: 'Pending' };
      }
  
      return ticket;
    });
  
    // Call handleUpdateStatus only if there are updates
    if (JSON.stringify(updatedTickets) !== JSON.stringify(tickets)) {
      handleUpdateStatus(updatedTickets);
    }
  }, [tickets, handleUpdateStatus]);


  if (!Array.isArray(tickets)) {
    return <div>No tickets available</div>;
  }
  
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
            <th>Assignee Email</th>
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <tr key={ticket.ticketId}>
              <td>{index + 1}</td>
             
              <td>{ticket.title}</td>
              <td>{ticket.status}</td>
              <td>{ticket.priority}</td>
              
              <td>{new Date(ticket.dueDate).toLocaleString()}</td>
             
              <td>{ticket.assigneeEmail}</td>
              
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

DashboardTable.propTypes = {
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
      assigneeEmail: PropTypes.string.isRequired,
    })
  ).isRequired,
  onUpdateStatus: PropTypes.func.isRequired,
};

export default DashboardTable;
