import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  useColorModes,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilSettings,
  cilCompress,
  cilContrast,
  cilEnvelopeOpen,
  cilMenu,
  cilMoon,
  cilSun,
} from '@coreui/icons'
import { useNotification } from './NotificationContext';
import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import Badge from 'react-bootstrap/Badge';
import TicketNotification from '../../src/views/tNotification/TicketNotification';
import { useUser } from './../context/UserContext'

// import NotificationComponent from './../views/Nots/NotificationComponent'

// import NotificationService from './../views/Nots/NotificationService'

const ticketapi = process.env.REACT_APP_API_TICKET;

const AppHeader = () => {
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const { notifications, removeNotification } = useNotification();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const {user}= useUser();
  const [newTickets, setNewTickets] = useState([]);

  useEffect(() => {
    const fetchNewTickets = async () => {
      try {
        const response = await fetch(`${ticketapi}/new-tickets?email=${user?.email}`);

        if (!response.ok) {
          throw new Error('Failed to fetch new tickets');
        }
        const data = await response.json();
        setNewTickets(data);
        console.log(`new${data}`)
      } catch (error) {
        console.error('Error fetching new tickets:', error);
      }
    };

    fetchNewTickets(); // Fetch new tickets when the component mounts
  }, []); 

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // const handleNotificationClick = (notification) => {
  //   // Handle notification click (if needed)
  //   // For example, mark it as read or redirect to a specific page
  //   removeNotification(notification.id);
  // };

  const toggleFullScreen = () => {
    const docElm = document.documentElement
    const fullScreenEnabled =
      document.fullscreenEnabled ||
      document.mozFullScreenEnabled ||
      document.documentElement.webkitRequestFullScreen

    if (fullScreenEnabled) {
      if (
        !document.fullscreenElement &&
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen()
        } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen()
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen()
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        }
      }
    }
  }

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#" onClick={toggleFullScreen}>
              <CIcon icon={cilCompress} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-auto">
          <CNavItem>
            <CNavLink href = "/#/SettingsNav/Settings">
              <CIcon icon={cilSettings} size="lg" />
            </CNavLink>
          </CNavItem>
            
          
          <CDropdown show={dropdownOpen ? 'true' : 'false'} onToggle={toggleDropdown} variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              <CIcon icon={cilEnvelopeOpen} size="lg" /> <sup><Badge bg="danger">{newTickets.length}</Badge></sup>
            </CDropdownToggle>
            <CDropdownMenu>
              <TicketNotification newTickets={newTickets}/>
            </CDropdownMenu>

          </CDropdown>
        </CHeaderNav>
        <CHeaderNav>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center"
                component="button"
                type="button"
                onClick={() => setColorMode('light')}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center"
                component="button"
                type="button"
                onClick={() => setColorMode('dark')}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'auto'}
                className="d-flex align-items-center"
                component="button"
                type="button"
                onClick={() => setColorMode('auto')}
              >
                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
