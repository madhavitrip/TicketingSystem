import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CContainer } from '@coreui/react';
import PermissionDecorator from './../context/PermissionDecorator';
//  import AccessDeniedPage from './../../src/views/pages/page403/AccessDenied';
import { Spinner } from 'react-bootstrap';



const AllUsers = lazy(() => import('./../views/Users/AllUsers'));
const Dashboard = lazy(() => import('./../views/dashboard/Dashboard'));
const AddUser = lazy(() => import('./../views/Users/AddUser'));
const UpdatePermission = lazy(() => import('./../views/Users/UpdatePermission'));
const Permissions = lazy(() => import('./../views/Users/Permission'));
const EditUser = lazy(() => import('./../views/Users/EditUser'));
const Permission = lazy(() => import('./../views/Users/UserPermissons'));
const AddTicket = lazy(() => import('./../views/Tickets/AddTicket'));
const EditTicket = lazy(() => import('./../views/Tickets/EditTicket'))
const ViewAllTickets = lazy(() => import('./../views/Tickets/ViewAllTickets'))
const Archive = lazy(() => import('./../views/ArchivingTicket/Archive'))

const MasterManagement = lazy(() => import('./../views/Department/Departments'))
const Profile = lazy(() => import('./../views/UserProfile/Profile'))
const Settings = lazy(() => import('./../../src/views/SettingsNav/Settings'))
const PasswordAndSecurity = lazy(() => import('./../views/pages/SettingsFol/PasswordAndSecurity'))
const PersonalDetails = lazy(() => import('./../views/pages/SettingsFol/PersonalDetails'))
const InfoAndPermission = lazy(() => import('./../views/pages/SettingsFol/InfoAndPermission'))


const AppContent = () => {
  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<div className="h-100 w-100 d-flex align-items-center justify-content-center">
        <Spinner color="primary" variant="grow" />
      </div>}>
        <Routes>
          {/* <Route path="/" name="Home" element={<Dashboard />} /> */}
          <Route path="/dashboard" name="Dashboard" element={<Dashboard />} />
          <Route path="/UserProfile" name="Profile" element={<Profile />} />
          <Route path="/UserProfile/Profile/:userId" name="Profile" element={<Profile />} />
          <Route path="/Archive" name="Archive" element={<Archive />} />
          <Route path="/SettingsNav/Settings" name="Settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
          <Route path="/Users/AllUsers" name="All Users" element={<PermissionDecorator moduleId={1} permissionType="canViewOnly" element={<AllUsers />} />} />
          <Route path="/Users/AddUser" name="Add User" element={<PermissionDecorator moduleId={1} permissionType="canAddOnly" element={<AddUser />} />} />
          <Route path="/Users/UpdatePermission/:userId" name="Update Permission"  element={<UpdatePermission />} /> 
          <Route path="/Users/Permission" name="Permission"  element={<Permissions />} /> 
          <Route path="/pages/SettingsFol/PasswordAndSecurity" name="PasswordAndSecurity"  element={<PasswordAndSecurity />} /> 
          <Route path="/pages/SettingsFol/PersonalDetails" name="PersonalDetails"  element={<PersonalDetails />} /> 
          <Route path="/pages/SettingsFol/InfoAndPermission" name="InfoAndPermission"  element={<InfoAndPermission />} /> 


          {/* <Route path="/Users/AllUsers" name="All User" element={<PermissionDecorator moduleId={1} permissionType="canViewOnly" element={<AllUsers />} />} /> */}
          <Route path="/Users/EditUser/:userId" name="Edit User" element={<PermissionDecorator moduleId={1} permissionType="canUpdateOnly" element={<EditUser />} />} />
          <Route path="/Users/AddPermissions/:userId" name="Add Permissions" element={<PermissionDecorator moduleId={1} permissionType="canAddOnly" element={<Permission />} />} />
          <Route path= "/Tickets/AddTicket" name= 'Add Ticket' element={<PermissionDecorator moduleId={2} permissionType="canAddOnly" element={<AddTicket/>}/>} />
          <Route path= "/Tickets" name= "View All Tickets" element={<PermissionDecorator moduleId={2} permissionType="canViewOnly" element={<ViewAllTickets/>}/>} />
          <Route path= "/Users/UpdatePermission" name= "Update Permission" element={<PermissionDecorator moduleId={7} permissionType="canUpdateOnly" element={<UpdatePermission/>}/>} />
          <Route path= "/Tickets/EditTicket/:ticketId" name= "Edit Ticket" element={<PermissionDecorator moduleId={2} permissionType="canUpdateOnly" element={<EditTicket/>}/>} />
          <Route path= "/Department/Departments" name= "Master Management"  element={<MasterManagement/>}/> 

          {/* <Route path="/403" name="Access Denied" element={<AccessDeniedPage />} /> */}
        </Routes>
      </Suspense>
    </CContainer>
  );
};

export default React.memo(AppContent);