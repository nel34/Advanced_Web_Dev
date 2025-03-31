const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const path = require('path')

// Charger les variables d'environnement
dotenv.config()

// Import de la connexion à la base de données
require('./src/config/db')

// Import des routes
const productRoutes = require('./src/routes/products.routes')

// Initialisation de l'application
const app = express()

// Middleware
app.use(cors())
app.use(bodyParser.json())

app.use('/api/products/docs', express.static(path.join(__dirname,'docs')))

// Utilisation des routes
app.use('/api/products', productRoutes)

// Lancement du serveur
const PORT = process.env.PORT || 3010
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`)
})
