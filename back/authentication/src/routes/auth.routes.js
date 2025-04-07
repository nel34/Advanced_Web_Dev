const express = require('express')
const router = express.Router()
const { register, login, refreshToken, logout, authenticate, getApiKey, regenerateApiKey, getAllUsers, validateApiKey } = require('../controllers/auth.controller')
const  authenticateToken  = require('../middlewares/auth.middleware')
const { isClient, isLivreur, isRestaurateur, isDeveloper, isTechnician } = require('../middlewares/role.middleware')

/**
 * @api {post} /register Créer un utilisateur
 * @apiName Register
 * @apiGroup Auth
 *
 * @apiBody {String} username Nom d'utilisateur
 * @apiBody {String} email Adresse e-mail
 * @apiBody {String} password Mot de passe
 * @apiBody {String="client","livreur","restaurateur","developer","technician"} role Rôle de l'utilisateur
 *
 * @apiSuccess {String} message Message de confirmation
 * @apiSuccess {Object} user Données de l'utilisateur créé
 */
router.post('/register', register)

/**
 * @api {post} /login Connexion d'un utilisateur
 * @apiName Login
 * @apiGroup Auth
 *
 * @apiBody {String} email Email de l'utilisateur
 * @apiBody {String} password Mot de passe
 *
 * @apiSuccess {String} accessToken Token JWT d'accès
 * @apiSuccess {String} refreshToken Token de rafraîchissement
 * @apiSuccess {Number} id ID de l'utilisateur
 * @apiSuccess {String} username Nom d'utilisateur
 * @apiSuccess {String} referralCode Code de parrainage de l'utilisateur
 */
router.post('/login', login)

/**
 * @api {post} /refresh-token Rafraîchir le token JWT
 * @apiName RefreshToken
 * @apiGroup Auth
 *
 * @apiBody {String} refreshToken Token de rafraîchissement
 *
 * @apiSuccess {String} accessToken Nouveau token JWT
 */
router.post('/refresh-token', refreshToken)

/**
 * @api {post} /logout Déconnexion de l'utilisateur
 * @apiName Logout
 * @apiGroup Auth
 *
 * @apiBody {String} refreshToken Token de rafraîchissement à invalider
 *
 * @apiSuccess {String} message Confirmation de déconnexion
 */
router.post('/logout', logout)

/**
 * @api {get} /client Accès client
 * @apiName ClientAccess
 * @apiGroup Roles
 *
 * @apiHeader {String} Authorization Bearer token d'accès
 *
 * @apiSuccess {String} message Message de bienvenue client
 */
// Route accessible uniquement au Clients
router.get('/client', authenticateToken, isClient, (req, res) => {
  res.json({ message: 'Bienvenue client !' })
})

/**
 * @api {get} /livreur Accès livreurs
 * @apiName LivreurAccess
 * @apiGroup Roles
 *
 * @apiHeader {String} Authorization Bearer token d'accès
 *
 * @apiSuccess {String} message Message de bienvenue livreur
 */
// Route accessible uniquement au livreurs
router.get('/livreur', authenticateToken, isLivreur, (req, res) => {
  res.json({ message: 'Bienvenue livreur !' })
})

/**
 * @api {get} /restaurateur Accès restaurateurs
 * @apiName RestaurateurAccess
 * @apiGroup Roles
 *
 * @apiHeader {String} Authorization Bearer token d'accès
 *
 * @apiSuccess {String} message Message de bienvenue restaurateur
 */
// Route accessible uniquement au restaurateurs
router.get('/restaurateur', authenticateToken, isRestaurateur, (req, res) => {
  res.json({ message: 'Bienvenue restaurateur !' })
})

/**
 * @api {get} /developer Accès developpeurs
 * @apiName DeveloperAccess
 * @apiGroup Roles
 *
 * @apiHeader {String} Authorization Bearer token d'accès
 *
 * @apiSuccess {String} message Message de bienvenue developpeur
 */
// Route accessible uniquement au developpeurs
router.get('/developer', authenticateToken, isDeveloper, (req, res) => {
  res.json({ message: 'Bienvenue Developpeur !' })
})

/**
 * @api {get} /technician Accès techniciens
 * @apiName TechnicianAccess
 * @apiGroup Roles
 *
 * @apiHeader {String} Authorization Bearer token d'accès
 *
 * @apiSuccess {String} message Message de bienvenue technicien
 */
// Route accessible uniquement au Techniciens
router.get('/technician', authenticateToken, isTechnician, (req, res) => {
  res.json({ message: 'Bienvenue technicien !' })
})

/**
 * @api {get} /authenticate Vérifie la validité d'un token
 * @apiName Authenticate
 * @apiGroup Auth
 *
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiSuccess {String} message Token valide
 * @apiSuccess {Object} user Données utilisateur décodées du token
 */
router.get('/authenticate', authenticate)

/**
 * @api {get} /developer/key Récupérer la clé API du développeur
 * @apiName GetDeveloperApiKey
 * @apiGroup DeveloperAccess
 *
 * @apiHeader {String} Authorization Token JWT (Bearer token)
 *
 * @apiSuccess {String} apiKey Clé API de l'utilisateur développeur
 *
 * @apiError 403 Accès refusé
 * @apiError 401 Token manquant ou invalide
 */
router.get('/developer/key', authenticateToken, isDeveloper, getApiKey)

/**
 * @api {post} /developer/validatekey Valider une clé API développeur
 * @apiName ValidateApiKey
 * @apiGroup DeveloperAccess
 *
 * @apiDescription Cette route permet de vérifier si une clé API fournie est valide et appartient à un utilisateur développeur.
 *
 * @apiBody {String} apiKey La clé API à valider.
 *
 * @apiSuccess {Boolean} valid Indique si la clé est valide (`true`) ou non (`false`).
 *
 * @apiError 400 Clé API manquante.
 * @apiError 403 Clé API invalide ou non autorisée.
 * @apiError 500 Erreur interne du serveur.
 *     }
 */
router.post('/developer/validatekey', validateApiKey)

/**
 * @api {put} /developer/regenerate Régénérer une nouvelle clé API
 * @apiName RegenerateDeveloperApiKey
 * @apiGroup DeveloperAccess
 *
 * @apiHeader {String} Authorization Token JWT (Bearer token)
 *
 * @apiSuccess {String} apiKey Nouvelle clé API générée
 *
 * @apiError 403 Accès refusé
 * @apiError 401 Token manquant ou invalide
 */
router.put('/developer/regenerate', authenticateToken, isDeveloper, regenerateApiKey)

/**
 * @api {get} /users Récupérer tous les utilisateurs
 * @apiName GetAllUsers
 * @apiGroup Auth
 *
 * @apiSuccess {Object[]} users Liste de tous les utilisateurs
 * @apiSuccess {Number} users.id ID
 * @apiSuccess {String} users.username Nom d'utilisateur
 * @apiSuccess {String} users.email Email
 * @apiSuccess {String} users.role Rôle (client, livreur, etc.)
 * @apiSuccess {String} users.referralCode Code de parrainage
 * @apiSuccess {String} [users.apiKey] Clé API (si développeur)
 *
 * @apiError 500 Erreur interne
 */
router.get('/users', getAllUsers)

module.exports = router