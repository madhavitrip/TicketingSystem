import React, { useState, useEffect } from 'react';
import TicketsTable from './TicketsTable';
import { Spinner, Button, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import PermissionChecker from './../../context/PermissionChecker';
import AddTicket from './AddTicket'; // Import the AddTicket component

const ViewAllTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [modalShow, setModalShow] = useState(false); // New state for modal

  const onClickAddTicket = () => {
    // Open modal when clicking Add Ticket
    setModalShow(true);
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
        const data = await fetchData('https://localhost:7217/api/Tickets');
        setTickets(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []); // Empty dependency array ensures the effect runs only once on mount

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
                <Dropdown.Item onClick={() => setPriorityFilter('Medium')}>Medium</Dropdown.Item>
                <Dropdown.Item onClick={() => setPriorityFilter('Low')}>Low</Dropdown.Item>
              </DropdownButton>

              <DropdownButton title={`Status: ${statusFilter}`} variant="info">
                <Dropdown.Item onClick={() => setStatusFilter('All')}>All</Dropdown.Item>
                <Dropdown.Item onClick={() => setStatusFilter('Active')}>Active</Dropdown.Item>
                <Dropdown.Item onClick={() => setStatusFilter('Pending')}>Pending</Dropdown.Item>
                <Dropdown.Item onClick={() => setStatusFilter('Unassigned')}>Unassigned</Dropdown.Item>
                <Dropdown.Item onClick={() => setStatusFilter('Completed')}>Completed</Dropdown.Item>
              </DropdownButton>
              {hasPermission(2, 'canAddOnly') &&(
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
              <TicketsTable tickets={statusFilter !== 'All' || priorityFilter !== 'All' ? filteredTickets : tickets} hasPermission={hasPermission} />
            )}
          </div>

          {/* Modal for adding a ticket */}
          <Modal show={modalShow} onHide={() => setModalShow(false)} dialogClassName="modal-lg">
            <Modal.Header closeButton>
              <Modal.Title>Add Ticket</Modal.Title>
            </Modal.Header>
            <Modal.Body >
              {/* Add your form or content for adding a ticket here */}
              <AddTicket />
            </Modal.Body>
            <Modal.Footer>
              {/* <Button variant="secondary" onClick={() => setModalShow(false)}>
                Close
              </Button> */}
              {/* Add any additional buttons or actions for adding a ticket */}
              
              {/* <Button variant="primary" onClick={() => setModalShow(false)}>
                Save Ticket
              </Button> */}
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </PermissionChecker>
  );
};

export default ViewAllTickets;
