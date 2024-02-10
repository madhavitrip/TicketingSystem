import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';


function Status() {


  return (
    <ListGroup defaultActiveKey="#link1">
      <ListGroup.Item action href="/TicketStatus/ActiveStatus">
        Active 
      </ListGroup.Item>
      <ListGroup.Item action href="/TicketStatus/PendingStatus" >
        Pending
      </ListGroup.Item>
      <ListGroup.Item action href="/TicketStatus/UnassignedStatus" >
        Unassigned
      </ListGroup.Item>
      <ListGroup.Item action href="/TicketStatus/CompletedStatus" >
        Completed
      </ListGroup.Item>
    </ListGroup>
  );
}



export default Status;