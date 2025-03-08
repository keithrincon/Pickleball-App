const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http'); // Import the http module
const socketIo = require('socket.io'); // Import Socket.IO
require('dotenv').config();

const authRoutes = require('./routes/auth');
const matchRoutes = require('./routes/match');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/matches', matchRoutes);

app.get('/', (req, res) => {
  res.send('Pickleball App Backend');
});

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketIo(server, {
  cors: {
    origin: '*', // Allow all origins (replace with your frontend URL in production)
    methods: ['GET', 'POST'],
  },
});

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('New client connected');

  // Example: Handle a custom event from the client
  socket.on('messageFromClient', (data) => {
    console.log('Message from client:', data);

    // Broadcast the message to all connected clients
    io.emit('messageFromServer', {
      message: `Server received: ${data.message}`,
    });
  });

  // Example: Handle match-related events
  socket.on('joinMatch', (matchId) => {
    console.log(`User joined match: ${matchId}`);
    socket.join(matchId); // Join a room for the specific match
    io.to(matchId).emit('matchUpdate', {
      message: `A new user joined match ${matchId}`,
    });
  });

  socket.on('leaveMatch', (matchId) => {
    console.log(`User left match: ${matchId}`);
    socket.leave(matchId); // Leave the room for the specific match
    io.to(matchId).emit('matchUpdate', {
      message: `A user left match ${matchId}`,
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
