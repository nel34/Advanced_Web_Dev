const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']

  // Format attendu : "Bearer token"
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Token d\'accès manquant' })
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
