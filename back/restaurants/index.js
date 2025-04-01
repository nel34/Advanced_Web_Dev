require('dotenv').config()
const express = require('express')
const restaurantsRoutes = require('./src/routes/restaurants.routes.js')
import('./src/config/db.js')
const path = require('path')

const app = express()
app.use(express.json())

// Documentation
app.use('/api/restaurants/docs', express.static(path.join(__dirname, 'docs')))

// Routes
app.use('/api/restaurants', restaurantsRoutes)

const PORT = process.env.PORT || 3050
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

