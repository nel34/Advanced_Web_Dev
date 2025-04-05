const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const COMPONENTS_DIR = path.join(__dirname, '../../components');

exports.getComponents = (req, res) => {
  fs.readdir(COMPONENTS_DIR, { withFileTypes: true }, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Impossible de lire les composants." });
    }

    const components = files
      .filter(file => file.isDirectory())
      .map((file, index) => ({
        id: index + 1,
        name: file.name,
        version: '1.0.0'
      }));

    res.json(components);
  });
};

exports.downloadComponent = (req, res) => {
  const componentName = req.params.name;
  const componentPath = path.join(COMPONENTS_DIR, componentName);

  if (!fs.existsSync(componentPath)) {
    return res.status(404).json({ error: "Composant introuvable." });
  }

  res.attachment(`${componentName}.zip`);

  const archive = archiver('zip', { zlib: { level: 9 } });
  archive.on('error', err => res.status(500).send({ error: err.message }));

  archive.pipe(res);
  archive.directory(componentPath, false);
  archive.finalize();
};