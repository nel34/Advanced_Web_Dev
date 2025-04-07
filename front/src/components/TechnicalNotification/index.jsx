import './index.sass'

export default function NotificationPopupTechnical({ type, message, onClose }) {
  return (
    <div className={`notification-popup ${type}`}>
      <span>{message}</span>
      <button className="close-button" onClick={onClose}>×</button>
    </div>
  )
}