import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';


function Priority() {


  return (
    <ListGroup defaultActiveKey="#link1">
      <ListGroup.Item action href="/PriorityTicket/HighPriority">
        High
      </ListGroup.Item>
      <ListGroup.Item action href="/PriorityTicket/MediumPriority" >
        Medium
      </ListGroup.Item>
      <ListGroup.Item action href="/PriorityTicket/LowPriority" >
        Low
      </ListGroup.Item>
    </ListGroup>
  );
}



export default Priority;