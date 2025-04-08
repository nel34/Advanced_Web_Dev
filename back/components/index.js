const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()

const componentsRoutes = require('./src/routes/components.routes')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/components/docs', express.static(path.join(__dirname, 'docs')))

app.use('/api/components', componentsRoutes)

const PORT = process.env.PORT || 3080
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})