import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilEnvelopeOpen } from '@coreui/icons';
import { Card, CardBody, CardGroup, Col, Container, Row, Form, InputGroup, Button } from 'react-bootstrap';
import { useUser } from './../../../context/UserContext';
import axios from 'axios';
import './Login.css';


const Login = () => {
  // Access user context for login and user information
  const { login, user } = useUser();
  const navigate = useNavigate();

  // State variables for email, password, errors, and password visibility
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    // Redirect if the user is already logged in
    if (user) {
        navigate('/dashboard');
    }
  }, [user, navigate]);

  // Handle the login process
  const handleLogin = async () => {
    
    
    if (emailError || passwordError || !email || !password) {
      return;
    }

    try {
      // Make an API call to authenticate the user
      const response = await axios.post('https://localhost:7217/api/Login/Login', { email, password });

      if (response && response.data) {
        // If successful, log in the user and redirect
        login(response.data);
      } else {
        console.error('Invalid API response', response);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setEmailError('');
      setPasswordError('Invalid email or password');
      
      // Reload the page after a certain number of login attempts (adjust as needed)
      
    }
  };

  // Check if the email format is valid
  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Handle changes in the email input
  const handleEmailChange = (value) => {
    setEmail(value);
    setEmailError(!value ? 'Email is required' : !isEmailValid(value) ? 'Invalid email format' : '');
  };

  // Handle changes in the password input
  const handlePasswordChange = (value) => {
    setPassword(value);
    // setPasswordError(
    //   !value
    //     ? 'Password is required'
    //     : value.length < 6
    //     ? 'Password must be at least 6 characters long'
    //     : !/(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(value)
    //     ? 'Password must contain at least one letter, one number, and one special character'
    //     : ''
    // );
    setPasswordError('')
  };

  // Toggle visibility of the password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex align-items-center bgimg">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <CardGroup>
              <Card className="p-4 bg-transparent border-0">
                <CardBody>
                  <Form>
                    <h1 className='text-white'>Login</h1>
                    <p className="text-secondary">Sign In to your account</p>
                    <div className="mb-3">
                      {/* Email Input */}
                      <InputGroup hasValidation>
                        <InputGroup.Text>
                          <CIcon icon={cilEnvelopeOpen} />
                        </InputGroup.Text>
                        <Form.Control
                          placeholder="Email Address"
                          autoComplete="username"
                          value={email}
                          onChange={(e) => handleEmailChange(e.target.value)}
                          type="email"
                          isInvalid={!!emailError}
                          required
                        />
                        <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
                      </InputGroup>
                    </div>
                    <div className="mb-4">
                      {/* Password Input */}
                      <InputGroup hasValidation>
                        <InputGroup.Text>
                          <CIcon icon={cilLockLocked} />
                        </InputGroup.Text>
                        <Form.Control
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Password"
                          autoComplete="current-password"
                          value={password}
                          onChange={(e) => handlePasswordChange(e.target.value)}
                          isInvalid={!!passwordError}
                          required
                        />
                        {/* Toggle Password Visibility */}
                        <InputGroup.Text onClick={togglePasswordVisibility} className='hovericon'>
                          {showPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                        </InputGroup.Text>
                        <Form.Control.Feedback type="invalid">{passwordError}</Form.Control.Feedback>
                      </InputGroup>
                    </div>
                    <Row className='align-items-center'>
                      <Col xs={6}>
                        {/* Login Button */}
                        <Button color="primary" className="px-4" onClick={handleLogin}>
                          Login
                        </Button>
                      </Col>
                      <Col xs={6} className="text-end">
                        {/* Forgot Password Link */}
                        <Link to={'/ForgotPassword'}>Forgot password?</Link>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;