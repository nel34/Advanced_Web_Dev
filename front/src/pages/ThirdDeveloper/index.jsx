import { useEffect, useState } from 'react'
import axios from 'axios'
import './index.sass'

export default function ThirdDeveloper() {
  const [apiKey, setApiKey] = useState(null)
  const [loadingKey, setLoadingKey] = useState(false)
  const [components, setComponents] = useState([])
  const [loadingComponents, setLoadingComponents] = useState(false)
  //const token = localStorage.getItem('accessToken')
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImRldmVsb3BlciIsImlhdCI6MTc0Mzg2Mjg0OCwiZXhwIjoxNzQzODYzNzQ4fQ.ohopm28hhUA8ZX8TZ418O8hblVfQT9MSmaN8Cn_VD0E";

  const fetchApiKey = async () => {
    setLoadingKey(true)
    try {
      const res = await axios.get('http://localhost:8080/api/auth/developer/key', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setApiKey(res.data.apiKey)
    } catch (err) {
      console.error('Erreur récupération clé :', err)
    } finally {
      setLoadingKey(false)
    }
  }

  const regenerateApiKey = async () => {
    setLoadingKey(true)
    try {
      const res = await axios.put('http://localhost:8080/api/auth/developer/regenerate', null, {
        headers: { Authorization: `Bearer ${token}` }
      })-
      setApiKey(res.data.apiKey)
    } catch (err) {
      console.error('Erreur régénération :', err)
    } finally {
      setLoadingKey(false)
    }
  }

  const fetchComponents = async () => {
    setLoadingComponents(true)
    try {
      const res = await axios.get('http://localhost:8080/', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setComponents(res.data)
    } catch (err) {
      console.error('Erreur récupération composants :', err)
    } finally {
      setLoadingComponents(false)
    }
  }

  const downloadComponent = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/`, {
        responseType: 'blob',
        headers: { Authorization: `Bearer ${token}` }
      })
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${id}.zip`)
      document.body.appendChild(link)
      link.click()
    } catch (err) {
      console.error('Erreur téléchargement :', err)
    }
  }

  useEffect(() => {
    fetchApiKey()
    fetchComponents()
  }, [])

  return (
    <div className="third-developer">
      <h1>Espace Développeur</h1>

      <section className="api-key-section">
        <h2>Votre clé API</h2>
        {loadingKey ? <p>Chargement...</p> : <code className="api-key">{apiKey || 'Aucune clé disponible'}</code>}
        <div className="actions">
          <button onClick={regenerateApiKey}>Régénérer la clé</button>
        </div>
      </section>

      <section className="components-section">
        <h2>Composants logiciels disponibles</h2>
        {loadingComponents ? <p>Chargement...</p> : (
          <div className="components-list">
            {components.map(comp => (
              <div key={comp.id} className="component-card">
                <h3>{comp.name}</h3>
                <p>{comp.description}</p>
                <small>Version : {comp.version}</small>
                <button onClick={() => downloadComponent(comp.id)}>Télécharger</button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}