import './index.sass'

export default function DeveloperComponentCard({ comp, onDownload }) {
  return (
    <div className="developer-component-card">
      <h3>{comp.name}</h3>
      <p>{comp.description}</p>
      <small>Version : {comp.version}</small>
      <button onClick={() => onDownload(comp.name)}>Télécharger</button>
    </div>
  )
}