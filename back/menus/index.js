require('dotenv').config()
const express = require('express')
const menuRoutes = require('./src/routes/menus.routes')
import('./src/config/db.js')
const path = require('path')

const app = express()
app.use(express.json())

// Documentation
app.use('/api/menus/docs', express.static(path.join(__dirname, 'docs')))

// Routes
app.use('/api/menus', menuRoutes)

const PORT = process.env.PORT || 3020
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

