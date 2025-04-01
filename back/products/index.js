const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()
require('./src/config/db')

const productsRoutes = require('./src/routes/products.routes')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/products/docs', express.static(path.join(__dirname,'docs')))

app.use('/api/products', productsRoutes)

const PORT = process.env.PORT || 3010
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`)
})