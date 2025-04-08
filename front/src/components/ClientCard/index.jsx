import { useState } from 'react'
import './index.sass'

export default function ClientCard({ client, onUpdate, onSuspend, onEdit, onDelete }) {
  if (!client) return null

  const {
    id,
    username,
    email,
    role,
    referralCode,
    referredBy,
    isSuspended,
    createdAt,
    updatedAt
  } = client

  const [isEditing, setIsEditing] = useState(false)
  const [editedUsername, setEditedUsername] = useState(username)
  const [editedEmail, setEditedEmail] = useState(email)

  const handleConfirmEdit = async () => {
    await onEdit(id, editedUsername, editedEmail)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditedUsername(username)
    setEditedEmail(email)
    setIsEditing(false)
  }

  const [confirmDelete, setConfirmDelete] = useState(false)
  
  const handleDeleteConfirm = (userId) => {
    const confirm = window.confirm("Êtes-vous sûr de vouloir supprimer ce compte client ? Cette action est irréversible.")
    if (confirm) {
      onDelete(userId)
    }
  }

  return (
    <div className="client-card">
        <div className="card-header">
        <h3>{isEditing ? (
            <input
            type="text"
            value={editedUsername}
            onChange={(e) => setEditedUsername(e.target.value)}
            />
        ) : username}</h3>

        <div className="card-tools">
            <span className={`status ${isSuspended ? 'suspended' : 'active'}`}>
            {isSuspended ? 'Suspendu' : 'Actif'}
            </span>
            <button
                className="delete-btn"
                title="Supprimer ce compte"
                onClick={() => handleDeleteConfirm(id)}
            >
                🗑️
            </button>
        </div>
        </div>

      <div className="card-content">
        <p><strong>ID du client :</strong> {id}</p>
        <p>
          <strong>Email :</strong>{' '}
          {isEditing ? (
            <input
              type="email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
            />
          ) : (
            email
          )}
        </p>
        <p><strong>Code de parrainage :</strong> {referralCode}</p>
        <p><strong>Parrainé par :</strong> {client.referredByName || 'Aucun'}</p>
        <p><strong>Créé le :</strong> {new Date(createdAt).toLocaleDateString()}</p>
        <p><strong>Dernière Connexion :</strong> {new Date(updatedAt).toLocaleString()}</p>
      </div>

      <div className="card-actions">
        {isEditing ? (
          <>
            <button className="confirm" onClick={handleConfirmEdit}>Confirmer</button>
            <button className="cancel" onClick={handleCancelEdit}>Annuler</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>Modifier</button>
            <button onClick={() => onSuspend(id)}>
              {isSuspended ? 'Réactiver' : 'Suspendre'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}