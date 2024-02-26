import React, { useState } from 'react';
import { useUser } from './../../context/UserContext';
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react';
import { cilSettings, cilArrowThickToRight, cilUser } from '@coreui/icons';
import CIcon from '@coreui/icons-react';


const AppHeaderDropdown = (userDetails) => {
  const { logout } = useUser();
  const [selectedProfilePicture, setSelectedProfilePicture] = useState(null);

  const handleProfilePictureChange = (profilePicture) => {
    setSelectedProfilePicture(profilePicture);
    // Additional logic if needed, such as saving to the server
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={selectedProfilePicture || '/path-to-default-avatar.jpg'} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem href="/UserProfile">
          <CIcon icon={ cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem onClick={handleLogout}>
          <CIcon icon={cilArrowThickToRight} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
