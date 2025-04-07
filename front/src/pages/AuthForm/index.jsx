import './index.sass'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import { useAuth } from '../../context/AuthContext'

export default function AuthForm({ mode = 'login' }) {
  const isLogin = mode === 'login'
  const { login, register } = useAuth()
  const subdomain = window.location.hostname.split('.')[0]

  return (
    <div className="home home--center">
      <h1>{isLogin ? 'Se connecter' : 'S\'inscrire'}</h1>
      <form className='form'>

        {isLogin ? (
          <div className='form__input'>
            <label htmlFor="identifier">Email ou nom d'utilisateur</label>
            <TextInput
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
              <TextInput
                type="text"
                id="username"
                required={true}
                placeholder="Entrez votre nom d'utilisateur"
              />
            </div>

            <div className='form__input'>
              <label htmlFor="email">Email</label>
              <TextInput
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
          <TextInput
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
              <TextInput
                type="password"
                id="confirmPassword"
                required={true}
                placeholder="Confirmer votre mot de passe"
              />
            </div>
            {subdomain !== 'dev' && subdomain !== 'admin' && (
              <div className='form__input'>
                <label htmlFor="referralCode">Code parrainage (optionnel)</label>
                <TextInput
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

            const identifier = isLogin ? document.getElementById('identifier').value : null
            const email = !isLogin ? document.getElementById('email').value : null
            const username = !isLogin ? document.getElementById('username').value : null
            const password = document.getElementById('password').value
            const confirmPassword = !isLogin ? document.getElementById('confirmPassword').value : null

            if (isLogin) {
              const payload = identifier.includes('@')
                ? { email: identifier, password }
                : { username: identifier, password }
              await login(payload)
            } else {
              await register({ username, email, password, confirmPassword })
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