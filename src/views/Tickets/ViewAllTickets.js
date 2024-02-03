import React, { useState, useEffect } from 'react';
import TicketsTable from './TicketsTable';
import { Spinner } from 'react-bootstrap';

const ViewAllTickets = () => {
    const [tickets, setTickets] = useState([]);
    
    const [loading,setLoading]=useState(true);
    const onClickAddTicket = () => {
        window.location.href = './AddTicket';
    }

    useEffect(() => {
        // Fetch user data from the API
        fetch('https://localhost:7217/api/Tickets')
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
    }, []); // Empty dependency array ensures the effect runs only once on mount

    return (
        <div>
            <div className='d-flex justify-content-between mb-3'>
                <h4>All Tickets</h4>
                <div className='d-flex gap-2 align-items-center'>
                
                <button type="button" className="btn btn-primary" onClick={onClickAddTicket}>
                    Add Ticket
                </button>
                </div>
            </div>
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border"role="status">
                        <span className='visually-hidden'>loading..</span>
                    </Spinner>
                 </div>
            ):(
            
            <TicketsTable tickets={tickets} />
            )
            }
           
        </div>
    );
};

export default ViewAllTickets;
