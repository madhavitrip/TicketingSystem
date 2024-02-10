import React, { useState, useEffect }  from 'react';
import {  Spinner } from 'react-bootstrap'
import PendingStatusTable from './PendingStatusTable';


const PendingStatus = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      // Fetch user data from the API
      fetch('https://localhost:7217/api/Tickets/status/pending')
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          setTickets(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          setLoading(false);
        });
        const fetchTickets = async () => {
            try {
              // Fetch all tickets
              const response = await fetch('https://localhost:7217/api/Tickets');
              const data = await response.json();
      
              // Filter high priority tickets
              const PendingStatusTickets = data.filter(ticket => ticket.priority === 'Pending');
      
              // Set tickets state with high priority tickets
              setTickets(PendingStatusTickets);
            } catch (error) {
              console.error('Error fetching tickets', error);
            }
          };

           // Call the fetchTickets function
            fetchTickets();
        
    }, []);
  return (
    <div>


      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className='visually-hidden'>loading..</span>
          </Spinner>
        </div>
      ) : (

      <PendingStatusTable tickets={tickets} />
      )
      }
    </div>
  );
};



export default PendingStatus