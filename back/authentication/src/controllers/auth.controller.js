const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const dotenv = require('dotenv')
dotenv.config()

exports.register = async (req, res) => {
  const { username, email, password, role, referralCodeInput } = req.body;
  const rolesAutorises = ['client', 'restaurateur', 'livreur', 'developer', 'technician', 'commercial'];

  if (!rolesAutorises.includes(role)) {
    return res.status(400).json({ error: 'Rôle invalide' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Cette adresse email est déjà utilisée' });
    }

    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(400).json({ error: 'Ce nom d\'utilisateur est déjà pris' });
    }

    // Vérification du code de parrainage s'il est fourni
    let referredBy = null;
    if (referralCodeInput) {
      const parrain = await User.findOne({ where: { referralCode: referralCodeInput } });
      if (!parrain) {
        return res.status(400).json({ error: 'Code de parrainage invalide' });
      }
      referredBy = referralCodeInput;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const referralCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const apiKey = require('crypto').randomBytes(32).toString('hex');

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
      referralCode,
      apiKey: role === 'developer' ? apiKey : null,
      referredBy
    })

    const accessToken = jwt.sign(
      { id: newUser.id, role: role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
    )

    const refreshToken = jwt.sign(
      { id: newUser.id, role: role },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d' }
    )

    await newUser.update({ refreshToken })

    res.status(201).json({
      accessToken,
      refreshToken,
      id: newUser.id
    })
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l’inscription', details: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, username, password } = req.body

  try {
    let user = null

    if (email) {
      user = await User.findOne({ where: { email } })
    } else if (username) {
      user = await User.findOne({ where: { username } })
    }

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur introuvable' })
    }

    if (user.isSuspended) {
      return res.status(403).json({ error: 'Compte suspendu. Veuillez contacter le support.' })
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
      id: user.id
    })
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

      const newAccessToken = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
      )

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
      attributes: ['id', 'username', 'email', 'role', 'referralCode', 'referredBy', 'isSuspended', 'createdAt', 'updatedAt'],
    })

    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs', details: err.message })
  }
}

exports.getUserById = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findByPk(id, {
      attributes: ['id', 'username', 'email', 'role', 'referralCode', 'referredBy'],
    })

    if (!user) {return res.status(404).json({ error: 'Utilisateur non trouvé' })}
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ error: 'Erreur interne', details: err.message })
  }
}

exports.updateUser = async (req, res) => {
  const { id } = req.params
  const { username, email, role, password } = req.body

  try {
    const user = await User.findByPk(id)
    if (!user) {return res.status(404).json({ error: 'Utilisateur non trouvé' })}

    if (username) {user.username = username}
    if (email) {user.email = email}
    if (role) {user.role = role}
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10)
      user.password = hashedPassword
    }

    await user.save()
    res.status(200).json({ message: 'Utilisateur mis à jour avec succès' })
  } catch (err) {
    console.error('Erreur lors de la mise à jour :', err)
    res.status(500).json({ error: 'Erreur serveur', details: err.message })
  }
}

exports.deleteUser = async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findByPk(id)
    if (!user) {return res.status(404).json({ error: 'Utilisateur non trouvé' })}

    await user.destroy()
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' })
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur', details: err.message })
  }
}

exports.toggleSuspension = async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findByPk(id)
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' })

    user.isSuspended = !user.isSuspended
    await user.save()

    res.status(200).json({
      message: `Utilisateur ${user.isSuspended ? 'suspendu' : 'réactivé'} avec succès`,
      isSuspended: user.isSuspended
    })
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur', details: err.message })
  }
}