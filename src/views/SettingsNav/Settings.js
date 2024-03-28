import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from '@fortawesome/free-solid-svg-icons';
import security from './../../assets/images/security.png';
import personalinformation from './../../assets/images/personalinformation.png';
import personadetails from './../../assets/images/personadetails.png';
import { useNavigate } from "react-router-dom";





function BasicExample() {


  let navigate = useNavigate();
  const OnClickViewPasswordsecurity = () => {
    // Show the modal when clicking the "Add User" button
    let path = `/pages/SettingsFol/PasswordAndSecurity`;
    navigate(path);
  };
  const OnClickViewPersonalDetails = () => {
    // Show the modal when clicking the "Add User" button
    let path = `/pages/SettingsFol/PersonalDetails`;
    navigate(path);
  };
  const OnClickViewInfoAndPermission = () => {
    // Show the modal when clicking the "Add User" button
    let path = `/pages/SettingsFol/InfoAndPermission`;
    navigate(path);
  };


  return (
    <Row xs={1} md={3} className="g-4">
      <Col>
        <Card style={{ width: '18rem' }}>
          <div className='text-center'>
            <Card.Img className='ml-4' style={{ width: '10rem', height: '10rem' }} variant="top" src={security} />
          </div>
          <Card.Body>
            <Card.Title className='text-center fs-6'>Password and Security</Card.Title>

            <div className='text-center'><Button onClick={OnClickViewPasswordsecurity} variant="primary">View</Button></div>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card style={{ width: '18rem' }}>
          <div className='text-center'><Card.Img style={{ width: '10rem', height: '10rem' }} variant="top" src={personadetails} /></div>
          <Card.Body>
            <Card.Title className='text-center fs-6'>Personal Details</Card.Title>

            <div className='text-center'><Button onClick={OnClickViewPersonalDetails} variant="primary">View</Button></div>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card style={{ width: '18rem' }}>
          <div className='text-center'><Card.Img style={{ width: '10rem', height: '10rem' }} variant="top" src={personalinformation} /></div>
          <Card.Body>
            <Card.Title className='text-center fs-6'>Your Information and Permissions</Card.Title>

            <div className='text-center'><Button onClick={OnClickViewInfoAndPermission} variant="primary">View</Button></div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default BasicExample;
