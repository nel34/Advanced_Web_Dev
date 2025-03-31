const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB (Orders)'))
  .catch(err => console.error('MongoDB connection error:', err))