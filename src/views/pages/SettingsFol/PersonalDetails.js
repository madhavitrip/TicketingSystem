import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSecurity } from './../../../context/Security';
import { useUser } from './../../../context/UserContext';


const departmentapi = process.env.REACT_APP_API_DEPARTMENTS;
const roleapi = process.env.REACT_APP_API_ROLES;
const userapi = process.env.REACT_APP_API_USERS;

function PersonalDetails() {


    const [message, setMessage] = useState(null);
    const { user } = useUser();
    const { decrypt } = useSecurity();
    const [departments, setDepartments] = useState([]);
    const [Roles, setRoles] = useState([]);
    const decryptid = decrypt(user?.userId);
    const [formData, setFormData] = useState({

        firstName: '',
        lastName: '',
        email: '',
        password: '',
        //confirmPassword: '',
        mobileNo: '',
        departmentName: '',
        role: '',
        address: '',
        dateOfBirth: '',
    });


    useEffect(() => {
        axios.get(`${userapi}/${decryptid}`)
            .then(res => {
                setFormData(res.data);
                console.log(res.data)
            })
            .catch(err => {
                console.log(err);
                setMessage('Error updating user. Please try again.');
            });
    }, [decryptid]);

    useEffect(() => {
        async function fetchDepartments() {
            try {
                const response = await axios.get(departmentapi);
                setDepartments(response.data);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        }

        fetchDepartments();
    }, []);

    useEffect(() => {
        async function fetchRoles() {
            try {
                const response = await axios.get(roleapi);
                setRoles(response.data);
            } catch (error) {
                console.error('Error fetching Roles:', error);
            }
        }

        fetchRoles();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'file' ? e.target.files : value,
        }));
    };

    function handleUserSubmit(event) {
        event.preventDefault();
        axios.put(`${userapi}/${decryptid}`, formData)
            .then(res => {
                console.log(res);
                setMessage('User updated successfully!');
            })
            .catch(err => {
                console.log(err);
                setMessage('Error updating user. Please try again.');
            });
    }

    return (
        <Form onSubmit={handleUserSubmit}>

            {message && (
                <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`} role="alert">
                    {message}
                </div>
            )}

            <Row className="mb-3">
                <Form.Group as={Col} htmlFor="firstName">
                    <Form.Label>FirstName</Form.Label>
                    <Form.Control type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        placeholder="Enter FirstName"
                        required
                        onChange={handleInputChange}
                        value={formData.firstName}
                        disabled />
                </Form.Group>

                <Form.Group as={Col} htmlFor="lastName">
                    <Form.Label>LastName</Form.Label>
                    <Form.Control type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        placeholder="Enter lastName"
                        required
                        onChange={handleInputChange}
                        value={formData.lastName}
                        disabled />


                </Form.Group>


            </Row>


            <Row className="mb-3">

                <Form.Group as={Col} htmlFor="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        required
                        onChange={handleInputChange}
                        value={formData.email}
                        disabled />
                </Form.Group>

                <Form.Group as={Col} htmlFor="dateOfBirth">
                    <Form.Label>DOB</Form.Label>
                    <Form.Control type="date"
                        className="form-control"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        placeholder="Enter Date Of Birth"
                        required
                        onChange={handleInputChange}
                        value={formData.dateOfBirth}
                        disabled />
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" htmlFor="address">
                <Form.Label>Address</Form.Label>
                <Form.Control type="address"
                    className="form-control"
                    id="address"
                    name="address"
                    placeholder="Enter Address"
                    required
                    onChange={handleInputChange}
                    value={formData.address} />
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col} htmlFor="mobileNo">
                    <Form.Label>MobileNo</Form.Label>
                    <Form.Control type="text"
                        className="form-control"
                        id="mobileNo"
                        name="mobileNo"
                        placeholder="Enter Mobile No."
                        required
                        onChange={handleInputChange}
                        value={formData.mobileNo} />
                </Form.Group>

                <Form.Group as={Col} htmlFor="departmentName">
                    <Form.Label>Department</Form.Label>
                    <div className="">
                        <select
                            className="form-select"
                            id="departmentName"
                            name="departmentName"
                            value={formData.departmentName}  // Set value attribute to formData.departmentName
                            required
                            onChange={handleInputChange}      // Use handleInputChange to update the formData
                        >
                            {departments.map(dep => (
                                <option key={dep.id} value={dep.departmentName}>{dep.departmentName}</option> // Set value to dep.departmentName
                            ))}
                        </select>
                    </div>
                </Form.Group>
                <Form.Group as={Col} htmlFor="role">
                    <Form.Label>Designation</Form.Label>


                    <div className="">
                        <select
                            type="text"
                            className="form-select"
                            id="role"
                            name="role"

                            required
                            onChange={handleInputChange}
                        >

                            {Roles.map(role => (
                                <option key={role.roleId} value={role.role}>{role.role}</option>
                            ))}
                        </select>
                    </div>


                </Form.Group>
            </Row>



            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default PersonalDetails;