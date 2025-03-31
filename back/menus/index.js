require('dotenv').config();
const express = require('express');
const menuRoutes = require('./src/routes/menus.routes');
import('./src/config/db.js');

const app = express();
app.use(express.json());

app.use('/api/menus', menuRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});