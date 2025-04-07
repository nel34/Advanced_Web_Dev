import './index.sass'
import Button from '../Button'

export default function ClientUserCard({ user, onToggleSuspend }) {
  return (
    <div className="client-user-card">
      <h3>{user.username}</h3>
      <p>{user.email}</p>
      <p>Rôle : {user.role}</p>
      <p>Code de parrainage : {user.referralCode}</p>
      <p>Parrain : {user.referredBy || 'Aucun'}</p>
      <p>Status : <strong>{user.isSuspended ? 'Suspendu' : 'Actif'}</strong></p>

      <Button
        content={user.isSuspended ? 'Réactiver' : 'Suspendre'}
        onClick={() => onToggleSuspend(user.id, !user.isSuspended)}
      />
    </div>
  )
}