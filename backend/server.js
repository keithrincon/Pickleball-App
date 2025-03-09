const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes'); // Updated to authRoutes.js
const matchRoutes = require('./routes/matchRoutes'); // Updated to matchRoutes.js

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB (updated to remove deprecated options)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/matches', matchRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Pickleball App Backend');
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
