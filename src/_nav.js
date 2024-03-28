import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilGroup,
   cilUserPlus,
  cilPlus,
  cilPeople,
  cilHamburgerMenu,
  // cilHandshake,
  // cilCalculator,
  // cilChartPie,
  // cilCursor,
  // cilDescription,
   cilNotes,
  cilPencil,
  // cilPuzzle,
  // cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Management',
  },
  // UserLeftNavList
  {
    component: CNavGroup,
    name: 'Tickets',
    module:2,
    permission:'canViewOnly',
    // to: '/users/all-users',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Ticket',
        module:2,
    permission:'canAddOnly',
        to: '/Tickets/AddTicket',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'All Tickets',
        module:2,
    permission:'canViewOnly',
        to: '/Tickets',
        icon: <CIcon icon={cilHamburgerMenu} customClassName="nav-icon" />,
      },
    ],
  },
  // Permission
  {
    
        component:CNavItem,
        name: 'Permission',
        module:7,
        permission: 'canViewOnly',
        to: '/Users/Permission',
        icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },

  // Archive
  {
    component:CNavItem,
    name: 'Archive',
    to: '/Archive',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
},
  
  // Roles
  {
    component: CNavGroup,
    name: 'User',
    module:1,
    permission: 'canViewOnly',
    // to: '/users/all-users',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add User',
        module:1,
    permission: 'canAddOnly',
        to: '/Users/AddUser',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'All Users',
        module:1,
    permission: 'canViewOnly',
        to: '/Users/AllUsers',
        icon: <CIcon icon={cilHamburgerMenu} customClassName="nav-icon" />,
      },
    ],
  },
  //Priority

  // Clients
  {
    component: CNavItem,
    name: 'Master Management',
    to: '/Department/Departments',
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
    
  },
]

export default _nav
