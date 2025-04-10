import { useEffect } from 'react'
import './index.sass'

export default function GlobalPopup({ message, visible, onClose }) {
  useEffect(() => {
    if (visible) {
      const timeout = setTimeout(() => {
        onClose()
      }, 5000)
      return () => clearTimeout(timeout)
    }
  }, [visible, onClose])

  if (!visible) return null

  return (
    <div className="global-popup-overlay">
      <div className="global-popup__content">
        <p>{message}</p>
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  )
}
