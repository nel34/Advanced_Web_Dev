const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()

const developerRoutes = require('./src/routes/developer.routes')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/developer/docs', express.static(path.join(__dirname, 'docs')))

app.use('/api/developer', developerRoutes)

const PORT = process.env.PORT || 3060
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})