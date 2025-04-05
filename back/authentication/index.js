const cors = require('cors')
const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const { sequelize } = require('./src/config/db')
const authRoutes = require('./src/routes/auth.routes')
dotenv.config()

const app = express()
app.use(cors(
  {
    origin: 'http://localhost',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }
))
const port = process.env.PORT || 4000

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Documentation statique
app.use('/api/auth/docs', express.static(path.join(__dirname, 'docs')))

// Routes API
app.use('/api/auth', authRoutes)

// Test route
app.get('/', (req, res) => {
  res.send('authentication is running')
})

// Connexion et synchronisation DB avec attente active
async function initDatabase() {
  const maxRetries = 10
  let attempts = 0

  while (attempts < maxRetries) {
    try {
      await sequelize.authenticate()
      await sequelize.sync({ alter: true })
      console.log('Connexion à MySQL réussie')

      console.log('Tables synchronisées')
      break
    } catch (err) {
      attempts++
      console.log(`Tentative ${attempts}/${maxRetries} - MySQL non prêt (${err.message})`)
      await new Promise(resolve => setTimeout(resolve, 2000))
    }
  }

  if (attempts === maxRetries) {
    console.error('Échec de connexion à MySQL après plusieurs tentatives')
    process.exit(1)
  }
}

// Lancement du serveur après initialisation de la DB
initDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Service Authentification lancé sur http://localhost:${port}`)
  })
})
