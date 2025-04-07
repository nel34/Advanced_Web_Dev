const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()
require('./src/config/db')

const deliveriesRoutes = require('./src/routes/deliveries.routes')

const app = express()
app.use(cors(
  {
    origin: ['http://localhost', 'http://dev.localhost', 'http://restaurant.localhost', 'http://admin.localhost', 'http://delivery.localhost'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }
))
app.use(express.json())

app.use('/api/deliveries/docs', express.static(path.join(__dirname, 'docs')))

app.use('/api/deliveries', deliveriesRoutes)

const PORT = process.env.PORT || 3040
app.listen(PORT, () => {
  console.log(`Delivery Microservice running on port ${PORT}`)
})