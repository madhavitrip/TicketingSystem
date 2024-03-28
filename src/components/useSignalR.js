import { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

const useSignalR = () => {
  const [connection, setConnection] = useState(null);
  const [connectionId, setConnectionId] = useState(null);

  useEffect(() => {
    const startConnection = async () => {
      try {
        const connection = new signalR.HubConnectionBuilder()
          .withUrl('https://localhost:7217/notificationHub')
          .withAutomaticReconnect()
          .build();

        connection.on('ReceiveNotification', (message) => {
          console.log('Received notification:', message);
        });

        await connection.start();
        console.log('SignalR connected');

        // Retrieve the connection ID directly from the connection object
        const id = connection.connectionId;
        console.log('Connection ID:', id);
        setConnectionId(id);

        setConnection(connection);
      } catch (error) {
        console.error('SignalR connection failed:', error);
      }
    };

    startConnection();

    return () => {
      if (connection) {
        connection.stop()
          .then(() => console.log('SignalR disconnected'))
          .catch(err => console.error('SignalR disconnection failed:', err));
      }
    };
  }, []);

  return { connection, connectionId };
};

export default useSignalR;
