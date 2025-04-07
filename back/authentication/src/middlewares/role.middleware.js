exports.isClient = (req, res, next) => {
  console.log('User role:', req.user)
  if (req.user && req.user.role === 'client') {
    return next()
  }
  return res.status(403).json({ error: 'Accès réservé aux clients' })
}

exports.isLivreur = (req, res, next) => {
  if (req.user && req.user.role === 'livreur') {
    return next()
  }
  return res.status(403).json({ error: 'Accès réservé aux livreurs' })
}

exports.isRestaurateur = (req, res, next) => {
  if (req.user && req.user.role === 'restaurateur') {
    return next()
  }
  return res.status(403).json({ error: 'Accès réservé aux restaurateurs' })
}
exports.isDeveloper = (req, res, next) => {
  if (req.user && req.user.role === 'developer') {
    return next()
  }
  return res.status(403).json({ error: 'Accès réservé aux developpeurs' })
}

exports.isTechnician = (req, res, next) => {
  if (req.user && req.user.role === 'technician') {
    return next()
  }
  return res.status(403).json({ error: 'Accès réservé aux techniciens' })
}