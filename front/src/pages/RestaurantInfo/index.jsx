import { useEffect, useState } from 'react'
import { useFetch } from '../../utils/hooks'
import { useAuth } from '../../context/AuthContext'

export default function RestaurantInfo({ mode }) {
  const daysList = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
  const { user } = useAuth()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    category: '',
    image: '',
    opening_hours: {},
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const { isLoading, error, data } = useFetch(
    mode === 'edit' ? `http://localhost:8080/api/restaurants/user/${user.id}` : null
  )

  useEffect(() => {
    if (mode === 'edit' && data) {
      setFormData({
        name: data.name || '',
        description: data.description || '',
        address: data.address || '',
        category: data.category || '',
        image: data.image || '',
        opening_hours: data.opening_hours || {},
      })
    }
    else if (mode === 'create' && !isLoading && !error) {
      window.location.href = '/edit'
    }
  }, [data, mode])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

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

    const payload = {
      name: form.name.value,
      description: form.description.value,
      address: form.address.value,
      category: form.category.value,
      image: form.image.value,
      opening_hours,
      idOwner: user.id
    }

    console.log(payload)

    try {
      const method = mode === 'edit' ? 'PUT' : 'POST'
      const endpoint =
        mode === 'edit'
          ? `http://localhost:8080/api/restaurants/${data?._id}`
          : 'http://localhost:8080/api/restaurants'

      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error('Erreur lors de la soumission du formulaire')
      }

      const result = await res.json()
      window.location.href = '/'
    } catch (err) {
      console.error(err)
      setSubmitError('Une erreur est survenue.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (mode === 'edit' && isLoading) return <p>Chargement...</p>
  if (mode === 'edit' && error) return <p>Erreur : {error.message}</p>

  return (
    <div className='home home--center'>
      <h1>{mode === 'edit' ? 'Modifier le restaurant' : 'Créer un restaurant'}</h1>
      <form onSubmit={handleSubmit} className='form'>
        <div className='form__input'>
          <label htmlFor='name'>Nom du restaurant :</label>
          <input
            id='name'
            name='name'
            required
            placeholder='Nom du restaurant'
            defaultValue={formData.name}
          />
        </div>
        <div className='form__input'>
          <label htmlFor='description'>Description :</label>
          <textarea
            id='description'
            name='description'
            required
            placeholder='Description'
            rows='4'
            cols='50'
            defaultValue={formData.description}
          />
        </div>
        <div className='form__input'>
          <label htmlFor='address'>Adresse :</label>
          <input
            id='address'
            name='address'
            required
            placeholder='Adresse'
            defaultValue={formData.address}
          />
        </div>
        <div className='form__input'>
          <label htmlFor='category'>Catégorie :</label>
          <input
            id='category'
            name='category'
            required
            placeholder='Catégorie'
            defaultValue={formData.category}
          />
        </div>
        <div className='form__input'>
          <label htmlFor='image'>URL image :</label>
          <input
            id='image'
            name='image'
            required
            placeholder='URL image'
            defaultValue={formData.image}
          />
        </div>

        <h2>Horaires d'ouverture</h2>
        {daysList.map(day => {
          const value = formData.opening_hours[day] || ''
          const [defaultOpen = '', defaultClose = ''] = value.includes(' - ') ? value.split(' - ') : []

          return (
            <div key={day}>
              <label style={{ fontWeight: 'bold' }}>{day}:</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div>
                  <label htmlFor={`${day}__open`}>Ouverture :</label><br />
                  <input
                    id={`${day}__open`}
                    type='time'
                    name={`${day}__open`}
                    defaultValue={defaultOpen}
                  />
                </div>
                <div>
                  <label htmlFor={`${day}__close`}>Fermeture :</label><br />
                  <input
                    id={`${day}__close`}
                    type='time'
                    name={`${day}__close`}
                    defaultValue={defaultClose}
                  />
                </div>
              </div>
            </div>
          )
        })}
        <button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'En cours...' : mode === 'edit' ? 'Modifier' : 'Créer'} le restaurant
        </button>
        {submitError && <p style={{ color: 'red' }}>{submitError}</p>}
      </form>
    </div>
  )
}
