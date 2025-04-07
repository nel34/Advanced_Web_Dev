const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const dotenv = require('dotenv')
dotenv.config()

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body
  const rolesAutorises = ['client', 'restaurateur', 'livreur', 'developer','technician']

  if (!rolesAutorises.includes(role)) {
    return res.status(400).json({ error: 'Rôle invalide' })
  }

  try {
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ error: 'Cette adresse email est déjà utilisée' })
    }

    const existingUsername = await User.findOne({ where: { username } })
    if (existingUsername) {
      return res.status(400).json({ error: 'Ce nom d\'utilisateur est déjà pris' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const referralCode = Math.random().toString(36).substring(2, 8).toUpperCase()
    const apiKey = require('crypto').randomBytes(32).toString('hex')
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
      referralCode,
      apiKey: role === 'developer' ? apiKey : null    })

    res.status(201).json({ message: 'Utilisateur enregistré' })
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l’inscription', details: error.message })
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur introuvable' })
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return res.status(401).json({ error: 'Mot de passe incorrect' })
    }

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
    )

    const refreshToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d' }
    )

    await user.update({ refreshToken })

    res.status(200).json({
      accessToken,
      refreshToken,
      id: user.id})
  } catch (error) {
    res.status(500).json({
      error: 'Erreur lors de la connexion',
      details: error.message
    })
  }
}

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body

  if (!refreshToken) {
    return res.status(400).json({ error: 'Token manquant' })
  }

  try {
    const user = await User.findOne({ where: { refreshToken } })

    if (!user) {
      return res.status(403).json({ error: 'Token invalide' })
    }

    // Vérifier la validité du refreshToken
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
      if (err) {return res.status(403).json({ error: 'Token invalide ou expiré' })}

      const newAccessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: '15m' })

      res.json({ accessToken: newAccessToken })
    })

  } catch (error) {
    res.status(500).json({ error: 'Erreur lors du rafraîchissement', details: error.message })
  }
}

exports.logout = async (req, res) => {
  const { refreshToken } = req.body

  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh token manquant' })
  }

  try {
    const user = await User.findOne({ where: { refreshToken } })

    if (!user) {
      return res.status(403).json({ error: 'Token invalide' })
    }

    // Supprimer le refreshToken de la base
    await user.update({ refreshToken: null })

    res.status(200).json({ message: 'Déconnexion réussie' })
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la déconnexion', details: error.message })
  }
}

exports.authenticate = (req, res) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {return res.status(401).json({ message: 'Token manquant' })}

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {return res.status(401).json({ message: 'Token invalide ou expiré' })}
    return res.status(200).json({ message: 'Token valide', user: decoded })
  })
}

exports.getApiKey = async (req, res) => {
  const user = await User.findByPk(req.user.id)
  if (!user || user.role !== 'developer') {
    return res.status(403).json({ error: 'Accès refusé' })
  }

  res.json({ apiKey: user.apiKey })
}

exports.regenerateApiKey = async (req, res) => {
  const user = await User.findByPk(req.user.id)
  if (!user || user.role !== 'developer') {
    return res.status(403).json({ error: 'Accès refusé' })
  }

  const newKey = require('crypto').randomBytes(32).toString('hex')
  user.apiKey = newKey
  await user.save()

  res.json({ apiKey: newKey })
}

exports.validateApiKey = async (req, res) => {
  const { apiKey } = req.body

  if (!apiKey) {
    return res.status(400).json({ valid: false, error: 'Clé API manquante' })
  }

  try {
    const user = await User.findOne({ where: { apiKey } })

    if (!user || user.role !== 'developer') {
      return res.status(403).json({ valid: false, error: 'Clé API invalide ou non autorisée' })
    }

    res.status(200).json({ valid: true })
  } catch (err) {
    console.error('Erreur lors de la validation de la clé API :', err)
    res.status(500).json({ valid: false, error: 'Erreur serveur' })
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'role', 'referralCode', 'apiKey']
    })

    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs', details: err.message })
  }
}