import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import './index.sass'

export default function Account() {
  return (
    <div className='home home--secondary'>
      <div className='info-section-layout--3'>
        <div className='info-section'>
          <h2>Informations du compte</h2>
          <form className='form'>
            <div className='form__input'>
              <label htmlFor='first_name'>Prénom</label>
              <TextInput type='text' id='first_name' required={true} placeholder='John' />
            </div>
            <div className='form__input'>
              <label htmlFor='last_name'>Nom</label>
              <TextInput type='text' id='last_name' required={true} placeholder='Doe' />
            </div>
            <div className='form__input'>
              <label htmlFor='email'>Email</label>
              <TextInput type='email' id='email' required={true} placeholder='john.doe@example.com' />
            </div>
            <Button type='submit' content='Modifier le profil' />
          </form>
          <div className='line'></div>
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
              <Button type='submit' content='Modifier le profil' />
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