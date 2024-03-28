import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import UpdatePermissionPage from './UpdatePermission';

const Permission = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDepartment, setUserDepartment] = useState('');
  const [showPermissionPage, setShowPermissionPage] = useState(false);


  useEffect(() => {
    // Fetch user data from your API and set the users state
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://localhost:7217/api/Users'); // Replace this with your API endpoint
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Function to handle user selection
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setUserDepartment(user.departmentName);
  };
  console.log(selectedUser?.value)


  // Function to handle viewing permissions
  const handleViewPermission = () => {
    setShowPermissionPage(true);
  };

  return (
    <Container className="py-4">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <h5 className="mb-4">Select User to View Permissions</h5>
              <Select
                options={users.map((user) => ({
                  value: user.userId,
                  label: `${user.firstName} ${user.lastName}`,
                  departmentName: user.departmentName, // Added departmentName property
                }))}
                filterOption={({ label }, searchString) => {
                  return label.toLowerCase().includes(searchString.toLowerCase());
                }}
                placeholder="Search for a user..."
                onChange={handleUserSelect}
                value={selectedUser}
              />
              {selectedUser && (
                <div className="mt-4 ">
                  <h6>Department Name: {userDepartment}</h6>
                  <div className='text-center'>
                    <Button onClick={handleViewPermission}>View Permission</Button>
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
        {showPermissionPage && selectedUser && (
            <UpdatePermissionPage userid={selectedUser?.value} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Permission;
