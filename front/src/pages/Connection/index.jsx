import './index.sass'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'

export default function Connection() {
  return (
    <div className="connection">
      <h1>Se connecter</h1>
      <form className='connection-form'>
        <div className='connection-form__input'>
          <label htmlFor="email">Email</label>
          <TextInput type="email" id="email" required={true} placeholder="Entrer votre email" />
        </div>
        <div className='connection-form__input'>
          <label htmlFor="password">Mot de passe</label>
          <TextInput type="password" id="password" required={true} placeholder="Entrer votre mot de passe" />
        </div>
        <Button type='submit' content="Se connecter" />
      </form>
    </div>
  )
}
