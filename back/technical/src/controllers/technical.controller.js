const fs = require('fs')
const path = require('path')
const archiver = require('archiver')

const COMPONENTS_DIR = path.join(__dirname, '../../components')

exports.getComponents = (req, res) => {
  fs.readdir(COMPONENTS_DIR, { withFileTypes: true }, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Impossible de lire les composants.' })
    }

    const components = files
      .filter(file => file.isDirectory())
      .map((file, index) => ({
        id: index + 1,
        name: file.name,
        version: '1.0.0'
      }))

    res.json(components)
  })
}

exports.addComponent = (req, res) => {
  const componentName = req.body.componentName
  const files = req.files

  if (!componentName || files.length === 0) {
    return res.status(400).json({ error: 'Nom du composant ou fichiers manquants' })
  }

  // Crée le dossier du composant
  const componentPath = path.join(COMPONENTS_DIR, componentName)
  if (!fs.existsSync(componentPath)) {
    fs.mkdirSync(componentPath)
  }

  // Écrit chaque fichier reçu dans le dossier
  files.forEach(file => {
    const filePath = path.join(componentPath, file.originalname)
    fs.writeFileSync(filePath, file.buffer)
  })

  res.status(201).json({ message: 'Composant ajouté avec succès' })
}

exports.deleteComponent = (req, res) => {
  const componentName = req.params.name
  const componentPath = path.join(COMPONENTS_DIR, componentName)

  // Vérifier si le dossier existe
  if (!fs.existsSync(componentPath)) {
    return res.status(404).json({ error: 'Composant non trouvé' })
  }

  // Supprimer le dossier de manière récursive
  fs.rm(componentPath, { recursive: true, force: true }, (err) => {
    if (err) {
      console.error('Erreur suppression composant :', err)
      return res.status(500).json({ error: 'Erreur lors de la suppression du composant' })
    }

    res.status(200).json({ message: 'Composant supprimé avec succès' })
  })
}

exports.downloadComponent = (req, res) => {
  const componentName = req.params.name
  const componentPath = path.join(COMPONENTS_DIR, componentName)

  if (!fs.existsSync(componentPath)) {
    return res.status(404).json({ error: 'Composant introuvable.' })
  }

  res.attachment(`${componentName}.zip`)
  const archive = archiver('zip', { zlib: { level: 9 } })

  archive.on('error', (err) => {
    return res.status(500).json({ error: err.message })
  })

  archive.pipe(res)
  archive.directory(componentPath, false)
  archive.finalize()
}