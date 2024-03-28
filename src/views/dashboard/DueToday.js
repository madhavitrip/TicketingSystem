import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { useUser } from './../../context/UserContext';

const DueToday = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, isLoading, isError } = useUser();

  useEffect(() => {
    if (!isLoading && !isError) {
      fetchDueTodayTickets();
    }
  }, [isLoading, isError, user.email]);

  const fetchDueTodayTickets = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://localhost:7217/api/Tickets?includeArchived=false`);
      // Filter tickets where assigneeEmail matches the logged-in user's email
      const filteredTickets = response.data.filter(ticket => ticket.assigneeEmail === user.email);
      setTickets(filteredTickets);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTicketsDueToday = () => {
    // Get today's date
    const today = new Date().toISOString().split('T')[0];
    // Filter tickets that are due today
    return tickets.filter(ticket => ticket.dueDate.split('T')[0] === today);
  };

  const getUpcomingDueDateTickets = () => {
    // Get today's date
    const today = new Date();
    // Calculate the date for two days from today
    const twoDaysLater = new Date();
    twoDaysLater.setDate(today.getDate() + 2);
    // Filter tickets that have due date within the next two days
    return tickets.filter(ticket => {
      const dueDate = new Date(ticket.dueDate);
      return dueDate > today && dueDate <= twoDaysLater;
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching user data.</div>;
  }

  const dueTodayTasks = getTicketsDueToday();
  const upcomingDueDateTasks = getUpcomingDueDateTickets();

  return (
    <div>
      {dueTodayTasks.length === 0 && (
        <div>
          <div>No tasks due today.</div>
          <div>
            <h5>Upcoming Tasks</h5>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Title</th>
                  <th>Deadline</th>
                </tr>
              </thead>
              <tbody>
                {upcomingDueDateTasks.map((ticket, index) => (
                  <tr key={ticket.ticketId}>
                    <td>{index + 1}</td>
                    <td>{ticket.title}</td>
                    <td>{ticket.dueDate.split('T')[0]}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}
      {dueTodayTasks.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Title</th>
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {dueTodayTasks.map((ticket, index) => (
              <tr key={ticket.ticketId}>
                <td>{index + 1}</td>
                <td>{ticket.title}</td>
                <td>{ticket.dueDate.split('T')[0]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
  
};

export default DueToday;
