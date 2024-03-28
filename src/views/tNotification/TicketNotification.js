import React from 'react';
import Badge from 'react-bootstrap/Badge';
import PropTypes from 'prop-types';

const NewTickets = ({ newTickets }) => {
  
  if (!newTickets || newTickets.length === 0) {
    return <p>No new notifications</p>;
  }

  return (
    <div>
      <ul>
        {newTickets.map(ticket => (
          <li key={ticket.ticketId}>
            <p>Title: {ticket.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

NewTickets.propTypes = {
  newTickets: PropTypes.array.isRequired,
};

export default NewTickets;
