import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import DashboardTable from './DashboardTable';


const Dashboard = () => {
  const [activeCount, setActiveCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [unassignedCount, setUnassignedCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatusCounts = async () => {
      try {
        const activeResponse = await fetch('https://localhost:7217/api/Tickets/status/active');
        const activeData = await activeResponse.json();
        setActiveCount(activeData.length);

        const pendingResponse = await fetch('https://localhost:7217/api/Tickets/status/pending');
        const pendingData = await pendingResponse.json();
        setPendingCount(pendingData.length);

        const unassignedResponse = await fetch('https://localhost:7217/api/Tickets/status/unassigned');
        const unassignedData = await unassignedResponse.json();
        setUnassignedCount(unassignedData.length);

        const completedResponse = await fetch('https://localhost:7217/api/Tickets/status/completed');
        const completedData = await completedResponse.json();
        setCompletedCount(completedData.length);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching status counts:', error);
        setLoading(false);
      }
    };

    const fetchTickets = async () => {
      try {
        const response = await fetch('https://localhost:7217/api/Tickets');
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchStatusCounts();
    fetchTickets();
  }, []);

  return (
    <div>
      <Container>
        <Row className='row-cols-1 row-cols-md-2 row-cols-lg-4'>
          <Col>
            <div className="card border-primary mb-3" style={{ maxwidth: '18rem' }}>
              <div className="card-header border-0 bg-transparent "><h4>Active</h4></div>
              <div className="card-body text-primary py-0 text-center">
                <h5 className="card-primary fs-1 ">{activeCount}</h5>
              </div>
              <div className=' card-footer border-0 d-flex justify-content-between bg-transparent align-items-center '>
                <div className=" ">More Info </div>
                <i className="fa-solid fa-arrow-right text-secondary"></i>
              </div>

            </div>
          </Col>
          <Col>
            <div className="card border-danger mb-3" style={{ maxwidth: '18rem' }}>
              <div className="card-header border-0  bg-transparent border-danger"><h4>Pending</h4></div>
              <div className="card-body text-danger py-0 text-center">
                <h5 className="card-title fs-1">{pendingCount}</h5>
              </div>
              <div className=' card-footer border-0 d-flex justify-content-between bg-transparent border-primary align-items-center'>
                <div className=" ">More Info </div>
                <i className="fa-solid fa-arrow-right text-secondary"></i>
              </div>
            </div>
          </Col>
          <Col>
            <div className="card border-warning mb-3" style={{ maxwidth: '18rem' }}>
              <div className="card-header border-0 bg-transparent border-warning"><h4>Unassigned</h4></div>
              <div className="card-body text-warning py-0 text-center">
                <h5 className="card-title fs-1">{unassignedCount}</h5>
              </div>
              <div className=' card-footer border-0 d-flex justify-content-between bg-transparent border-primary align-items-center'>
                <div className=" ">More Info </div>
                <i className="fa-solid fa-arrow-right text-secondary"></i>
              </div>
            </div>
          </Col>
          <Col>
            <div className="card border-success mb-3" style={{ maxwidth: '18rem' }}>
              <div className="card-header border-0 bg-transparent border-success"><h4>Completed</h4></div>
              <div className="card-body text-success py-0 text-center">
                <h5 className="card-title fs-1">{completedCount}</h5>
              </div>
              <div className=' card-footer border-0 d-flex justify-content-between bg-transparent border-primary align-items-center'>
                <div className=" ">More Info </div>
                <i className="fa-solid fa-arrow-right text-secondary"></i>
              </div>
            </div>
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

      <DashboardTable tickets={tickets} />
      )
      }
    </div>
  );
};

export default Dashboard;