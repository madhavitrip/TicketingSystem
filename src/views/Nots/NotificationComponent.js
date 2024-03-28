import React, { useEffect, useState } from 'react'; 
import * as signalR from '@microsoft/signalr'; 

const NotificationsComponent = () => { 
    const [notifications, setNotifications] = useState([]); 

    useEffect(() => { 
        const connection = new signalR.HubConnectionBuilder() 
            .withUrl("https://localhost:7217/notificationHub/") 
            .build(); 

        connection.start() 
            .then(() => console.log("SignalR Connected")) 
            .catch(error => console.error("SignalR Connection Error: ", error)); 

        connection.on("ReceiveNotification", ticketTitle => {
            console.log("[SignalR] Received Notification:", ticketTitle);
            const notification = `New ticket added: ${ticketTitle}`; 
            setNotifications(prevNotifications => [...prevNotifications, notification]); 
            localStorage.setItem("notifications", JSON.stringify([...notifications, notification]));
            console.log("Stored notifications in local storage:", [...notifications, notification]);
        }); 

        connection.onclose((error) => {
            console.error("SignalR Connection Closed: ", error);
            // Attempt to reconnect or handle the closure as needed
        })
        return () => { 
            connection.stop(); 
        }; 
    }, []); 

    useEffect(() => { 
        const storedNotifications = JSON.parse(localStorage.getItem("notifications")) || []; 
        setNotifications(storedNotifications); 
    }, []); 

    return ( 
        <div> 
            <ul className="list-unstyled">
                {notifications.map((notification, index) => (
                    <li key={index}>{notification}</li>
                ))}
            </ul>
        </div> 
    ); 
}; 

export default NotificationsComponent;
