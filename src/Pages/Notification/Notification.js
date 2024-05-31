import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const Notification = () => {
  const [assignment, setAssignment] = useState([]);
  const socket = io.connect('http://localhost:4000');
  

  useEffect(() => {
    socket.on('assignment_details', (data) => {
        console.log('New assignment received:', data);
        setAssignment((prevAssignments) => [...prevAssignments, data]);
    })
    

    return () => {
      
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div>
        
      <h2>New Assignments</h2>
      
      <ul>
        {assignment.map((info, index) => (
          <li key={index}>{info.title} - {info.subject}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
