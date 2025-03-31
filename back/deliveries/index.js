const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

// Load env variables
dotenv.config();

// MongoDB connection
require('./src/config/db');

// Routes
const deliveryRoutes = require('./src/routes/deliveries.routes');

// Init app
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Serve documentation
app.use('/api/deliveries/docs', express.static(path.join(__dirname, 'src/docs')));

// API Routes
app.use('/api/deliveries', deliveryRoutes);

// Start server
const PORT = process.env.PORT || 3040;
app.listen(PORT, () => {
    console.log(`Delivery Microservice running on port ${PORT}`);
});
