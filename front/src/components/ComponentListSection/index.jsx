import { useState } from 'react'
import ButtonTechnical from '../ButtonTechnical'
import './index.sass'

export default function ComponentListSection({ show, toggle, components, handleDelete }) {
  const [confirming, setConfirming] = useState(null)

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
          {components.map(comp => (
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
      </section>
    </>
  )
}
