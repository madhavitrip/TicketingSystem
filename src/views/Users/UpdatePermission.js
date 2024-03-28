import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Alert, Table, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useSecurity } from './../../context/Security';
import PropTypes from "prop-types";
import PermissionChecker from './../../context/PermissionChecker';

const UpdatePermissionPage = ({userid}) => {
    const userId = userid
    const { decrypt } = useSecurity();
    const [permissions, setPermissions] = useState([]);
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedPermissionId, setSelectedPermissionId] = useState(null);

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const response = await axios.get(`https://localhost:7217/api/Permission/ByUser/${userId}`);
                setPermissions(response.data);
            } catch (error) {
                console.error('Error fetching permissions:', error);
                setErrorMessage('Error fetching permissions. Please try again.');
            }
        };

        const fetchModules = async () => {
            try {
                const response = await axios.get('https://localhost:7217/api/Module');
                setModules(response.data);
            } catch (error) {
                console.error('Error fetching modules:', error);
                setErrorMessage('Error fetching modules. Please try again.');
            }
        };

        fetchPermissions();
        fetchModules();
    }, [userId]);

    const handlePermissionChange = async (permissionId, field, isChecked) => {
        setLoading(true);
        setErrorMessage('');

        try {
            const updatedPermissions = permissions.map(permission => {
                if (permission.permission_Id === permissionId) {
                    if (field === 'canViewOnly' && !isChecked) {
                        return {
                            ...permission,
                            canViewOnly: false,
                            canAddOnly: false,
                            canUpdateOnly: false,
                            canDeleteOnly: false
                        };
                    }
                    // Automatically grant additional permissions based on the updated permission
                    return {
                        ...permission,
                        [field]: isChecked,
                        ...(field === 'canViewOnly' && isChecked
                            ? { canAddOnly: false, canUpdateOnly: false, canDeleteOnly: false }
                            
                            : field === 'canAddOnly' && isChecked
                            ? { canViewOnly: true }
                            : field === 'canUpdateOnly' && isChecked
                            ? { canViewOnly: true, canAddOnly: true }
                            : field === 'canDeleteOnly' && isChecked
                            ? { canViewOnly: true, canAddOnly: true, canUpdateOnly: true }
                            : {})
                    };
                }
                return permission;
            });

            setPermissions(updatedPermissions);
            setSelectedPermissionId(permissionId);

            const updatedPermission = updatedPermissions.find(permission => permission.permission_Id === permissionId);
            console.log('Updated Permission:', updatedPermission);
            if (!updatedPermission) {
                setErrorMessage('Updated permission not found. Please try again.');
                return;
            }

            const { permission_Id: updatedPermissionId, userID, id, canAddOnly, canDeleteOnly, canUpdateOnly, canViewOnly } = updatedPermission;
            await axios.put(`https://localhost:7217/api/Permission/${updatedPermissionId}`, {
                permission_Id: updatedPermissionId,
                userID,
                id,
                canAddOnly,
                canDeleteOnly,
                canUpdateOnly,
                canViewOnly
            });
            setSuccessMessage('Permissions updated successfully');
        } catch (error) {
            console.error('Error updating permissions:', error);
            setErrorMessage('Error updating permissions. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getModuleNameById = (moduleId) => {
        const module = modules.find(m => m.id === moduleId);
        return module ? module.name : 'Unknown';
    };

    return (
        <PermissionChecker>
        {({hasPermission}) => ( 
            hasPermission(7, 'canUpdateOnly') &&  // Check if user has permission to update permissions

        <Container>
            {successMessage && !loading && <Alert variant="success" className="mt-3">{successMessage}</Alert>}
            {errorMessage && !loading && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
            <Row className="justify-content-center">
                <Col md={12}>
                    <Card>
                        <Card.Header as="h5" className="text-center">Update Permissions</Card.Header>
                        <Card.Body>
                            <Form className='table-responsive'>
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
                                        {permissions.length >
                                            0 && permissions.map(permission => (
                                                <tr key={permission.permission_Id}>
                                                    <td>{getModuleNameById(permission.id)}</td>
                                                    <td>
                                                        <Form.Check
                                                            type="switch"
                                                            id={`${getModuleNameById(permission.id)}-canview-switch`}
                                                            label=""
                                                            checked={permission.canViewOnly}
                                                            onChange={e => handlePermissionChange(permission.permission_Id, 'canViewOnly', e.target.checked)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Form.Check
                                                            type="switch"
                                                            id={`${getModuleNameById(permission.id)}-canadd-switch`}
                                                            label=""
                                                            checked={permission.canAddOnly}
                                                            onChange={e => handlePermissionChange(permission.permission_Id, 'canAddOnly', e.target.checked)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Form.Check
                                                            type="switch"
                                                            id={`${getModuleNameById(permission.id)}-canupdate-switch`}
                                                            label=""
                                                            checked={permission.canUpdateOnly}
                                                            onChange={e => handlePermissionChange(permission.permission_Id, 'canUpdateOnly', e.target.checked)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Form.Check
                                                            type="switch"
                                                            id={`${getModuleNameById(permission.id)}-candelete-switch`}
                                                            label=""
                                                            checked={permission.canDeleteOnly}
                                                            onChange={e => handlePermissionChange(permission.permission_Id, 'canDeleteOnly', e.target.checked)}
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </Table>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        )}
        </PermissionChecker>
    );
};

UpdatePermissionPage.propTypes = {
    userid: PropTypes.string.isRequired,
  };
export default UpdatePermissionPage;
