import React, { useEffect, useState, useRef } from 'react';
import './InfoAndPermission.css';
import { useUser } from './../../../context/UserContext';
import $ from 'jquery'; // Import jQuery
import { useParams } from 'react-router-dom';
import PermissionLoggedInUser from './PermissionLoggedInUser'; // Import the UpdatePermissionPage component

const dashboardapi = process.env.REACT_APP_MY_SERVER;
const baseapi = process.env.REACT_APP_BASE_URL;
const userapi = process.env.REACT_APP_API_USERS;
const ticketapi = process.env.REACT_APP_API_TICKET;

const InfoAndPermission = () => {
    const { userId } = useParams();
    const counterRef = useRef(null);
    const assignedTicketsCounterRef = useRef(null);
    const resolvedTicketsCounterRef = useRef(null);
    const [userDetails, setUserDetails] = useState({});
    const { user } = useUser();
    const userID = userId ? userId : user.userId;

    const [assignedTicketsCount, setAssignedTicketsCount] = useState(null);
    const [resolvedTicketsCount, setResolvedTicketsCount] = useState(null);

    useEffect(() => {
        if (userID) {
            fetch(`${userapi}/${userID}`)
                .then((response) => response.json())
                .then((userData) => {
                    console.log('Fetched user details:', userData);
                    setUserDetails(userData);
                })
                .catch((error) => {
                    console.error('Error fetching user details:', error);
                });
        }
    }, [userID]);


    useEffect(() => {
        if (userDetails?.email) {
            fetchAssignedTicketsCount();
            fetchResolvedTicketsCount();
        }
    }, [userDetails?.email]);


    useEffect(() => {
        if (assignedTicketsCount !== null) {
            animateCounter(assignedTicketsCounterRef, assignedTicketsCount);
        }
    }, [assignedTicketsCount]);

    useEffect(() => {
        if (resolvedTicketsCount !== null) {
            animateCounter(resolvedTicketsCounterRef, resolvedTicketsCount);
        }
    }, [resolvedTicketsCount]);

    const animateCounter = (counterRef, targetValue) => {
        let startValue = 0;
        const step = targetValue / 50;

        const interval = setInterval(() => {
            startValue += step;
            if (startValue >= targetValue) {
                startValue = targetValue;
                clearInterval(interval);
            }

            $(counterRef.current).find('.counter-value').text(Math.ceil(startValue));
        }, 40);
    };

    const fetchAssignedTicketsCount = async () => {
        try {
            const response = await fetch(`${ticketapi}/status-count?email=${userDetails.email}`);
            if (!response.ok) {
                throw new Error(`Error fetching assigned tickets count: ${response.status}`);
            }

            const data = await response.json();
            const totalAssignedCount = data.activeCount + data.pendingCount + data.selfassignedCount + data.completedCount;
            setAssignedTicketsCount(totalAssignedCount);
            console.log('Assigned Tickets Count:', totalAssignedCount);
        } catch (error) {
            console.error('Error fetching assigned tickets count:', error);
        }
    };

    const fetchResolvedTicketsCount = async () => {
        try {
            const response = await fetch(`${ticketapi}/status-count?email=${userDetails.email}`);
            if (!response.ok) {
                throw new Error(`Error fetching resolved tickets count: ${response.status}`);
            }

            const data = await response.json();
            const totalResolvedCount = data.completedCount;
            setResolvedTicketsCount(totalResolvedCount);
            console.log('Resolved Tickets Count:', totalResolvedCount);
        } catch (error) {
            console.error('Error fetching resolved tickets count:', error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="card" >
                        <div className="card-details mt-2">
                            <p className="text-title text-center">Tickets Assigned</p>
                            <div ref={assignedTicketsCounterRef}>
                                <p className="text-body text-center">{assignedTicketsCount}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <div className="card-details mt-2">
                            <p className="text-title text-center">Tickets Resolved</p>
                            <p className="text-body text-center">{resolvedTicketsCount}</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Integrate the PermissionLoggedInUser component */}
            <div className="row mt-4">
                <div className="">
                    <h3>Permissions: </h3>
                    <PermissionLoggedInUser userid={userID} />
                </div>
            </div>
        </div>
    );
};

export default InfoAndPermission;
