const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()
require('./src/config/db')

const menusRoutes = require('./src/routes/menus.routes')

const app = express()
app.use(cors(
  {
    origin: ['http://localhost', 'http://dev.localhost', 'http://restaurant.localhost', 'http://admin.localhost', 'http://delivery.localhost'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }
))
app.use(express.json())

app.use('/api/menus/docs', express.static(path.join(__dirname, 'docs')))

app.use('/api/menus', menusRoutes)

const PORT = process.env.PORT || 3020
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})