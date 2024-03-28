import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Spinner, Button } from 'react-bootstrap'
import DashboardTable from './DashboardTable';
import { useUser } from './../../context/UserContext';
import './Dashboard.css';
import Charts from './../../views/charts/Charts';
import DueToday from './DueToday';
import { useNavigate } from 'react-router-dom';

const Tickets = process.env.REACT_APP_API_TICKET;

const Dashboard = () => {
  const { user } = useUser();
  const [counts, setCounts] = useState({
    open: 0,
    pending: 0,
    selfassigned: 0,
    completed: 0
  });
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDueToday, setShowDueToday] = useState(false);
  let navigate = useNavigate();

 

  useEffect(() => {
    const fetchCountsAndTickets = async () => {
      try {
        // Fetch counts
        const countsResponse = await fetch(`${Tickets}/status-count?email=${user.email}`);
        const countsData = await countsResponse.json();
        setCounts({
          open: countsData.openCount,
          pending: countsData.pendingCount,
          selfassigned: countsData.selfassignedCount,
          completed: countsData.completedCount
        });

        // Fetch tickets
        const ticketsResponse = await fetch(`${Tickets}/ByUser?email=${user.email}`);
        const ticketsData = await ticketsResponse.json();
        setTickets(ticketsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountsAndTickets();
  }, [user]); // Include setCounts and setTickets in the dependency array

  const onClickDueToday = () => {
    setShowDueToday(!showDueToday);
  };

  return (
    <div>
      <Container>
        <Row className='row-cols-1 row-cols-md-2'>
          <Col md={6}>
            <Row className='mb-3'>
              <Col>
                <div className="card-client">
                  <div className="user-picture">
                    {/* <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"> */}
                      {/* Placeholder SVG content */}
                    {/* </svg> */}
                    <p className="number">{counts.open}</p>
                  </div>
                  <p className="name-client">Open</p>
                </div>
              </Col>
              <Col>
                <div className="card-client">
                  <div className="user-picture">
                    <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                      {/* Placeholder SVG content */}
                    </svg>
                    <p className="number">{counts.pending}</p>
                  </div>
                  <p className="name-client">Pending</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="card-client">
                  <div className="user-picture">
                    <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                      {/* Placeholder SVG content */}
                    </svg>
                    <p className="number">{counts.selfassigned}</p>
                  </div>
                  <p className="name-client">Self Assigned</p>
                </div>
              </Col>
              <Col>
                <div className="card-client">
                  <div className="user-picture">
                    <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                      {/* Placeholder SVG content */}
                    </svg>
                    <p className="number">{counts.completed}</p>
                  </div>
                  <p className="name-client">Completed</p>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md={showDueToday ? 4 : 4}>
            {/* Include your Pie Chart component here */}
            <Charts />
          </Col>
          {/* Wrap both the button and DueToday component in a single Col with md={2} */}
          <Col md={2} >
            <Row>
              <Col>
              <Button onClick={onClickDueToday}  variant="danger">
        Due Today
      </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                {/* Conditionally render DueToday component based on showDueToday */}
                {showDueToday && <DueToday />}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className='visually-hidden'>loading..</span>
          </Spinner>
        </div>
      ) : (
        <DashboardTable tickets={tickets} setTickets={setTickets} />
      )}
    </div>
  );
};



export default Dashboard;
