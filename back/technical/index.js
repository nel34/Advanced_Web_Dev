const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()

const technicalRoutes = require('./src/routes/technical.routes')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/technical/docs', express.static(path.join(__dirname, 'docs')))

app.use('/api/technical', technicalRoutes)

const PORT = process.env.PORT || 3070
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})