const express = require('express');
const router = express.Router();
const { register, login, refreshToken, logout, authenticate } = require('../controllers/auth.controller');
const  authenticateToken  = require('../middlewares/auth.middleware');
const { isClient, isLivreur, isRestaurateur } = require('../middlewares/role.middleware');

/**
 * @api {post} /auth/register Créer un utilisateur
 * @apiName Register
 * @apiGroup Auth
 *
 * @apiBody {String} username Nom d'utilisateur
 * @apiBody {String} email Adresse e-mail
 * @apiBody {String} password Mot de passe
 * @apiBody {String="client","livreur","restaurateur"} role Rôle de l'utilisateur
 *
 * @apiSuccess {String} message Message de confirmation
 * @apiSuccess {Object} user Données de l'utilisateur créé
 */
router.post('/register', register);


/**
 * @api {post} /auth/login Connexion d'un utilisateur
 * @apiName Login
 * @apiGroup Auth
 *
 * @apiBody {String} email Email de l'utilisateur
 * @apiBody {String} password Mot de passe
 *
 * @apiSuccess {String} accessToken Token JWT d'accès
 * @apiSuccess {String} refreshToken Token de rafraîchissement
 */
router.post('/login', login);


/**
 * @api {post} /auth/refresh-token Rafraîchir le token JWT
 * @apiName RefreshToken
 * @apiGroup Auth
 *
 * @apiBody {String} refreshToken Token de rafraîchissement
 *
 * @apiSuccess {String} accessToken Nouveau token JWT
 */
router.post('/refresh-token', refreshToken);


/**
 * @api {post} /auth/logout Déconnexion de l'utilisateur
 * @apiName Logout
 * @apiGroup Auth
 *
 * @apiBody {String} refreshToken Token de rafraîchissement à invalider
 *
 * @apiSuccess {String} message Confirmation de déconnexion
 */
router.post('/logout', logout);


/**
 * @api {get} /auth/client Accès client
 * @apiName ClientAccess
 * @apiGroup Roles
 *
 * @apiHeader {String} Authorization Bearer token d'accès
 *
 * @apiSuccess {String} message Message de bienvenue client
 */
// Route accessible uniquement au restaurateurs  
router.get('/client', authenticateToken, isClient, (req, res) => {
    res.json({ message: "Bienvenue client !" });
    });
 

/**
 * @api {get} /auth/livreur Accès livreurs 
 * @apiName LivreurAccess
 * @apiGroup Roles
 *
 * @apiHeader {String} Authorization Bearer token d'accès
 *
 * @apiSuccess {String} message Message de bienvenue livreur
 */    
// Route accessible uniquement au livreurs 
router.get('/livreur', authenticateToken, isLivreur, (req, res) => {
    res.json({ message: "Bienvenue livreur !" });
    });

    
/**
 * @api {get} /auth/restaurateur Accès restaurateurs   
 * @apiName RestaurateurAccess
 * @apiGroup Roles
 *
 * @apiHeader {String} Authorization Bearer token d'accès
 *
 * @apiSuccess {String} message Message de bienvenue restaurateur
 */    
// Route accessible uniquement au restaurateurs   
router.get('/restaurateur', authenticateToken, isRestaurateur, (req, res) => {
    res.json({ message: "Bienvenue restaurateur !" });
    });
  
    
/**
 * @api {get} /auth/authenticate Vérifie la validité d'un token
 * @apiName Authenticate
 * @apiGroup Auth
 *
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiSuccess {String} message Token valide
 * @apiSuccess {Object} user Données utilisateur décodées du token
 */
router.get('/authenticate', authenticate);
    
module.exports = router;
