const express = require('express')
const router = express.Router()
const { getComponents, addComponent, deleteComponent, downloadComponent } = require('../controllers/components.controller')

const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

/**
 * @api {get} / Lister les composants
 * @apiName GetComponents
 * @apiGroup Components
 *
 * @apiDescription Retourne la liste des composants React présents côté frontend.
 *
 * @apiSuccess {Object[]} components Liste des composants
 * @apiSuccess {Number} components.id ID unique
 * @apiSuccess {String} components.name Nom du composant
 * @apiSuccess {String} components.version Version du composant
 */
router.get('/', getComponents)

/**
 * @api {post} / Ajouter un composant
 * @apiName AddComponent
 * @apiGroup Components
 *
 * @apiDescription Permet d'ajouter un nouveau composant React en créant un dossier dans le frontend avec les fichiers transmis.
 *
 * @apiHeader {String} Authorization Token JWT du technicien
 *
 * @apiBody {String} componentName Nom du composant (sera le nom du dossier créé)
 * @apiBody {File} files Fichiers du composant (ex: index.jsx, index.sass)
 *
 * @apiSuccess {String} message Message de confirmation
 *
 * @apiError 400 Clé manquante ou invalide
 * @apiError 409 Un composant avec ce nom existe déjà
 * @apiError 500 Erreur lors de la création
 */
router.post('/', upload.any(), addComponent)

/**
 * @api {delete} /:name Supprimer un composant
 * @apiName DeleteComponent
 * @apiGroup Components
 *
 * @apiDescription Supprime le dossier d'un composant React existant dans le frontend.
 *
 * @apiHeader {String} Authorization Token JWT du technicien
 *
 * @apiParam {String} name Nom du composant à supprimer
 *
 * @apiSuccess {String} message Message de confirmation
 *
 * @apiError 404 Le composant n'existe pas
 * @apiError 500 Erreur lors de la suppression
 */
router.delete('/:name', deleteComponent)

/**
 * @api {get} /:name/download Télécharger un composant
 * @apiName DownloadComponent
 * @apiGroup Components
 *
 * @apiDescription Permet de télécharger un composant React sous forme d'archive zip.
 *
 * @apiParam {String} name Nom du composant à télécharger
 *
 * @apiSuccess {File} zip Archive contenant les fichiers du composant
 * @apiError 404 Composant introuvable
 */
router.get('/:name/download', downloadComponent)

module.exports = router