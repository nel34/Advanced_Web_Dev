const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()
require('./src/config/db')

const ordersRoutes = require('./src/routes/orders.routes')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/orders/docs', express.static(path.join(__dirname, 'docs')))

app.use('/api/orders', ordersRoutes)

const PORT = process.env.PORT || 3030
app.listen(PORT, () => {
  console.log(`Orders service running on port ${PORT}`)
})