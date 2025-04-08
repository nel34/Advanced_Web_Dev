export default function RestaurantForm() {
  const daysList = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

  const handleSubmit = async (e) => {
    e.preventDefault()

    const form = e.target
    const opening_hours = {}
    daysList.forEach(day => {
      const open = form[`${day}__open`].value
      const close = form[`${day}__close`].value
      if (!open || !close) {
        opening_hours[day] = 'Fermé'
      } else {
        opening_hours[day] = `${open} - ${close}`
      }
    })

    const formData = {
      name: form.name.value,
      description: form.description.value,
      address: form.address.value,
      category: form.category.value,
      image: form.image.value,
      idOwner: form.idOwner.value,
      opening_hours
    }

  }

  return (
    <div className='home home--center'>
      <h1>Add a Restaurant</h1>
      <form onSubmit={handleSubmit} className='form'>
        <div className='form__input'>
          <label htmlFor='name'>Nom du restaurant :</label>
          <input id='name' name='name' required placeholder='Nom du restaurant' />
        </div>
        <div className='form__input'>
          <label htmlFor='description'>Description :</label>
          <textarea id='description' name='description' required placeholder='Description' rows='4' cols='50'></textarea>
        </div>
        <div className='form__input'>
          <label htmlFor='address'>Adresse :</label>
          <input id='address' name='address' required placeholder='Adresse' />
        </div>
        <div className='form__input'>
          <label htmlFor='category'>Catégorie :</label>
          <input id='category' name='category' required placeholder='Catégorie' />
        </div>
        <div className='form__input'>
          <label htmlFor='image'>URL image :</label>
          <input id='image' name='image' required placeholder='URL image' />
        </div>

        <h2>Horaires d'ouverture</h2>
        {daysList.map(day => (
          <div key={day}>
            <label style={{ fontWeight: 'bold' }}>{day.charAt(0).toUpperCase() + day.slice(1)}:</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div>
                <label htmlFor={`${day}__open`}>Ouverture :</label><br />
                <input id={`${day}__open`} type='time' name={`${day}__open`} />
              </div>
              <div>
                <label htmlFor={`${day}__close`}>Fermeture :</label><br />
                <input id={`${day}__close`} type='time' name={`${day}__close`} />
              </div>
            </div>
          </div>
        ))}
        <button type='submit'>Créer le restaurant</button>
      </form>
    </div>
  )
}
