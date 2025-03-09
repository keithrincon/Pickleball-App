const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
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

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketIo(server, {
  cors: {
    origin: '*', // Replace with frontend URL in production
    methods: ['GET', 'POST'],
  },
});

// Attach Socket.io to the request object
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/matches', matchRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Pickleball App Backend');
});

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Handle messages from clients
  socket.on('messageFromClient', (data) => {
    console.log('Message from client:', data);
    io.emit('messageFromServer', {
      message: `Server received: ${data.message}`,
    });
  });

  // Handle match-related events
  socket.on('joinMatch', (matchId) => {
    console.log(`User joined match: ${matchId}`);
    socket.join(matchId);
    io.to(matchId).emit('matchUpdate', {
      message: `A new user joined match ${matchId}`,
    });
  });

  socket.on('leaveMatch', (matchId) => {
    console.log(`User left match: ${matchId}`);
    socket.leave(matchId);
    io.to(matchId).emit('matchUpdate', {
      message: `A user left match ${matchId}`,
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Start the server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
