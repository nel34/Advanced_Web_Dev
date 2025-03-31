// index.js
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Connexion DB
const { sequelize, connectDB } = require('./src/config/db');
connectDB();
sequelize.sync({ alter: true })
  .then(() => console.log('Tables synchronisées'))
  .catch((err) => console.error('Erreur de synchronisation :', err));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Documentation
app.use('/api/auth/docs', express.static(path.join(__dirname, 'docs')));

// Routes
const authRoutes = require('./src/routes/auth.routes');
app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Auth-service is running');
});

// Lancement serveur
app.listen(port, () => {
  console.log(`Auth service lancé sur http://localhost:${port}`);
});