import TextInputTechnical from '../TextInputTechnical'
import ButtonTechnical from '../ButtonTechnical'
import './index.sass'

export default function AddComponentCard({ newComponentName, setNewComponentName, files, setFiles, handleAdd }) {
  return (
    <div className="add-component-card">
      <h2 className="title-centered">Ajouter un composant</h2>
      <div className="form">
        <TextInputTechnical
          id="component-name"
          label="Nom du composant"
          placeholder="Ex: MenuCard"
          value={newComponentName}
          onChange={e => setNewComponentName(e.target.value)}
        />
        <div className="file-input">
          <label htmlFor="index-jsx">Fichier <strong>index.jsx</strong> :</label>
          <input type="file" id="index-jsx" accept=".jsx" onChange={e => setFiles(prev => ({ ...prev, indexJsx: e.target.files[0] }))} />
        </div>
        <div className="file-input">
          <label htmlFor="index-sass">Fichier <strong>index.sass</strong> :</label>
          <input type="file" id="index-sass" accept=".sass" onChange={e => setFiles(prev => ({ ...prev, indexSass: e.target.files[0] }))} />
        </div>
        <ButtonTechnical onClick={handleAdd}>Ajouter</ButtonTechnical>
      </div>
    </div>
  )
}
