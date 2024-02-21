import React, { useState } from 'react';
import { Card, CardBody, Col, Container, Row, Form, InputGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import './../login/Login.css';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
   const password = 'password';
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (value) => {
    setEmail(value);
    setEmailError(!value ? 'Email is required' : '');
  };

  const handleResetPassword = async () => {
    if (!email) {
      setEmailError('Email is required');
      return;
    }

    try {
      // Make an API call to request password reset
      const response = await axios.put('https://localhost:7217/api/Login/ForgetPassword', { email, password });

      if (response && response.data) {
        console.log('Password reset email sent successfully');
        // You can redirect the user to a confirmation page if needed
      } else {
        console.error('Invalid API response', response);
      }
    } catch (error) {
      console.error('Error while resetting password:', error);
      // Handle error state or display error message to the user
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex align-items-center bgimg">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="p-4 bg-transparent border-0">
              <CardBody>
                <Form>
                  <h1 className='text-white'>Forgot Password</h1>
                  <p className="text-secondary">Enter your email address to reset your password</p>
                  <div className="mb-3">
                    {/* Email Input */}
                    <InputGroup hasValidation>
                      <Form.Control
                        placeholder="Email Address"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        type="email"
                        isInvalid={!!emailError}
                        required
                      />
                      <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
                    </InputGroup>
                  </div>
                  <Row >
                    <Col xs={6} className='align-items-start'>
                      {/* Reset Password Button */}
                      <Button color="primary" className="px-4" onClick={handleResetPassword}>
                        Reset Password
                      </Button>
                    </Col>
                    <Col xs={6} className='text-end fs-5'>
                      {/* Reset Password Button */}
                      <Link to="/Login" color="primary" className="px-4" onClick={handleResetPassword}>
                        Login
                      </Link>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgotPassword;
