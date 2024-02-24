import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PermissionPage = () => {
  const [permissions, setPermissions] = useState([]);

  const handlePermissionChange = (moduleName, permissionType, isChecked) => {
    const updatedPermissions = [...permissions];
    const moduleIndex = updatedPermissions.findIndex(module => module.name === moduleName);

    if (moduleIndex !== -1) {
      const module = updatedPermissions[moduleIndex];
      module[permissionType] = isChecked;
      updatedPermissions[moduleIndex] = module;
    } else {
      updatedPermissions.push({
        name: moduleName,
        candelete: false,
        canview: false,
        canadd: false,
        canupdate: false,
        [permissionType]: isChecked
      });
    }

    setPermissions(updatedPermissions);
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <Card>
            <Card.Header as="h5" className="text-center">Module Permissions</Card.Header>
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
                    <tr>
                      <td>Module 1</td>
                      <td>
                        <Form.Check
                          type="switch"
                          id="candelete-switch"
                          label=""
                          onChange={e => handlePermissionChange('Module 1', 'canview', e.target.checked)}
                        />
                      </td>
                      <td>
                        <Form.Check
                          type="switch"
                          id="canview-switch"
                          label=""
                          onChange={e => handlePermissionChange('Module 1', 'canadd', e.target.checked)}
                        />
                      </td>
                      <td>
                        <Form.Check
                          type="switch"
                          id="canadd-switch"
                          label=""
                          onChange={e => handlePermissionChange('Module 1', 'canupdate', e.target.checked)}
                        />
                      </td>
                      <td>
                        <Form.Check
                          type="switch"
                          id="canupdate-switch"
                          label=""
                          onChange={e => handlePermissionChange('Module 1', 'candelete', e.target.checked)}
                        />
                      </td>
                    </tr>
                    {/* Add more rows for other modules */}
                  </tbody>
                </Table>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center mt-3">
        <Col md={8}>
          <Card className="mt-3">
            <Card.Body>
              <div className="permissions-summary">
                <h5 className="text-center mb-4">Permissions Summary</h5>
                <ul className="list-unstyled">
                  {permissions.map((module, index) => (
                    <li key={index}>
                      <strong>{module.name}</strong>: {Object.entries(module).filter(([key, value]) => value && key !== 'name').map(([key]) => key).join(', ')}
                    </li>
                  ))}
                </ul>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PermissionPage;
