import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Nav, Tab, Collapse, Form, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import './Department.css';
import PermissionChecker from './../../context/PermissionChecker';
import DepartmentList from './DepartmentList';
import CreateDepartmentForm from './CreateDepartmentForm';
import Roles from './Role';
import CreateRoleForm from './CreateRoleForm';
import CreateTicketForm from './CreateTicketForm';
import CreateProjectForm from './CreateProjForm';
import ProjectType from './ProjectType';
import Tickettype from './TicketType';


const Departmentapi = process.env.REACT_APP_API_DEPARTMENTS;
const Roleapi = process.env.REACT_APP_API_ROLES;
const TicketTypeapi = process.env.REACT_APP_API_TICKETTYPE;
const ProjectTypepi = process.env.REACT_APP_API_PROJECTTYPE;
const Department = () => {
    const [activeTab, setActiveTab] = useState('departments');
    const [departments, setDepartments] = useState([]);
    const [newDepartment, setNewDepartment] = useState('');
    const [openCreateDepartment, setOpenCreateDepartment] = useState(true);
    const [roles, setRoles] = useState([]);
    const [newRoles, setNewRoles] = useState('');
    const [openCreateRole, setOpenCreateRole] = useState(false);
    const [project, setProject] = useState([]);
    const [newProject, setNewProject] = useState('');
    const [openProject, setOpenProject] = useState(false);
    const [ticketType, setTicketTypes] = useState([]);
    const [newTicketType, setNewTicketType] = useState('')
    const [openTicketType, setOpenTicketType] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [editItem, setEditItem] = useState(null);
    const [errorMessage, setErrorMessage] = useState('')

    // Fetch departments from the API when the component mounts 
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get(Departmentapi);
                setDepartments(response.data);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };

        fetchDepartments();
    }, []);

    // Fetch roles from the API when the component mounts 
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get(Roleapi);
                setRoles(response.data);
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };

        fetchRoles();
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };


    const handleEdit = (item) => {
        console.log('Edit item:', item);
        setEditItem(item);
    };


    const handleEditSubmit = async (e, id, updatedValue) => {
        e.preventDefault();
        // Check if there is a change in the department name
        if (updatedValue !== '' && updatedValue !== null && updatedValue !== undefined) {
            try {
                await axios.put(`${Departmentapi}/${id}`, {
                    id: id,
                    departmentName: updatedValue,
                });

                setDepartments((prevDepartments) =>
                    prevDepartments.map((dept) =>
                        dept.id === id ? { ...dept, departmentName: updatedValue } : dept
                    )
                );
            } catch (error) {
                console.error('Error updating item:', error);
            }
        }

        setEditItem(null);
        setNewDepartment('');
    };

    const handleEditSubmitRole = async (e, id, updatedValue) => {
        e.preventDefault();
        try {
            await axios.put(`${Roleapi}/${id}`, {
                roleId: id,
                role: updatedValue,
            });

            setRoles((prevRoles) =>
                prevRoles.map((role) =>
                    role.roleId === id ? { ...role, role: updatedValue } : role
                )
            );

            setEditItem(null);
            setNewRoles(''); // Reset newRoles state after submitting
        } catch (error) {
            console.error('Error updating role:', error);
        }
    };

    // Similar functions for TicketTypes and Projects

    const handleEditSubmitTicketType = async (e, id, updatedValue) => {
        e.preventDefault();
        try {
            await axios.put(`${TicketTypeapi}/${id}`, {
                id: id,
                ticketType: updatedValue,
            });

            setTicketTypes((prevTicketTypes) =>
                prevTicketTypes.map((ticket) =>
                    ticket.id === id ? { ...ticket, ticketType: updatedValue } : ticket
                )
            );

            setEditItem(null);
            setNewTicketType(''); // Reset newTicketType state after submitting
        } catch (error) {
            console.error('Error updating ticket type:', error);
        }
    };

    const handleEditSubmitProject = async (e, id, updatedValue) => {
        e.preventDefault();
        try {
            await axios.put(`${ProjectTypepi}/${id}`, {
                id: id,
                projectTypes: updatedValue,
            });

            setProject((prevProjects) =>
                prevProjects.map((project) =>
                    project.id === id ? { ...project, projectTypes: updatedValue } : project
                )
            );

            setEditItem(null);
            setNewProject(''); // Reset newProject state after submitting
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };




    // Fetch projects from the API when the component mounts 
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(ProjectTypepi);
                setProject(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    // Fetch ticket types from the API when the component mounts 
    useEffect(() => {
        const fetchTicketTypes = async () => {
            try {
                const response = await axios.get(TicketTypeapi);
                setTicketTypes(response.data);
            } catch (error) {
                console.error('Error fetching ticket types:', error);
            }
        };

        fetchTicketTypes();
    }, []); // Empty dependency array ensures this effect runs only once on mount 

    const handleCreateDepartment = async (e) => {
        e.preventDefault();
        if (newDepartment.trim() !== '') {
            if (departments.some(department => department.departmentName === newDepartment)) {
                setErrorMessage('Department name must be unique.');
                return;
            }
            try {
                // Send a POST request to create a new department 
                const response = await axios.post(Departmentapi, {
                    departmentName: newDepartment,
                });

                // Update the state with the new department from the server response 
                setDepartments([...departments, response.data]);
                setNewDepartment('');
            } catch (error) {
                console.error('Error creating department:', error);
            }
        }
    };
    const handleCreateRole = async (e) => {
        e.preventDefault();
        if (newRoles.trim() !== '') {
            if (roles.some(role => role.role === newRoles)) {
                setErrorMessage('Role must be unique.');
                return;
            }
            try {
                // Send a POST request to create a new department 
                const response = await axios.post(Roleapi, {
                    role: newRoles,
                });

                // Update the state with the new department from the server response 
                setRoles([...roles, response.data]);
                setNewRoles('');
            } catch (error) {
                console.error('Error creating Role:', error);
            }
        }
    };
    const handleCreateProjectType = async (e) => {
        e.preventDefault();
        if (newProject.trim() !== '') {
            if (project.some(projects => projects.projectTypes === newProject)) {
                setErrorMessage('Project name must be unique.');
                return;
            }
            try {
                // Send a POST request to create a new department 
                const response = await axios.post(ProjectTypepi, {
                    projectTypes: newProject,
                });

                // Update the state with the new department from the server response 
                setProject([...project, response.data]);
                setNewProject('');
            } catch (error) {
                console.error('Error creating Project Name:', error);
            }
        }
    };
    const handleCreateTicketType = async (e) => {
        e.preventDefault();
        if (newTicketType.trim() !== '') {
            if (ticketType.some(ticketTypes => ticketTypes.ticketType === newTicketType)) {
                setErrorMessage('Ticket Type must be unique.');
                return;
            }
            try {
                // Send a POST request to create a new department 
                const response = await axios.post(TicketTypeapi, {
                    ticketType: newTicketType,
                });

                // Update the state with the new department from the server response 
                setTicketTypes([...ticketType, response.data]);
                setNewTicketType('');
            } catch (error) {
                console.error('Error creating Ticket Type:', error);
            }
        }
    };

    return (
        <PermissionChecker>
            {({hasPermission}) => (
        <Container>
            <Row>
                {/* Department List */}
                <Col md={12}>
                    <div className='row mb-3 justify-content-between display flex'>

                        <h4 className='col-sm-3'>Categories</h4>
                        <Form className='col-sm-3'>
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </Form>


                    </div>
                    <div className="col-md-6">


                        <div className="tab-container ">
                            {hasPermission (3,'canViewOnly') && <><input type="radio" name="tab" id="tab1" className="tab tab--1" checked={activeTab === 'departments'} onChange={() => setActiveTab('departments')} />
                            <label className="tab_label" htmlFor="tab1">Departments</label></>}

                            {hasPermission (4,'canViewOnly') && <><input type="radio" name="tab" id="tab2" className="tab tab--2" checked={activeTab === 'roles'} onChange={() => setActiveTab('roles')} />
                            <label className="tab_label" htmlFor="tab2">Roles</label></>}

                            {hasPermission (5,'canViewOnly') && <><input type="radio" name="tab" id="tab3" className="tab tab--3" checked={activeTab === 'ticketType'} onChange={() => setActiveTab('ticketType')} />
                            <label className="tab_label" htmlFor="tab3">Ticket Types</label></>}

                            {hasPermission (6,'canViewOnly') && <><input type="radio" name="tab" id="tab4" className="tab tab--4" checked={activeTab === 'project'} onChange={() => setActiveTab('project')} />
                            <label className="tab_label" htmlFor="tab4">Projects</label></>}

                            <div className="indicator"></div>
                        </div>
                    </div>
                    <Container>
                        {/* Other JSX code */}
                        {activeTab === 'departments' && (
                            <Row>
                                
                                {hasPermission (3,'canViewOnly') && <Col md={6}>

                                    <DepartmentList
                                        departments={departments}
                                        handleEdit={handleEdit}
                                        handleEditSubmit={handleEditSubmit}
                                        newDepartment={newDepartment}
                                        setNewDepartment={setNewDepartment}
                                        editItem={editItem}
                                        searchQuery={searchQuery} // Pass search query as prop 

                                    />
                                </Col>}
                                {hasPermission (3,'canAddOnly') &&<Col md={6} className="position-relative">
                                    <Button
                                        onClick={() => setOpenCreateDepartment(!openCreateDepartment)}
                                        aria-controls="create-department-collapse"
                                        aria-expanded={openCreateDepartment}
                                        className="mb-3 position-absolute top-0 end-0"
                                    >
                                        Create
                                    </Button>
                                    <CreateDepartmentForm
                                        newDepartment={newDepartment}
                                        setNewDepartment={setNewDepartment}
                                        handleCreateDepartment={handleCreateDepartment}
                                        openCreateDepartment={openCreateDepartment} // Pass openCreateDepartment as a prop 
                                    />
                                </Col>}
                            </Row>
                        )}
                        {activeTab === 'roles' && (
                            <Row>
                                 {hasPermission (4,'canViewOnly') &&<Col md={6}>

                                    <Roles
                                        roles={roles}
                                        handleEdit={handleEdit}
                                        handleEditSubmitRole={handleEditSubmitRole}
                                        newRoles={newRoles}
                                        setNewRoles={setNewRoles}
                                        editItem={editItem}

                                        searchQuery={searchQuery}
                                    />
                                </Col>}
                                {hasPermission (4,'canAddOnly') &&<Col md={6} className="position-relative">
                                    <Button
                                        onClick={() => setOpenCreateRole(!openCreateRole)}
                                        aria-controls="create-role-collapse"
                                        aria-expanded={openCreateRole}
                                        className="mb-3 position-absolute top-0 end-0"
                                    >
                                        Create
                                    </Button>
                                    <CreateRoleForm
                                        newRoles={newRoles}
                                        setNewRoles={setNewRoles}
                                        handleCreateRole={handleCreateRole}
                                        openCreateRole={openCreateRole}
                                    />
                                </Col>}
                            </Row>
                        )}
                        {activeTab === 'ticketType' && (
                            <Row>
                                 {hasPermission (5,'canViewOnly') &&<Col md={6}>

                                    <Tickettype
                                        ticketType={ticketType}
                                        handleEdit={handleEdit}
                                        handleEditSubmitTicketType={handleEditSubmitTicketType}
                                        newTicketType={newTicketType}
                                        setNewTicketType={setNewTicketType}
                                        editItem={editItem}

                                        searchQuery={searchQuery}
                                    />
                                </Col>}
                                {hasPermission (5,'canAddOnly') &&<Col md={6} className="position-relative">
                                    <Button
                                        onClick={() => setOpenTicketType(!openTicketType)}
                                        aria-controls="create-tickettype-collapse"
                                        aria-expanded={openTicketType}
                                        className="mb-3 position-absolute top-0 end-0"
                                    >
                                        Create
                                    </Button>
                                    <CreateTicketForm
                                        newTicketType={newTicketType}
                                        setNewTicketType={setNewTicketType}
                                        handleCreateTicketType={handleCreateTicketType}
                                        openTicketType={openTicketType}
                                    />
                                </Col>}
                            </Row>
                        )}
                        {activeTab === 'project' && (
                            <Row>
                                 {hasPermission (6,'canViewOnly') &&<Col md={6}>

                                    <ProjectType
                                        project={project}
                                        handleEdit={handleEdit}
                                        handleEditSubmitProject={handleEditSubmitProject}
                                        newProject={newProject}
                                        setNewProject={setNewProject}
                                        editItem={editItem}

                                        searchQuery={searchQuery}
                                    />
                                </Col>}
                                {hasPermission (6,'canAddOnly') &&<Col md={6} className="position-relative">
                                    <Button
                                        onClick={() => setOpenProject(!openProject)}
                                        aria-controls="create-role-collapse"
                                        aria-expanded={openProject}
                                        className="mb-3 position-absolute top-0 end-0"
                                    >
                                        Create
                                    </Button>
                                    <CreateProjectForm
                                        newProject={newProject}
                                        setNewProject={setNewProject}
                                        handleCreateProjectType={handleCreateProjectType}
                                        openProject={openProject}
                                    />
                                </Col>}
                            </Row>
                        )}

                    </Container>
                    <Tab.Content>
                        <Tab.Pane eventKey="departments">
                            <Table responsive hover bordered striped>

                            </Table>
                        </Tab.Pane>

                        <Tab.Pane eventKey="roles">
                            <Table responsive hover bordered striped>

                            </Table>
                        </Tab.Pane>

                        <Tab.Pane eventKey="ticketType">
                            <Table responsive hover bordered striped>

                            </Table>
                        </Tab.Pane>

                        <Tab.Pane eventKey="project">
                            <Table responsive hover bordered striped>
                                {/* Render project data here */}

                            </Table>
                        </Tab.Pane>
                    </Tab.Content>

                </Col>
            </Row>
        </Container>
        )}
        </PermissionChecker>
    );

};

export default Department;