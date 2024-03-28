import React, { useState } from 'react';
import { Col, Container, Row, Form, InputGroup, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import './../login/Login.css';
import { Link } from 'react-router-dom';
import PageLayout from '../login/PageLayout';

const forgetpasswordapi = process.env.REACT_APP_API_FORGOT_PASSWORD;

const ForgotPassword = () => {
  const theme = '#FFC727';
  const [email, setEmail] = useState('');
  const password = 'password';
  const [emailError, setEmailError] = useState('');
  const [successMessage, setSuccessMesage] = useState('');
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      // Make an API call to request password reset
      const response = await axios.put(forgetpasswordapi, { email, password });

      if (response && response.data) {
        setSuccessMesage('Password has been sent to your email successfully')
        console.log('Password reset email sent successfully');
        // You can redirect the user to a confirmation page if needed
      } else {
        console.error('Invalid API response', response);
      }
    } catch (error) {
      console.error('Error while resetting password:', error);
      // Handle error state or display error message to the user
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout bgimg='bgimgforgotpass' theme={theme} >


      <Container>
        <Form>
          <h1 className='text-center'>Forgot Password</h1>
          <p className="text-center">Enter your email address to reset your password</p>
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
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
              <Button color="primary" className="px-4" style={{ backgroundColor: theme }} onClick={handleResetPassword} disabled={loading}>
                {loading ? 'Loading...' : 'Reset Password'}
              </Button>
            </Col>
            <Col xs={6} className='text-end fs-5'>
              {/* Reset Password Button */}
              <Link to="/Login" style={{ color: theme }} className="px-4" onClick={handleResetPassword}>
                Login
              </Link>
            </Col>
          </Row>
        </Form>
      </Container>
    </PageLayout>
  );
};

export default ForgotPassword;
