const express = require('express')
const router = express.Router()
const { register, login, refreshToken, logout, getApiKey, regenerateApiKey, getAllUsers, validateApiKey, getUserById, updateUser, deleteUser, toggleSuspension } = require('../controllers/auth.controller')
const  authenticateToken  = require('../middlewares/auth.middleware')
const { isClient, isLivreur, isRestaurateur, isDeveloper, isTechnician, isCommercial } = require('../middlewares/role.middleware')

/**
 * @api {post} /register Créer un utilisateur
 * @apiName Register
 * @apiGroup Auth
 *
 * @apiBody {String} username Nom d'utilisateur
 * @apiBody {String} email Adresse e-mail
 * @apiBody {String} password Mot de passe
 * @apiBody {String="client","livreur","restaurateur","developer","technician", "commercial"} role Rôle de l'utilisateur
 * @apiBody {String} [referralCodeInput] Code de parrainage (facultatif)
 *
 * @apiSuccess {String} message Message de confirmation
 *
 * @apiError 400 Adresse email ou nom d'utilisateur déjà utilisé
 * @apiError 400 Code de parrainage invalide
 * @apiError 500 Erreur serveur
 */
router.post('/register', register);

/**
 * @api {post} /login Connexion d'un utilisateur
 * @apiName Login
 * @apiGroup Auth
 *
 * @apiBody {String} [email] Email de l'utilisateur
 * @apiBody {String} [username] Nom d'utilisateur
 * @apiBody {String} password Mot de passe
 *
 * @apiDescription Permet de se connecter avec soit l'email, soit le nom d'utilisateur.
 * L'un des deux (`email` ou `username`) est requis.
 *
 * @apiSuccess {String} accessToken Token JWT d'accès
 * @apiSuccess {String} refreshToken Token de rafraîchissement
 * @apiSuccess {Number} id ID de l'utilisateur
 *
 * @apiError 404 Utilisateur introuvable
 * @apiError 401 Mot de passe incorrect
 * @apiError 500 Erreur serveur
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
 * @api {get} /commercial Accès commercials
 * @apiName CommercialAccess
 * @apiGroup Roles
 *
 * @apiHeader {String} Authorization Bearer token d'accès
 *
 * @apiSuccess {String} message Message de bienvenue commercial
 */
// Route accessible uniquement au Techniciens
router.get('/commercial', authenticateToken, isCommercial, (req, res) => {
  res.json({ message: 'Bienvenue commercial !' })
})

/**
 * @api {get} /authenticate Vérifie la validité d'un token
 * @apiName Authenticate
 * @apiGroup Auth
 *
 * @apiHeader {String} Authorization Token d'accès (avec ou sans "Bearer ")
 *
 * @apiSuccess {String} message Token valide
 * @apiSuccess {Object} user Données utilisateur décodées
 * @apiError 401 Token manquant
 * @apiError 403 Token invalide ou expiré
 */
router.get('/authenticate', authenticateToken, (req, res) => {
  return res.status(200).json({
    message: 'Token valide',
    user: req.user
  });
});

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
 * @apiHeader {String} Authorization Token JWT au format `Bearer <token>`
 *
 * @apiDescription Cette route permet de récupérer la liste de tous les utilisateurs enregistrés. Elle est protégée par un token JWT. Assurez-vous de fournir un en-tête `Authorization` avec un token valide.
 *
 * @apiSuccess {Object[]} users Liste des utilisateurs
 * @apiSuccess {Number} users.id ID de l'utilisateur
 * @apiSuccess {String} users.username Nom d'utilisateur
 * @apiSuccess {String} users.email Adresse email
 * @apiSuccess {String} users.role Rôle de l'utilisateur (client, livreur, restaurateur, etc.)
 * @apiSuccess {String} users.referralCode Code de parrainage
 * @apiSuccess {String} [users.apiKey] Clé API (si développeur)
 *
 * @apiError 401 Token manquant ou invalide
 * @apiError 500 Erreur serveur
 */
router.get('/users', authenticateToken, getAllUsers)

/**
 * @api {get} /users/:id Récupérer un utilisateur par ID
 * @apiName GetUserById
 * @apiGroup Auth
 *
 * @apiHeader {String} Authorization Token JWT (Bearer) *
 *
 * @apiParam {Number} id ID de l'utilisateur
 *
 * @apiSuccess {Number} id ID
 * @apiSuccess {String} username Nom d'utilisateur
 * @apiSuccess {String} email Email
 * @apiSuccess {String} role Rôle
 * @apiSuccess {String} referralCode Code de parrainage *
 * @apiError 404 Utilisateur introuvable
 * @apiError 500 Erreur serveur
 */
router.get('/users/:id', authenticateToken, getUserById)

/**
 * @api {put} /users/:id Mettre à jour un utilisateur
 * @apiName UpdateUser
 * @apiGroup Auth
 *
 * @apiHeader {String} Authorization Token JWT (Bearer)
 *
 * @apiParam {Number} id ID de l'utilisateur
 *
 * @apiBody {String} [username] Nouveau nom d'utilisateur
 * @apiBody {String} [email] Nouveau mail
 * @apiBody {String} [password] Nouveau password
 *
 * @apiSuccess {String} message Confirmation de mise à jour
 *
 * @apiError 404 Utilisateur introuvable
 * @apiError 500 Erreur serveur
 */
router.put('/users/:id', authenticateToken, updateUser)

/**
 * @api {delete} /users/:id Supprimer un utilisateur
 * @apiName DeleteUser
 * @apiGroup Auth
 *
 * @apiHeader {String} Authorization Token JWT (Bearer)
 *
 * @apiParam {Number} id ID de l'utilisateur
 *
 * @apiSuccess {String} message Confirmation de suppression
 *
 * @apiError 404 Utilisateur introuvable
 * @apiError 500 Erreur serveur
 */
router.delete('/users/:id', authenticateToken, deleteUser)

/**
 * @api {put} /users/:id/suspend Suspendre ou réactiver un utilisateur
 * @apiName ToggleSuspension
 * @apiGroup Auth
 *
 * @apiHeader {String} Authorization Token JWT (Bearer)
 *
 * @apiParam {Number} id ID de l'utilisateur à suspendre/réactiver
 *
 * @apiSuccess {String} message Message de confirmation
 * @apiSuccess {Boolean} isSuspended Statut mis à jour (true si suspendu)
 *
 * @apiError 404 Utilisateur introuvable
 * @apiError 500 Erreur serveur
 */
router.put('/users/:id/suspend', authenticateToken, isCommercial, toggleSuspension)

module.exports = router