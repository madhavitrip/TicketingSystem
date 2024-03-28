// ViewAllTickets.js

import React, { useState, useEffect } from 'react';
import TicketsTable from './TicketsTable';
import { Spinner, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import PermissionChecker from './../../context/PermissionChecker';
import { useNavigate } from 'react-router-dom';
import { useUser } from './../../context/UserContext';

 

const ticketapi = process.env.REACT_APP_API_TICKET;
const archivedapi = process.env.REACT_APP_API_ARCHIEVED;

const ViewAllTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [archivedTickets, setArchivedTickets] = useState([]); // State for archived tickets 
  const {user} = useUser();

  let navigate = useNavigate();
  const onClickAddTicket = () => {
    let path = `/Tickets/AddTicket`;
    navigate (path);
  };

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await fetchData(`${ticketapi}?userId=${user.userId}`);
        setTickets(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [user.userId]);

  useEffect(() => {
    const applyFilters = async () => {
      try {
        let filteredResults = [...tickets];

        if (priorityFilter !== 'All') {
          filteredResults = filteredResults.filter(ticket => ticket.priority.toLowerCase() === priorityFilter.toLowerCase());
        }

        if (statusFilter !== 'All') {
          filteredResults = filteredResults.filter(ticket => ticket.status.toLowerCase() === statusFilter.toLowerCase());
        }

        setFilteredTickets(filteredResults);
      } catch (error) {
        console.error('Error applying filters:', error);
      }
    };

    applyFilters();
  }, [tickets, priorityFilter, statusFilter]);

  useEffect(() => { 
    const fetchTickets = async () => { 
      try { 
        const activeTickets = await fetchData(`${ticketapi}?userId=${user.userId}`); 
        const archivedTicketsData = await fetchData(`${archivedapi}?userId=${user.userId}`); 
         
        // Filter out archived tickets by ID 
       
        setTickets(activeTickets); 
        setArchivedTickets(archivedTicketsData); 
        setLoading(false); 
         
      } catch (error) { 
        setLoading(false); 
      } 
    }; 
   
    fetchTickets(); 
  }, [user.userId]); // Empty dependency array ensures the effect runs only once on mount 


  return (
    <PermissionChecker>
      {({ hasPermission }) => (
        <div>
          <div className='d-flex justify-content-between mb-3'>
            <h4>All Tickets</h4>
            <div className='d-flex gap-2 align-items-center'>
              <DropdownButton title={`Priority: ${priorityFilter}`} variant="info">
                <Dropdown.Item onClick={() => setPriorityFilter('All')}>All</Dropdown.Item>
                <Dropdown.Item onClick={() => setPriorityFilter('High')}>High</Dropdown.Item>
                <Dropdown.Item onClick={() => setPriorityFilter('medium')}>Medium</Dropdown.Item>
                <Dropdown.Item onClick={() => setPriorityFilter('Low')}>Low</Dropdown.Item>
              </DropdownButton>

              <DropdownButton title={`Status: ${statusFilter}`} variant="info">
                <Dropdown.Item onClick={() => setStatusFilter('All')}>All</Dropdown.Item>
                <Dropdown.Item onClick={() => setStatusFilter('Open')}>Open</Dropdown.Item>
                <Dropdown.Item onClick={() => setStatusFilter('Pending')}>Pending</Dropdown.Item>
                <Dropdown.Item onClick={() => setStatusFilter('Unassigned')}>Unassigned</Dropdown.Item>
                <Dropdown.Item onClick={() => setStatusFilter('Completed')}>Completed</Dropdown.Item>
              </DropdownButton>
              {hasPermission(2, 'canAddOnly') && (
                <Button type="button" className="btn btn-primary" onClick={onClickAddTicket}>
                  Add Ticket
                </Button>
              )}
            </div>
          </div>

          <div>
            {loading ? (
              <div className="text-center">
                <Spinner animation="border" role="status">
                  <span className='visually-hidden'>loading..</span>
                </Spinner>
              </div>
            ) : (
              <TicketsTable tickets={statusFilter !== 'All' || priorityFilter !== 'All' ? filteredTickets : tickets} hasPermission={hasPermission} setTickets={setTickets} />
            )}
          </div>

          
        </div>
      )}
    </PermissionChecker>
  );
};

export default ViewAllTickets;
