import DeveloperComponentCard from '../DeveloperComponentCard'
import './index.sass'
import { useState } from 'react'

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
      fetchComponents() // 🔁 recharge les composants en direct quand on clique
    }
    toggle() // affiche ou masque la liste
  }
  const [currentPage, setCurrentPage] = useState(1)
  const componentsPerPage = 6
  const totalPages = Math.ceil(components.length / componentsPerPage)
  const indexOfLast = currentPage * componentsPerPage
  const indexOfFirst = indexOfLast - componentsPerPage
  const currentComponents = components.slice(indexOfFirst, indexOfLast)
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1)
  }
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1)
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
              {currentComponents.map(comp => (
                <DeveloperComponentCard
                  key={comp.id}
                  comp={comp}
                  onDownload={onDownload}
                />
              ))}
            </div>
          )}
          {totalPages > 1 && (
            <div className="pagination">
              <button onClick={handlePrev} disabled={currentPage === 1}>
                ◀ Précédent
              </button>

              <span>Page {currentPage} / {totalPages}</span>

              <button onClick={handleNext} disabled={currentPage === totalPages}>
                Suivant ▶
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}