import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Alert, Table, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUser } from './../../../context/UserContext';
import axios from 'axios';
import { useSecurity } from './../../../context/Security';

const UpdatePermissionPage = () => {
    const { decrypt } = useSecurity();
    const [permissions, setPermissions] = useState([]);
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    

    // Assume you have a method to get the logged-in user's ID
    const {user} = useUser();

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const response = await axios.get(`https://localhost:7217/api/Permission/ByUser/${user?.userId}`);
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
    }, [user.userId]);

    const getModuleNameById = (moduleId) => {
        const module = modules.find(m => m.id === moduleId);
        return module ? module.name : 'Unknown';
    };

    return (
        <Container>
            {successMessage && !loading && <Alert variant="success" className="mt-3">{successMessage}</Alert>}
            {errorMessage && !loading && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
            <Row className="justify-content-center">
    <Col md={12}>
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
                {permissions.map(permission => (
                    <tr key={permission.permission_Id}>
                        <td>{getModuleNameById(permission.id)}</td>
                        <td>{permission.canViewOnly ? 'Yes' : 'No'}</td>
                        <td>{permission.canAddOnly ? 'Yes' : 'No'}</td>
                        <td>{permission.canUpdateOnly ? 'Yes' : 'No'}</td>
                        <td>{permission.canDeleteOnly ? 'Yes' : 'No'}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </Col>
</Row>

        </Container>
    );
};

export default UpdatePermissionPage;
