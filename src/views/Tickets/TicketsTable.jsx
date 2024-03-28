// TicketsTable.js
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenSquare, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useSecurity } from './../../context/Security';
import { useUser } from './../../context/UserContext';


const commentapi = process.env.REACT_APP_API_TICKETFLOW_BY_COMMENTS;
const ticketapi = process.env.REACT_APP_API_TICKET;
const baseapi = process.env.REACT_APP_BASE_URL;

const TicketsTable = ({ tickets, hasPermission, setTickets }) => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [comments, setComments] = useState({});
  const tableRef = useRef(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showAttachmentModal, setShowAttachmentModal] = useState(false);
  const [isImageAttachment, setIsImageAttachment] = useState(false);
  const { encrypt } = useSecurity();
  const {user} = useUser();

  const handleCloseAttachmentModal = () => {
    setShowAttachmentModal(false);
  };

  useEffect(() => {
    const fetchComments = async (ticketId) => {
      try {
        const response = await fetch(`${commentapi}/${ticketId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const lastComment = data.length > 0 ? data[data.length - 1].comment : 'No comments';
        setComments((prevComments) => ({ ...prevComments, [ticketId]: lastComment }));
      } catch (error) {
        console.error(`Error fetching comments for ticket ${ticketId}:`, error);
      }
    };

    tickets.forEach((ticket) => {
      fetchComments(ticket.ticketId);
    });
  }, [tickets]);

  useEffect(() => {
    if (tableRef.current) {
      $(tableRef.current).DataTable();
    }
  }, []);

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


  const handleArchiveTicket = () => {
    console.log('Archiving ticket:', selectedTicket);
    // Make API call to archive the ticket 
    axios.post(`${ticketapi}/${selectedTicket.ticketId}/archive?userId=${user.userId}`)
      .then(response => {
        console.log('Ticket archived successfully:', response.data);
        // Update tickets state in the parent component by removing the archived ticket 
        setTickets(tickets.filter(ticket => ticket.ticketId !== selectedTicket.ticketId));
      })
      .catch(error => {
        console.error('Error archiving ticket:', error);
      });
    handleCloseConfirmationModal();
  };

  return (
    <div className='mt-6 table-responsive'>
      <Table ref={tableRef} striped bordered hover="sm">
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <tr key={ticket.ticketId}>
              <td>{index + 1}</td>
              <td>{ticket.ticketId}</td>
              <td>
                <OverlayTrigger
                  key={ticket.ticketId}
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    <Tooltip id={`tooltip-${ticket.ticketId}`}>
                      {comments[ticket.ticketId] ? (
                        <>
                          Last comment:
                          <div dangerouslySetInnerHTML={{ __html: comments[ticket.ticketId] }} />
                        </>
                      ) : (
                        <div>Description: <br />{ticket.description}</div>
                      )}
                    </Tooltip>
                  }
                >
                  <span>{ticket.title}</span>
                </OverlayTrigger>
              </td>
              <td>{ticket.status}</td>
              <td>{ticket.priority}</td>
              <td>{ticket.ticketType}</td>
              <td>{new Date(ticket.dueDate).toLocaleString()}</td>
              <td>{ticket.department}</td>
              <td>{ticket.projectType}</td>
              <td>
                <div className="d-flex gap-3 align-items-center">
                  {hasPermission(2, 'canUpdateOnly') && (
                    <Link to={`EditTicket/${encrypt(ticket.ticketId)}`}>
                      <FontAwesomeIcon icon={faPenSquare} className="text-primary" />
                    </Link>
                  )}
                  {hasPermission(2, 'canViewOnly') && (
                    <Button variant="link" onClick={() => handleViewTicket(ticket)}>
                      <FontAwesomeIcon icon={faEye} className="text-success" />
                    </Button>
                  )}
                  {hasPermission(2, 'canDeleteOnly') && (
                    <FontAwesomeIcon
                      icon={faClockRotateLeft}
                      className="text-danger"
                      onClick={() => handleShowConfirmationModal(ticket)} />)}

                  <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Confirm Archive</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Are you sure you want to archive ticket {selectedTicket ? selectedTicket.id : ''}?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseConfirmationModal}>
                        Cancel
                      </Button>
                      <Button variant="danger" onClick={handleArchiveTicket}>
                        Archive
                      </Button>
                    </Modal.Footer>
                  </Modal>


                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

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


      {/* Attachment Modal */}

    </div>
  );
};

TicketsTable.propTypes = {
  tickets: PropTypes.arrayOf(
    PropTypes.shape({
      ticketId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      priority: PropTypes.string.isRequired,
      ticketType: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired,
      department: PropTypes.string.isRequired,
      projectType: PropTypes.string.isRequired,
    })
  ).isRequired,
  hasPermission: PropTypes.func.isRequired,
  setTickets: PropTypes.func.isRequired,
};

export default TicketsTable;
