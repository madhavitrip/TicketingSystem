// import React, { useState } from 'react';
// import * as signalR from '@microsoft/signalr';

// const TestSignalR = () => {
//     const [connectionStatus, setConnectionStatus] = useState('Disconnected');

//     const startSignalRConnection = async () => {
//         const connection = new signalR.HubConnectionBuilder()
//             .withUrl('https://localhost:7217/chatHub')
//             .build();

//         try {
//             connection.onclose(() => {
//                 setConnectionStatus('Disconnected');
//                 console.log('SignalR connection closed.');
//             });

//             setConnectionStatus('Connecting...');
//             await connection.start();
//             setConnectionStatus('Connected');

//             // Send a test message to the SignalR hub
//             await connection.invoke('SendMessage', 'receiverId123', 'Hello, SignalR!');
//         } catch (error) {
//             setConnectionStatus('Error');
//             console.error('SignalR Invoke Error:', error);
//         } finally {
//             await connection.stop();
//         }
//     };

//     return (
//         <div>
//             <button onClick={startSignalRConnection}>Start SignalR Connection</button>
//             <p>Connection Status: {connectionStatus}</p>
//         </div>
//     );
// };

// export default TestSignalR;


import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]); // State to store messages
  const [connection, setConnection] = useState(null); // State for SignalR connection
  const [isConnected, setIsConnected] = useState(false); // State to track connection status
  const [inputUser, setInputUser] = useState(''); // State for user input
  const [inputMessage, setInputMessage] = useState(''); // State for message input

  useEffect(() => {
    // Create a new SignalR connection
    const newConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7217/chathub') // Update URL if needed
      .withAutomaticReconnect()
      .build();

    newConnection.start()
      .then(() => {
        console.log('SignalR Connected');
        setIsConnected(true); // Update connection status
      })
      .catch(err => console.error('SignalR Connection Error: ', err));

    newConnection.on('ReceiveMessage', (user, message) => {
      console.log('Message received:', `${user} says ${message}`);
      // Update messages state with the new message
      setMessages(prevMessages => [...prevMessages, { user, message }]);
    });

    setConnection(newConnection);

    // Clean up function to stop the connection when the component unmounts
    return () => {
      if (newConnection) {
        newConnection.stop();
      }
    };
  }, []);

  const handleSendClick = () => {
    if (inputUser.trim() !== '' && inputMessage.trim() !== '') {
      if (!connection) {
        console.log('SignalR connection is null. Reinitializing...');
        initializeSignalRConnection(); // Reinitialize SignalR connection
        return; // Exit the function and wait for the connection to be reinitialized
      }
  
      // Connection is not null, proceed with invoking SendMessage
      connection.invoke('SendMessage', inputUser, inputMessage)
        .then(() => {
          console.log('Message sent successfully:', inputUser, inputMessage);
          // Clear input fields after sending the message
          setInputUser('');
          setInputMessage('');
          // Update messages state with the sent message
          setMessages(prevMessages => [...prevMessages, { user: inputUser, message: inputMessage }]);
        })
        .catch(err => console.error('Error sending message:', err.toString()));
    } else {
      console.error('User and message cannot be empty.');
    }
  };
  
  const initializeSignalRConnection = () => {
    const newConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7217/chathub') // Update URL if needed
      .withAutomaticReconnect()
      .build();
  
    newConnection.start()
      .then(() => {
        console.log('SignalR Connected');
        setIsConnected(true); // Update connection status
        setConnection(newConnection); // Set the new connection
      })
      .catch(err => console.error('SignalR Connection Error: ', err));
  };

  return (
    <div>
      <div>
        {/* Display the list of messages */}
        <ul data-testid="messages-list">
          {messages.map((msg, index) => (
            <li key={index}>{`${msg.user} says: ${msg.message}`}</li>
          ))}
        </ul>
      </div>
      {/* Input fields for user and message */}
      <input type="text" placeholder="Enter user" value={inputUser} onChange={e => setInputUser(e.target.value)} />
      <input type="text" placeholder="Enter message" value={inputMessage} onChange={e => setInputMessage(e.target.value)} />
      {/* Send button */}
      <button onClick={handleSendClick} disabled={!isConnected}>Send with React</button>
    </div>
 
  )}
  export default ChatComponent;