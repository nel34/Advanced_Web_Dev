import DeveloperComponentCard from '../DeveloperComponentCard'
import './index.sass'

export default function DeveloperComponentsList({
  show,
  toggle,
  components,
  loading,
  error,
  onDownload,
  fetchComponents
}) {
  const handleToggle = () => {
    if (!show) {
      fetchComponents(); // 🔁 recharge les composants en direct quand on clique
    }
    toggle(); // affiche ou masque la liste
  }

  return (
    <div className="developer-components-list">
      <button onClick={handleToggle}>
        {show ? 'Masquer la liste' : 'Récupérer la liste des composants'}
      </button>

      {loading && <p>Chargement...</p>}

      {show && !loading && (
        <>
          {error ? (
            <p className="error">{error}</p>
          ) : (
            <div className="list">
              {components.map(comp => (
                <DeveloperComponentCard
                  key={comp.id}
                  comp={comp}
                  onDownload={onDownload}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}