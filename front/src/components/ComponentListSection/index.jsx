import { useState } from 'react'
import ButtonTechnical from '../ButtonTechnical'
import './index.sass'

export default function ComponentListSection({ show, toggle, components, handleDelete }) {
  const [confirming, setConfirming] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const componentsPerPage = 9

  const indexOfLast = currentPage * componentsPerPage
  const indexOfFirst = indexOfLast - componentsPerPage
  const currentComponents = components.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(components.length / componentsPerPage)

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(p => p + 1)
  }

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(p => p - 1)
  }

  if (!show) {
    return (
      <section className="components-list-toggle">
        <ButtonTechnical onClick={toggle}>
          Fournir la liste des composants
        </ButtonTechnical>
      </section>
    )
  }

  return (
    <>
      <section className="components-list-toggle">
        <ButtonTechnical onClick={toggle}>
          Masquer les composants
        </ButtonTechnical>
      </section>

      <section className="components-list">
        <h2>Composants existants</h2>
        <div className="grid">
          {currentComponents.map(comp => (
            <div key={comp.id} className="component-card">
              <h3>{comp.name}</h3>
              <small>v{comp.version}</small>

              {confirming === comp.name ? (
                <div className="confirm-buttons">
                  <ButtonTechnical onClick={() => {
                    handleDelete(comp.name)
                    setConfirming(null)
                  }}>
                    Confirmer suppression
                  </ButtonTechnical>
                  <ButtonTechnical onClick={() => setConfirming(null)}>
                    Annuler
                  </ButtonTechnical>
                </div>
              ) : (
                <ButtonTechnical onClick={() => setConfirming(comp.name)}>
                  Supprimer
                </ButtonTechnical>
              )}
            </div>
          ))}
        </div>

        <div className="pagination">
          <button onClick={handlePrev} disabled={currentPage === 1}>◀ Précédent</button>
          <span>Page {currentPage} / {totalPages}</span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>Suivant ▶</button>
        </div>
      </section>
    </>
  )
}