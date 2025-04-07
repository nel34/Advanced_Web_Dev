import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import './index.sass'
import { useAuth } from '../../context/AuthContext'

export default function Account() {
  const { user, logout } = useAuth()

  return (
    <div className='home home--secondary'>
      <div className='info-section-layout--3'>
        <div className='info-section'>
          <h2>Informations du compte</h2>
          <form className='form'>
            <div className='form__input'>
              <label htmlFor='username'>Nom d'utilisateur</label>
              <TextInput type='text' id='username' required={true} placeholder='John' defaultValue={user.username} />
            </div>
            <div className='form__input'>
              <label htmlFor='email'>Email</label>
              <TextInput type='email' id='email' required={true} placeholder='john.doe@example.com' defaultValue={user.email}/>
            </div>
            <Button type='submit' content='Modifier le profil' />
          </form>
          <div className='line'></div>
          <a href='#' onClick={(e) => { e.preventDefault(); logout() }}>Se déconnecter</a>
          <a href='#'>Supprimer le compte</a>
        </div>
        <div>
          <div className='info-section'>
            <h2>Sécurité du compte</h2>
            <form className='form'>
              <div className='form__input'>
                <label htmlFor='password'>Nouveau mot de passe</label>
                <TextInput type='password' id='password' required={true} placeholder='*****' />
              </div>
              <div className='form__input'>
                <label htmlFor='confirm_password'>Confirmer le nouveau mot de passe</label>
                <TextInput type='password' id='confirm_password' required={true} placeholder='*****' />
              </div>
              <Button type='submit' content='Modifier le mot de passe' />
            </form>
          </div>
          <div className='info-section'>
            <h2>Méthodes de paiements</h2>
          </div>
        </div>
        <div>
          <div className='info-section'>
            <h2>Historique des commandes</h2>
            <a href='#'>Voir l'historique des commandes</a>
          </div>
          <div className='info-section'>
            <h2>Parrainer un ami</h2>
            <div className='form__input'>
              <label htmlFor='code'>Code parainnage</label>
              <TextInput type='text' id='code' required={true} placeholder='eats-givemeanapls' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}