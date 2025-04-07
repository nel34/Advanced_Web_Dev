const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authenticateToken = (req, res, next) => {
  let token = req.headers['authorization']

  if (!token) {
    return res.status(401).json({ error: 'Token d\'accès manquant' })
  }

  // Si le token ne commence pas par "Bearer ", on le traite comme un token brut
  if (token.startsWith('Bearer ')) {
    token = token.split(' ')[1]
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token invalide ou expiré' })
    }

    req.user = decoded
    next()
  })
}

module.exports = authenticateToken
