import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Alert } from 'react-bootstrap'; // Import Alert component for error message 
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faRepeat } from '@fortawesome/free-solid-svg-icons';
import { useUser } from './../../context/UserContext';


const Archived = process.env.REACT_APP_API_ARCHIEVED;
const ticketapi = process.env.REACT_APP_API_TICKET;
const baseapi = process.env.REACT_APP_BASE_URL;

const ArchiveTable = () => {
  const [archivedTickets, setArchivedTickets] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for error message 
  const [showAttachmentModal, setShowAttachmentModal] = useState(false);
  const [isImageAttachment, setIsImageAttachment] = useState(false);
  const {user} = useUser();


  // const handleCloseAttachmentModal = () => {
  //   setShowAttachmentModal(false);
  // };

  useEffect(() => {
    const fetchArchivedTickets = async () => {
      try {
        const response = await axios.get(`${Archived}?userId=${user.userId}`);
        setArchivedTickets(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching archived tickets:', error);
        setLoading(false);

      }
    };

    fetchArchivedTickets();
  }, [user.userId]);

  const handleUnarchiveTicket = async () => {
    try {
      await axios.post(`${ticketapi}/${selectedTicket.ticketId}/unarchive?userId=${user.userId}`);
      // Update the local state or refresh the list of archived tickets
    } catch (error) {
      console.error('Error unarchiving ticket:', error);
      // Handle the error, e.g., show an error message
    } finally {
      handleCloseConfirmationModal();
    }
  };

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setModalShow(true);
  };

  const handleShowConfirmationModal = (ticket) => {
    setSelectedTicket(ticket);
    setShowConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setSelectedTicket(null);
    setShowConfirmationModal(false);
  };



  return (
    <div className='mt-6 table-responsive'>
      {/* Display error message if there's an error */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Loading indicator */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>S.No</th>
              <th>TicketID</th>
              <th>Title</th>
              <th>Status</th>
              <th>Priority</th>
              <th>TicketType</th>
              <th>DueDate</th>
              <th>Department</th>
              <th>ProjectType</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {archivedTickets.map((ticket, index) => (
              <tr key={ticket.ticketId}>
                <td>{index + 1}</td>
                <td>{ticket.ticketId}</td>
                <td>{ticket.title}</td>
                <td>{ticket.status}</td>
                <td>{ticket.priority}</td>
                <td>{ticket.ticketType}</td>
                <td>{new Date(ticket.dueDate).toLocaleString()}</td>
                <td>{ticket.department}</td>
                <td>{ticket.projectType}</td>
                <td>
                  <Button onClick={() => handleViewTicket(ticket)}>
                    <FontAwesomeIcon icon={faEye} className="text-success" />
                  </Button>
                  <Button onClick={() => handleShowConfirmationModal(ticket)}>
                    <FontAwesomeIcon icon={faRepeat} className="text-danger" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Confirmation Modal */}
      <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Unarchive</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to unarchive ticket {selectedTicket ? selectedTicket.ticketId : ''}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmationModal}>
            Cancel
          </Button>
          <Button variant="danger"
            onClick={handleUnarchiveTicket}>
            Unarchive
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Ticket Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Title: {selectedTicket.title}</p>
            <p>Description: {selectedTicket.description}</p>
            <p>Creator ID: {selectedTicket.email}</p>
            <p>Assignee ID: {selectedTicket.assigneeEmail}</p>
            <p>Attachments:</p>
            {selectedTicket.attachment && (
              <div>
                {isImageAttachment && /\.(png|jpg|jpeg|gif|bmp)$/i.test(selectedTicket.attachment) ? (
                  <img src={`${baseapi}/${selectedTicket.attachment.replace('wwwroot/', '')}`} alt="Attachment" className="img-fluid" />
                ) : (
                  <p>
                    <a href={`${baseapi}/${selectedTicket.attachment.replace('wwwroot/', '')}`} target="_blank" rel="noopener noreferrer">
                      View Attachment
                    </a>
                  </p>
                )}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setModalShow(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ArchiveTable;
