const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const serviceRoutes = require('./service.routes');
const portfolioRoutes = require('./portfolio.routes');
const projectRoutes = require('./project.routes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/services', serviceRoutes);
router.use('/portfolios', portfolioRoutes);
router.use('/projects', projectRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;