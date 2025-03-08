import React, { useEffect } from 'react';
import { useSocket } from '../contexts/SocketContext';

const Home = () => {
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      // Listen for messages from the server
      socket.on('messageFromServer', (data) => {
        console.log('Message from server:', data);
      });

      // Listen for match updates
      socket.on('matchUpdate', (data) => {
        console.log('Match update:', data);
      });

      // Clean up event listeners
      return () => {
        socket.off('messageFromServer');
        socket.off('matchUpdate');
      };
    }
  }, [socket]);

  const sendMessageToServer = () => {
    if (socket) {
      socket.emit('messageFromClient', { message: 'Hello, Server!' });
    }
  };

  const joinMatch = () => {
    if (socket) {
      socket.emit('joinMatch', 'match123'); // Replace 'match123' with the actual match ID
    }
  };

  const leaveMatch = () => {
    if (socket) {
      socket.emit('leaveMatch', 'match123'); // Replace 'match123' with the actual match ID
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={sendMessageToServer}>Send Message to Server</button>
      <button onClick={joinMatch}>Join Match</button>
      <button onClick={leaveMatch}>Leave Match</button>
    </div>
  );
};

export default Home;
