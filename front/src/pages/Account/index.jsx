import { useState, useEffect } from 'react'
import Button from '../../components/Button'
import './index.sass'
import { useAuth } from '../../context/AuthContext'
import { useFetchWithAuth } from '../../utils/hooks'

export default function Account() {
  const { user, logout, deleteUser, updateUser } = useAuth()
  const { isLoading, data, error } = useFetchWithAuth('GET', `http://localhost:8080/api/auth/users/${user.id}`)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const subdomain = window.location.hostname.split('.')[0]

  useEffect(() => {
    if (data) {
      setUsername(data.username || '')
      setEmail(data.email || '')
    }
  }, [data])

  const handleProfileUpdate = (e) => {
    e.preventDefault()
    updateUser({ username, email }, user.id, user.accessToken)
  }

  const handlePasswordUpdate = (e) => {
    e.preventDefault()
    updateUser({ password, confirmPassword }, user.id, user.accessToken)
  }

  const handleDelete = (e) => {
    e.preventDefault()
    if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ?')) {
      deleteUser(user.id, user.accessToken)
    }
  }

  return (
    <div className='home home--secondary'>
      {isLoading ? (
        <div className='home__loading'>
          <h2>Chargement...</h2>
        </div>
      ) : error ? (
        <h2>Erreur lors du chargement</h2>
      ) : (
        <div className='info-section-layout--3'>
          <div className='info-section'>
            <h2>Informations du compte</h2>
            <form className='form' onSubmit={handleProfileUpdate}>
              <div className='form__input'>
                <label htmlFor='username'>Nom d'utilisateur</label>
                <input
                  type='text'
                  id='username'
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className='form__input'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  id='email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button type='submit' content='Modifier le profil' />
            </form>

            <div className='line'></div>
            <a href='#' onClick={logout}>Se déconnecter</a>
            <a href='#' onClick={handleDelete}>Supprimer le compte</a>
          </div>

          <div>
            <div className='info-section'>
              <h2>Sécurité du compte</h2>
              <form className='form' onSubmit={handlePasswordUpdate}>
                <div className='form__input'>
                  <label htmlFor='password'>Nouveau mot de passe</label>
                  <input
                    type='password'
                    id='password'
                    required
                    placeholder='*****'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className='form__input'>
                  <label htmlFor='confirm_password'>Confirmer le nouveau mot de passe</label>
                  <input
                    type='password'
                    id='confirm_password'
                    required
                    placeholder='*****'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <Button type='submit' content='Modifier le mot de passe' />
              </form>
            </div>
          </div>

          { subdomain !== 'admin' && subdomain !== 'dev' && (
            <div className='gap-50'>
              <div className='info-section'>
                <h2>Historique des commandes</h2>
                <a href='/order-history'>Voir l'historique des commandes</a>
              </div>

              <div className='info-section'>
                <h2>Parrainer un ami</h2>
                <div className='form__input'>
                  <label htmlFor='code'>Code parainnage</label>
                  <input
                    type='text'
                    id='code'
                    value={data.referralCode || ''}
                    readOnly
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}