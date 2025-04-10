import { useEffect } from 'react'
import './index.sass'

export default function NotificationPopupTechnical({ type = 'info', message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={`notification-popup ${type}`}>
      <span>{message}</span>
      <button className="close-button" onClick={onClose}>×</button>
    </div>
  )
}