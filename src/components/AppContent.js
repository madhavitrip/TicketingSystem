import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CContainer } from '@coreui/react';
import PermissionDecorator from './../context/PermissionDecorator';
// import AccessDeniedPage from './../views/pages/page403/AccessDeniedPage';
import { Spinner } from 'react-bootstrap';


const AllUsers = lazy(() => import('./../views/Users/AllUsers'));
const Dashboard = lazy(() => import('./../views/dashboard/Dashboard'));
const AddUser = lazy(() => import('./../views/Users/AddUser'));
const EditUser = lazy(() => import('./../views/Users/EditUser'));
const Permission = lazy(() => import('./../views/Users/UserPermissons'));
const AddTicket = lazy(() => import('./../views/Tickets/AddTicket'));
const EditTicket = lazy(() => import('./../views/Tickets/EditTicket'))
const ViewAllTickets = lazy(() => import('./../views/Tickets/ViewAllTickets'))
const Notification = lazy(() => import('./../views/Notification/notify'))
const Department = lazy(() => import('./../views/Department/Departments'))


const AppContent = () => {
  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<div className="h-100 w-100 d-flex align-items-center justify-content-center">
        <Spinner color="primary" variant="grow" />
      </div>}>
        <Routes>
          <Route path="/" name="Home" element={<Dashboard />} />
          <Route path="/dashboard" name="Dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
          <Route path="/users" name="All Users" element={<PermissionDecorator moduleId={1} permissionType="can_View" element={<AllUsers />} />} />
          <Route path="/users/add-user" name="Add User" element={<PermissionDecorator moduleId={1} permissionType="can_Add" element={<AddUser />} />} />
          <Route path="/users/all-user/:userId" name="All User" element={<PermissionDecorator moduleId={1} permissionType="can_View" element={<AllUsers />} />} />
          <Route path="/users/edit-user/:userId" name="Edit User" element={<PermissionDecorator moduleId={1} permissionType="can_Update" element={<EditUser />} />} />
          <Route path="/users/AddPermissions/:userId" name="Add Permissions" element={<PermissionDecorator moduleId={1} permissionType="can_Add" element={<Permission />} />} />
          <Route path= "/tickets/add-ticket" name= 'Add Ticket' element={<PermissionDecorator moduleId={2} permissionType="can_Add" element={<AddTicket/>}/>} />
          <Route path= "/tickets/all-tickets" name= "View All Tickets" element={<PermissionDecorator moduleId={2} permissionType="can_View" element={<ViewAllTickets/>}/>} />
          <Route path= "/tickets/edit-ticket/:ticketId" name= "Edit Ticket" element={<PermissionDecorator moduleId={2} permissionType="can_Update" element={<EditTicket/>}/>} />
          <Route path= "/Department/Departments" name= "Department" element={<PermissionDecorator moduleId={3} permissionType="can_View" element={<Department/>}/>} /> 
          <Route path= "/Notifications/notify" name= 'Notification' element={<PermissionDecorator moduleId={2} permissionType="can_Add" element={<Notification/>}/>} />        
          {/* <Route path="/403" name="Access Denied" element={<AccessDeniedPage />} /> */}
        </Routes>
      </Suspense>
    </CContainer>
  );
};

export default React.memo(AppContent);