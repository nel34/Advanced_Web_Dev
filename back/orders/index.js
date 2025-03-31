require('dotenv').config();
const express = require('express');
const orderRoutes = require('./src/routes/orders.routes');
require('./src/config/db');
const path = require('path');

const app = express();
app.use(express.json());

// Documentation
app.use('/api/orders/docs', express.static(path.join(__dirname, 'docs')));

// Routes
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Orders service running on port ${PORT}`);
});