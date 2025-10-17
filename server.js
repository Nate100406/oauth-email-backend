require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Redis = require('ioredis');

// your routes imports
const googleRoutes = require('./routes/google');
const microsoftRoutes = require('./routes/microsoft');
const emailRoutes = require('./routes/email');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Redis connection
const redis = new Redis(process.env.REDIS_URL);
redis.on('connect', () => console.log('Redis connected'));
redis.on('error', err => console.log('Redis error:', err));

// Routes
app.use('/connect/google', googleRoutes);
app.use('/connect/microsoft', microsoftRoutes);
app.use('/send-email', emailRoutes);

// Test route
app.get('/', (req, res) => res.send('Backend is running!'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:3000`));;

const googleRoutes = require('./routes/google');
const microsoftRoutes = require('./routes/microsoft');
const emailRoutes = require('./routes/email');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

const redis = new Redis(process.env.REDIS_URL);
redis.on('connect', () => console.log('Redis connected'));
redis.on('error', err => console.log('Redis error:', err));

app.use('/connect/google', googleRoutes);
app.use('/connect/microsoft', microsoftRoutes);
app.use('/send-email', emailRoutes);

app.get('/', (req, res) => res.send('Backend is running!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:3000`));

