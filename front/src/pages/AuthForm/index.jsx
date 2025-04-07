import './index.sass'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import { useAuth } from '../../context/AuthContext'

export default function AuthForm({ mode = 'login' }) {
  const isLogin = mode === 'login'
  const { login, register } = useAuth()

  return (
    <div className="home home--center">
      <h1>{isLogin ? 'Se connecter' : 'S\'inscrire'}</h1>
      <form className='form'>
        {!isLogin && (
          <div className='form__input'>
            <label htmlFor="username">Nom d'utilisateur</label>
            <TextInput type="text" id="username" required={true} placeholder="Entrer votre nom d'utilisateur" />
          </div>
        )}

        <div className='form__input'>
          <label htmlFor="email">Email</label>
          <TextInput type="email" id="email" required={true} placeholder="Entrer votre email" />
        </div>

        <div className='form__input'>
          <label htmlFor="password">Mot de passe</label>
          <TextInput type="password" id="password" required={true} placeholder="Entrer votre mot de passe" />
        </div>

        {!isLogin && (
          <div className='form__input'>
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <TextInput type="password" id="confirmPassword" required={true} placeholder="Confirmer votre mot de passe" />
          </div>
        )}

        <Button type='submit' content={isLogin ? 'Se connecter' : 'S\'inscrire'} onClick={async (e) => {
          e.preventDefault()
          const username = isLogin ? null : document.getElementById('username').value
          const email = document.getElementById('email').value
          const password = document.getElementById('password').value
          const confirmPassword = isLogin ? null : document.getElementById('confirmPassword').value

          if (isLogin) {
            await login({ email, password })
          }
          else {
            await register({ username, email, password, confirmPassword })
          }
        }
        } />
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
