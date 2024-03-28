import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cilLockLocked } from '@coreui/icons';
import { Col, Row, Form, InputGroup, Button, Alert, Card, CardBody, CardGroup, Container } from 'react-bootstrap'; // Import necessary components from react-bootstrap
import axios from 'axios';
import CIcon from '@coreui/icons-react';
import { useUser } from './../../../context/UserContext'; // Import useUser hook
import './../login/Login.css'; // Import CSS from the Login page


const ChangePasswordApi = process.env.REACT_APP_API_CHANGE_PASSWORD;
const theme = '#FF725E';
const ChangePassword = () => {
  const { logout, user } = useUser(); // Destructure the logout function from the useUser hook

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [passwordVisibility, setPasswordVisibility] = useState({
    currentPassword: false,
    newPassword: false,
  });

  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState({
    success: '',
    error: '',
  });

  // Handle password change input
  const handlePasswordChange = (field, value) => {
    setPasswords((prevPasswords) => ({ ...prevPasswords, [field]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [field]: value.trim() ? '' : `${field.charAt(0).toUpperCase() + field.slice(1)} is required` }));

    // Additional validation for newPassword
    if (field === 'newPassword') {
      const alphanumericRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
      setErrors((prevErrors) => ({
        ...prevErrors,
        newPassword: value.length < 8 ? 'New Password must be at least 8 characters long' : !alphanumericRegex.test(value)
          ? 'Password must contain at least one letter, one number, and one special character'
          : '',
      }));
    }

    // Clear alerts when typing in currentPassword
    if (field === 'currentPassword') {
      setMessages({ success: '', error: '' });
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prevVisibility) => ({ ...prevVisibility, [field]: !prevVisibility[field] }));
  };

  // Validate passwords
  const validatePasswords = () => {
    const { currentPassword, newPassword } = passwords;
    const newErrors = {};

    ['currentPassword', 'newPassword'].forEach((field) => {
      if (!passwords[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    if (newPassword.length < 8) {
      newErrors.newPassword = 'New Password must be at least 8 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle change password button click
  const handleChangePassword = async () => {
    if (!validatePasswords()) {
      return;
    }

    setLoading(true);

    try {
      // Make API call to change password
      const response = await axios.put(`${ChangePasswordApi}/${user.userId}`, {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });

      if (response.status === 200) {
        // Password change successful
        setMessages({ success: 'Your password has been changed. Please login again.', error: '' });

        // Logout after 3 seconds
        setTimeout(() => {
          logout();
        }, 3000);
      } else if (response.status === 400) {
        // Incorrect old password
        setMessages({ success: '', error: 'Enter Correct Old Password!' });
      } else {
        // Handle other status codes
        setMessages({ success: '', error: 'Password change failed. Please try again.' });
      }
    } catch (error) {
      // Network error or other issues
      setMessages({ success: '', error: 'Enter Correct Old Password!' });
    } finally {
      // Always set loading to false after the request is completed
      setLoading(false);
    }
  };

  return (
    
      <Container>
        <Form>
          <h1>Password Reset</h1>
          <p>Change your password</p>
          {messages.success && <Alert variant="success">{messages.success}</Alert>}
          {messages.error && <Alert variant="danger">{messages.error}</Alert>}
          {['currentPassword', 'newPassword'].map((field) => (
            <div key={field} className="mb-4">
              <InputGroup hasValidation>
                <InputGroup.Text>
                  <CIcon icon={cilLockLocked} />
                </InputGroup.Text>
                <Form.Control
                  type={passwordVisibility[field] ? 'text' : 'password'}
                  placeholder={field === 'currentPassword' ? 'Current Password' : 'New Password'}
                  autoComplete={field === 'currentPassword' ? 'old-password' : 'new-password'}
                  value={passwords[field]}
                  onChange={(e) => handlePasswordChange(field, e.target.value)}
                  isInvalid={!!errors[field]}
                />
                <InputGroup.Text onClick={() => togglePasswordVisibility(field)} className="hovericon">
                  {passwordVisibility[field] ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                </InputGroup.Text>
                <Form.Control.Feedback type="invalid">{errors[field]}</Form.Control.Feedback>
              </InputGroup>
            </div>
          ))}
          <Row>
            <Col xs={6} className='align-items-start'>
              {/* Change Password Button */}
              <Button variant="primary" className="px-4 " style={{ backgroundColor: theme }} onClick={handleChangePassword} disabled={loading}>
                {loading ? 'Changing Password...' : 'Change Password'}
              </Button>
            </Col>
            <Col xs={6} className='text-end fs-5'>
              {/* Reset Password Button */}
              <Link to="/Login" color="primary" className="px-4" style={{ color: theme }} onClick={handleChangePassword}>
                Login
              </Link>
            </Col>
          </Row>
        </Form>
      </Container>
  
  );
};

export default ChangePassword;
