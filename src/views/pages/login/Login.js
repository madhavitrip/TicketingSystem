import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilEnvelopeOpen } from '@coreui/icons';
import { Card, CardBody, CardGroup, Col, Container, Row, Form, InputGroup, Button, Spinner,Alert} from 'react-bootstrap';
import { useUser } from './../../../context/UserContext';
import axios from 'axios';
import './Login.css';
import PageLayout from './PageLayout';


const loginapi = process.env.REACT_APP_API_LOGIN;

const Login = () => {
  // Access user context for login and user information
  const { login, user, isLoggedIn } = useUser();
  const navigate = useNavigate();

  // State variables for email, password, errors, and password visibility
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
    // State variable to track loading state
    const [loading, setLoading] = useState(false); 
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    useEffect(() => {
      // Redirect if the user is already logged in
      const checkUserAndRedirect = async () => {
        if (isLoggedIn()) {
          if (user.autoGenPass) {
            navigate('/ChangePassword');
          } else {
            navigate('/dashboard');
          }
        }
      };
      checkUserAndRedirect();
    }, [user, isLoggedIn, navigate]);

  // Handle the login process
  const handleLogin = async () => {
    
    
    if (emailError || passwordError || !email || !password) {
      return;
    }

    try {

      setLoading(true);
      // Make an API call to authenticate the user
      const response = await axios.post(`${loginapi}/Login`, { email, password });

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
      setShowErrorAlert(true)
      
      // Reload the page after a certain number of login attempts (adjust as needed)
      
    }
    finally {
      // Set loading back to false when the login process completes
      setLoading(false);
    }
  };

  // Check if the email format is valid
  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Handle changes in the email input
  const handleEmailChange = (value) => {
    setEmail(value);
    setEmailError(!value ? 'Email is required' : !isEmailValid(value) ? 'Invalid email format' : '');
    setShowErrorAlert(false)
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
    <PageLayout bgimg={'bgimg'}>
    {isLoggedIn() ? (
      <div className="text-center">
        <Spinner animation="border" role="status">
        </Spinner>
      </div>
    ) : (
      <>
        <Form className="mt-4">
          <h1 className="text-center">Login</h1>
          <p className="text-center">Sign In to your account</p>
          <div className="mb-3">
            {showErrorAlert && (
              <Alert
                variant="danger"
                onClose={() => setShowErrorAlert(false)}
                dismissible
                className="align-items-center"
              >
                Email or password you entered is incorrect
              </Alert>
            )}
            {/* Email Input */}
            <InputGroup hasValidation className="mb-3">
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
            <InputGroup hasValidation className="mb-3">
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
            <Col xs={12} sm={6} className='text-center text-sm-center text-md-start mb-2 mb-sm-0'>
              {/* Login Button */}
              <Button color="primary" className="px-4 w-100" onClick={handleLogin} disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" className="me-2" /> : null}
                Login
              </Button>
            </Col>
            <Col xs={12} sm={6} className='text-center text-sm-center text-md-end'>
              {/* Forgot Password Link */}
              <Link to={'/ForgotPassword'} className="d-block">Forgot password?</Link>
            </Col>
          </Row>
        </Form>
      </>
    )}
  </PageLayout>
  );
};

export default Login;