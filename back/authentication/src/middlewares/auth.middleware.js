const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const User = require('../models/user.model')

dotenv.config()

const authenticateToken = async (req, res, next) => {
  let token = req.headers['authorization']

  if (!token) {
    return res.status(401).json({ error: 'Champ Authorization manquant' })
  }

  // 🔁 Supprime "Bearer " si présent
  if (token.startsWith('Bearer ')) {
    token = token.slice(7)
  }

  // 🔍 Détection API key : 64 caractères hex
  const isApiKey = /^[a-f0-9]{64}$/i.test(token)

  try {
    if (isApiKey) {
      // 🔐 Vérification clé API
      const user = await User.findOne({ where: { apiKey: token } })

      if (!user || user.role !== 'developer') {
        return res.status(403).json({ error: 'Clé API invalide ou non autorisée' })
      }

      req.user = {
        id: user.id,
        role: user.role,
        type: 'apiKey'
      }
      return next()
    } else {
      // 🔐 Vérification JWT
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).json({ error: 'Token invalide ou expiré' })
        }

        req.user = {
          id: decoded.id,
          role: decoded.role,
          type: 'jwt'
        }
        return next()
      })
    }
  } catch (error) {
    console.error('Erreur middleware auth:', error)
    return res.status(500).json({ error: 'Erreur serveur' })
  }
}

module.exports = authenticateToken