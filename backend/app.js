const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const dropPointRoutes = require('./routes/dropPointRoutes');
const aiRoutes = require('./routes/aiRoutes');
const collectionRoutes = require('./routes/collectionRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'EcoDrop AI - GVMC Smart E-Waste Network',
    location: 'Visakhapatnam (GVMC)',
    timestamp: new Date().toISOString()
  });
});

// Mounting API Routes
app.use('/api/auth', authRoutes);
app.use('/api/droppoints', dropPointRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/collection', collectionRoutes);
app.use('/api/complaint', complaintRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('API Error:', err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

module.exports = app;
