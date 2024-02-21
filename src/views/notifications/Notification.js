import React, { useEffect, useState } from 'react';
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react';
import {cilEnvelopeOpen} from '@coreui/icons';
import { useUser } from './../../context/UserContext';

const Notification = () => {
  const{user}=useUser();
  // State to store the new ticket count
  const [newTicketsCount, setNewTicketsCount] = useState(0);

  // Function to fetch the new ticket count from the backend
  const fetchNewTicketsCount = async () => {
    try {
      const response = await fetch(`https://localhost:7217/api/Tickets/new-tickets-count?email=${user.email}`);
      const data = await response.json();
      setNewTicketsCount(data.count); // Update the new ticket count
    } catch (error) {
      console.error('Error fetching new tickets count:', error);
    }
  };

  // useEffect hook to fetch the new ticket count initially and start polling for updates
  useEffect(() => {
    fetchNewTicketsCount(); // Fetch new ticket count initially

    // Start polling for updates every 5 seconds
    const intervalId = setInterval(fetchNewTicketsCount, 5000);

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, []);

  return (
    <CDropdown inNav className="c-header-nav-item mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-icon">
          <cilEnvelopeOpen size="xl" />
          {newTicketsCount > 0 && <span className="badge badge-pill badge-danger">{newTicketsCount}</span>}
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        {/* Dropdown items */}
      </CDropdownMenu>
    </CDropdown>
  );
};
export default Notification;