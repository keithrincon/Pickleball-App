import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSocket } from '../contexts/SocketContext';

const Chat = () => {
  const { matchId } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      // Join the match room
      socket.emit('joinMatch', matchId);

      // Listen for incoming messages
      socket.on('receiveMessage', (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      // Clean up event listeners
      return () => {
        socket.off('receiveMessage');
      };
    }
  }, [socket, matchId]);

  const sendMessage = () => {
    if (socket && message.trim()) {
      const userId = localStorage.getItem('userId'); // Assuming you store the user ID in localStorage
      socket.emit('sendMessage', { matchId, message, userId });
      setMessage('');
    }
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Chat</h1>
      <div className='border rounded p-4 h-64 overflow-y-auto'>
        {messages.map((msg, index) => (
          <div key={index} className='mb-2'>
            <strong>{msg.userId}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div className='mt-4 flex'>
        <input
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='flex-1 p-2 border rounded'
          placeholder='Type a message...'
        />
        <button
          onClick={sendMessage}
          className='ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
