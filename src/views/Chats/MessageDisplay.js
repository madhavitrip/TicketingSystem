import React from 'react';
import PropTypes from 'prop-types'

const MessageDisplay = ({ messages }) => {
  return (
    <div className="message-display">
      {messages.map((message, index) => (
        <div key={index} className="message">
          <strong>{message.sender}</strong>: {message.text}
        </div>
      ))}
    </div>
  );
};
MessageDisplay.propTypes ={
messages:PropTypes.array.isRequired,

};

export default MessageDisplay;
