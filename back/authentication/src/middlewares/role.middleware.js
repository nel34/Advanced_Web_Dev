exports.isClient = (req, res, next) => {
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
