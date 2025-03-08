import { io } from 'socket.io-client';

// Connect to the backend server
const socket = io('http://localhost:5000', {
  withCredentials: true, // Include credentials if needed
  autoConnect: true, // Automatically connect when the component mounts
});

// Event listeners
socket.on('connect', () => {
  console.log('Connected to the server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from the server');
});

// Export the socket instance
export default socket;
