import './index.sass'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import { useAuth } from '../../context/AuthContext'
import TechnicalNotification from '../../components/TechnicalNotification'

export default function AuthForm({ mode = 'login' }) {
  const isLogin = mode === 'login'
  const { login, register, notification, setNotification } = useAuth()
  const subdomain = window.location.hostname.split('.')[0]

  return (
    <div className="home home--center">
      <h1>{isLogin ? 'Se connecter' : 'S\'inscrire'}</h1>
      {notification && (
        <TechnicalNotification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <form className='form'>

        {isLogin ? (
          <div className='form__input'>
            <label htmlFor="identifier">Email ou nom d'utilisateur</label>
            <input
              type="text"
              id="identifier"
              required={true}
              placeholder="Entrez votre email ou nom d'utilisateur"
            />
          </div>
        ) : (
          <>
            <div className='form__input'>
              <label htmlFor="username">Nom d'utilisateur</label>
              <input
                type="text"
                id="username"
                required={true}
                placeholder="Entrez votre nom d'utilisateur"
              />
            </div>

            <div className='form__input'>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                required={true}
                placeholder="Entrez votre email"
              />
            </div>
          </>
        )}

        <div className='form__input'>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            required={true}
            placeholder="Entrez votre mot de passe"
          />
        </div>

        {!isLogin && (
          <>
            <div className='form__input'>
              <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
              <input
                type="password"
                id="confirmPassword"
                required={true}
                placeholder="Confirmer votre mot de passe"
              />
            </div>
            {subdomain !== 'dev' && subdomain !== 'admin' && (
              <div className='form__input'>
                <label htmlFor="referralCode">Code parrainage (optionnel)</label>
                <input
                  type="text"
                  id="referralCode"
                  required={true}
                  placeholder="Entrez le code de parrainage"
                />
              </div>
            )}
          </>
        )}

        <Button
          type="submit"
          content={isLogin ? 'Se connecter' : 'S\'inscrire'}
          onClick={async (e) => {
            e.preventDefault()
            setNotification(null) // reset

            const identifier = isLogin ? document.getElementById('identifier').value : null
            const email = !isLogin ? document.getElementById('email').value : null
            const username = !isLogin ? document.getElementById('username').value : null
            const password = document.getElementById('password').value
            const confirmPassword = !isLogin ? document.getElementById('confirmPassword').value : null
            const referralCode = document.getElementById('referralCode')?.value

            try {
              if (isLogin) {
                const payload = identifier.includes('@')
                  ? { email: identifier, password }
                  : { username: identifier, password }
                await login(payload)
              } else {
                await register({ username, email, password, referralCode, confirmPassword })
              }
            } catch {
              setNotification({
                message: 'Une erreur est survenue. Veuillez réessayer.',
                type: 'error'
              })
            }
          }}
        />
      </form>

      <div className="form__footer">
        {isLogin ? (
          <p>
            Pas de compte ? <Link to="/signup">Créer un compte</Link>
          </p>
        ) : (
          <p>
            Déjà un compte ? <Link to="/login">Se connecter</Link>
          </p>
        )}
      </div>
    </div>
  )
}