import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './AddUser';
import { useSecurity } from './../../context/Security';



const permissionapi = process.env.REACT_APP_API_PERMISSION;
const userapi = process.env.REACT_APP_API_USERS;
const moduleapi = process.env.REACT_APP_API_MODULE;

const PermissionPage = () => {
  const { userId } = useParams();
  const { decrypt } = useSecurity();
  const userID = decrypt(userId);
  const parsedUserID = parseInt(userID, 10);
  const [modulePermissions, setModulePermissions] = useState([]);
  const [modules, setModules] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch user details
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${userapi}/${userID}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, [userID]);


  useEffect(() => {
    // Fetch all modules
    const fetchModules = async () => {
      try {
        const response = await axios.get(moduleapi);
        setModules(response.data);
        setModulePermissions(response.data.map(module =>({
          module_Id:module.id,
          can_View:false,
          can_Add :false,
          can_Update:false,
          can_Delete:false,
        })))
      } catch (error) {
        console.error('Error fetching modules:', error);
      }
    };

    fetchModules();
  }, []);

  const handleInputChange = (module_Id, permissionType, checked) => { 
    setModulePermissions((prevPermissions) => 
      prevPermissions.map((module) => 
        module.module_Id === module_Id 
          ? { 
              ...module, 
              [permissionType]: checked, 
              // Automatically turn off other permissions if can_View is turned off 
              ...(permissionType === 'can_View' && !checked 
                ? { can_Add: false, can_Update: false, can_Delete: false } 
                : {}), 
              // Automatically grant additional permissions based on the updated permission 
              ...(permissionType === 'can_Delete' && checked 
                ? { can_View: true, can_Add: true, can_Update: true } 
                : permissionType === 'can_Update' && checked 
                ? { can_View: true, can_Add: true } 
                : permissionType === 'can_Add' && checked 
                ? { can_View: true } 
                : {}), 
            } 
          : module 
      ) 
    ); 
  };

  const handleAddPermission = () => {

    setLoading(true);
    setErrorMessage('');
    // Transform permissions to the desired format
    const transformedPermissions = modulePermissions.map(({ module_Id, can_View, can_Add, can_Update, can_Delete }) => ({
      userID: parsedUserID,
      id: module_Id, // Assuming there is a module ID associated with each name
      canAddOnly: can_Add,
      canDeleteOnly: can_Delete,
      canUpdateOnly: can_Update,
      canViewOnly: can_View,
    }));
    // Send the updated permissions to your API
    axios.post(permissionapi, transformedPermissions)
      .then(response => {
        // Handle success, e.g., show a success message
        console.log('Permissions added successfully:', response.data);
        setSuccessMessage('Permissions added successfully');

        // Redirect to the permissions page for the user
        navigate(`/permissions/${userID}`);
      })
      .catch(error => {
        // Handle error, e.g., show an error message
        console.error('Error adding permissions:', error);
        setErrorMessage('Error Adding Permissions. Try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container>
      {successMessage && !loading && <Alert variant="success" className="mt-3">{successMessage}</Alert>}
      {errorMessage && !loading && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <Card>
            <Card.Header as="h5" className="text-center">Module Permissions of {user.firstName}</Card.Header>
            <Card.Body>
              <Form>
                <Table bordered>
                  <thead>
                    <tr>
                      <th>Module Name</th>
                      <th>Can View</th>
                      <th>Can Add</th>
                      <th>Can Update</th>
                      <th>Can Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modules.map((mod) => (
                      <tr key={mod.id}>
                        <td>{mod.name}</td>
                        <td>
                          <Form.Check
                            type="switch"
                            id={`${mod.name}-canview-switch`}
                            label=""
                            onChange={(e) => handleInputChange(mod.id, 'can_View', e.target.checked)}
                            checked={modulePermissions.some((p) => p.module_Id === mod.id && p.can_View)}
                          />
                        </td>
                        <td>
                          <Form.Check
                            type="switch"
                            id={`${mod.name}-canadd-switch`}
                            label=""
                            onChange={(e) => handleInputChange(mod.id, 'can_Add', e.target.checked)}
                            checked={modulePermissions.some((p) => p.module_Id === mod.id && p.can_Add)}
                          />
                        </td>
                        <td>
                          <Form.Check
                            type="switch"
                            id={`${mod.name}-canupdate-switch`}
                            label=""
                            onChange={(e) => handleInputChange(mod.id, 'can_Update', e.target.checked)}
                            checked={modulePermissions.some((p) => p.module_Id === mod.id && p.can_Update)}
                          />
                        </td>
                        <td>
                          <Form.Check
                            type="switch"
                            id={`${mod.name}-candelete-switch`}
                            label=""
                            onChange={(e) => handleInputChange(mod.id, 'can_Delete', e.target.checked)}
                            checked={modulePermissions.some((p) => p.module_Id === mod.id && p.can_Delete)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Form>
            </Card.Body>
            <Card.Footer className='text-center'>
              <Button variant="primary" onClick={handleAddPermission}>
                Add Permission
              </Button>
            </Card.Footer>


          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PermissionPage;
