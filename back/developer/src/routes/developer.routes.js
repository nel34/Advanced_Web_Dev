const express = require('express');
const router = express.Router();
const { getComponents, downloadComponent } = require('../controllers/developer.controller');

/**
 * @api {get} /components Lister les composants
 * @apiName GetComponents
 * @apiGroup Components
 * 
 * @apiDescription Retourne la liste des composants React disponibles sur la plateforme.
 * 
 * @apiSuccess {Object[]} components Liste des composants
 * @apiSuccess {Number} components.id ID unique
 * @apiSuccess {String} components.name Nom du composant
 * @apiSuccess {String} components.description Description du composant
 * @apiSuccess {String} components.version Version du composant
 */
router.get('/components', getComponents);

/**
 * @api {get} /components/:name/download Télécharger un composant
 * @apiName DownloadComponent
 * @apiGroup Components
 *
 * @apiParam {String} name Nom du composant à télécharger
 * 
 * @apiSuccess {File} zip Archive zip du composant React
 * @apiError 404 Composant introuvable
 */
router.get('/components/:name/download', downloadComponent);

module.exports = router;