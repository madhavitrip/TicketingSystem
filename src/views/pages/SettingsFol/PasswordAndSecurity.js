import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome"; 
import {faLock} from '@fortawesome/free-solid-svg-icons'
import ChangePasswordForm from '../Password/ChangePasswordForm';

function AllCollapseExample() {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header><FontAwesomeIcon icon={faLock} className='me-2'/> Change Password</Accordion.Header>
        <Accordion.Body>
         <ChangePasswordForm/>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Accordion Item #2</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AllCollapseExample;