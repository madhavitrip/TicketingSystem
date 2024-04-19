import React, { useState } from 'react';
import PropTypes from 'prop-types';

const MessageInput = ({ sendMessage }) => {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== '') {
      sendMessage(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="message-input">
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Type your message..."
      />
      <button type="submit">Send</button>
    </form>
  );
};

MessageInput.propTypes = {
  sendMessage: PropTypes.func.isRequired, // Ensure sendMessage is a function
};

export default MessageInput;
